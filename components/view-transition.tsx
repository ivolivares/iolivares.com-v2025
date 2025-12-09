"use client"

/**
 * ViewTransition wrapper component
 * Re-exports React 19's built-in ViewTransition component
 * Requires experimental.viewTransition: true in next.config.mjs
 */
// @ts-expect-error - ViewTransition is available in React 19 with experimental.viewTransition enabled
export { ViewTransition } from "react"
