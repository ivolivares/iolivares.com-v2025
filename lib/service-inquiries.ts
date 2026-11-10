import { appendFile, mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import { Client } from "@notionhq/client"
import { z } from "zod"
import {
  type InquiryErrorCode,
  type InquiryLocale,
  type InquiryResponse,
  type InquiryStorage,
  PACKAGE_IDS,
  type PackageId,
  type PackageQuote,
} from "./service-inquiry-contract"

/** Notion Status select options. The site only writes "Nuevo". */
export const LEAD_STATUS_OPTIONS = ["Nuevo", "Contactado", "En conversación", "Propuesta", "Ganado", "Perdido"] as const

const LEAD_STATUS_DEFAULT = "Nuevo"
const EMAIL_LIMIT_PER_HOUR = 5
const HOUR_MS = 60 * 60 * 1000
const MIN_SUBMIT_MS = 1_500
const MAX_SUBMIT_MS = 24 * 60 * 60 * 1000

const PROPERTY = {
  company: "Company",
  email: "Email",
  locale: "Locale",
  name: "Name",
  need: "Need",
  source: "Source",
  status: "Status",
} as const

const optionalText = (max: number) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (typeof value === "string" ? cleanText(value) : ""))
    .pipe(z.string().max(max))

const requiredText = (max: number) =>
  z
    .string()
    .transform((value) => cleanText(value))
    .pipe(z.string().min(1).max(max))

const inquirySchema = z.object({
  company: requiredText(160),
  company_website: optionalText(200),
  email: z
    .string()
    .transform((value) => cleanText(value).toLowerCase())
    .pipe(z.string().email().max(254)),
  interest: z.enum(["agent", "advisory", "mvp"]).optional(),
  locale: z.enum(["en", "es"]),
  name: requiredText(120),
  need: optionalText(2_000),
  sourcePath: optionalText(80),
  sourceReferrer: optionalText(500),
  sourceSearch: optionalText(500),
  startedAt: z.number().finite(),
})

export type ParsedInquiry = z.infer<typeof inquirySchema>

export type LeadRecord = {
  company: string | null
  email: string
  locale: InquiryLocale
  name: string
  need: string | null
  source: string
}

export type AcceptedLead = LeadRecord & {
  interest: PackageId | null
}

export interface LeadWriter {
  countRecentByEmail(email: string, sinceIso: string): Promise<number>
  create(lead: LeadRecord): Promise<void>
}

type SubmitInput = {
  body: unknown
  config: {
    databaseId?: string
    token?: string
  }
  filePath: string
  now: number
  onWorker: boolean
  onAccepted?: (lead: AcceptedLead) => Promise<void>
  originAllowed: boolean
  writer?: LeadWriter | null
}

type StoredLead = LeadRecord & {
  createdAt: string
  status: typeof LEAD_STATUS_DEFAULT
}

export function defaultInquiryFilePath(): string {
  return path.join(process.cwd(), ".data", "service-inquiries.jsonl")
}

export function isCloudflareWorker(): boolean {
  return typeof navigator !== "undefined" && navigator.userAgent.includes("Cloudflare-Workers")
}

export function packageQuotes(locale: InquiryLocale): PackageQuote[] {
  return PACKAGE_IDS.map((id) => quoteFor(id, locale))
}

export async function submitServiceInquiry(input: SubmitInput): Promise<InquiryResponse> {
  if (!input.originAllowed) return failure("origin")
  if (isHoneypot(input.body)) {
    console.info(JSON.stringify({ event: "service_inquiry_honeypot" }))
    return { ok: true, packages: [], stored: false }
  }

  const parsed = parseInquiry(input.body)
  if (!parsed.ok) return parsed

  const timing = checkTiming(parsed.value.startedAt, input.now)
  if (timing) return failure(timing)

  const lead = toLead(parsed.value)
  const storedLead = toStoredLead(lead)
  const sinceIso = new Date(input.now - HOUR_MS).toISOString()
  const writer = resolveWriter(input)

  if (!writer) {
    if (input.onWorker) {
      logUnstored("missing_notion_env", storedLead)
      return finish(input, lead, false, "unconfigured")
    }

    try {
      const recent = await countLocalLeads(input.filePath, storedLead.email, sinceIso)
      if (recent >= EMAIL_LIMIT_PER_HOUR) return failure("rate_limited")
      await appendLocalLead(input.filePath, storedLead, input.now)
      console.info(JSON.stringify({ email: storedLead.email, event: "service_inquiry_stored", storage: "local-file" }))
      return finish(input, lead, true, "local-file")
    } catch (error) {
      logUnstored("local_mock_failed", storedLead, error)
      return finish(input, lead, false, "unconfigured")
    }
  }

  try {
    const recent = await writer.countRecentByEmail(storedLead.email, sinceIso)
    if (recent >= EMAIL_LIMIT_PER_HOUR) return failure("rate_limited")
  } catch (error) {
    console.error(
      JSON.stringify({
        detail: errorSummary(error),
        email: storedLead.email,
        event: "service_inquiry_rate_limit_skipped",
      })
    )
  }

  try {
    await writer.create(storedLead)
    console.info(JSON.stringify({ email: storedLead.email, event: "service_inquiry_stored", storage: "notion" }))
    return finish(input, lead, true, "notion")
  } catch (error) {
    logUnstored("notion_error", storedLead, error)
    return finish(input, lead, false, "notion")
  }
}

export function createNotionLeadWriter(token: string, databaseId: string): LeadWriter {
  const notion = new Client({ auth: token })
  let dataSourceId: Promise<string> | null = null

  const resolveId = () => {
    dataSourceId ??= resolveDataSourceId(notion, databaseId)
    return dataSourceId
  }

  return {
    async countRecentByEmail(email, sinceIso) {
      const id = await resolveId()
      const response = await notion.dataSources.query({
        data_source_id: id,
        filter: {
          and: [
            { email: { equals: email }, property: PROPERTY.email },
            { created_time: { after: sinceIso }, property: "Created" },
          ],
        },
        page_size: EMAIL_LIMIT_PER_HOUR,
      })
      return response.results.length
    },
    async create(lead) {
      const id = await resolveId()
      await notion.pages.create({
        parent: { data_source_id: id, type: "data_source_id" },
        properties: {
          [PROPERTY.company]: { rich_text: richText(lead.company ?? "") },
          [PROPERTY.email]: { email: lead.email },
          [PROPERTY.locale]: { select: { name: lead.locale } },
          [PROPERTY.name]: { title: richText(lead.name) },
          [PROPERTY.need]: { rich_text: richText(lead.need ?? "") },
          [PROPERTY.source]: { rich_text: richText(lead.source) },
          [PROPERTY.status]: { select: { name: LEAD_STATUS_DEFAULT } },
        },
      })
    },
  }
}

function resolveWriter(input: SubmitInput): LeadWriter | null {
  if (input.writer) return input.writer
  const token = input.config.token?.trim()
  const databaseId = input.config.databaseId?.trim()
  if (!token || !databaseId) return null
  return createNotionLeadWriter(token, databaseId)
}

async function resolveDataSourceId(notion: Client, rawId: string): Promise<string> {
  const normalized = normalizeNotionId(rawId)
  try {
    const database = await notion.databases.retrieve({ database_id: normalized })
    if ("data_sources" in database && database.data_sources[0]?.id) {
      return database.data_sources[0].id
    }
  } catch (error) {
    console.info(
      JSON.stringify({
        detail: errorSummary(error),
        event: "service_inquiry_database_lookup",
        message: "Using NOTION_LEADS_DATABASE_ID as a data source id",
      })
    )
  }
  return normalized
}

export function normalizeNotionId(id: string): string {
  const match = id.trim().match(/[a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i)
  return (match ? match[0] : id.trim()).replace(/-/g, "")
}

function quoteFor(id: PackageId, locale: InquiryLocale): PackageQuote {
  switch (id) {
    case "agent":
      return locale === "es"
        ? {
            id,
            name: "Agente / automatización con IA en 1 semana",
            price: "Desde US$1.500, 50% por adelantado",
            timeline: "1 semana",
          }
        : {
            id,
            name: "AI agent / automation in 1 week",
            price: "From US$1,500, 50% upfront",
            timeline: "1 week",
          }
    case "mvp":
      return locale === "es"
        ? {
            id,
            name: "MVP / desarrollo rápido full-stack",
            price: "Desde US$5.000",
            timeline: "4 a 6 semanas",
          }
        : {
            id,
            name: "MVP / rapid full-stack development",
            price: "From US$5,000",
            timeline: "4 to 6 weeks",
          }
    case "advisory":
      return locale === "es"
        ? {
            id,
            name: "Asesoría técnica / CTO o EM fraccional",
            price: "Desde US$2.500 al mes",
            timeline: "Unas 6 horas por semana",
          }
        : {
            id,
            name: "Technical advisory / fractional CTO or EM",
            price: "From US$2,500 a month",
            timeline: "About 6 hours a week",
          }
    default: {
      const exhaustive: never = id
      return exhaustive
    }
  }
}

function parseInquiry(body: unknown): { ok: true; value: ParsedInquiry } | { error: InquiryErrorCode; ok: false } {
  const parsed = inquirySchema.safeParse(body)
  if (parsed.success) return { ok: true, value: parsed.data }
  return failure(errorForField(parsed.error.issues[0]?.path[0]))
}

function errorForField(field: unknown): InquiryErrorCode {
  switch (field) {
    case "company":
      return "invalid_company"
    case "email":
      return "invalid_email"
    case "name":
      return "invalid_name"
    case "need":
      return "invalid_need"
    default:
      return "invalid_body"
  }
}

function checkTiming(startedAt: number, now: number): InquiryErrorCode | null {
  if (!Number.isFinite(startedAt) || startedAt <= 0) return "too_fast"
  const elapsed = now - startedAt
  if (elapsed < MIN_SUBMIT_MS) return "too_fast"
  if (elapsed > MAX_SUBMIT_MS) return "invalid_body"
  return null
}

function isHoneypot(body: unknown): boolean {
  if (!body || typeof body !== "object") return false
  const value = (body as { company_website?: unknown }).company_website
  return typeof value === "string" && cleanText(value).length > 0
}

function toLead(value: ParsedInquiry): AcceptedLead {
  return {
    company: emptyToNull(value.company),
    email: value.email,
    interest: value.interest ?? null,
    locale: value.locale,
    name: value.name || value.email,
    need: emptyToNull(value.need),
    source: formatSource(value),
  }
}

function toStoredLead(lead: AcceptedLead): LeadRecord {
  return {
    company: lead.company,
    email: lead.email,
    locale: lead.locale,
    name: lead.name,
    need: lead.need,
    source: lead.source,
  }
}

async function finish(
  input: SubmitInput,
  lead: AcceptedLead,
  stored: boolean,
  storage: InquiryStorage
): Promise<InquiryResponse> {
  if (input.onAccepted) {
    try {
      await input.onAccepted(lead)
    } catch (error) {
      console.error(
        JSON.stringify({
          detail: errorSummary(error),
          email: lead.email,
          event: "service_inquiry_mail",
        })
      )
    }
  }
  return revealed(lead.locale, stored, storage)
}

function formatSource(value: ParsedInquiry): string {
  const page = value.sourcePath === "/servicios" ? "/servicios" : "/services"
  const parts = [`page=${page}`]
  if (value.interest) parts.push(`interest=${value.interest}`)
  const search = value.sourceSearch.startsWith("?") ? value.sourceSearch.slice(1) : value.sourceSearch
  const params = new URLSearchParams(search)
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const utm = params.get(key)?.trim()
    if (utm) parts.push(`${key}=${utm.slice(0, 80)}`)
  }
  const referrer = sanitizeReferrer(value.sourceReferrer)
  if (referrer) parts.push(`referrer=${referrer}`)
  return parts.join(" ").slice(0, 500)
}

function sanitizeReferrer(value: string): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    return `${url.origin}${url.pathname}`.slice(0, 200)
  } catch {
    return null
  }
}

function revealed(locale: InquiryLocale, stored: boolean, storage: InquiryStorage): InquiryResponse {
  return { ok: true, packages: packageQuotes(locale), storage, stored }
}

function failure(error: InquiryErrorCode): { error: InquiryErrorCode; ok: false } {
  return { error, ok: false }
}

function richText(content: string) {
  if (!content) return []
  return [{ text: { content: content.slice(0, 2_000) }, type: "text" as const }]
}

function cleanText(value: string): string {
  let result = ""
  for (const char of value) {
    const code = char.charCodeAt(0)
    if (code === 9 || code === 10 || code === 13 || code >= 32) result += char
  }
  return result.trim()
}

function emptyToNull(value: string): string | null {
  return value.length === 0 ? null : value
}

async function countLocalLeads(filePath: string, email: string, sinceIso: string): Promise<number> {
  let raw = ""
  try {
    raw = await readFile(filePath, "utf8")
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") return 0
    throw error
  }

  return raw.split("\n").filter((line) => {
    if (!line.trim()) return false
    try {
      const record = JSON.parse(line) as Partial<StoredLead>
      return record.email === email && typeof record.createdAt === "string" && record.createdAt > sinceIso
    } catch {
      return false
    }
  }).length
}

async function appendLocalLead(filePath: string, lead: LeadRecord, now: number): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
  const record: StoredLead = { ...lead, createdAt: new Date(now).toISOString(), status: LEAD_STATUS_DEFAULT }
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8")
}

function logUnstored(reason: string, lead: LeadRecord, error?: unknown): void {
  console.error(
    JSON.stringify({
      detail: error ? errorSummary(error) : undefined,
      event: "service_inquiry_not_stored",
      lead,
      reason,
    })
  )
}

function errorSummary(error: unknown): string {
  if (error instanceof Error) return error.message
  return "unknown error"
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error
}
