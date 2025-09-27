"use client"

import Link from "next/link"
import { getAllPosts } from "@/lib/markdown"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Thoughts() {
  const sectionRef = useScrollReveal()
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <section ref={sectionRef} className="min-h-screen py-20 sm:py-32 page-content scroll-reveal">
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {posts.map((post, index) => (
                <Link key={post.slug} href={`/thoughts/${post.slug}`}>
                  <article className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>Read more</span>
                        <svg
                          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
