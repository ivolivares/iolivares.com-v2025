import { Client } from "@notionhq/client"
import GithubSlugger from "github-slugger"
import { toString as mdastToString } from "mdast-util-to-string"
import { NotionToMarkdown } from "notion-to-md"
import { cache } from "react"
import readingTime from "reading-time"
import { remark } from "remark"

/**
 * Notion Integration using @notionhq/client v5+
 *
 * Important: v5 introduced breaking changes:
 * - `databases.query` → `dataSources.query`
 * - `database_id` → `data_source_id`
 *
 * See: https://developers.notion.com/docs/upgrade-guide-2025-09-03
 */

// Table of Contents item
export interface TOCItem {
  level: number // 1-6 for h1-h6
  text: string
  slug: string
  children?: TOCItem[]
}

// Type definitions for Notion API responses
interface NotionPage {
  id: string
  properties: {
    Title?: { title?: Array<{ plain_text?: string }> }
    Slug?: { rich_text?: Array<{ plain_text?: string }> }
    Date?: { date?: { start?: string } }
    Excerpt?: { rich_text?: Array<{ plain_text?: string }> }
    Tags?: { multi_select?: Array<{ name: string }> }
    Status?: { status?: { name?: string }; select?: { name?: string } }
    Language?: { select?: { name?: string } }
  }
}

// We'll reuse the PostMetadata interface or define a compatible one
export interface NotionPostMetadata {
  title: string
  date: string
  readTime: string
  excerpt: string
  slug: string
  tags?: string[]
  published: boolean
  language: "en" | "es"
}

export interface NotionPost extends NotionPostMetadata {
  content: string
  toc: TOCItem[]
}

const getNotionClient = () => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })
  return notion
}

const getN2M = (notion: Client) => {
  return new NotionToMarkdown({ notionClient: notion })
}

// Normalize Notion database ID - removes hyphens and extracts from URL if needed
const normalizeNotionId = (id: string): string => {
  // If it's a URL, extract the ID from it
  if (id.includes("notion.so")) {
    const match = id.match(/([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i)
    if (match) {
      id = match[0]
    }
  }
  // Remove all hyphens to get the raw 32-character ID
  return id.replace(/-/g, "")
}

/**
 * Extract table of contents from markdown content
 * Parses headings (h1-h6) and generates a hierarchical TOC structure
 */
async function extractTableOfContents(markdown: string): Promise<TOCItem[]> {
  const slugger = new GithubSlugger()
  const toc: TOCItem[] = []

  // Parse markdown to AST
  const tree = await remark().parse(markdown)

  // Extract all heading nodes
  const headings: { level: number; text: string; slug: string }[] = []

  // Visit all nodes in the tree
  function visit(node: unknown): void {
    if (typeof node === "object" && node !== null && "type" in node && node.type === "heading" && "depth" in node) {
      const text = mdastToString(node)
      const slug = slugger.slug(text)
      const depth = typeof node.depth === "number" ? node.depth : 1
      headings.push({
        level: depth,
        slug,
        text,
      })
    }

    if (typeof node === "object" && node !== null && "children" in node && Array.isArray(node.children)) {
      node.children.forEach(visit)
    }
  }

  visit(tree)

  // Build hierarchical structure
  const stack: { item: TOCItem; level: number }[] = []

  for (const heading of headings) {
    const tocItem: TOCItem = {
      children: [],
      level: heading.level,
      slug: heading.slug,
      text: heading.text,
    }

    // Pop items from stack that are at same or deeper level
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      // This is a top-level item
      toc.push(tocItem)
    } else {
      // Add as child to the last item in stack
      const parent = stack[stack.length - 1].item
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(tocItem)
    }

    // Add current item to stack
    stack.push({ item: tocItem, level: heading.level })
  }

  // Clean up empty children arrays
  function cleanEmptyChildren(items: TOCItem[]) {
    for (const item of items) {
      if (item.children && item.children.length === 0) {
        delete item.children
      } else if (item.children) {
        cleanEmptyChildren(item.children)
      }
    }
  }

  cleanEmptyChildren(toc)

  return toc
}

export async function getNotionPosts(includeDrafts = false): Promise<NotionPostMetadata[]> {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    console.warn("Missing NOTION_DATABASE_ID or NOTION_TOKEN env variables")
    return []
  }

  try {
    const notion = getNotionClient()
    const dataSourceId = normalizeNotionId(process.env.NOTION_DATABASE_ID)

    // Use dataSources.query (v5+ API) instead of databases.query
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: includeDrafts
        ? undefined
        : {
            property: "Status",
            status: {
              equals: "Published",
            },
          },
      sorts: [
        {
          direction: "descending",
          property: "Date",
        },
      ],
    })

    const n2m = getN2M(notion)

    // Fetch content for each post to calculate reading time
    const posts = await Promise.all(
      response.results.map(async (page) => {
        const metadata = getPageMetaData(page as NotionPage)

        try {
          // Fetch content to calculate reading time
          const mdblocks = await n2m.pageToMarkdown(page.id)
          const mdString = n2m.toMarkdownString(mdblocks)
          const stats = readingTime(mdString.parent)

          return {
            ...metadata,
            readTime: stats.text,
          }
        } catch (error) {
          console.error(`Error fetching content for post ${metadata.slug}:`, error)
          return metadata
        }
      })
    )

    return posts
  } catch (error) {
    console.error("Error fetching Notion posts:", error)
    return []
  }
}

export const getNotionPostBySlug = cache(async (slug: string, includeDrafts = false) => {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    console.log("ERROR: Missing NOTION_DATABASE_ID or NOTION_TOKEN")
    return null
  }

  try {
    const notion = getNotionClient()
    const dataSourceId = normalizeNotionId(process.env.NOTION_DATABASE_ID)

    // Use dataSources.query (v5+ API) instead of databases.query
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })

    if (!response.results.length) {
      console.log(`No post found with slug "${slug}"`)
      return null
    }

    const page = response.results[0] as NotionPage
    const metadata = getPageMetaData(page)

    // Draft check: If it's a draft and we are NOT including drafts, return null (404)
    if (!metadata.published && !includeDrafts) {
      console.log(`Post is a draft and includeDrafts=false, returning null`)
      return null
    }
    const n2m = getN2M(notion)
    const mdblocks = await n2m.pageToMarkdown(page.id)
    const mdString = n2m.toMarkdownString(mdblocks)
    const stats = readingTime(mdString.parent)

    // Extract table of contents from markdown
    const toc = await extractTableOfContents(mdString.parent)

    return {
      ...metadata,
      content: mdString.parent,
      readTime: stats.text, // e.g. "1 min read"
      toc,
    }
  } catch (error) {
    console.error(`Error fetching Notion post by slug ${slug}:`, error)
    return null
  }
})

export async function getLatestNotionPostsMetadata(): Promise<{ en: NotionPostMetadata | null; es: NotionPostMetadata | null }> {
  if (!process.env.NOTION_DATABASE_ID || !process.env.NOTION_TOKEN) {
    console.warn("Missing NOTION_DATABASE_ID or NOTION_TOKEN env variables")
    return { en: null, es: null }
  }

  try {
    const notion = getNotionClient()
    const dataSourceId = normalizeNotionId(process.env.NOTION_DATABASE_ID)

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
          property: "Date",
        },
      ],
    })

    let latestEn: NotionPostMetadata | null = null
    let latestEs: NotionPostMetadata | null = null

    for (const page of response.results) {
      const metadata = getPageMetaData(page as NotionPage)
      if (!latestEn && metadata.language === "en") {
        latestEn = metadata
      }
      if (!latestEs && metadata.language === "es") {
        latestEs = metadata
      }
      if (latestEn && latestEs) break
    }

    return { en: latestEn, es: latestEs }
  } catch (error) {
    console.error("Error fetching latest Notion posts metadata:", error)
    return { en: null, es: null }
  }
}

function getPageMetaData(page: NotionPage): NotionPostMetadata {
  const properties = page.properties

  const title = properties.Title?.title?.[0]?.plain_text || "Untitled"
  const slug = properties.Slug?.rich_text?.[0]?.plain_text || ""
  const date = properties.Date?.date?.start || new Date().toISOString()
  const excerpt = properties.Excerpt?.rich_text?.[0]?.plain_text || ""
  const tags = properties.Tags?.multi_select?.map((tag) => tag.name) || []
  const status = properties.Status?.status?.name || properties.Status?.select?.name || "Draft"
  const language = properties.Language?.select?.name === "Spanish" ? "es" : "en"

  return {
    date,
    excerpt,
    language,
    published: status === "Published",
    readTime: "", // Calculated only on single post view for performance
    slug,
    tags,
    title,
  }
}
