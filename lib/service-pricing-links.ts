import type { InquiryLocale } from "./service-inquiry-contract"

const BOOKING_URL = "https://cal.com/iolivares/15min"
const NOTE_LIMIT = 280

export function pricingBookingUrl(input: { email: string; name: string; need: string; packageName: string }): string {
  const url = new URL(BOOKING_URL)
  url.searchParams.set("from", "iolivares.com")
  const name = clip(input.name, 120)
  const email = input.email.trim().slice(0, 254)
  if (name) url.searchParams.set("name", name)
  if (email) url.searchParams.set("email", email)
  const notes = bookingNote(input.packageName, input.need)
  if (notes) url.searchParams.set("notes", notes)
  return url.toString()
}

export function pricingMailto(input: {
  locale: InquiryLocale
  name: string
  ownerEmail: string
  packageName: string
}): string {
  const who = clip(input.name, 120) || (input.locale === "es" ? "alguien" : "someone")
  const subject = `${input.packageName} — ${who}`
  const body =
    input.locale === "es"
      ? `Hola Iván, soy ${who}. Vi ${input.packageName} en iolivares.com y quiero conversar.`
      : `Hi Iván, I'm ${who}. I looked at ${input.packageName} on iolivares.com and I'd like to talk.`
  const query = [
    `subject=${encodeMailto(subject)}`,
    `body=${encodeMailto(body)}`,
  ].join("&")
  return `mailto:${input.ownerEmail}?${query}`
}

function encodeMailto(value: string): string {
  return encodeURIComponent(value.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n"))
}

function bookingNote(packageName: string, need: string): string {
  const title = clip(packageName, 160)
  const detail = clip(need, NOTE_LIMIT)
  if (title && detail) return `${title}. ${detail}`
  return title || detail
}

function clip(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  const slice = clean.slice(0, max)
  const space = slice.lastIndexOf(" ")
  return (space > max * 0.6 ? slice.slice(0, space) : slice).trim()
}
