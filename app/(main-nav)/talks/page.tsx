"use client"

import { FileText, Play, User } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { usePageAnimation } from "@/hooks/use-page-animation"
import { talksData } from "@/lib/talks-data"

export default function TalksPage() {
  const {
    showScheduleSection,
    pageTitle,
    pageSubtitle,
    scheduleTitle,
    latestTalksTitle,
    speakerInfoLink,
    schedule,
    latestTalks,
  } = talksData
  const { sectionRef, animateFadeInUp } = usePageAnimation()

  useEffect(() => animateFadeInUp(), [animateFadeInUp])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 pt-24 pb-16">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-balance">{pageTitle}</h1>
            <Link
              href={speakerInfoLink}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4" />
              Speaker info
            </Link>
          </div>
          <p className="text-lg text-muted-foreground">{pageSubtitle}</p>
        </header>

        {showScheduleSection && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">{scheduleTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Event</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Location</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Talk</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-2 text-sm">{item.date}</td>
                      <td className="py-3 px-2 text-sm font-medium">{item.event}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{item.location}</td>
                      <td className="py-3 px-2 text-sm">{item.talk}</td>
                      <td className="py-3 px-2 text-sm">
                        <Link
                          href={`https://${item.link}`}
                          className="text-blue-400 hover:text-blue-300 underline transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.link}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Latest Talks */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">{latestTalksTitle}</h2>
          <div className="space-y-12">
            {latestTalks.map((talk, index) => (
              <div key={index} className="border-b border-border/30 pb-8 last:border-b-0">
                <h3 className="text-xl font-semibold mb-3 text-balance">{talk.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{talk.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="font-medium">{talk.event}</span>
                  <span className="text-muted-foreground">{talk.date}</span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={talk.slides}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Slides
                    </Link>
                    <Link
                      href={talk.video}
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Video
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
