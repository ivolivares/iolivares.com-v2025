"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
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
        components={{
          // Custom heading styles
          h1: ({ children }) => <h1 className="text-3xl font-light mb-6 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-light mb-4 mt-8 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-medium mb-3 mt-6 text-foreground">{children}</h3>,
          // Custom paragraph styles
          p: ({ children }) => <p className="mb-6 leading-relaxed text-foreground">{children}</p>,
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
          // Custom list styles
          ul: ({ children }) => <ul className="mb-6 space-y-2 text-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="mb-6 space-y-2 text-foreground">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
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
          // Custom pre styles for code blocks
          pre: ({ children }) => (
            <pre className="bg-muted p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto mb-6">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
