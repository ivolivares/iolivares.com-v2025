"use client"

import { useRouter } from "next/navigation"
import { useCallback, useTransition } from "react"

/**
 * Hook for programmatic view transitions
 * Uses React 19's useTransition hook for navigation transitions
 */
export function useViewTransition() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const transitionTo = useCallback(
    (url: string) => {
      startTransition(() => {
        router.push(url)
      })
    },
    [router]
  )

  return { isPending, transitionTo }
}
