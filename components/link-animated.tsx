import { cva } from "class-variance-authority"
import Link, { LinkProps } from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

const linkAnimatedVariants = cva("link__graphic link__graphic--stroke ", {
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      arc: "link__graphic--arc stroke-black dark:stroke-foreground",
      default: "link__graphic--slide",
      scribble: "link__graphic--scribble stroke-black",
      "scribble-green": "link__graphic--scribble stroke-[#bfd732]",
      slide: "link__graphic--slide",
    },
  },
})

type Variants = "arc" | "default" | "scribble" | "scribble-green" | "slide"

type LinkAnimatedProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variants
    children?: React.ReactNode
  }

const SvgPath: React.FC<{ variant: Variants }> = ({ variant }) => (
  <>
    {(variant === "slide" || variant === "default") && (
      <svg
        className={cn(linkAnimatedVariants({ variant }))}
        width="300%"
        height="100%"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
      </svg>
    )}
    {(variant === "scribble" || variant === "scribble-green") && (
      <svg className={cn(linkAnimatedVariants({ variant }))} width="100%" height="9" viewBox="0 0 101 9">
        <path
          d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294"
          pathLength="1"
        ></path>
      </svg>
    )}
    {variant === "arc" && (
      <svg className={cn(linkAnimatedVariants({ variant }))} width="100%" height="18" viewBox="0 0 59 18">
        <path d="M.945.149C12.3 16.142 43.573 22.572 58.785 10.842" pathLength="1"></path>
      </svg>
    )}
  </>
)

export function LinkAnimated({ children, href, target, className, variant = "default", ...props }: LinkAnimatedProps) {
  return (
    <span className={cn(`relative inline-block m-0 p-0 ${className}`)}>
      <Link href={href} target={target} {...props} className="link-animated">
        <span>{children}</span>
        <SvgPath variant={variant} />
      </Link>
    </span>
  )
}
