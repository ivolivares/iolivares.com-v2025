"use client"

import { ArrowLeft, Copy, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function GivingTalksPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const sectionRef = useScrollReveal()

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const speakerInfo = [
    {
      field: "name",
      label: "Name",
      value: "Iván Olivares Rojas",
    },
    {
      field: "avatar",
      label: "Avatar",
      url: "https://iolivares.com/headshot.jpg",
      value: "https://iolivares.com/headshot.jpg",
    },
    {
      field: "introduction",
      label: "Introduction",
      value:
        "A passionate software engineer and entrepreneur. Currently working as Tech Director for Globant in the Media & Entertainment AI Studio. Loves to build using the latest technologies. Mainly focused in the JS Ecosystem.",
    },
    {
      field: "location",
      label: "Location",
      value: "Santiago, Chile 🇨🇱",
    },
    {
      field: "company",
      label: "Company",
      url: "https://www.globant.com?from=iolivares.com",
      value: "Globant",
    },
    {
      field: "website",
      label: "Website",
      url: "https://iolivares.com?from=/given-talks",
      value: "iolivares.com",
    },
    {
      field: "github",
      label: "GitHub",
      url: "https://github.com/ivolivares?from=iolivares.com",
      value: "@ivolivares",
    },
    {
      field: "twitter",
      label: "Twitter",
      url: "https://x.com/ivolivares?from=iolivares.com",
      value: "@ivolivares",
    },
    {
      field: "linkedin",
      label: "LinkedIn",
      url: "https://linkedin.com/in/ivanolivaresrojas?from=iolivares.com",
      value: "Iván Olivares Rojas",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-16 page-content scroll-reveal">
        {/* Back Link */}
        <Link
          href="/talks"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to talks I have given
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-balance">Giving Talks</h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Hey! My name is <strong>Iván Olivares</strong>. Passionate developer living in Santiago, Chile. I am
            focusing on many areas of technology but I love Media & Streaming Industry from tech side I love to work
            with Frontend technologies like like React, Next.js, TypeScript, Tailwind, among others.
          </p>

          <div className="mb-12">
            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">I am currently taking a break on giving talks.</p>
            </div>
          </div>
        </header>

        {/* Information Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Information</h2>
          <p className="text-muted-foreground mb-8">You can use the following information to present me:</p>

          <div className="space-y-6">
            {speakerInfo.map((info) => (
              <div key={info.field} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8">
                <div className="w-24 text-sm font-medium text-muted-foreground flex-shrink-0">{info.label}</div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="flex-1">
                    {info.url ? (
                      <Link
                        href={info.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline hover:no-underline decoration-dotted underline-offset-4"
                      >
                        {info.value}
                      </Link>
                    ) : (
                      <>
                        {info.label === "Introduction" ? (
                          <p className="text-sm leading-relaxed max-w-lg">{info.value}</p>
                        ) : (
                          <span className="text-sm">{info.value}</span>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(info.url ? info.url : info.value, info.field)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedField === info.field && <span className="text-xs text-green-400 ml-2">Copied!</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
