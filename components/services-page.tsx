"use client"

import { Calendar, Check, Code2, FileText, FolderCheck } from "lucide-react"
import Link from "next/link"
import { type ReactNode, useEffect, useState } from "react"
import { LogoMarquee, type LogoMarqueeBrand } from "@/components/arc/blocks/logo-marquee/logo-marquee"
import { Email } from "@/components/email"
import { ServicesLeadForm } from "@/components/services-lead-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"
import { type PackageQuote } from "@/lib/service-inquiry-contract"

const STEP_IDS = [
  { icon: Calendar, id: "call" },
  { icon: FileText, id: "proposal" },
  { icon: Code2, id: "build" },
  { icon: FolderCheck, id: "handoff" },
] as const
const FAQ_IDS = ["payment", "remote", "stack", "ownership", "start"] as const

const PUBLIC_BRANDS: LogoMarqueeBrand[] = [
  { icon: "/logos/latam.svg", name: "LATAM Airlines", wide: true },
  { icon: "/logos/british-airways.svg", name: "British Airways" },
  { icon: "/logos/warner-bros.svg", name: "Warner Bros. Discovery" },
  { icon: "/logos/hbo-max.svg", name: "HBO Max" },
  { icon: "/logos/cnn.svg", name: "CNN" },
  { icon: "/logos/comcast.svg", name: "Comcast", wide: true },
  { icon: "/logos/globant.svg", name: "Globant", wide: true },
]

const pressable =
  "touch-manipulation select-none active:scale-[0.98] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]"

export function ServicesPage() {
  const sectionRef = useScrollReveal()
  const { isLoading, t } = useTranslation()
  const [quotes, setQuotes] = useState<PackageQuote[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    if (isLoading) return
    const title = asText(t("services.metaTitle"))
    if (!title || title === "services.metaTitle") return
    document.title = `${title} - ${siteConfig.name}`
  }, [isLoading, t])

  const calendly = httpUrl(asText(t("services.calendlyUrl")))
  const projects = publicProjects(t)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="page-content scroll-reveal mx-auto max-w-5xl px-1 pt-12 pb-8 sm:px-4 sm:pt-20">
        <header>
          <p className="text-sm text-muted-foreground">{t("services.servicesTitle")}</p>
          <h1 className="mt-3 max-w-[18ch] text-4xl font-medium leading-[0.98] tracking-[-0.03em] sm:text-6xl">
            {t("services.heroTitle")}
          </h1>
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("services.heroBody")}
          </p>
        </header>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEP_IDS.map((step) => {
            const copy = splitStep(asText(t(`services.steps.${step.id}`)))
            const Icon = step.icon
            return (
              <li key={step.id} className="max-w-[28ch]">
                <Icon className="size-4 text-foreground" aria-hidden="true" strokeWidth={1.75} />
                <p className="mt-3 font-medium">{copy.title}</p>
                {copy.body ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy.body}</p> : null}
              </li>
            )
          })}
        </ol>

        <div className="mt-10">
          <LogoMarquee
            brands={PUBLIC_BRANDS}
            description={asText(t("services.logosBody"))}
            labels={{
              logos: asText(t("services.logosLabel")),
              pause: asText(t("services.motion.pause")),
              paused: asText(t("services.motion.paused")),
              pauseLabel: asText(t("services.motion.pauseLabel")),
              play: asText(t("services.motion.play")),
              playLabel: asText(t("services.motion.playLabel")),
            }}
            title={asText(t("services.logosTitle"))}
            tone="mono"
          />
        </div>

        <section
          className="mt-10 rounded-2xl bg-muted/70 px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
          aria-labelledby="services-offer"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_auto]">
            <div>
              <p id="services-offer" className="text-sm text-muted-foreground">
                {t("services.packages.agent.title")}
              </p>
              <p className="mt-2 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
                {quotes?.find((item) => item.id === "agent")?.price ?? t("services.packages.agent.timeline")}
              </p>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
                {quotes ? t("services.packages.agent.timeline") : t("services.priceLocked")}
              </p>
              <Button
                type="button"
                onClick={() => setFormOpen(true)}
                className={`mt-6 h-11 rounded-full px-5 ${pressable}`}
              >
                {t("services.form.open")}
              </Button>
            </div>
            <ul className="space-y-3">
              {agentIncludes(t).map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" strokeWidth={1.75} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Availability label={asText(t("services.availableNow"))} />
          </div>
        </section>

        <section className="mt-8" aria-labelledby="services-also">
          <h2 id="services-also" className="text-sm text-muted-foreground">
            {t("services.alsoTitle")}
          </h2>
          <ul className="mt-2 divide-y divide-border border-y border-border">
            {(["mvp", "advisory"] as const).map((id) => {
              const quote = quotes?.find((item) => item.id === id)
              return (
                <li key={id} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-8">
                  <div className="min-w-0">
                    <p className="font-medium">{t(`services.packages.${id}.title`)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t(`services.packages.${id}.audience`)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:max-w-[28ch] sm:text-right">
                    {quote ? quote.price : t(`services.packages.${id}.timeline`)}
                  </p>
                </li>
              )
            })}
          </ul>
          {quotes ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("services.priceReference")}</p>
          ) : null}
        </section>

        <section className="mt-10 max-w-[65ch]" aria-labelledby="services-talks">
          <h2 id="services-talks" className="text-lg font-medium">
            {t("services.talksTitle")}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("services.talksBody")}</p>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/talks" className="font-medium underline decoration-foreground/30 underline-offset-4">
                {t("services.talks.nextTitle")}
              </Link>
              <p className="text-sm text-muted-foreground">{t("services.talks.nextWhere")}</p>
            </li>
            <li>
              <Link href="/talks" className="font-medium underline decoration-foreground/30 underline-offset-4">
                {t("services.talks.obsTitle")}
              </Link>
              <p className="text-sm text-muted-foreground">{t("services.talks.obsWhere")}</p>
            </li>
          </ul>
        </section>

        <ServicesLeadForm open={formOpen} onClose={() => setFormOpen(false)} onQuotes={setQuotes} />

        {projects.length > 0 ? (
          <section className="mt-10" aria-labelledby="services-work">
            <h2 id="services-work" className="text-lg font-medium">
              {t("services.publicWorkTitle")}
            </h2>
            <ul className="mt-2 space-y-2">
              {projects.map((project) => (
                <li key={project.url}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-foreground/30 underline-offset-4"
                  >
                    {project.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-16" aria-labelledby="services-faq">
          <h2 id="services-faq" className="text-lg font-medium">
            {t("services.faqTitle")}
          </h2>
          <Accordion type="single" collapsible className="mt-2">
            {FAQ_IDS.map((id) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger className="text-base font-normal">
                  {t(`services.faq.${id}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {t(`services.faq.${id}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mt-16 border-t border-border pt-10" aria-labelledby="services-cta">
          <h2 id="services-cta" className="max-w-[28ch] text-2xl font-medium tracking-[-0.02em] text-balance">
            {t("services.ctaTitle")}
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Email className="underline underline-offset-4" />
            {calendly ? (
              <a href={calendly} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                {t("services.bookCall")}
              </a>
            ) : null}
            <a
              href="https://www.linkedin.com/in/ivanolivaresrojas/?from=iolivares.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              linkedin.com/in/ivanolivaresrojas
            </a>
            <a
              href="https://github.com/ivolivares"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              github.com/ivolivares
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

function agentIncludes(t: (key: string) => ReactNode): string[] {
  return [1, 2, 3]
    .map((index) => asText(t(`services.packages.agent.includes${index}`)))
    .concat(asText(t("services.codeYours")))
    .filter((item) => item.length > 0 && !item.startsWith("services."))
}

function Availability({ label }: { label: string }) {
  const ticks = Array.from({ length: 42 }, (_, index) => {
    const progress = index / 41
    const angle = Math.PI * 0.82 + progress * Math.PI * 1.36
    const inner = 34
    const outer = index % 5 === 0 ? 50 : 45
    return {
      x1: 60 + Math.cos(angle) * inner,
      x2: 60 + Math.cos(angle) * outer,
      y1: 62 + Math.sin(angle) * inner,
      y2: 62 + Math.sin(angle) * outer,
    }
  })
  const dot = ticks[8]

  return (
    <div className="flex flex-col items-center justify-center">
      <svg viewBox="0 0 120 108" className="w-36 text-foreground/30 sm:w-40" aria-hidden="true">
        {ticks.map((tick) => (
          <line
            key={`${tick.x1}-${tick.y1}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        ))}
        {dot ? <circle cx={dot.x1} cy={dot.y1} r="3.2" className="fill-emerald-500" /> : null}
      </svg>
      <p className="text-xs font-medium">{label}</p>
    </div>
  )
}

function splitStep(value: string): { body: string; title: string } {
  const index = value.indexOf(": ")
  if (index === -1) return { body: "", title: value }
  return { body: value.slice(index + 2), title: value.slice(0, index) }
}

function publicProjects(t: (key: string) => ReactNode) {
  return [1, 2].flatMap((slot) => {
    const label = asText(t(`services.publicProject${slot}Label`))
    const url = httpUrl(asText(t(`services.publicProject${slot}Url`)))
    if (!url || label.startsWith("TODO") || label.length === 0) return []
    return [{ label, url }]
  })
}

function httpUrl(value: string): string | null {
  if (!value.startsWith("https://") && !value.startsWith("http://")) return null
  try {
    const url = new URL(value)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    return url.toString()
  } catch {
    return null
  }
}

function asText(value: ReactNode): string {
  return typeof value === "string" ? value : ""
}
