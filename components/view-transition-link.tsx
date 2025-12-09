"use client"

import Link from "next/link"
import type { AnchorHTMLAttributes, ReactNode } from "react"

interface ViewTransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string
  children: ReactNode
  prefetch?: boolean
}

/**
 * ViewTransitionLink component
 * Standard Next.js Link component - transitions are handled by ViewTransition wrapper components
 */
export function ViewTransitionLink({ href, children, prefetch = true, ...props }: ViewTransitionLinkProps) {
  return (
    <Link href={href} prefetch={prefetch} {...props}>
      {children}
    </Link>
  )
}
