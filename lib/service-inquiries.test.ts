import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import test from "node:test"
import { type LeadRecord, type LeadWriter, packageQuotes, submitServiceInquiry } from "./service-inquiries"

const now = Date.parse("2026-11-08T12:00:00.000Z")

function body(overrides: Record<string, unknown> = {}) {
  return {
    company: "Northwind",
    company_website: "",
    email: "ada@example.com",
    locale: "en",
    name: "Ada",
    need: "A weekly report",
    sourcePath: "/services",
    sourceReferrer: "https://example.com/blog/post",
    sourceSearch: "?utm_source=newsletter&utm_medium=email&secret=no",
    startedAt: now - 5_000,
    ...overrides,
  }
}

test("package quotes keep the known price and the public page names no clients", async () => {
  const en = packageQuotes("en")
  const es = packageQuotes("es")
  assert.equal(en[0]?.price, "From US$1,500, 50% upfront")
  assert.equal(es[0]?.price, "Desde US$1.500, 50% por adelantado")
  assert.equal(en[1]?.price, "From US$5,000")
  assert.equal(en[1]?.timeline, "4 to 6 weeks")
  assert.equal(es[1]?.price, "Desde US$5.000")
  assert.equal(es[1]?.timeline, "4 a 6 semanas")
  assert.equal(en[2]?.price, "From US$2,500 a month")
  assert.equal(en[2]?.timeline, "About 6 hours a week")
  assert.equal(es[2]?.price, "Desde US$2.500 al mes")
  assert.equal(es[2]?.timeline, "Unas 6 horas por semana")

  const publicFiles = ["components/services-page.tsx", "public/locales/en.json", "public/locales/es.json"]
  const forbidden = ["Canal+", "Peacock", "Showmax", "MercadoPago", "99.99", "30M"]
  for (const file of publicFiles) {
    const text = await readFile(path.join(process.cwd(), file), "utf8")
    for (const phrase of forbidden) {
      assert.equal(text.includes(phrase), false, `${file} contains ${phrase}`)
    }
  }
})

test("missing Notion env writes a local mock and still returns pricing", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "services-leads-"))
  const filePath = path.join(directory, "inquiries.jsonl")
  try {
    const result = await submitServiceInquiry({
      body: body(),
      config: {},
      filePath,
      now,
      onWorker: false,
      originAllowed: true,
    })
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.stored, true)
    assert.equal(result.storage, "local-file")
    assert.match(result.packages[0]?.price ?? "", /US\$1,500/)
    const stored = await readFile(filePath, "utf8")
    const lead = JSON.parse(stored.trim()) as LeadRecord & { status: string }
    assert.equal(lead.email, "ada@example.com")
    assert.equal(lead.name, "Ada")
    assert.equal(lead.company, "Northwind")
    assert.equal(lead.status, "Nuevo")
    assert.match(lead.source, /page=\/services/)
    assert.match(lead.source, /utm_source=newsletter/)
    assert.match(lead.source, /utm_medium=email/)
    assert.equal(lead.source.includes("secret"), false)
    assert.match(lead.source, /referrer=https:\/\/example.com\/blog\/post/)
  } finally {
    await rm(directory, { force: true, recursive: true })
  }
})

test("a Notion failure still reveals pricing and does not throw", async () => {
  const writer: LeadWriter = {
    async countRecentByEmail() {
      return 0
    },
    async create() {
      throw new Error("Notion is down")
    },
  }
  const result = await submitServiceInquiry({
    body: body({ company: "Northwind", locale: "es", name: "Ada" }),
    config: { databaseId: "db", token: "token" },
    filePath: "/tmp/unused-services-leads.jsonl",
    now,
    onWorker: true,
    originAllowed: true,
    writer,
  })
  assert.equal(result.ok, true)
  if (!result.ok) return
  assert.equal(result.stored, false)
  assert.equal(result.storage, "notion")
  assert.equal(result.packages[0]?.price, "Desde US$1.500, 50% por adelantado")
})

test("spam and invalid submissions do not reveal pricing", async () => {
  const created: LeadRecord[] = []
  const writer: LeadWriter = {
    async countRecentByEmail() {
      return 5
    },
    async create(lead) {
      created.push(lead)
    },
  }
  const limited = await submitServiceInquiry({
    body: body(),
    config: { databaseId: "db", token: "token" },
    filePath: "/tmp/unused-services-leads.jsonl",
    now,
    onWorker: true,
    originAllowed: true,
    writer,
  })
  assert.deepEqual(limited, { error: "rate_limited", ok: false })
  assert.equal(created.length, 0)

  const honeypot = await submitServiceInquiry({
    body: body({ company_website: "https://spam.example" }),
    config: {},
    filePath: "/tmp/unused-services-leads.jsonl",
    now,
    onWorker: true,
    originAllowed: true,
    writer,
  })
  assert.equal(honeypot.ok, true)
  if (honeypot.ok) assert.equal(honeypot.packages.length, 0)

  const invalid = await submitServiceInquiry({
    body: body({ email: "not-an-email" }),
    config: {},
    filePath: "/tmp/unused-services-leads.jsonl",
    now,
    onWorker: false,
    originAllowed: true,
  })
  assert.deepEqual(invalid, { error: "invalid_email", ok: false })

  const missingCompany = await submitServiceInquiry({
    body: body({ company: "  " }),
    config: {},
    filePath: "/tmp/unused-services-leads.jsonl",
    now,
    onWorker: false,
    originAllowed: true,
  })
  assert.deepEqual(missingCompany, { error: "invalid_company", ok: false })

  const tooFast = await submitServiceInquiry({
    body: body({ startedAt: now }),
    config: {},
    filePath: "/tmp/unused-services-leads.jsonl",
    now,
    onWorker: false,
    originAllowed: true,
  })
  assert.deepEqual(tooFast, { error: "too_fast", ok: false })
})
