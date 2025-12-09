import { draftMode } from "next/headers"
import { ImageResponse } from "next/og"
import { getNotionPostBySlug } from "@/lib/notion"

// Image metadata
export const size = {
  height: 630,
  width: 1200,
}

export const contentType = "image/png"

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const isDraftMode = (await draftMode()).isEnabled
  const post = await getNotionPostBySlug(slug, isDraftMode)

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        alignItems: "center",
        background: "white",
        backgroundImage: "url('/og.jpg')",
        display: "flex",
        fontSize: 128,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {post?.title}
    </div>
  )
}
