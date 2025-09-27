"use client"

import { Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Language, useTranslation } from "@/hooks/use-translation"

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useTranslation()
  const router = useRouter()

  const languages = [
    { code: "en", flag: "🇺🇸", name: "English" },
    { code: "es", flag: "🇪🇸", name: "Español" },
  ]

  const switchLanguage = (newLocale: Language) => {
    setLanguage(newLocale, () => {
      router.refresh()
      setIsOpen(false)
    })
  }

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <span className="sm:hidden">{currentLanguage.flag}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full right-0 mb-2 bg-background border border-border rounded-md shadow-lg z-20 min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code as unknown as Language)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-muted/50 transition-colors first:rounded-t-md last:rounded-b-md ${
                  language === lang.code ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {language === lang.code && (
                  <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
