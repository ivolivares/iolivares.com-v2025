"use client"

import { Pause, Play } from "lucide-react"
import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import styles from "./logo-marquee.module.css"

export interface LogoMarqueeBrand {
  name: string
  /** Monochrome SVG, drawn as a mask in the text color. */
  icon: string
  /** Single brand color for the mark in color tone. Leave out for brands whose mark is black or white. */
  color?: string
  /** Full color SVG for multicolor marks, used in color tone instead of `icon`. */
  colorIcon?: string
  /** Wordmarks need a wider slot than a square symbol. */
  wide?: boolean
}

export type LogoMarqueeTone = "color" | "mono"

export interface LogoMarqueeLabels {
  logos: string
  pause: string
  pauseLabel: string
  paused: string
  play: string
  playLabel: string
}

export interface LogoMarqueeProps {
  title?: string
  description?: string
  brands?: LogoMarqueeBrand[]
  /** `color` shows each mark in its official colors; `mono` draws every mark in the text color. */
  tone?: LogoMarqueeTone
  labels?: LogoMarqueeLabels
}

const exampleBrands: LogoMarqueeBrand[] = [
  { colorIcon: "/block-logos/figma-color.svg", icon: "/block-logos/figma.svg", name: "Figma" },
  { color: "#5E6AD2", icon: "/block-logos/linear.svg", name: "Linear" },
  { icon: "/block-logos/notion.svg", name: "Notion" },
  { colorIcon: "/block-logos/slack-color.svg", icon: "/block-logos/slack.svg", name: "Slack" },
  { icon: "/block-logos/github.svg", name: "GitHub" },
  { color: "#635BFF", icon: "/block-logos/stripe.svg", name: "Stripe" },
  { icon: "/block-logos/vercel.svg", name: "Vercel" },
]

const defaultLabels: LogoMarqueeLabels = {
  logos: "Illustrative tool logos",
  pause: "Pause",
  paused: "Motion paused",
  pauseLabel: "Pause logo motion",
  play: "Play",
  playLabel: "Play logo motion",
}

function BrandMark({ brand, tone }: { brand: LogoMarqueeBrand; tone: LogoMarqueeTone }) {
  const className = brand.wide ? `${styles.brandMark} ${styles.brandMarkWide}` : styles.brandMark
  if (tone === "color" && brand.colorIcon) {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{
          background: `url("${brand.colorIcon}") center / contain no-repeat`,
          maskImage: "none",
          WebkitMaskImage: "none",
        }}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        color: tone === "color" ? brand.color : undefined,
        maskImage: `url("${brand.icon}")`,
        WebkitMaskImage: `url("${brand.icon}")`,
      }}
    />
  )
}

function BrandList({
  brands,
  duplicate = false,
  logosLabel,
  tone,
}: {
  brands: LogoMarqueeBrand[]
  duplicate?: boolean
  logosLabel: string
  tone: LogoMarqueeTone
}) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : logosLabel}
      className={styles.brandList}
    >
      {brands.map((brand) => (
        <li
          aria-label={brand.wide ? brand.name : undefined}
          className={styles.brand}
          key={`${brand.name}-${duplicate ? "copy" : "main"}`}
        >
          <BrandMark brand={brand} tone={tone} />
          <span className={brand.wide ? styles.srOnly : styles.brandName}>{brand.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function LogoMarquee({
  brands = exampleBrands,
  description = "From the first idea to the final handoff, a familiar set of tools stays close to the work.",
  labels = defaultLabels,
  title = "Good work moves between tools",
  tone = "color",
}: LogoMarqueeProps) {
  const titleId = useId()
  const [paused, setPaused] = useState(false)

  return (
    <section aria-labelledby={titleId} className={styles.section} data-tone={tone}>
      <div className={styles.intro}>
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
      </div>

      <div aria-label={labels.logos} className={styles.marquee} role="region">
        <div className={`${styles.track}${paused ? ` ${styles.paused}` : ""}`}>
          <BrandList brands={brands} logosLabel={labels.logos} tone={tone} />
          <BrandList brands={brands} duplicate logosLabel={labels.logos} tone={tone} />
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          aria-label={paused ? labels.playLabel : labels.pauseLabel}
          className={styles.motionButton}
          onClick={() => setPaused((value) => !value)}
          size="sm"
          type="button"
          variant="ghost"
        >
          {paused ? (
            <>
              <Play aria-hidden="true" size={16} strokeWidth={1.75} />
              {labels.play}
            </>
          ) : (
            <>
              <Pause aria-hidden="true" size={16} strokeWidth={1.75} />
              {labels.pause}
            </>
          )}
        </Button>
        <span aria-live="polite" className={styles.motionStatus}>
          {paused ? labels.paused : ""}
        </span>
      </div>
    </section>
  )
}

export default LogoMarquee
