import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { getPostBySlug, formatDate } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { notFound } from "next/navigation"

export default function ThoughtPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-8">
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            home
          </Link>
          <Link href="/blog" className="hover:text-foreground transition-colors">
            blog
          </Link>
          <Link href="/thoughts" className="hover:text-foreground transition-colors">
            thoughts
          </Link>
          <Link href="/guestbook" className="hover:text-foreground transition-colors">
            guestbook
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
        <article className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to thoughts
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-light mb-4 text-balance">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <time>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <MarkdownRenderer content={post.content} />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
                <Link href="/uses" className="hover:text-foreground transition-colors">
                  /uses
                </Link>
              </div>
              <div className="text-sm text-muted-foreground font-mono">MMXXIV</div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
