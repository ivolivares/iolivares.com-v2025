import fs from "fs"
import path from "path"

export type Language = "en" | "es"

export interface Translations {
  [key: string]: string | Translations
}

/**
 * Loads translations for the specified language.
 * Uses synchronous fs on server-side for SSR compatibility and fetch on client-side.
 */
export function loadTranslations(language: Language): Translations {
  if (typeof window === "undefined") {
    // Server-side: read from file system synchronously for SSR
    try {
      const filePath = path.join(process.cwd(), "public", "locales", `${language}.json`)
      const data = fs.readFileSync(filePath, "utf-8")
      return JSON.parse(data)
    } catch (error) {
      console.error(`Error loading translations for ${language} on server:`, error)
      return {}
    }
  } else {
    // Client-side: this would be async, but for direct import we need sync
    // For client-side, use the async version or preload
    throw new Error("Use loadTranslationsAsync for client-side loading")
  }
}

/**
 * Async version for client-side loading
 */
export async function loadTranslationsAsync(language: Language): Promise<Translations> {
  if (typeof window === "undefined") {
    // Server-side: use sync version
    return loadTranslations(language)
  } else {
    // Client-side: fetch from public directory
    try {
      const response = await fetch(`/locales/${language}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${language}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error loading translations for ${language} on client:`, error)
      return {}
    }
  }
}

// Export translations object for direct import (preloaded on server-side)
export const translations: Record<Language, Translations> = {
  en: typeof window === "undefined" ? loadTranslations("en") : {},
  es: typeof window === "undefined" ? loadTranslations("es") : {},
}
