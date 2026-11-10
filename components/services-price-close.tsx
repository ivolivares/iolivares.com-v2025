"use client"

import { usePostHog } from "posthog-js/react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { email } from "@/lib/email"
import type { InquiryLocale, PackageId, PackageQuote } from "@/lib/service-inquiry-contract"
import { pricingBookingUrl, pricingMailto } from "@/lib/service-pricing-links"

const pressable =
  "touch-manipulation select-none active:scale-[0.98] motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)]"

const ownerEmail = email.split("").reverse().join("")

export function ServicesPriceClose({
  emailAddress,
  interest,
  name,
  need,
  quotes,
}: {
  emailAddress: string
  interest: PackageId
  name: string
  need: string
  quotes: PackageQuote[]
}) {
  const { language, t } = useTranslation()
  const posthog = usePostHog()
  const locale: InquiryLocale = language === "es" ? "es" : "en"
  const selected = quotes.find((quote) => quote.id === interest) ?? quotes[0]
  const packageName = selected?.name ?? ""
  const booking = pricingBookingUrl({
    email: emailAddress,
    name,
    need,
    packageName,
  })
  const mailto = pricingMailto({
    locale,
    name,
    ownerEmail,
    packageName,
  })

  function track(event: "services_pricing_book" | "services_pricing_email") {
    posthog?.capture(event, { locale, package: interest })
  }

  return (
    <>
      <ul className="mt-4 divide-y divide-border">
        {quotes.map((quote) => (
          <li key={quote.id} className="py-4">
            <p className="font-medium text-balance wrap-break-word">{quote.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{quote.timeline}</p>
            <p className="mt-2 text-balance">{quote.price}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-balance text-base leading-relaxed">{t("services.funnel.settle")}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button asChild className={`h-auto min-h-11 w-full whitespace-normal px-5 py-2.5 sm:flex-1 ${pressable}`}>
          <a href={booking} onClick={() => track("services_pricing_book")} rel="noopener noreferrer" target="_blank">
            {t("services.funnel.book")}
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className={`h-auto min-h-11 w-full whitespace-normal px-5 py-2.5 sm:flex-1 ${pressable}`}
        >
          <a href={mailto} onClick={() => track("services_pricing_email")}>
            {t("services.funnel.write")}
          </a>
        </Button>
      </div>
    </>
  )
}
