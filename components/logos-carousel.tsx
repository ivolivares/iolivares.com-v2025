"use client"

import { AnimatePresence, motion, type Transition, useInView, useReducedMotion } from "motion/react"
import { Children, memo, type ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const DEFAULT_COLUMN_COUNT = 4
const CYCLE_INTERVAL = 6800
const STAGGER_DELAY = 125
const TRANSITION_DURATION = 0.5
const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const

type WaveDirection = "ltr" | "rtl"

export type LogosCarouselProps = {
  children: ReactNode
  className?: string
  columnCount?: number
  direction?: WaveDirection
  label?: string
  paused?: boolean
}

export function LogosCarousel({
  children,
  className,
  columnCount = DEFAULT_COLUMN_COUNT,
  direction = "ltr",
  label,
  paused = false,
}: LogosCarouselProps) {
  const columns = useMemo(() => distributeLogos(Children.toArray(children), columnCount), [children, columnCount])
  const reduceMotion = useReducedMotion() ?? false
  const containerRef = useRef<HTMLDivElement>(null)
  const isPageInView = usePageVisible()
  const isInView = useInView(containerRef, { margin: "100px" })
  const [step, setStep] = useState(0)
  const shouldPlay = isPageInView && isInView && !paused

  useEffect(() => {
    if (!shouldPlay) return
    const beatId = setInterval(() => setStep((prev) => prev + 1), CYCLE_INTERVAL)
    return () => clearInterval(beatId)
  }, [shouldPlay])

  return (
    <div
      aria-label={label}
      className={cn("grid", className)}
      data-slot="logos-carousel"
      ref={containerRef}
      role="region"
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
    >
      {columns.map((columnLogos, columnIndex) => {
        const waveIndex = direction === "rtl" ? columns.length - 1 - columnIndex : columnIndex
        return (
          <LogoColumn
            activeIndex={step % columnLogos.length}
            columnIndex={columnIndex}
            key={columnIndex}
            logos={columnLogos}
            reduceMotion={reduceMotion}
            waveIndex={waveIndex}
          />
        )
      })}
    </div>
  )
}

type LogoColumnProps = {
  activeIndex: number
  columnIndex: number
  logos: ReactNode[]
  reduceMotion: boolean
  waveIndex: number
}

const LogoColumn = memo(function LogoColumn({
  activeIndex,
  columnIndex,
  logos,
  reduceMotion,
  waveIndex,
}: LogoColumnProps) {
  const transition: Transition = {
    delay: waveIndex * (STAGGER_DELAY / 1000),
    duration: TRANSITION_DURATION,
    ease: EASE_OUT_QUAD,
  }
  const enterTransition = getEnterTransition(reduceMotion, transition)
  const logo = getLogoVariants(reduceMotion, transition, enterTransition)

  return (
    <motion.div
      animate={{ opacity: 1, y: "0%" }}
      className="relative h-full"
      data-slot="logos-carousel-column"
      initial={false}
      transition={enterTransition}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          animate={logo.animate}
          className="flex size-full items-center justify-center"
          data-slot="logos-carousel-logo"
          exit={logo.exit}
          initial={false}
          key={`${columnIndex}-${activeIndex}`}
        >
          {logos[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})

function getEnterTransition(reduceMotion: boolean, transition: Transition): Transition {
  if (!reduceMotion) return transition
  return {
    ...transition,
    filter: { duration: 0 },
    transform: { duration: 0 },
  }
}

function getLogoVariants(reduceMotion: boolean, transition: Transition, enterTransition: Transition) {
  return {
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      transition: enterTransition,
      y: "0%",
    },
    exit: reduceMotion
      ? { opacity: 0, transition }
      : {
          filter: "blur(3px)",
          opacity: 0,
          transition,
          y: "-50%",
        },
    initial: { filter: "blur(2px)", opacity: 0, y: "60%" },
  }
}

function distributeLogos(logos: ReactNode[], columnCount: number): ReactNode[][] {
  const effectiveCount = Math.min(columnCount, logos.length)
  const columns: ReactNode[][] = Array.from({ length: effectiveCount }, () => [])
  logos.forEach((logo, index) => {
    columns[index % effectiveCount]?.push(logo)
  })
  return columns
}

function usePageVisible() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState !== "hidden")
    onChange()
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [])
  return visible
}
