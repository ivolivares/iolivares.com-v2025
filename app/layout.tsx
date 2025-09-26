import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { TranslationProvider } from "@/hooks/use-translation"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Iván Olivares Rojas",
  description: "Tech Director and Entrepreneur.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">
        <TranslationProvider>
          <Navigation />
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
