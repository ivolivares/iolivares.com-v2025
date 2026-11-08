"use client"

import Image from "next/image"
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
  PACKAGE_IDS,
  type PackageId,
  type PackageQuote,
} from "@/lib/service-inquiry-contract"

const STEP_IDS = ["call", "proposal", "build", "handoff"] as const
const FAQ_IDS = ["payment", "remote", "stack", "ownership", "start"] as const

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
      <main
        ref={sectionRef}
        className="scroll-reveal mx-auto max-w-4xl px-1 pt-8 pb-8 sm:px-4 sm:pt-16 lg:px-8 page-content"
      >
        <header className="flex items-end justify-between gap-8">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-light text-balance sm:text-5xl">{t("services.heroTitle")}</h1>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t("services.heroBody")}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <a href="#pricing">{t("services.form.jump")}</a>
              </Button>
              {calendly ? (
                <Button variant="outline" asChild>
                  <a href={calendly} target="_blank" rel="noopener noreferrer">
                    {t("services.bookCall")}
                  </a>
                </Button>
              ) : null}
              {email.includes("@") ? (
                <Button variant="outline" asChild>
                  <a href={mailtoHref(email, asText(t("services.emailSubject")))}>{email}</a>
                </Button>
              ) : null}
            </div>
          </div>
          <div className="hidden shrink-0 md:block">
            <Image
              src="/headshot-drawn.png"
              alt="Iván Olivares Rojas"
              width={160}
              height={220}
              priority
              className="h-52 w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.35)]"
            />
          </div>
        </header>

        <section className="mt-20 space-y-6" aria-labelledby="services-packages">
          <h2 id="services-packages" className="text-2xl font-light sm:text-3xl">
            {t("services.servicesTitle")}
          </h2>
          <div className="space-y-4">
            {PACKAGE_IDS.map((id, index) => (
              <PackageCard key={id} id={id} index={index} quote={quotes?.find((item) => item.id === id)} />
            ))}
          </div>
        </section>

        <InquiryForm quotes={quotes} onQuotes={setQuotes} />

        <section className="mt-20 space-y-4" aria-labelledby="services-talks">
          <h2 id="services-talks" className="text-2xl font-light sm:text-3xl">
            {t("services.talksTitle")}
          </h2>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t("services.talksBody", {
              talksLink: (
                <Link href="/talks" className="text-foreground underline decoration-foreground/30 underline-offset-4">
                  iolivares.com/talks
                </Link>
              ),
            })}
          </p>
        </section>

        {projects.length > 0 ? (
          <section className="mt-20 space-y-4" aria-labelledby="services-work">
            <h2 id="services-work" className="text-2xl font-light sm:text-3xl">
              {t("services.publicWorkTitle")}
            </h2>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.url}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-foreground/30 underline-offset-4"
                  >
                    {project.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-20 space-y-6" aria-labelledby="services-process">
          <h2 id="services-process" className="text-2xl font-light sm:text-3xl">
            {t("services.processTitle")}
          </h2>
          <ol className="space-y-5">
            {STEP_IDS.map((id, index) => (
              <li key={id} className="flex gap-4">
                <span className="font-mono text-sm text-muted-foreground">{index + 1}</span>
                <p className="leading-relaxed">{t(`services.steps.${id}`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 space-y-4" aria-labelledby="services-faq">
          <h2 id="services-faq" className="text-2xl font-light sm:text-3xl">
            {t("services.faqTitle")}
          </h2>
          <Accordion type="single" collapsible>
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

        <section className="mt-20 space-y-4 border-t border-border pt-12" aria-labelledby="services-cta">
          <h2 id="services-cta" className="text-2xl font-light text-balance sm:text-3xl">
            {t("services.ctaTitle")}
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {email.includes("@") ? (
              <a href={mailtoHref(email, asText(t("services.emailSubject")))} className="underline underline-offset-4">
                {email}
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

function PackageCard({ id, index, quote }: { id: PackageId; index: number; quote?: PackageQuote }) {
  const { t } = useTranslation()
  return (
    <article className="rounded-2xl border border-border p-6 sm:p-8">
      <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">0{index + 1}</p>
      <h3 className="mt-3 text-2xl font-light">{t(`services.packages.${id}.title`)}</h3>
      <dl className="mt-6 space-y-5">
        <Field label={asText(t("services.forWhom"))} value={t(`services.packages.${id}.audience`)} />
        <Field label={asText(t("services.includes"))} value={t(`services.packages.${id}.includes`)} />
        <Field label={asText(t("services.timeline"))} value={t(`services.packages.${id}.timeline`)} />
        {quote ? <Field label={asText(t("services.priceLabel"))} value={quote.price} /> : null}
      </dl>
    </article>
  )
}

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-relaxed text-foreground/90">{value}</dd>
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

  return (
    <section id="pricing" ref={formRef} className="mt-12 scroll-mt-28 rounded-2xl border border-border p-6 sm:p-8">
      {quotes && quotes.length > 0 ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light">{t("services.form.successTitle")}</h2>
            <p className="text-muted-foreground">{t("services.form.successBody")}</p>
          </div>
          <ul className="space-y-5">
            {quotes.map((quote) => (
              <li key={quote.id} className="border-t border-border pt-4">
                <p className="text-lg">{quote.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{quote.timeline}</p>
                <p className="mt-2">{quote.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : received ? (
        <p className="text-lg">{t("services.form.received")}</p>
      ) : (
        <form className="relative space-y-5" onSubmit={onSubmit} noValidate={false}>
          <div className="space-y-2">
            <h2 className="text-2xl font-light">{t("services.form.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("services.form.body")}</p>
          </div>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company_website">{t("services.form.honeypot")}</label>
            <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="services-email">{t("services.form.email")}</Label>
            <Input id="services-email" name="email" type="email" autoComplete="email" required maxLength={254} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="services-name">{t("services.form.name")}</Label>
              <Input id="services-name" name="name" autoComplete="name" maxLength={120} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="services-company">{t("services.form.company")}</Label>
              <Input id="services-company" name="company" autoComplete="organization" maxLength={160} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="services-need">{t("services.form.need")}</Label>
            <Textarea id="services-need" name="need" rows={4} maxLength={2000} />
          </div>
          {error ? (
            <p id="services-form-error" role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={submitting} aria-describedby={error ? "services-form-error" : undefined}>
              {submitting ? t("services.form.submitting") : t("services.form.submit")}
            </Button>
            <p className="text-sm text-muted-foreground">{t("services.form.privacy")}</p>
          </div>
        </form>
      )}
    </section>
  )
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
