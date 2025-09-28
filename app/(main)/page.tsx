"use client"

import Image from "next/image"
import { LinkAnimated } from "@/components/link-animated"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import { SiInstagram, SiX } from "@icons-pack/react-simple-icons"

export default function Home() {
  const { t } = useTranslation()
  const headerRef = useScrollReveal()

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/headshot-drawn.png"
          alt="Iván Olivares Rojas - drawn by Nanobanana (Gemini by Google)"
          fill
          className="object-contain opacity-10"
          priority
        />
      </div>

      <section className="relative z-10">
        <header ref={headerRef} className="min-h-screen flex items-center page-content scroll-reveal">
          <div className="w-full">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-8">
                <div className="flex flex-col gap-10">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">{t("home.title")}</h1>
                  {/* <Link
                    href="/thoughts"
                    className="inline-flex items-center gap-3 group hover:opacity-80 transition-opacity border-primary-foreground border-2 rounded-3xl px-2.5 py-1"
                  >
                    <span className="bg-emerald-500 text-black text-xs font-medium rounded rounded-3xl py-px px-2">
                      {t("home.newArticle")}
                    </span>
                    <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                      {t("home.articleTitle")}
                    </span>
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link> */}
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <Image
                    src="/headshot-drawn.png"
                    alt="Iván Olivares Rojas - drawn by Nanobanana (Gemini by Google)"
                    width={160}
                    height={160}
                    className="w-32 h-32 object-contain scale-x-[-1] lg:w-full lg:h-96 rounded-none drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <Link
                  href="https://www.linkedin.com/in/ivanolivaresrojas/?from=iolivares.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </Link>
                <Link
                  href="https://x.com/ivolivares/?from=iolivares.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <SiX className="size-4" />
                  Twitter
                </Link>
                <Link
                  href="https://instagram.com/ivolivares/?from=iolivares.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <SiInstagram className="size-4" />
                  Instagram
                </Link>
              </div>

              <div className="max-w-2xl space-y-6">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {t("home.currentWork", {
                    glb: (
                      <LinkAnimated
                        href="https://www.globant.com/?from=iolivares.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="scribble-green"
                      >
                        Globant
                      </LinkAnimated>
                    ),
                  })}
                  {` `}
                  <LinkAnimated href="/talks" variant="arc">
                    {t("home.currentWorkEnd")}
                  </LinkAnimated>
                  {`.`}
                </p>
                <p className="text-muted-foreground">{t("home.background")}</p>
                <p className="text-muted-foreground">{t("home.mission")}</p>
              </div>
            </div>
          </div>
        </header>
      </section>
    </div>
  )
}
