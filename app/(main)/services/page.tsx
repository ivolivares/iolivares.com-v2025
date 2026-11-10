import type { Metadata } from "next"
import { ServicesPage } from "@/components/services-page"

export const metadata: Metadata = {
  alternates: {
    canonical: "/services",
  },
  description:
    "Software engineer and AI & automation advisor. One-week AI agents, fast full-stack MVPs, and fractional technical leadership.",
  openGraph: {
    description:
      "Software engineer and AI & automation advisor. One-week AI agents, fast full-stack MVPs, and fractional technical leadership.",
    title: "Services",
    url: "/services",
  },
  title: "Services",
}

export default function Page() {
  return <ServicesPage />
}
