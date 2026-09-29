"use client"

import posthog from "posthog-js"
import { PostHogProvider as CSPostHogProvider } from "posthog-js/react"

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (typeof window !== "undefined" && posthogToken) {
  posthog.init(posthogToken, {
    api_host: posthogHost,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually in PostHogPageView
    defaults: "2026-01-30",
  })
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!posthogToken) {
    return children
  }

  return <CSPostHogProvider client={posthog}>{children}</CSPostHogProvider>
}
