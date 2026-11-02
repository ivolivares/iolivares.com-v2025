import type { Metadata } from "next"
import { getStartupPerks } from "@/lib/notion-perks"
import { StartupsPerksClient } from "./page-client"

export const metadata: Metadata = {
  description: "Credits, discounts, and partner programs for early-stage founders.",
  robots: {
    follow: false,
    index: false,
  },
  title: "Startup Perks | Iván Olivares Rojas",
}

export const revalidate = 3600

export default async function StartupsPerksPage() {
  const perks = await getStartupPerks()

  return <StartupsPerksClient perks={perks} />
}
