import assert from "node:assert/strict"
import test from "node:test"
import type { AcceptedLead } from "./service-inquiries"
import { BOOKING_URL, OWNER_EMAIL, ownerMail, publicSnippet, visitorMail } from "./service-mail"

const NEED = "Automatizar el reporte semanal.\nMira https://evil.example/phish y www.spam.io ahora."

function lead(overrides: Partial<AcceptedLead> = {}): AcceptedLead {
  return {
    company: "Northwind",
    email: "ada@example.com",
    interest: "agent",
    locale: "es",
    name: "Ada",
    need: NEED,
    source: "page=/services interest=agent",
    ...overrides,
  }
}

test("the visitor letter uses name, company and a package phrase, never the free-text need", () => {
  const spanish = visitorMail(lead())
  assert.equal(spanish.subject, "Vi que te interesa un agente de IA. Hablemos")
  assert.equal(
    spanish.text,
    [
      "Hola Ada,",
      "",
      "Vi que te interesó un agente de IA para Northwind.",
      "",
      `Te propongo que hablemos hoy mismo: agenda 15 minutos acá ${BOOKING_URL}`,
      "",
      "— Iván",
    ].join("\n")
  )
  assert.equal(spanish.text.includes("Automatizar"), false)
  assert.equal(spanish.text.includes("evil.example"), false)
  assert.equal(spanish.text.includes("spam.io"), false)

  const english = visitorMail(lead({ interest: "mvp", locale: "en" }))
  assert.equal(english.subject, "I saw you're interested in an MVP. Let's talk")
  assert.equal(
    english.text,
    [
      "Hi Ada,",
      "",
      "I saw you're interested in an MVP for Northwind.",
      "",
      `Let's talk today: book 15 minutes here ${BOOKING_URL}`,
      "",
      "— Iván",
    ].join("\n")
  )
  assert.equal(english.text.includes(NEED), false)

  const advisory = visitorMail(lead({ interest: "advisory" }))
  assert.equal(advisory.subject, "Vi que te interesa la asesoría técnica. Hablemos")
  assert.match(advisory.text, /Vi que te interesó la asesoría técnica para Northwind\./)
})

test("name and company lose links and extra length, and an empty company drops out of the sentence", () => {
  assert.equal(publicSnippet("Ada https://evil.com Lovelace", 80), "Ada Lovelace")
  assert.equal(publicSnippet("see www.spam.io now", 80), "see now")
  assert.equal(publicSnippet("nota example.com/phish final", 80), "nota final")

  const longCompany = "Northwind Studios International Holdings"
  const letter = visitorMail(
    lead({
      company: `  ${longCompany}   https://evil.com  `,
      locale: "en",
      name: "Ada https://evil.com",
    })
  )
  assert.match(letter.text, /Hi Ada,/)
  assert.match(letter.text, new RegExp(`for ${longCompany}\\.`))
  assert.equal(letter.text.includes("evil.com"), false)

  const noCompany = visitorMail(lead({ company: "https://evil.com", locale: "en", name: "Ada" }))
  assert.match(noCompany.text, /I saw you're interested in an AI agent\./)
  assert.equal(noCompany.text.includes(" for "), false)
})

test("the owner notice keeps the full form, including the need, and replies to the lead", () => {
  assert.equal(OWNER_EMAIL, "hi@iolivares.com")
  assert.equal(BOOKING_URL, "https://cal.com/iolivares/15min?from=iolivares.com")
  const notice = ownerMail(lead({ interest: "agent", locale: "en" }))
  assert.equal(notice.subject, "Nuevo lead: Ada, Northwind")
  assert.match(notice.text, /Email: ada@example.com/)
  assert.match(notice.text, /Idioma: en/)
  assert.match(notice.text, /Paquete: AI agent \/ automation in 1 week/)
  assert.match(notice.text, /Origen: page=\/services interest=agent/)
  assert.match(notice.text, new RegExp(NEED.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  assert.match(notice.text, /Responde este correo y le llega a ada@example.com\./)
})
