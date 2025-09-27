"use client"

import Image from "next/image"
import { LanguageSelector } from "@/components/language-selector"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"

export default function Home() {
  const { t } = useTranslation()
  const headerRef = useScrollReveal()

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/me-draw-transparent.png"
          alt="Iván Olivares Rojas - drawn by Nanobanana (Gemini by Google)"
          fill
          className="object-contain opacity-10"
          priority
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-16 relative z-10">
        <header ref={headerRef} className="min-h-screen flex items-center page-content scroll-reveal">
          <div className="w-full">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-8">
                <div className="flex flex-col gap-10">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight">{t("home.title")}</h1>
                  <a
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
                  </a>
                </div>
                <div className="hidden md:block flex-shrink-0">
                  <Image
                    src="/headshot-drawn.png"
                    alt="Iván Olivares"
                    width={160}
                    height={160}
                    className="w-32 h-32 object-contain scale-x-[-1] lg:w-full lg:h-96 rounded-none drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <a
                  href="https://www.linkedin.com/in/ivanolivaresrojas/?from=iolivares.com"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://x.com/ivolivares/?from=iolivares.com"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93-.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.916C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Twitter
                </a>
                <a
                  href="https://instagram.com/ivolivares/?from=iolivares.com"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                  Instagram
                </a>
              </div>

              <div className="max-w-2xl space-y-6">
                <p className="text-lg text-foreground/90 leading-relaxed">{t("home.currentWork")}</p>

                <p className="text-muted-foreground">{t("home.background")}</p>

                <p className="text-muted-foreground">{t("home.mission")}</p>
              </div>
            </div>
          </div>
        </header>

        <footer className="py-12 sm:py-16 border-t border-foreground/10 my-10">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-light">{t("footer.connect")}</h2>

              <p className="text-foreground/70 max-w-2xl leading-relaxed">
                {t("footer.contactText")}
                {` `}
                <a
                  href="https://x.com/intent/follow?screen_name=ivolivares&from=iolivares.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >@ivolivares</a>
              </p>

              <div className="space-y-4">
                {/* Wavy line decoration */}
                <div className="text-muted-foreground text-lg">∼∼∼∼</div>

                {/* Three links with arrow icons */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <a
                    href="https://x.com/intent/follow?screen_name=ivolivares&from=iolivares.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                    {t("footer.followX")}
                  </a>
                  <a
                    href="https://github.com/ivolivares"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                    {t("footer.collaborateGithub")}
                  </a>
                  <a
                    href="https://cal.com/iolivares/15min?from=iolivares.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                    {t("footer.loveToTalk")}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-left text-muted-foreground">
                &copy; Iván Olivares Rojas 2004-{(new Date()).getFullYear()}
                {` `}
                {t("footer.copyright")}
              </div>

              <div className="flex-shrink-0">
                <LanguageSelector />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-xs text-center w-full text-muted-foreground/70">{t("footer.madeWith")}</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
