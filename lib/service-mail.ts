import { email as reversedOwnerEmail } from "./email"
import { type AcceptedLead, packageQuotes } from "./service-inquiries"
import type { InquiryLocale, PackageId } from "./service-inquiry-contract"

/** Same 15-minute link as `components/footer.tsx` and `public/locales`. */
export const BOOKING_URL = "https://cal.com/iolivares/15min?from=iolivares.com"

export const OWNER_EMAIL = reversedOwnerEmail.split("").reverse().join("")

const RESEND_FROM = `Iván Olivares <${OWNER_EMAIL}>`

const NAME_LIMIT = 80
const COMPANY_LIMIT = 80

const LINK_TLDS = new Set([
  "ai",
  "app",
  "ar",
  "at",
  "au",
  "be",
  "biz",
  "bo",
  "br",
  "ca",
  "cc",
  "ch",
  "cl",
  "co",
  "com",
  "cr",
  "cz",
  "de",
  "dev",
  "do",
  "ec",
  "es",
  "eu",
  "fr",
  "gg",
  "gt",
  "hn",
  "id",
  "ie",
  "in",
  "info",
  "io",
  "it",
  "jp",
  "kr",
  "link",
  "ly",
  "me",
  "mx",
  "net",
  "ni",
  "nl",
  "no",
  "nz",
  "org",
  "pa",
  "pe",
  "pl",
  "pt",
  "py",
  "ru",
  "se",
  "sh",
  "sv",
  "to",
  "tv",
  "uk",
  "us",
  "uy",
  "ve",
  "xyz",
])

const PACKAGE_PHRASE: Record<InquiryLocale, Record<PackageId, string>> = {
  en: {
    advisory: "technical advisory",
    agent: "an AI agent",
    mvp: "an MVP",
  },
  es: {
    advisory: "la asesoría técnica",
    agent: "un agente de IA",
    mvp: "un MVP",
  },
}

type OutboundMail = {
  kind: "owner" | "visitor"
  replyTo: string
  subject: string
  text: string
  to: string
}

export function visitorMail(lead: AcceptedLead): { subject: string; text: string } {
  const locale = lead.locale === "es" ? "es" : "en"
  const phrase = lead.interest ? PACKAGE_PHRASE[locale][lead.interest] : locale === "es" ? "un proyecto" : "a project"
  const name = publicSnippet(lead.name, NAME_LIMIT)
  const company = lead.company ? publicSnippet(lead.company, COMPANY_LIMIT) : ""
  if (locale === "es") {
    const interest = company ? `Vi que te interesó ${phrase} para ${company}.` : `Vi que te interesó ${phrase}.`
    return {
      subject: `Vi que te interesa ${phrase}. Hablemos`,
      text: [`Hola${name ? ` ${name}` : ""},`, "", interest, "", bookingLine(locale), "", "— Iván"].join("\n"),
    }
  }
  const interest = company
    ? `I saw you're interested in ${phrase} for ${company}.`
    : `I saw you're interested in ${phrase}.`
  return {
    subject: `I saw you're interested in ${phrase}. Let's talk`,
    text: [`Hi${name ? ` ${name}` : ""},`, "", interest, "", bookingLine(locale), "", "— Iván"].join("\n"),
  }
}

export function ownerMail(lead: AcceptedLead): { subject: string; text: string } {
  const name = oneLine(lead.name)
  const company = lead.company ? oneLine(lead.company) : ""
  const packageName = lead.interest
    ? (packageQuotes(lead.locale).find((quote) => quote.id === lead.interest)?.name ?? lead.interest)
    : "(no eligió)"
  const who = company ? `${name}, ${company}` : name
  return {
    subject: `Nuevo lead: ${who}`,
    text: [
      "Alguien completó el formulario de /services.",
      "",
      `Nombre: ${lead.name}`,
      `Empresa: ${lead.company ?? ""}`,
      `Email: ${lead.email}`,
      `Idioma: ${lead.locale}`,
      `Paquete: ${packageName}`,
      `Origen: ${lead.source}`,
      "",
      "Necesidad:",
      lead.need ?? "(no escribió)",
      "",
      `Responde este correo y le llega a ${lead.email}.`,
    ].join("\n"),
  }
}

export function publicSnippet(value: string, max: number): string {
  const clean = stripLinks(value).replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  const slice = clean.slice(0, max)
  const space = slice.lastIndexOf(" ")
  const cut = space >= Math.floor(max * 0.6) ? slice.slice(0, space) : slice
  return cut.trim().replace(/[.,;:]+$/u, "")
}

export async function deliverLeadMail(input: { apiKey: string; lead: AcceptedLead }): Promise<void> {
  if (!input.apiKey) {
    console.error(JSON.stringify({ detail: "missing RESEND_API_KEY", event: "service_lead_email" }))
    return
  }
  const visitor = visitorMail(input.lead)
  const owner = ownerMail(input.lead)
  await Promise.all([
    postResend({
      apiKey: input.apiKey,
      kind: "visitor",
      replyTo: OWNER_EMAIL,
      subject: visitor.subject,
      text: visitor.text,
      to: input.lead.email,
    }),
    postResend({
      apiKey: input.apiKey,
      kind: "owner",
      replyTo: input.lead.email,
      subject: owner.subject,
      text: owner.text,
      to: OWNER_EMAIL,
    }),
  ])
}

function bookingLine(locale: InquiryLocale): string {
  return locale === "es"
    ? `Te propongo que hablemos hoy mismo: agenda 15 minutos acá ${BOOKING_URL}`
    : `Let's talk today: book 15 minutes here ${BOOKING_URL}`
}

function oneLine(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

function stripLinks(value: string): string {
  return value
    .split(/\s+/u)
    .filter((token) => token.length > 0 && !isLinkToken(token))
    .join(" ")
}

function isLinkToken(token: string): boolean {
  const bare = token.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, "")
  if (!bare) return false
  if (/^https?:\/\//i.test(bare) || /^www\./i.test(bare)) return true
  if (bare.includes("@")) return isHost(bare.split("@").pop() ?? "")
  return isHost(bare.split(/[/?#]/u)[0] ?? "")
}

function isHost(host: string): boolean {
  const labels = host.split(".")
  if (labels.length < 2) return false
  const tld = labels[labels.length - 1]?.toLowerCase() ?? ""
  if (!LINK_TLDS.has(tld)) return false
  return labels.every((label) => label.length > 0 && /^[a-z0-9-]+$/i.test(label))
}

async function postResend(input: OutboundMail & { apiKey: string }): Promise<void> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from: RESEND_FROM,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
        to: [input.to],
      }),
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    const payload = (await response.json().catch(() => null)) as { id?: string; message?: string } | null
    if (!response.ok) {
      console.error(
        JSON.stringify({
          detail: payload?.message ?? `resend ${response.status}`,
          event: "service_lead_email",
          kind: input.kind,
          status: response.status,
        })
      )
      return
    }
    console.info(
      JSON.stringify({
        event: "service_lead_email",
        id: payload?.id ?? null,
        kind: input.kind,
        status: response.status,
      })
    )
  } catch (error) {
    console.error(
      JSON.stringify({
        detail: error instanceof Error ? error.message : "email failed",
        event: "service_lead_email",
        kind: input.kind,
      })
    )
  }
}
