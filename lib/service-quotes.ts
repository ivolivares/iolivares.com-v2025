import { type InquiryLocale, PACKAGE_IDS, type PackageId, type PackageQuote } from "./service-inquiry-contract"

export function packageQuotes(locale: InquiryLocale): PackageQuote[] {
  return PACKAGE_IDS.map((id) => quoteFor(id, locale))
}

function quoteFor(id: PackageId, locale: InquiryLocale): PackageQuote {
  switch (id) {
    case "agent":
      return locale === "es"
        ? {
            id,
            name: "Agente de IA / automatización en 1 semana",
            price: "Desde US$1.500",
            timeline: "1 semana",
          }
        : {
            id,
            name: "AI agent / automation in 1 week",
            price: "From US$1,500",
            timeline: "1 week",
          }
    case "mvp":
      return locale === "es"
        ? {
            id,
            name: "MVP / desarrollo full-stack rápido",
            price: "Desde US$5.000",
            timeline: "4 a 6 semanas",
          }
        : {
            id,
            name: "MVP / rapid full-stack development",
            price: "From US$5,000",
            timeline: "4 to 6 weeks",
          }
    case "advisory":
      return locale === "es"
        ? {
            id,
            name: "Asesoría técnica / CTO o EM fraccional",
            price: "Desde US$2.500 al mes",
            timeline: "Unas 6 horas por semana",
          }
        : {
            id,
            name: "Technical advisory / fractional CTO or EM",
            price: "From US$2,500 a month",
            timeline: "About 6 hours a week",
          }
    default: {
      const exhaustive: never = id
      return exhaustive
    }
  }
}
