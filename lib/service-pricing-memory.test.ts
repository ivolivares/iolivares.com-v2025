import assert from "node:assert/strict"
import test from "node:test"
import { PRICING_UNLOCK_KEY, readPricingUnlock, rememberPricingUnlock } from "./service-pricing-memory"

const DAY_MS = 24 * 60 * 60 * 1000

function memoryStore(): Storage {
  const items = new Map<string, string>()
  return {
    clear() {
      items.clear()
    },
    getItem(key: string) {
      return items.get(key) ?? null
    },
    key(index: number) {
      return [...items.keys()][index] ?? null
    },
    get length() {
      return items.size
    },
    removeItem(key: string) {
      items.delete(key)
    },
    setItem(key: string, value: string) {
      items.set(key, value)
    },
  }
}

test("a completed visit stores only the package and the time", () => {
  const store = memoryStore()
  const now = Date.parse("2026-11-10T12:00:00.000Z")
  rememberPricingUnlock("mvp", now, store)
  const saved = JSON.parse(store.getItem(PRICING_UNLOCK_KEY) ?? "") as Record<string, unknown>
  assert.deepEqual(saved, { completed: true, completedAt: now, interest: "mvp" })
  assert.equal(JSON.stringify(saved).includes("ada@"), false)
  assert.equal(readPricingUnlock(now + DAY_MS, store)?.interest, "mvp")
})

test("invalid, personal, or expired records are ignored and cleared", () => {
  const store = memoryStore()
  const now = Date.parse("2026-11-10T12:00:00.000Z")
  store.setItem(
    PRICING_UNLOCK_KEY,
    JSON.stringify({ completed: true, completedAt: now, email: "ada@example.com", interest: "agent" })
  )
  assert.equal(readPricingUnlock(now, store), null)
  assert.equal(store.getItem(PRICING_UNLOCK_KEY), null)

  store.setItem(PRICING_UNLOCK_KEY, "{")
  assert.equal(readPricingUnlock(now, store), null)
  assert.equal(store.getItem(PRICING_UNLOCK_KEY), null)

  rememberPricingUnlock("agent", now - 91 * DAY_MS, store)
  assert.equal(readPricingUnlock(now, store), null)
  assert.equal(store.getItem(PRICING_UNLOCK_KEY), null)
})
