/**
 * View Transitions API wrapper for smooth page transitions
 * Provides fallback for browsers that don't support the API
 */

export function startViewTransition(callback: () => void) {
  // Check if View Transitions API is supported
  if ('startViewTransition' in document) {
    // biome-ignore lint/suspicious/noExplicitAny: View Transitions API is experimental
    return (document as any).startViewTransition(callback);
  } else {
    // Fallback for older browsers - just execute the callback
    callback();
    return Promise.resolve();
  }
}

/**
 * Higher-order function to wrap any function with view transitions
 */
export function withViewTransition<T extends unknown[]>(
  fn: (...args: T) => void
) {
  return (...args: T) => {
    startViewTransition(() => fn(...args));
  };
}

/**
 * Check if View Transitions API is supported
 */
export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}