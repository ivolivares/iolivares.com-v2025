"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type TranslationKeys = {
  [key: string]: string | TranslationKeys
}

interface TranslationContextType {
  t: (key: string) => string
  language: string
  setLanguage: (language: string) => void
  isLoading: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguageState] = useState<string>("en")
  const [translations, setTranslations] = useState<TranslationKeys>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguageState(savedLanguage)
  }, [])

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/locales/${language}.json`)
        if (!response.ok) {
          throw new Error(`Failed to fetch translations: ${response.status}`)
        }
        const data = await response.json()
        setTranslations(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to load translations:", error)
        // Fallback to English
        try {
          const fallbackResponse = await fetch("/locales/en.json")
          const fallbackData = await fallbackResponse.json()
          setTranslations(fallbackData)
          setIsLoading(false)
        } catch (fallbackError) {
          console.error("Failed to load fallback translations:", fallbackError)
          setIsLoading(false)
        }
      }
    }

    loadTranslations()
  }, [language])

  const t = (key: string): string => {
    if (isLoading) {
      return key // Return key while loading
    }

    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key
  }

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage, isLoading }}>
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
