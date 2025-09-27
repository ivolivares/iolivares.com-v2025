"use client"

import { useEffect, useRef } from "react"

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * Simplified scroll reveal hook that replaces the complex usePageAnimation
 * Content is visible by default, animations are progressive enhancement
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "50px", once = true } = options
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Mark that JavaScript is available for progressive enhancement
    document.documentElement.classList.add("js-enabled")

    const element = ref.current
    if (!element || !window.IntersectionObserver) {
      // Fallback: ensure content is visible if no IntersectionObserver
      element?.classList.add("revealed")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          entry.target.classList.remove("revealed")
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, once])

  return ref
}
