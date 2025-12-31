"use client"

import { useEffect, useState } from "react"
import type { TOCItem } from "@/lib/notion"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

interface TableOfContentsProps {
  toc: TOCItem[]
  className?: string
}

export function TableOfContents({ toc, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const { t } = useTranslation()

  useEffect(() => {
    // Track which heading is currently in view using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%", // Trigger when heading is near top of viewport
        threshold: 1.0,
      }
    )

    // Observe all headings
    const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()
    const element = document.getElementById(slug)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      // Update URL hash without jumping
      window.history.pushState(null, "", `#${slug}`)
      setActiveId(slug)
    }
  }

  const renderTOCItems = (items: TOCItem[], level = 0) => {
    return (
      <ul className={cn(level === 0 ? "space-y-2" : "space-y-1 mt-1", level > 0 && "ml-4 border-l border-border pl-3")}>
        {items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              onClick={(e) => handleClick(e, item.slug)}
              className={cn(
                "block text-sm transition-colors hover:text-foreground",
                activeId === item.slug ? "text-foreground font-medium" : "text-muted-foreground",
                // Different text sizes based on heading level
                item.level === 1 && "text-base font-medium",
                item.level === 2 && "text-sm",
                item.level === 3 && "text-sm",
                item.level === 4 && "text-xs",
                item.level === 5 && "text-xs",
                item.level === 6 && "text-xs"
              )}
            >
              {item.text}
            </a>
            {item.children && item.children.length > 0 && renderTOCItems(item.children, level + 1)}
          </li>
        ))}
      </ul>
    )
  }

  if (!toc || toc.length === 0) {
    return null
  }

  return (
    <nav className={cn("toc", className)} aria-label="Table of contents">
      <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
        {t("thoughts.tocTitle")}
      </h2>
      {renderTOCItems(toc)}
    </nav>
  )
}
