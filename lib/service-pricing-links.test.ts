import assert from "node:assert/strict"
import test from "node:test"
import { pricingBookingUrl, pricingMailto } from "./service-pricing-links"

test("the booking link keeps the site param and prefills name, email and notes", () => {
  const href = pricingBookingUrl({
    email: "ada@example.com",
    name: "Ada Lovelace",
    need: "A weekly report\nwith https://example.com",
    packageName: "AI agent / automation in 1 week",
  })
  const url = new URL(href)
  assert.equal(url.origin + url.pathname, "https://cal.com/iolivares/15min")
  assert.equal(url.searchParams.get("from"), "iolivares.com")
  assert.equal(url.searchParams.get("name"), "Ada Lovelace")
  assert.equal(url.searchParams.get("email"), "ada@example.com")
  assert.equal(
    url.searchParams.get("notes"),
    "AI agent / automation in 1 week. A weekly report with https://example.com"
  )
})

test("the mailto names the package and the person in the page language", () => {
  const raw = pricingMailto({
    locale: "es",
    name: "Ada",
    ownerEmail: "hi@iolivares.com",
    packageName: "Agente de IA / automatización en 1 semana",
  })
  assert.equal(raw.includes("+"), false)
  assert.match(raw, /subject=Agente%20de%20IA/)
  assert.match(raw, /body=Hola%20Iv%C3%A1n/)
  const spanish = new URL(raw)
  assert.equal(spanish.protocol, "mailto:")
  assert.equal(spanish.pathname, "hi@iolivares.com")
  assert.equal(spanish.searchParams.get("subject"), "Agente de IA / automatización en 1 semana — Ada")
  assert.match(spanish.searchParams.get("body") ?? "", /Hola Iván, soy Ada/)

  const english = new URL(
    pricingMailto({
      locale: "en",
      name: "Ada",
      ownerEmail: "hi@iolivares.com",
      packageName: "AI agent / automation in 1 week",
    })
  )
  assert.match(english.searchParams.get("body") ?? "", /Hi Iván, I'm Ada/)
})
