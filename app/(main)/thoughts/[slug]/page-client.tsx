"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { CollapsibleTOC } from "@/components/collapsible-toc"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { ViewTransition } from "@/components/view-transition"
import { useTranslation } from "@/hooks/use-translation"
import { NotionPost } from "@/lib/notion"
import { getYearInRomanNumerals } from "@/lib/utils"

interface PageClientProps {
  post: NotionPost
  slug: string
  isDraftMode: boolean
}

export function PageClient({ post, slug, isDraftMode }: PageClientProps) {
  const { t } = useTranslation()
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <ViewTransition>
      <div className="min-h-screen bg-background text-foreground">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 xl:gap-16">
            {/* Article Content */}
            <article className="max-w-3xl">
              {/* Back Link */}
              <Link
                href="/thoughts"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("thoughts.backButton")}
              </Link>

              {isDraftMode && (
                <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-md border border-yellow-200 dark:border-yellow-900">
                  <p className="text-sm font-medium flex items-center justify-between">
                    Draft Mode Enabled
                    <Link href="/api/disable-draft" className="underline hover:no-underline">
                      Disable
                    </Link>
                  </p>
                </div>
              )}

              {/* Post Header */}
              <header className="mb-12">
                <ViewTransition name={`thought-title-${slug}`}>
                  <div className="inline-block">
                    <h1 className="text-3xl sm:text-4xl font-light mb-4 text-balance">{post.title}</h1>
                  </div>
                </ViewTransition>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <ViewTransition name={`thought-date-${slug}`}>
                    <time>{formattedDate}</time>
                  </ViewTransition>
                  <span>•</span>
                  <ViewTransition name={`thought-readtime-${slug}`}>
                    <span>{post.readTime}</span>
                  </ViewTransition>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <ViewTransition name={`thought-tags-${slug}`}>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </ViewTransition>
                )}
              </header>

              {/* Collapsible TOC - Mobile only */}
              {post.toc && post.toc.length > 0 && (
                <div className="lg:hidden">
                  <CollapsibleTOC toc={post.toc} defaultOpen={false} />
                </div>
              )}

              {/* Post Content */}
              <ViewTransition update="none">
                <MarkdownRenderer content={post.content} />
              </ViewTransition>

              {/* Footer */}
              <footer className="mt-16 pt-8 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ExternalLink className="w-4 h-4" />
                    <Link href="/thoughts" className="hover:text-foreground transition-colors">
                      /thoughts
                    </Link>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">{getYearInRomanNumerals(post.date)}</div>
                </div>
              </footer>
            </article>

            {/* Table of Contents Sidebar - Sticky on desktop, hidden on mobile */}
            {post.toc && post.toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  <TableOfContents toc={post.toc} />
                </div>
              </aside>
            )}
          </div>
        </main>
      </div>
    </ViewTransition>
  )
}
