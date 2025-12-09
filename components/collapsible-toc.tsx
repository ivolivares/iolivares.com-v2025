"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { TableOfContents } from "@/components/table-of-contents"
import type { TOCItem } from "@/lib/notion"
import { cn } from "@/lib/utils"

interface CollapsibleTOCProps {
  toc: TOCItem[]
  defaultOpen?: boolean
}

export function CollapsibleTOC({ toc, defaultOpen = false }: CollapsibleTOCProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  if (!toc || toc.length === 0) {
    return null
  }

  return (
    <div className="border border-border rounded-lg mb-8 bg-card">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors rounded-t-lg"
        aria-expanded={isOpen}
        aria-controls="mobile-toc-content"
      >
        <span className="text-sm font-semibold text-foreground uppercase tracking-wide">Table of Contents</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <div
        id="mobile-toc-content"
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 pt-2">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  )
}
