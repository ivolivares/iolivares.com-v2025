"use client"

import { useEffect, useState } from "react"
import { getVideoEmbedInfo } from "@/lib/video-embeds"
import { cn } from "@/lib/utils"

interface VideoEmbedProps {
  url: string
  className?: string
  title?: string
}

interface OEmbedResponse {
  title?: string
  thumbnail_url?: string
}

function getOEmbedEndpoint(url: string): string | null {
  const info = getVideoEmbedInfo(url)
  if (!info) return null

  switch (info.provider) {
    case "mediacreators":
      return `https://og.mediacreators.io/oembed?url=${encodeURIComponent(info.embedUrl)}&format=json`
    case "youtube":
      return `https://www.youtube.com/oembed?url=${encodeURIComponent(info.watchUrl)}&format=json`
    case "vimeo":
      return `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(info.watchUrl)}`
    default: {
      const _exhaustive: never = info.provider
      return _exhaustive
    }
  }
}

export function VideoEmbed({ url, className, title: titleProp }: VideoEmbedProps) {
  const info = getVideoEmbedInfo(url)
  const [oembedTitle, setOembedTitle] = useState<string | undefined>()

  useEffect(() => {
    const endpoint = getOEmbedEndpoint(url)
    if (!endpoint) return

    let cancelled = false
    const controller = new AbortController()

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`oEmbed failed: ${response.status}`)
        return response.json() as Promise<OEmbedResponse>
      })
      .then((data) => {
        if (!cancelled && data.title) setOembedTitle(data.title)
      })
      .catch(() => {
        // Title is optional; the iframe still renders.
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [url])

  if (!info) {
    return (
      <a
        href={url}
        className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {titleProp || url}
      </a>
    )
  }

  const title = titleProp || oembedTitle || "Watch video"

  return (
    <figure className={cn("my-8 w-full", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        <iframe
          src={info.embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {titleProp || oembedTitle ? <figcaption className="mt-2 text-sm text-muted-foreground">{title}</figcaption> : null}
    </figure>
  )
}
