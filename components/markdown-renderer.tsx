"use client"

import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import TweetEmbed from "@/components/tweet-embed"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          // Custom link styles
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          // Custom blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-6 my-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          // Custom code styles
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">{children}</code>
            }
            return (
              <code className="block bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto">
                {children}
              </code>
            )
          },
          // Custom heading styles with IDs for anchor linking
          h1: ({ children, id }) => (
            <h1 id={id} className="text-3xl font-light mb-6 text-foreground scroll-mt-20">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 id={id} className="text-2xl font-light mb-4 mt-8 text-foreground scroll-mt-20">
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="text-xl font-medium mb-3 mt-6 text-foreground scroll-mt-20">
              {children}
            </h3>
          ),
          h4: ({ children, id }) => (
            <h4 id={id} className="text-lg font-medium mb-2 mt-4 text-foreground scroll-mt-20">
              {children}
            </h4>
          ),
          h5: ({ children, id }) => (
            <h5 id={id} className="text-base font-medium mb-2 mt-3 text-foreground scroll-mt-20">
              {children}
            </h5>
          ),
          h6: ({ children, id }) => (
            <h6 id={id} className="text-sm font-medium mb-2 mt-2 text-foreground scroll-mt-20">
              {children}
            </h6>
          ),
          // Custom image handler for tweet embeds
          img: ({ alt, src }) => {
            // Check if this is a tweet embed (using ![tweet](tweet_id) syntax)
            if (alt === "tweet" && src) {
              return <TweetEmbed tweetId={src as unknown as string} />
            }
            // Regular image rendering
            return (
              <picture className="w-full flex flex-col space-y-2">
                <img src={src} alt={alt} className="rounded-lg max-w-full h-auto" />
                <p className="w-full text-sm py-1 text-muted-foreground wrap-break-word whitespace-break-spaces">
                  {alt}
                </p>
              </picture>
            )
          },
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          ol: ({ children }) => <ol className="mb-6 space-y-2 text-foreground">{children}</ol>,
          // Custom paragraph styles with tweet embed handling
          p: ({ children, node }) => {
            // Check if paragraph contains an image (which might be a tweet embed)
            // This prevents invalid <p><div> nesting when tweet embeds are rendered
            const hasImage = node?.children?.some((child) => "tagName" in child && child.tagName === "img")

            // Use div for paragraphs containing images to avoid nesting issues
            const Component = hasImage ? "div" : "p"
            return <Component className="mb-6 leading-relaxed text-foreground">{children}</Component>
          },
          // Custom pre styles for code blocks
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto mb-6">
              {children}
            </pre>
          ),
          // Custom list styles
          ul: ({ children }) => <ul className="mb-6 space-y-2 text-foreground">{children}</ul>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
