import { HomeClient } from "@/components/home-client"
import { getLatestNotionPostsMetadata } from "@/lib/notion"

export const revalidate = 3600 // ISR: Revalidate every hour

export default async function Home() {
  const latestPosts = await getLatestNotionPostsMetadata()

  return <HomeClient latestPosts={latestPosts} />
}
