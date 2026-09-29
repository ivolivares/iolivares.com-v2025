export type VideoProvider = "mediacreators" | "youtube" | "vimeo"

export interface VideoEmbedInfo {
  provider: VideoProvider
  /** URL suitable for an iframe player when the host allows embedding. */
  embedUrl: string
  /** Canonical watch/share URL for fallback links. */
  watchUrl: string
}

const MEDIA_CREATORS_VIDEO =
  /^(?:https?:\/\/)?(?:og|player)\.mediacreators\.io\/creator\/([^/]+)\/v\/([A-Za-z0-9_-]+)/i

const YOUTUBE_PATTERNS = [
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:[^#]*&)?v=([A-Za-z0-9_-]{6,})/i,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/i,
  /^(?:https?:\/\/)?youtu\.be\/([A-Za-z0-9_-]{6,})/i,
]

const VIMEO_PATTERN = /^(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:video\/)?(\d+)/i

/**
 * Detect known video URLs from Notion bookmarks / embeds / video blocks
 * and normalize them to player + watch URLs.
 */
export function getVideoEmbedInfo(url: string): VideoEmbedInfo | null {
  const trimmed = url.trim()
  if (!trimmed) return null

  const mediaCreators = trimmed.match(MEDIA_CREATORS_VIDEO)
  if (mediaCreators) {
    const creator = mediaCreators[1]
    const videoId = mediaCreators[2]
    return {
      embedUrl: `https://player.mediacreators.io/creator/${creator}/v/${videoId}`,
      provider: "mediacreators",
      watchUrl: `https://og.mediacreators.io/creator/${creator}/v/${videoId}`,
    }
  }

  for (const pattern of YOUTUBE_PATTERNS) {
    const match = trimmed.match(pattern)
    if (match?.[1]) {
      const id = match[1]
      return {
        embedUrl: `https://www.youtube.com/embed/${id}`,
        provider: "youtube",
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
      }
    }
  }

  const vimeo = trimmed.match(VIMEO_PATTERN)
  if (vimeo?.[1]) {
    const id = vimeo[1]
    return {
      embedUrl: `https://player.vimeo.com/video/${id}`,
      provider: "vimeo",
      watchUrl: `https://vimeo.com/${id}`,
    }
  }

  return null
}

export function isNotionMediaLinkLabel(label: unknown): boolean {
  if (typeof label !== "string") return false
  const normalized = label.trim().toLowerCase()
  return normalized === "bookmark" || normalized === "video" || normalized === "embed" || normalized === "link_preview"
}
