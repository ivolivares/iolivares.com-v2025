import { draftMode } from "next/headers"
import { ThoughtsList } from "@/components/thoughts-list"
import { getNotionPosts } from "@/lib/notion"

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function Thoughts() {
  const isDraftMode = (await draftMode()).isEnabled
  const posts = await getNotionPosts(isDraftMode)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <ThoughtsList posts={posts} />
      </main>
    </div>
  )
}
