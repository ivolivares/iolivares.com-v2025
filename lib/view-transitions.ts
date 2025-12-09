/**
 * View Transitions API wrapper for smooth page transitions
 * Provides fallback for browsers that don't support the API
 */

type ViewTransitionCallback = () => void | Promise<void>

export function startViewTransition(callback: () => void) {
  // Check if View Transitions API is supported
  if ("startViewTransition" in document) {
    // TypeScript doesn't yet have complete types for the View Transitions API
    const doc = document as Document & {
      startViewTransition: (cb: ViewTransitionCallback) => { finished: Promise<void> }
    }
    return doc.startViewTransition(callback)
  }
  // Fallback for older browsers - just execute the callback
  callback()
  return undefined
}

/**
 * Higher-order function to wrap any function with view transitions
 */
export function withViewTransition<T extends unknown[]>(fn: (...args: T) => void) {
  return (...args: T) => {
    startViewTransition(() => fn(...args))
  }
}

/**
 * Check if View Transitions API is supported
 */
export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && "startViewTransition" in document
}
