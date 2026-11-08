"use client"

import { Calendar, Check, Code2, FileText, FolderCheck } from "lucide-react"
import Link from "next/link"
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"
import {
  type InquiryErrorCode,
  isInquiryFailure,
  isInquirySuccess,
  type PackageQuote,
} from "@/lib/service-inquiry-contract"

const TALK_NAMES = ["Next.js Conf", "WebConf LATAM", "Reliable Web Summit"] as const

const STEP_IDS = [
  { icon: Calendar, id: "call" },
  { icon: FileText, id: "proposal" },
  { icon: Code2, id: "build" },
  { icon: FolderCheck, id: "handoff" },
] as const
const FAQ_IDS = ["payment", "remote", "stack", "ownership", "start"] as const

const pressable =
  "touch-manipulation select-none active:scale-[0.98] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]"

export function ServicesPage() {
  const sectionRef = useScrollReveal()
  const { isLoading, t } = useTranslation()
  const [quotes, setQuotes] = useState<PackageQuote[] | null>(null)

  useEffect(() => {
    if (isLoading) return
    const title = asText(t("services.metaTitle"))
    if (!title || title === "services.metaTitle") return
    document.title = `${title} - ${siteConfig.name}`
  }, [isLoading, t])

  const email = asText(t("services.email"))
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

        <section
          className="mt-10 rounded-2xl bg-muted/70 px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
          aria-labelledby="services-offer"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)_auto]">
            <div>
              <p id="services-offer" className="text-sm text-muted-foreground">
                {t("services.startingAt")}
              </p>
              <p className="mt-2 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">{t("services.startingPrice")}</p>
              <p className="mt-3 max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
                {t("services.startingNote")}
              </p>
              <Button asChild className={`mt-6 h-11 rounded-full px-5 ${pressable}`}>
                <a href="#pricing">{t("services.panelCta")}</a>
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
        </section>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {TALK_NAMES.map((name) => (
            <li key={name}>
              <Link href="/talks" className="hover:text-foreground">
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <InquiryForm quotes={quotes} onQuotes={setQuotes} />

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
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {email.includes("@") ? (
              <a href={mailtoHref(email, asText(t("services.emailSubject")))} className="underline underline-offset-4">
                {email}
              </a>
            ) : null}
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

function InquiryForm({
  quotes,
  onQuotes,
}: {
  quotes: PackageQuote[] | null
  onQuotes: (quotes: PackageQuote[]) => void
}) {
  const formRef = useRef<HTMLElement>(null)
  const startedAt = useRef(0)
  const { language, t } = useTranslation()
  const [error, setError] = useState<string | null>(null)
  const [received, setReceived] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)

    const form = new FormData(event.currentTarget)
    try {
      const response = await fetch("/api/services/inquiry", {
        body: JSON.stringify({
          company: String(form.get("company") ?? ""),
          company_website: String(form.get("company_website") ?? ""),
          email: String(form.get("email") ?? ""),
          locale: language,
          name: String(form.get("name") ?? ""),
          need: String(form.get("need") ?? ""),
          sourcePath: window.location.pathname,
          sourceReferrer: document.referrer,
          sourceSearch: window.location.search,
          startedAt: startedAt.current,
        }),
        cache: "no-store",
        headers: { "content-type": "application/json" },
        method: "POST",
      })
      const payload: unknown = await response.json()
      if (isInquirySuccess(payload) && payload.packages.length > 0) {
        onQuotes(payload.packages)
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
      if (isInquirySuccess(payload)) {
        setReceived(true)
        return
      }
      if (isInquiryFailure(payload)) {
        setError(messageFor(payload.error, t))
        return
      }
      setError(asText(t("services.form.errors.network")))
    } catch {
      setError(asText(t("services.form.errors.network")))
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = "h-11 text-base md:text-base"

  return (
    <section
      id="pricing"
      ref={formRef}
      className="mt-16 scroll-mt-28 rounded-2xl border border-border bg-muted/40 p-5 sm:p-6"
    >
      {quotes && quotes.length > 0 ? (
        <div>
          <h2 className="text-2xl font-medium tracking-[-0.02em]">{t("services.form.successTitle")}</h2>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            {t("services.form.successBody")}
          </p>
          <ul className="mt-4 divide-y divide-border">
            {quotes.map((quote) => (
              <li key={quote.id} className="grid gap-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                <div className="min-w-0">
                  <p className="font-medium">{quote.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{quote.timeline}</p>
                </div>
                <p className="text-sm sm:text-right">{quote.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : received ? (
        <p className="text-lg">{t("services.form.received")}</p>
      ) : (
        <form className="relative" onSubmit={onSubmit}>
          <div className="max-w-[62ch]">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">{t("services.form.title")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("services.form.body")}</p>
          </div>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company_website">{t("services.form.honeypot")}</label>
            <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="services-email">{t("services.form.email")}</Label>
              <Input
                id="services-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className={fieldClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="services-name">{t("services.form.name")}</Label>
                <Input id="services-name" name="name" autoComplete="name" maxLength={120} className={fieldClass} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services-company">{t("services.form.company")}</Label>
                <Input
                  id="services-company"
                  name="company"
                  autoComplete="organization"
                  maxLength={160}
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="services-need">{t("services.form.need")}</Label>
              <Textarea id="services-need" name="need" rows={4} maxLength={2000} className="text-base md:text-base" />
            </div>
          </div>
          {error ? (
            <p id="services-form-error" role="alert" className="mt-4 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              type="submit"
              disabled={submitting}
              aria-describedby={error ? "services-form-error" : undefined}
              className={`h-11 px-5 ${pressable}`}
            >
              {submitting ? t("services.form.submitting") : t("services.form.submit")}
            </Button>
            <p className="text-sm text-muted-foreground">{t("services.form.privacy")}</p>
          </div>
        </form>
      )}
    </section>
  )
}

function splitStep(value: string): { body: string; title: string } {
  const index = value.indexOf(": ")
  if (index === -1) return { body: "", title: value }
  return { body: value.slice(index + 2), title: value.slice(0, index) }
}

function messageFor(code: InquiryErrorCode, t: (key: string) => ReactNode): string {
  switch (code) {
    case "invalid_body":
      return asText(t("services.form.errors.invalidBody"))
    case "invalid_company":
      return asText(t("services.form.errors.invalidCompany"))
    case "invalid_email":
      return asText(t("services.form.errors.invalidEmail"))
    case "invalid_name":
      return asText(t("services.form.errors.invalidName"))
    case "invalid_need":
      return asText(t("services.form.errors.invalidNeed"))
    case "origin":
      return asText(t("services.form.errors.origin"))
    case "rate_limited":
      return asText(t("services.form.errors.rateLimited"))
    case "too_fast":
      return asText(t("services.form.errors.tooFast"))
    default: {
      const exhaustive: never = code
      return exhaustive
    }
  }
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

function mailtoHref(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject || "Services")}`
}

function asText(value: ReactNode): string {
  return typeof value === "string" ? value : ""
}
