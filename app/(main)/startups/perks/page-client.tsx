"use client"

import { ExternalLink, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"
import { PERK_CATEGORIES, type StartupPerk } from "@/lib/notion-perks"
import { cn } from "@/lib/utils"

interface StartupsPerksClientProps {
  perks: StartupPerk[]
}

export function StartupsPerksClient({ perks }: StartupsPerksClientProps) {
  const sectionRef = useScrollReveal()
  const { t } = useTranslation()
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const categories = useMemo(() => {
    const present = new Set(perks.map((perk) => perk.category))
    return PERK_CATEGORIES.filter((category) => present.has(category))
  }, [perks])

  const filteredPerks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return perks.filter((perk) => {
      if (activeCategory !== "all" && perk.category !== activeCategory) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      return [perk.name, perk.company, perk.benefit, perk.eligibility, perk.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [activeCategory, perks, query])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main
        ref={sectionRef}
        className="max-w-4xl mx-auto px-1 sm:px-4 lg:px-16 pt-4 sm:pt-8 lg:pt-16 page-content scroll-reveal"
      >
        <header className="mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-4">{t("startupsPerks.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("startupsPerks.description")}</p>
        </header>

        <div className="mb-8 space-y-4">
          <label className="relative block">
            <span className="sr-only">{t("startupsPerks.searchLabel")}</span>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("startupsPerks.searchPlaceholder")?.toString()}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeCategory === "all"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {t("startupsPerks.allCategories")}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          {t("startupsPerks.resultsCount", { count: filteredPerks.length })}
        </p>

        {filteredPerks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border px-6 py-12 text-center">
            <p className="text-muted-foreground">{t("startupsPerks.empty")}</p>
          </div>
        ) : (
          <ul className="divide-y divide-border/60 border-y border-border/60">
            {filteredPerks.map((perk) => (
              <li key={perk.id} className="py-5 sm:py-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="text-lg font-semibold tracking-tight">{perk.name}</h2>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{perk.category}</span>
                      {perk.featured ? (
                        <span className="text-xs text-foreground/70">{t("startupsPerks.featured")}</span>
                      ) : null}
                    </div>
                    {perk.company ? <p className="text-sm text-muted-foreground">{perk.company}</p> : null}
                    {perk.benefit ? <p className="text-sm leading-relaxed">{perk.benefit}</p> : null}
                    {perk.eligibility ? (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground/80">{t("startupsPerks.eligibility")}: </span>
                        {perk.eligibility}
                      </p>
                    ) : null}
                  </div>

                  {perk.url ? (
                    <a
                      href={perk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {t("startupsPerks.apply")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
