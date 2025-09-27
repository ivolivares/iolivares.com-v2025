"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

export type Language = "en" | "es"

interface Translations {
  [key: string]: string | Translations
}

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language, callback?: Function) => void
  t: (key: string) => string
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({
  children,
  initialTranslations
}: {
  children: ReactNode
  initialTranslations?: Translations
}) {
  const [language, setLanguageState] = useState<Language>("en")
  const [translations, setTranslations] = useState<Translations>(initialTranslations || {})
  const [isLoading, setIsLoading] = useState(!initialTranslations)
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration and load language from localStorage
  useEffect(() => {
    setIsHydrated(true)

    // Only access localStorage after hydration
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Load translations when language changes
  useEffect(() => {
    if (initialTranslations && language === "en") {
      // Already have initial translations for default language
      setIsLoading(false)
      return
    }

    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/locales/${language}.json`)
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${language}`)
        }
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error(`Error loading translations for ${language}:`, error)
        setTranslations({})
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language, initialTranslations])

  const setLanguage = (lang: Language, callback?: Function) => {
    setLanguageState(lang)
    if (isHydrated) {
      localStorage.setItem("language", lang)
    }
    if (callback) {
      callback()
    }
  }

  const t = (key: string): string => {
    // Return key as fallback during loading or if translation not found
    if (isLoading || !translations) {
      return key
    }

    const keys = key.split(".")
    let value: string | Translations = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <TranslationContext.Provider value={{ isLoading, language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
