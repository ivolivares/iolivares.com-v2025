import enTranslations from "@/public/locales/en.json"
import esTranslations from "@/public/locales/es.json"

export type Language = "en" | "es"

export interface Translations {
  [key: string]: string | Translations
}

export function loadTranslations(language: Language): Translations {
  return language === "es" ? esTranslations : enTranslations
}

export async function loadTranslationsAsync(language: Language): Promise<Translations> {
  if (typeof window === "undefined") {
    return loadTranslations(language)
  }
  const response = await fetch(`/locales/${language}.json`)
  if (!response.ok) {
    throw new Error(`Failed to load translations for ${language}`)
  }
  return response.json()
}

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  es: esTranslations,
}
