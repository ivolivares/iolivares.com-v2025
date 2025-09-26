import { useRef } from "react"

export function usePageAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const animateFadeInUp = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }

  return {
    animateFadeInUp,
    sectionRef,
  }
}
