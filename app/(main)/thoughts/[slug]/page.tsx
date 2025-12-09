import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { getNotionPostBySlug, getNotionPosts } from "@/lib/notion"
import { PageClient } from "./page-client"

export const revalidate = 3600 // Revalidate every hour

// Generate static params for ISR
export async function generateStaticParams() {
  const posts = await getNotionPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const isDraftMode = (await draftMode()).isEnabled
  const post = await getNotionPostBySlug(slug, isDraftMode)
  return {
    description: post?.excerpt,
    title: post?.title,
  }
}

export default async function ThoughtPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const isDraftMode = (await draftMode()).isEnabled
  const post = await getNotionPostBySlug(slug, isDraftMode)

  if (!post) {
    notFound()
  }

  return <PageClient post={post} slug={slug} isDraftMode={isDraftMode} />
}
