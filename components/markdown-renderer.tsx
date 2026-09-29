"use client"

import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import TweetEmbed from "@/components/tweet-embed"
import { VideoEmbed } from "@/components/video-embed"
import { cn } from "@/lib/utils"
import { getVideoEmbedInfo, isNotionMediaLinkLabel } from "@/lib/video-embeds"

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join("")
  return ""
}

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
          // Catch Notion media links like [bookmark](video-url) from the default converter
          a: ({ href, children }) => {
            const label = getTextContent(children).trim()
            if (href && getVideoEmbedInfo(href) && (isNotionMediaLinkLabel(label) || label === href)) {
              return <VideoEmbed url={href} />
            }

            return (
              <a
                href={href}
                className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-6 my-6 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
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
          h1: ({ children, id }) => (
            <h1 id={id} className="text-3xl font-bold mb-6 text-foreground scroll-mt-20">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 id={id} className="text-2xl font-bold mb-4 mt-8 text-foreground scroll-mt-20">
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
          img: ({ alt, src }) => {
            const srcUrl = typeof src === "string" ? src : undefined

            if (alt === "tweet" && srcUrl) {
              return <TweetEmbed tweetId={srcUrl} />
            }

            if (srcUrl && (isNotionMediaLinkLabel(alt) || getVideoEmbedInfo(srcUrl))) {
              return <VideoEmbed url={srcUrl} title={isNotionMediaLinkLabel(alt) ? undefined : alt || undefined} />
            }

            return (
              <picture className="w-full flex flex-col space-y-2">
                <img src={srcUrl} alt={alt} className="rounded-lg max-w-full h-auto" />
                <p className="w-full text-sm py-1 text-muted-foreground wrap-break-word whitespace-break-spaces">
                  {alt}
                </p>
              </picture>
            )
          },
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          ol: ({ children }) => <ol className="mb-6 space-y-2 text-foreground">{children}</ol>,
          // Avoid invalid <p><figure> / <p><div> nesting for tweet/video embeds
          p: ({ children, node }) => {
            const hasBlockMedia = node?.children?.some((child) => {
              if (!("tagName" in child)) return false
              if (child.tagName === "img") return true
              if (child.tagName === "a" && "properties" in child) {
                const href = (child.properties as { href?: string } | undefined)?.href
                const label =
                  "children" in child && Array.isArray(child.children)
                    ? child.children
                        .map((c) => ("value" in c && typeof c.value === "string" ? c.value : ""))
                        .join("")
                        .trim()
                    : ""
                return Boolean(href && getVideoEmbedInfo(href) && (isNotionMediaLinkLabel(label) || label === href))
              }
              return false
            })

            const Component = hasBlockMedia ? "div" : "p"
            return <Component className="mb-6 leading-relaxed text-foreground">{children}</Component>
          },
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto mb-6">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="mb-6 pl-4 space-y-2 text-foreground list-disc list-outside block">{children}</ul>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
