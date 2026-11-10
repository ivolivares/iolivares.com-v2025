"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ServicesPriceClose } from "@/components/services-price-close"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/hooks/use-translation"
import { isLocalHost, TURNSTILE_SITE_KEY, TURNSTILE_TEST_SITE_KEY } from "@/lib/service-challenge"
import {
  type InquiryErrorCode,
  isInquiryFailure,
  isInquirySuccess,
  type PackageId,
  type PackageQuote,
} from "@/lib/service-inquiry-contract"
import { rememberPricingUnlock } from "@/lib/service-pricing-memory"
import { packageQuotes } from "@/lib/service-quotes"

const STEPS = ["package", "need", "about", "email", "prices"] as const
type Step = (typeof STEPS)[number]

const pressable =
  "touch-manipulation select-none active:scale-[0.98] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]"
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

type TurnstileApi = {
  remove: (id: string) => void
  render: (
    element: HTMLElement,
    options: {
      callback: (token: string) => void
      "error-callback": () => void
      "expired-callback": () => void
      language: string
      sitekey: string
      size: "flexible"
    }
  ) => string
}

export function ServicesLeadForm({
  onClose,
  onQuotes,
  open,
  resumeInterest = null,
}: {
  onClose: () => void
  onQuotes: (quotes: PackageQuote[]) => void
  open: boolean
  resumeInterest?: PackageId | null
}) {
  const { language, t } = useTranslation()
  const startedAt = useRef(0)
  const widget = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const [step, setStep] = useState<Step>("package")
  const [interest, setInterest] = useState<PackageId>("agent")
  const [need, setNeed] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [widgetEpoch, setWidgetEpoch] = useState(0)
  const [quotes, setQuotes] = useState<PackageQuote[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open || !resumeInterest) return
    onQuotes(packageQuotes(language === "es" ? "es" : "en"))
  }, [language, onQuotes, open, resumeInterest])

  useEffect(() => {
    if (!open) return
    startedAt.current = Date.now()
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open || step !== "email") return
    if (widget.current) widget.current.dataset.epoch = String(widgetEpoch)
    setTurnstileToken("")
    let cancelled = false
    const mount = () => {
      const api = (window as Window & { turnstile?: TurnstileApi }).turnstile
      const key = siteKey()
      if (!widget.current || !api || cancelled || !key) return
      if (widgetId.current) api.remove(widgetId.current)
      widgetId.current = api.render(widget.current, {
        callback: (token) => setTurnstileToken(token),
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
        language,
        sitekey: key,
        size: "flexible",
      })
    }
    if ((window as Window & { turnstile?: TurnstileApi }).turnstile) {
      mount()
    } else {
      const script = document.createElement("script")
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      script.async = true
      script.onload = mount
      document.body.appendChild(script)
    }
    return () => {
      cancelled = true
    }
  }, [language, open, step, widgetEpoch])

  if (!open || !mounted) return null

  const resumedQuotes = resumeInterest ? packageQuotes(language === "es" ? "es" : "en") : null
  const viewStep: Step = resumedQuotes ? "prices" : step
  const viewQuotes = resumedQuotes ?? quotes
  const viewInterest = resumeInterest ?? interest
  const index = STEPS.indexOf(viewStep)

  function go(next: Step) {
    setError(null)
    setStep(next)
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/services/inquiry", {
        body: JSON.stringify({
          company,
          company_website: "",
          email,
          interest,
          locale: language,
          name,
          need,
          sourcePath: window.location.pathname,
          sourceReferrer: document.referrer,
          sourceSearch: window.location.search,
          startedAt: startedAt.current,
          turnstileToken,
        }),
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        method: "POST",
      })
      const payload: unknown = await response.json()
      if (isInquirySuccess(payload) && payload.packages.length > 0) {
        rememberPricingUnlock(interest)
        setQuotes(payload.packages)
        onQuotes(payload.packages)
        go("prices")
        return
      }
      setWidgetEpoch((value) => value + 1)
      if (isInquiryFailure(payload)) {
        setError(errorText(payload.error, t))
        return
      }
      const record = payload as { error?: unknown }
      setError(errorText(record.error === "turnstile" ? "turnstile" : undefined, t))
    } catch {
      setWidgetEpoch((value) => value + 1)
      setError(asText(t("services.form.errors.network")))
    } finally {
      setSubmitting(false)
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] h-dvh overflow-y-auto bg-background text-foreground"
      role="dialog"
      aria-modal="true"
      aria-label={asText(t("services.funnel.label"))}
    >
      <div className="grid min-h-full md:h-full md:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-border p-6 md:block">
          <p className="text-sm text-muted-foreground">{t("services.funnel.minutes")}</p>
          <ol className="mt-6 space-y-3">
            {STEPS.map((item, itemIndex) => {
              const cleared = itemIndex < index
              const current = item === viewStep
              return (
                <li key={item} className={current ? "font-medium" : "text-muted-foreground"}>
                  <span className="mr-2 inline-block w-4">{cleared ? "✓" : itemIndex + 1}</span>
                  {t(`services.funnel.steps.${item}`)}
                </li>
              )
            })}
          </ol>
        </aside>
        <div className="flex min-h-full min-w-0 flex-col">
          <div className="flex items-center justify-between px-4 py-2 sm:px-8">
            <p className="text-sm text-muted-foreground">
              {index + 1} / {STEPS.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              className={`inline-flex min-h-11 items-center px-2 text-sm ${pressable} ${focusRing}`}
            >
              {t("services.funnel.close")}
            </button>
          </div>
          <div className="mx-auto flex w-full min-w-0 max-w-xl flex-1 flex-col justify-center px-4 py-6 pb-16 sm:px-8">
            {viewStep === "package" ? (
              <StepFrame title={t("services.funnel.packageQuestion")} hint={t("services.funnel.packageHint")}>
                <div className="space-y-3">
                  {(["agent", "mvp", "advisory"] as const).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setInterest(id)
                        go("need")
                      }}
                      className={`block w-full min-h-11 rounded-xl border border-border px-4 py-4 text-left wrap-break-word ${pressable} ${focusRing} hover:bg-muted`}
                    >
                      <span className="font-medium">{t(`services.packages.${id}.title`)}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {t(`services.packages.${id}.timeline`)}
                      </span>
                    </button>
                  ))}
                </div>
              </StepFrame>
            ) : null}
            {viewStep === "need" ? (
              <StepFrame title={t("services.funnel.needQuestion")} hint={t("services.funnel.needHint")}>
                <Textarea
                  value={need}
                  onChange={(event) => setNeed(event.target.value)}
                  rows={5}
                  maxLength={2000}
                  className="text-base md:text-base"
                />
                <Button type="button" onClick={() => go("about")} className={`mt-4 h-11 ${pressable}`}>
                  {t("services.funnel.continue")}
                </Button>
              </StepFrame>
            ) : null}
            {viewStep === "about" ? (
              <StepFrame title={t("services.funnel.aboutQuestion")}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lead-name">{t("services.form.name")}</Label>
                    <Input
                      id="lead-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                      required
                      maxLength={120}
                      className="h-11 text-base md:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-company">{t("services.form.company")}</Label>
                    <Input
                      id="lead-company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      autoComplete="organization"
                      required
                      maxLength={160}
                      className="h-11 text-base md:text-base"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => go("email")}
                  disabled={name.trim().length === 0 || company.trim().length === 0}
                  className={`mt-4 h-11 ${pressable}`}
                >
                  {t("services.funnel.continue")}
                </Button>
              </StepFrame>
            ) : null}
            {viewStep === "email" ? (
              <StepFrame title={t("services.funnel.emailQuestion")} hint={t("services.funnel.emailHint")}>
                <Label htmlFor="lead-email">{t("services.form.email")}</Label>
                <Input
                  id="lead-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="mt-2 h-11 text-base md:text-base"
                />
                <div ref={widget} className="mt-4 min-h-16 w-full max-w-full overflow-x-hidden [&_iframe]:max-w-full" />
                {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
                <Button
                  type="button"
                  onClick={submit}
                  disabled={submitting || !turnstileToken || !email.includes("@")}
                  className={`mt-4 h-11 ${pressable}`}
                >
                  {submitting ? t("services.form.submitting") : t("services.form.submit")}
                </Button>
              </StepFrame>
            ) : null}
            {viewStep === "prices" && viewQuotes ? (
              <StepFrame title={t("services.priceReference")} hint={t("services.form.successBody")}>
                <ServicesPriceClose
                  emailAddress={resumedQuotes ? "" : email}
                  interest={viewInterest}
                  name={resumedQuotes ? "" : name}
                  need={resumedQuotes ? "" : need}
                  quotes={viewQuotes}
                />
              </StepFrame>
            ) : null}
            {index > 0 && viewStep !== "prices" ? (
              <button
                type="button"
                onClick={() => go(STEPS[index - 1])}
                className={`mt-6 inline-flex min-h-11 items-center text-sm text-muted-foreground ${focusRing}`}
              >
                {t("services.funnel.back")}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function StepFrame({ children, hint, title }: { children: ReactNode; hint?: ReactNode; title: ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-[-0.03em] text-balance sm:text-4xl">{title}</h2>
      {hint ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hint}</p> : null}
      <div className="mt-8">{children}</div>
    </div>
  )
}

function siteKey() {
  if (
    typeof window !== "undefined" &&
    isLocalHost(window.location.hostname) &&
    !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  ) {
    return TURNSTILE_TEST_SITE_KEY
  }
  return TURNSTILE_SITE_KEY
}

function errorText(code: InquiryErrorCode | "turnstile" | undefined, t: (key: string) => ReactNode) {
  switch (code) {
    case "invalid_body":
    case undefined:
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
    case "turnstile":
      return asText(t("services.form.errors.turnstile"))
    default: {
      const exhaustive: never = code
      return exhaustive
    }
  }
}

function asText(value: ReactNode): string {
  return typeof value === "string" ? value : ""
}
