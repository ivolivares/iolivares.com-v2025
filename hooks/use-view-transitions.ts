"use client"

import { useRouter } from "next/navigation"
import { startViewTransition } from "@/lib/view-transitions"

/**
 * Hook for navigation with View Transitions API support
 * Provides smooth transitions between pages in Next.js App Router
 */
export function useViewTransitions() {
  const router = useRouter()

  const navigate = (href: string) => {
    startViewTransition(() => {
      router.push(href)
    })
  }

  const replace = (href: string) => {
    startViewTransition(() => {
      router.replace(href)
    })
  }

  const back = () => {
    startViewTransition(() => {
      router.back()
    })
  }

  const forward = () => {
    startViewTransition(() => {
      router.forward()
    })
  }

  return {
    navigate,
    replace,
    back,
    forward,
  }
}