"use client"

import { Copy, Info } from "lucide-react"
import { useEffect, useState } from "react"
import { usePageAnimation } from "@/hooks/use-page-animation"

export default function GivingTalksPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { sectionRef, animateFadeInUp } = usePageAnimation()

  useEffect(() => animateFadeInUp(), [animateFadeInUp])

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
      value: "Lorem Ipsum",
    },
    {
      field: "avatar",
      label: "Avatar",
      value: "https://example.com/avatar.png",
    },
    {
      field: "introduction",
      label: "Introduction",
      value:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      field: "location",
      label: "Location",
      value: "Lorem, Ipsum",
    },
    {
      field: "company",
      label: "Company",
      value: "Lorem Corp / Ipsum Inc",
    },
    {
      field: "website",
      label: "Website",
      value: "lorem.ipsum",
    },
    {
      field: "github",
      label: "GitHub",
      value: "@loremipsum",
    },
    {
      field: "twitter",
      label: "Twitter",
      value: "@lorem_ipsum",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-balance">Giving Talks</h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Hey! My name is <strong>Lorem Ipsum</strong>. I am a passionate developer living in Lorem City. I am
            focusing on many areas in frontend like React, Next.js, TypeScript, CSS, etc.
          </p>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6 underline decoration-2 underline-offset-4">
              The talks I have given.
            </h2>

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
                    {info.label === "Introduction" ? (
                      <p className="text-sm leading-relaxed">{info.value}</p>
                    ) : (
                      <span className="text-sm">{info.value}</span>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(info.value, info.field)}
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
