import type { Metadata, Viewport } from "next"
import { Raleway } from "next/font/google"
import type React from "react"
import "./globals.css"
import { META_THEME_COLORS, siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/hooks/use-translation"

const raleway = Raleway({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-raleway",
})

export const metadata: Metadata = {
  alternates: {
    canonical: "https://iolivares.com",
  },
  authors: [
    {
      name: "Iván Olivares Rojas",
      url: "https://iolivares.com",
    },
  ],
  creator: "Iván Olivares Rojas - iolivares.com",
  description: siteConfig.description,
  generator: "v0.app",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
  keywords: siteConfig.keywords,
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    description: siteConfig.description,
    images: [
      {
        alt: siteConfig.name,
        height: 630,
        url: siteConfig.ogImage,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
    url: siteConfig.url,
  },
  publisher: "Iván Olivares Rojas",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ivolivares",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    title: siteConfig.name,
  },
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { color: META_THEME_COLORS.light, media: "(prefers-color-scheme: light)" },
    { color: META_THEME_COLORS.dark, media: "(prefers-color-scheme: dark)" },
  ],
  userScalable: true,
  width: "device-width",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${raleway.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
