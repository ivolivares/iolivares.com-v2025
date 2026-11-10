"use client"

import { Calendar, Check, Code2, FileText, FolderCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePostHog } from "posthog-js/react"
import { type ReactNode, useEffect, useState } from "react"
import { Email } from "@/components/email"
import { LogosCarousel } from "@/components/logos-carousel"
import { ServicesLeadForm } from "@/components/services-lead-form"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"
import { type PackageId, type PackageQuote } from "@/lib/service-inquiry-contract"
import { readPricingUnlock } from "@/lib/service-pricing-memory"

const STEP_IDS = [
  { icon: Calendar, id: "call" },
  { icon: FileText, id: "proposal" },
  { icon: Code2, id: "build" },
  { icon: FolderCheck, id: "handoff" },
] as const
const FAQ_IDS = ["payment", "remote", "stack", "ownership", "start"] as const

const RECOMMENDATIONS = [
  {
    href: "https://www.linkedin.com/in/diego-mazzitelli",
    id: "diego",
    photo: "/recommendations/diego-mazzitelli.jpg",
  },
  {
    href: "https://www.linkedin.com/in/alex-otero-2b559634",
    id: "alex",
    photo: null,
  },
] as const

const PUBLIC_BRANDS = [
  { icon: "/logos/latam.png", name: "LATAM Airlines" },
  { icon: "/logos/british-airways.png", name: "British Airways" },
  { icon: "/logos/warner-bros.png", name: "Warner Bros. Discovery" },
  { icon: "/logos/hbo-max.png", name: "HBO Max" },
  { icon: "/logos/cnn.png", name: "CNN" },
  { icon: "/logos/comcast.png", name: "Comcast" },
  { icon: "/logos/globant.png", name: "Globant" },
  { icon: "/logos/neverland.png", name: "Estudios Neverland" },
] as const

const pressable =
  "touch-manipulation select-none active:scale-[0.98] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]"
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

export function ServicesPage() {
  const sectionRef = useScrollReveal()
  const { isLoading, language, t } = useTranslation()
  const posthog = usePostHog()
  const [quotes, setQuotes] = useState<PackageQuote[] | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [savedInterest, setSavedInterest] = useState<PackageId | null>(null)
  const [resumeInterest, setResumeInterest] = useState<PackageId | null>(null)
  const [logosPaused, setLogosPaused] = useState(false)
  const [logoColumns, setLogoColumns] = useState(4)

  useEffect(() => {
    setSavedInterest(readPricingUnlock()?.interest ?? null)
  }, [])

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)")
    const apply = () => setLogoColumns(query.matches ? 2 : 4)
    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (isLoading) return
    const title = asText(t("services.metaTitle"))
    if (title && title !== "services.metaTitle") {
      document.title = `${title} - ${siteConfig.name}`
    }
    const description = asText(t("services.metaDescription"))
    if (!description || description === "services.metaDescription") return
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute("content", description)
  }, [isLoading, t])

  const calendly = httpUrl(asText(t("services.calendlyUrl")))
  const projects = publicProjects(t)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="page-content scroll-reveal mx-auto max-w-5xl px-1 pt-12 pb-8 sm:px-4 sm:pt-20">
        <header>
          <p className="text-sm text-muted-foreground">{t("services.servicesTitle")}</p>
          <h1 className="mt-3 max-w-[18ch] text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-6xl sm:leading-[0.98]">
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
                <span className="inline-flex size-8 items-center justify-center rounded-md border border-border">
                  <Icon className="size-4 text-foreground" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <p className="mt-3 font-medium">{copy.title}</p>
                {copy.body ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy.body}</p> : null}
              </li>
            )
          })}
        </ol>

        <section className="mt-10 overflow-hidden rounded-2xl border border-border" aria-labelledby="services-offer">
          <div className="grid items-center gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_auto] lg:px-10">
            <div>
              <p id="services-offer" className="text-sm text-muted-foreground">
                {t("services.packages.agent.title")}
              </p>
              <p className="mt-2 text-balance text-3xl font-medium tracking-[-0.03em] sm:text-5xl">
                {quotes?.find((item) => item.id === "agent")?.price ?? t("services.packages.agent.timeline")}
              </p>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
                {quotes ? t("services.packages.agent.timeline") : t("services.priceLocked")}
              </p>
              <Button
                type="button"
                onClick={() => {
                  if (savedInterest) {
                    posthog?.capture("services_pricing_revisit", {
                      locale: language === "es" ? "es" : "en",
                      package: savedInterest,
                    })
                    setResumeInterest(savedInterest)
                  } else {
                    setResumeInterest(null)
                  }
                  setFormOpen(true)
                }}
                className={`mt-6 h-auto min-h-11 whitespace-normal rounded-full px-5 py-2.5 text-center ${pressable}`}
              >
                {savedInterest ? t("services.form.seePrices") : t("services.form.open")}
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
          <div className="flex min-w-0 items-center gap-2 border-t border-border px-3 py-2 sm:gap-3 sm:px-6">
            <LogosCarousel
              className="h-12 min-w-0 flex-1 text-foreground"
              columnCount={logoColumns}
              label={asText(t("services.logosLabel"))}
              paused={logosPaused}
            >
              {PUBLIC_BRANDS.map((brand) => (
                <span
                  aria-label={brand.name}
                  className="block h-7 w-[86%] bg-current"
                  key={brand.name}
                  role="img"
                  style={{
                    maskImage: `url("${brand.icon}")`,
                    maskMode: "alpha",
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskImage: `url("${brand.icon}")`,
                  }}
                />
              ))}
            </LogosCarousel>
            <button
              aria-label={asText(logosPaused ? t("services.motion.playLabel") : t("services.motion.pauseLabel"))}
              aria-pressed={logosPaused}
              className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center px-2 text-xs text-muted-foreground ${pressable} ${focusRing}`}
              onClick={() => setLogosPaused((value) => !value)}
              type="button"
            >
              {logosPaused ? t("services.motion.play") : t("services.motion.pause")}
            </button>
          </div>
        </section>

        <section
          className="mx-auto mt-16 max-w-[46rem] text-center"
          aria-label={asText(t("services.recommendationsLabel"))}
        >
          {RECOMMENDATIONS.map((item) => (
            <figure key={item.id} className="mt-14 first:mt-0">
              <p className="text-sm text-muted-foreground">{t(`services.recommendations.${item.id}.context`)}</p>
              <blockquote className="mt-4 text-balance text-lg leading-relaxed wrap-break-word italic sm:text-xl">
                {t(`services.recommendations.${item.id}.quote`)}
              </blockquote>
              {item.photo ? (
                <Image
                  alt=""
                  className="mx-auto mt-6 size-16 rounded-full object-cover"
                  height={64}
                  src={item.photo}
                  width={64}
                />
              ) : null}
              <figcaption className="mt-3">
                <a
                  className="font-medium underline decoration-foreground/30 underline-offset-4"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t(`services.recommendations.${item.id}.name`)}
                </a>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                  {t(`services.recommendations.${item.id}.role`)}
                </p>
              </figcaption>
            </figure>
          ))}
        </section>

        <section className="mt-16" aria-labelledby="services-also">
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
                  <p className="text-balance text-sm text-muted-foreground sm:max-w-[28ch] sm:text-right">
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

        <ServicesLeadForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false)
            setSavedInterest(readPricingUnlock()?.interest ?? null)
          }}
          onQuotes={setQuotes}
          resumeInterest={resumeInterest}
        />

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
                <AccordionTrigger className="min-h-11 text-left text-base font-normal wrap-break-word">
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
