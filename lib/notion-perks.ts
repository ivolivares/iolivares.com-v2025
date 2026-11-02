import { Client } from "@notionhq/client"
import { cache } from "react"

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
  id: string
  name: string
  company: string
  category: PerkCategory | string
  benefit: string
  eligibility: string
  url: string
  featured: boolean
  order: number
  verified: string | null
}

interface NotionPerkPage {
  id: string
  properties: {
    Name?: { title?: Array<{ plain_text?: string }> }
    Company?: { rich_text?: Array<{ plain_text?: string }> }
    Category?: { select?: { name?: string } | null }
    Benefit?: { rich_text?: Array<{ plain_text?: string }> }
    Eligibility?: { rich_text?: Array<{ plain_text?: string }> }
    URL?: { url?: string | null }
    Status?: { status?: { name?: string }; select?: { name?: string } }
    Featured?: { checkbox?: boolean }
    Order?: { number?: number | null }
    Verified?: { date?: { start?: string } | null }
  }
}

const getNotionClient = () =>
  new Client({
    auth: process.env.NOTION_TOKEN,
  })

const normalizeNotionId = (id: string): string => {
  if (id.includes("notion.so") || id.includes("notion.com")) {
    const match = id.match(/([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i)
    if (match) {
      id = match[0]
    }
  }
  return id.replace(/-/g, "")
}

const richText = (property?: { rich_text?: Array<{ plain_text?: string }> }) =>
  property?.rich_text?.map((item) => item.plain_text || "").join("") || ""

function mapPerkPage(page: NotionPerkPage): StartupPerk {
  const properties = page.properties
  return {
    benefit: richText(properties.Benefit),
    category: properties.Category?.select?.name || "Other",
    company: richText(properties.Company),
    eligibility: richText(properties.Eligibility),
    featured: Boolean(properties.Featured?.checkbox),
    id: page.id,
    name: properties.Name?.title?.[0]?.plain_text || "Untitled",
    order: properties.Order?.number ?? Number.MAX_SAFE_INTEGER,
    url: properties.URL?.url || "",
    verified: properties.Verified?.date?.start || null,
  }
}

export const getStartupPerks = cache(async (): Promise<StartupPerk[]> => {
  if (!process.env.NOTION_PERKS_DATABASE_ID || !process.env.NOTION_TOKEN) {
    console.warn("Missing NOTION_PERKS_DATABASE_ID or NOTION_TOKEN env variables")
    return []
  }

  try {
    const notion = getNotionClient()
    const dataSourceId = normalizeNotionId(process.env.NOTION_PERKS_DATABASE_ID)
    const perks: StartupPerk[] = []
    let cursor: string | undefined

    do {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        filter: {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
        sorts: [
          {
            direction: "descending",
            property: "Featured",
          },
          {
            direction: "ascending",
            property: "Order",
          },
          {
            direction: "ascending",
            property: "Name",
          },
        ],
        start_cursor: cursor,
      })

      for (const page of response.results) {
        perks.push(mapPerkPage(page as NotionPerkPage))
      }

      cursor = response.has_more ? response.next_cursor || undefined : undefined
    } while (cursor)

    return perks
  } catch (error) {
    console.error("Error fetching Notion startup perks:", error)
    return []
  }
})
