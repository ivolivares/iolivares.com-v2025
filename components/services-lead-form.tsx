"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useTranslation } from "@/hooks/use-translation"
import { allowsTestTurnstile, TURNSTILE_TEST_SITE_KEY } from "@/lib/service-challenge"
import { isInquiryFailure, isInquirySuccess, type PackageId, type PackageQuote } from "@/lib/service-inquiry-contract"

const STEPS = ["package", "need", "about", "email", "code", "prices"] as const
type Step = (typeof STEPS)[number]

const pressable =
  "touch-manipulation select-none active:scale-[0.98] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]"

type TurnstileApi = {
  remove: (id: string) => void
  render: (element: HTMLElement, options: { callback: (token: string) => void; sitekey: string }) => string
}

export function ServicesLeadForm({
  onClose,
  onQuotes,
  open,
}: {
  onClose: () => void
  onQuotes: (quotes: PackageQuote[]) => void
  open: boolean
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
  const [code, setCode] = useState("")
  const [devCode, setDevCode] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [quotes, setQuotes] = useState<PackageQuote[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

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
    let cancelled = false
    const mount = () => {
      const api = (window as Window & { turnstile?: TurnstileApi }).turnstile
      const key = siteKey()
      if (!widget.current || !api || cancelled || !key) return
      if (widgetId.current) api.remove(widgetId.current)
      widgetId.current = api.render(widget.current, {
        callback: (token) => setTurnstileToken(token),
        sitekey: key,
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
  }, [open, step])

  if (!open) return null

  const index = STEPS.indexOf(step)

  function go(next: Step) {
    setError(null)
    setStep(next)
  }

  async function sendCode() {
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/services/inquiry", {
        body: JSON.stringify({ email, intent: "send-code", locale: language, turnstileToken }),
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        method: "POST",
      })
      const payload = (await response.json()) as { devCode?: string; error?: string; ok?: boolean }
      if (!response.ok || !payload.ok) {
        setError(errorText(payload.error, t))
        return
      }
      setDevCode(payload.devCode ?? "")
      go("code")
    } catch {
      setError(asText(t("services.form.errors.network")))
    } finally {
      setSubmitting(false)
    }
  }

  async function verify() {
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/services/inquiry", {
        body: JSON.stringify({
          code,
          company,
          company_website: "",
          email,
          intent: "verify",
          interest,
          locale: language,
          name,
          need,
          sourcePath: window.location.pathname,
          sourceReferrer: document.referrer,
          sourceSearch: window.location.search,
          startedAt: startedAt.current,
        }),
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        method: "POST",
      })
      const payload: unknown = await response.json()
      if (isInquirySuccess(payload) && payload.packages.length > 0) {
        setQuotes(payload.packages)
        onQuotes(payload.packages)
        go("prices")
        return
      }
      if (isInquiryFailure(payload)) {
        setError(errorText(payload.error, t))
        return
      }
      const record = payload as { error?: string }
      setError(errorText(record.error, t))
    } catch {
      setError(asText(t("services.form.errors.network")))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] bg-background text-foreground" role="dialog" aria-modal="true">
      <div className="grid h-full md:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-border p-6 md:block">
          <p className="text-sm text-muted-foreground">{t("services.funnel.minutes")}</p>
          <ol className="mt-6 space-y-3">
            {STEPS.map((item, itemIndex) => {
              const cleared = itemIndex < index
              const current = item === step
              return (
                <li key={item} className={current ? "font-medium" : "text-muted-foreground"}>
                  <span className="mr-2 inline-block w-4">{cleared ? "✓" : itemIndex + 1}</span>
                  {t(`services.funnel.steps.${item}`)}
                </li>
              )
            })}
          </ol>
        </aside>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="text-sm text-muted-foreground">
              {index + 1} / {STEPS.length}
            </p>
            <button type="button" onClick={onClose} className={`text-sm ${pressable}`}>
              {t("services.funnel.close")}
            </button>
          </div>
          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 pb-16 sm:px-8">
            {step === "package" ? (
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
                      className={`block w-full rounded-xl border border-border px-4 py-4 text-left ${pressable} hover:bg-muted`}
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
            {step === "need" ? (
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
            {step === "about" ? (
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
            {step === "email" ? (
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
                <div ref={widget} className="mt-4 min-h-16" />
                {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
                <Button
                  type="button"
                  onClick={sendCode}
                  disabled={submitting || !turnstileToken || !email.includes("@")}
                  className={`mt-4 h-11 ${pressable}`}
                >
                  {submitting ? t("services.form.submitting") : t("services.funnel.sendCode")}
                </Button>
              </StepFrame>
            ) : null}
            {step === "code" ? (
              <StepFrame title={t("services.funnel.otpQuestion")} hint={t("services.funnel.otpHint", { email })}>
                <Input
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  className="h-14 text-center text-2xl tracking-[0.3em] md:text-2xl"
                />
                {devCode ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t("services.funnel.devCode", { code: devCode })}
                  </p>
                ) : null}
                {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
                <Button
                  type="button"
                  onClick={verify}
                  disabled={submitting || code.length !== 6}
                  className={`mt-4 h-11 ${pressable}`}
                >
                  {submitting ? t("services.form.submitting") : t("services.form.submit")}
                </Button>
              </StepFrame>
            ) : null}
            {step === "prices" && quotes ? (
              <StepFrame title={t("services.form.successTitle")} hint={t("services.form.successBody")}>
                <p className="text-sm font-medium text-emerald-600">{t("services.funnel.cleared")}</p>
                <ul className="mt-4 divide-y divide-border">
                  {quotes.map((quote) => (
                    <li key={quote.id} className="py-4">
                      <p className="font-medium">{quote.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{quote.timeline}</p>
                      <p className="mt-2">{quote.price}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("services.priceReference")}</p>
              </StepFrame>
            ) : null}
            {index > 0 && step !== "prices" ? (
              <button type="button" onClick={() => go(STEPS[index - 1])} className="mt-6 text-sm text-muted-foreground">
                {t("services.funnel.back")}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
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
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  if (typeof window !== "undefined" && allowsTestTurnstile(window.location.hostname)) return TURNSTILE_TEST_SITE_KEY
  return ""
}

function errorText(code: string | undefined, t: (key: string) => ReactNode) {
  switch (code) {
    case "email_unavailable":
      return asText(t("services.form.errors.emailUnavailable"))
    case "invalid_code":
      return asText(t("services.form.errors.invalidCode"))
    case "invalid_email":
      return asText(t("services.form.errors.invalidEmail"))
    case "rate_limited":
      return asText(t("services.form.errors.rateLimited"))
    case "turnstile":
      return asText(t("services.form.errors.turnstile"))
    default:
      return asText(t("services.form.errors.invalidBody"))
  }
}

function asText(value: ReactNode): string {
  return typeof value === "string" ? value : ""
}
