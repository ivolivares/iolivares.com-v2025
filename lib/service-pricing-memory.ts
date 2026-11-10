import { isPackageId, type PackageId } from "./service-inquiry-contract"

export const PRICING_UNLOCK_KEY = "iolivares.services.pricing.v1"
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000
const ALLOWED_KEYS = new Set(["completed", "completedAt", "interest"])

export type PricingUnlock = {
  completed: true
  completedAt: number
  interest: PackageId
}

export function rememberPricingUnlock(interest: PackageId, now = Date.now(), store = browserStorage()): void {
  if (!store) return
  try {
    const record: PricingUnlock = { completed: true, completedAt: now, interest }
    store.setItem(PRICING_UNLOCK_KEY, JSON.stringify(record))
  } catch {
    // Storage can be unavailable in private mode.
  }
}

export function readPricingUnlock(now = Date.now(), store = browserStorage()): PricingUnlock | null {
  if (!store) return null
  try {
    const raw = store.getItem(PRICING_UNLOCK_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    const unlock = validatePricingUnlock(parsed, now)
    if (!unlock) {
      store.removeItem(PRICING_UNLOCK_KEY)
      return null
    }
    return unlock
  } catch {
    try {
      store.removeItem(PRICING_UNLOCK_KEY)
    } catch {
      // Ignore a storage that cannot be cleared.
    }
    return null
  }
}

function validatePricingUnlock(value: unknown, now: number): PricingUnlock | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const record = value as Record<string, unknown>
  if (Object.keys(record).some((key) => !ALLOWED_KEYS.has(key))) return null
  if (record.completed !== true) return null
  if (typeof record.completedAt !== "number" || !Number.isFinite(record.completedAt)) return null
  if (record.completedAt > now + 60_000) return null
  if (now - record.completedAt > NINETY_DAYS_MS) return null
  if (!isPackageId(record.interest)) return null
  return { completed: true, completedAt: record.completedAt, interest: record.interest }
}

function browserStorage(): Storage | null {
  try {
    if (typeof localStorage === "undefined") return null
    return localStorage
  } catch {
    return null
  }
}
