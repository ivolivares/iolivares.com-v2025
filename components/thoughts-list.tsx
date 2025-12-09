"use client"

import Link from "next/link"
import { useMemo } from "react"
import { ViewTransition } from "@/components/view-transition"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"
import { NotionPostMetadata } from "@/lib/notion"

export function ThoughtsList({ posts }: { posts: NotionPostMetadata[] }) {
  const sectionRef = useScrollReveal()
  const { t, language } = useTranslation()

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.language === language)
  }, [posts, language])

  if (filteredPosts.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p>{t("thoughts.noPostsMessage")}</p>
      </div>
    )
  }

  return (
    <ViewTransition>
      <section ref={sectionRef} className="min-h-screen pb-20 sm:pb-32 page-content scroll-reveal">
        <div className="space-y-12">
          <h1 className="text-3xl sm:text-4xl font-light">{t("thoughts.pageTitle")}</h1>

          <div className="grid gap-6 sm:gap-8 lg:grid-col-1">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer h-full"
              >
                <Link href={`/thoughts/${post.slug}`} className="space-y-4 p-6 sm:p-8 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <ViewTransition name={`thought-date-${post.slug}`}>
                      <time>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </ViewTransition>
                    <ViewTransition name={`thought-readtime-${post.slug}`}>
                      <span>{post.readTime || ""}</span>
                    </ViewTransition>
                  </div>

                  <ViewTransition name={`thought-title-${post.slug}`}>
                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>
                  </ViewTransition>

                  <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                  {post.tags && post.tags.length > 0 && (
                    <ViewTransition name={`thought-tags-${post.slug}`}>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </ViewTransition>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 pt-2">
                    <span>{t("thoughts.readMoreCta")}</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ViewTransition>
  )
}
