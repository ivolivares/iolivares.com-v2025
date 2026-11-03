export const PERK_CATEGORIES = [
  "Marketing",
  "Support & CRM",
  "Analytics",
  "Cloud",
  "AI",
  "DevTools",
  "Database",
  "Productivity",
  "Finance & Banking",
  "Legal & HR",
  "Security",
  "Accelerators",
  "Design",
  "Other",
] as const

export type PerkCategory = (typeof PERK_CATEGORIES)[number]

export interface StartupPerk {
  benefit: string
  category: PerkCategory | string
  company: string
  eligibility: string
  featured: boolean
  id: string
  name: string
  order: number
  url: string
  verified: string | null
}

export function getPerkLogoUrl(perkUrl: string): string | null {
  if (!perkUrl) return null
  try {
    const hostname = new URL(perkUrl).hostname.replace(/^www\./, "")
    if (!hostname) return null
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`
  } catch {
    return null
  }
}
