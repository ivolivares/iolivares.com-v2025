"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LinkAnimated } from "@/components/link-animated"
import { useTranslation } from "@/hooks/use-translation"
import { domain, email, username } from "@/lib/email"

export function Email({
  withIcon = false,
  className,
  animated = false,
}: {
  withIcon?: boolean
  className?: string
  animated?: boolean
}) {
  const { language } = useTranslation()
  const router = useRouter()
  const handleEmailClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const link = e.currentTarget
    const name = link?.getAttribute("data-name")?.split("").reverse().join("")
    const domain = link?.getAttribute("data-domain")?.split("").reverse().join("")
    const language = link?.getAttribute("data-lang") || "en"
    const subjects = [
      { code: "en", subject: "Contact from the website iolivares.com" },
      { code: "es", subject: "Contacto desde la web iolivares.com" },
    ]
    const currentSubject = subjects.find((lang) => lang.code === language) || subjects[0]

    router.push(`mailto:${name}@${domain}?subject=${encodeURIComponent(currentSubject.subject)}`)
  }

  const LinkComponent = animated ? LinkAnimated : Link

  return (
    <LinkComponent
      className={
        className ? className : "ml-1 inline-block text-primary-400 hover:text-primary-300 tracking-wide font-bold"
      }
      data-domain={domain}
      data-name={username}
      data-lang={language}
      onClick={handleEmailClick}
      href="#"
    >
      <span className="email-protection">{email}</span>
      {withIcon && (
        <svg
          className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      )}
    </LinkComponent>
  )
}
