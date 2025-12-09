import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { getNotionPostBySlug } from "@/lib/notion"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")

  if (!slug) {
    console.log("ERROR: No slug provided")
    return new Response("Missing slug parameter", { status: 400 })
  }

  if (secret !== process.env.DRAFT_SECRET_TOKEN) {
    console.log("ERROR: Invalid secret token")
    return new Response("Invalid token", { status: 401 })
  }

  // Verify the post exists in Notion before enabling draft mode
  const post = await getNotionPostBySlug(slug, true) // includeDrafts = true

  if (!post) {
    console.log(`ERROR: Post with slug "${slug}" not found in Notion`)
    return new Response(
      `Post with slug "${slug}" not found in Notion. Please check the Slug field in your Notion database.`,
      {
        status: 404,
      }
    )
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  // Redirect to the post
  redirect(`/thoughts/${slug}`)
}
