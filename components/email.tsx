"use client"

import { useRouter } from "next/navigation"
import { LinkAnimated } from "@/components/link-animated"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import { domain, email, username } from "@/lib/email"

export function Email() {
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
  return (
    <LinkAnimated
      className="ml-1 inline-block text-primary-400 hover:text-primary-300 tracking-wide font-bold email-protection"
      data-domain={domain}
      data-name={username}
      data-lang={language}
      onClick={handleEmailClick}
      href="#"
    >
      {email}
    </LinkAnimated>
  )
}
