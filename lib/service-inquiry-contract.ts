export const PACKAGE_IDS = ["agent", "mvp", "advisory"] as const

export type PackageId = (typeof PACKAGE_IDS)[number]

export type InquiryLocale = "en" | "es"

export type PackageQuote = {
  id: PackageId
  name: string
  price: string
  timeline: string
}

export const INQUIRY_ERROR_CODES = [
  "invalid_body",
  "invalid_company",
  "invalid_email",
  "invalid_name",
  "invalid_need",
  "origin",
  "rate_limited",
  "too_fast",
] as const

export type InquiryErrorCode = (typeof INQUIRY_ERROR_CODES)[number]

export type InquiryStorage = "local-file" | "notion" | "unconfigured"

export type InquirySuccess = {
  ok: true
  packages: PackageQuote[]
  storage?: InquiryStorage
  stored?: boolean
}

export type InquiryFailure = {
  error: InquiryErrorCode
  ok: false
}

export type InquiryResponse = InquiryFailure | InquirySuccess

export function isPackageId(value: unknown): value is PackageId {
  return typeof value === "string" && (PACKAGE_IDS as readonly string[]).includes(value)
}

export function isPackageQuote(value: unknown): value is PackageQuote {
  if (!value || typeof value !== "object") return false
  const quote = value as Partial<PackageQuote>
  return (
    isPackageId(quote.id) &&
    typeof quote.name === "string" &&
    typeof quote.price === "string" &&
    typeof quote.timeline === "string"
  )
}

export function isInquirySuccess(value: unknown): value is InquirySuccess {
  if (!value || typeof value !== "object") return false
  const result = value as Partial<InquirySuccess>
  return result.ok === true && Array.isArray(result.packages) && result.packages.every(isPackageQuote)
}

export function isInquiryErrorCode(value: unknown): value is InquiryErrorCode {
  return typeof value === "string" && (INQUIRY_ERROR_CODES as readonly string[]).includes(value)
}

export function isInquiryFailure(value: unknown): value is InquiryFailure {
  if (!value || typeof value !== "object") return false
  const result = value as Partial<InquiryFailure>
  return result.ok === false && isInquiryErrorCode(result.error)
}
