"use client"

import Link from "next/link"
import { Email } from "@/components/email"
import { LanguageSelector } from "@/components/language-selector"
import { LinkAnimated } from "@/components/link-animated"
import { useTranslation } from "@/hooks/use-translation"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="py-12 sm:py-16 border-t border-foreground/10 my-10">
      <div className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-light">{t("footer.connect")}</h2>

          <p className="text-foreground/70 max-w-2xl leading-relaxed">
            {t("footer.contactText", {
              email: <Email />,
            })}
            {` `}
            <LinkAnimated
              href="https://x.com/intent/follow?screen_name=ivolivares&from=iolivares.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ivolivares
            </LinkAnimated>
          </p>

          <div className="space-y-4">
            {/* Wavy line decoration */}
            <div className="text-muted-foreground text-lg">∼∼∼∼</div>

            {/* Three links with arrow icons */}
            <div className="flex flex-wrap flex-col md:flex-row gap-2 md:gap-6 text-sm">
              <Link
                href="https://x.com/intent/follow?screen_name=ivolivares&from=iolivares.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                {t("footer.followX")}
              </Link>
              <Link
                href="https://github.com/ivolivares"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                {t("footer.collaborateGithub")}
              </Link>
              <Link
                href="https://cal.com/iolivares/15min?from=iolivares.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
                {t("footer.loveToTalk")}
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-0">
          <div className="text-sm text-center md:text-left text-muted-foreground">
            <p className="space-y-2 md:space-y-0">
              <span>&copy; 2004-{new Date().getFullYear()} Iván Olivares Rojas</span>
              <span className="hidden md:inline-block">{` · `}</span>
              <br className="md:hidden" />
              <span>{t("footer.copyright")}</span>
            </p>
            <p>
              {t("footer.creativeCommons", {
                license: (
                  <Link
                    href="https://creativecommons.org/licenses/by-nc/4.0/deed.es?from=iolivares.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    CC BY-NC 4.0
                  </Link>
                ),
              })}
            </p>
          </div>

          <div className="flex-shrink-0">
            <LanguageSelector />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-xs text-center w-full text-muted-foreground/70">
            {t("footer.madeWith", {
              v0link: (
                <Link
                  href="https://v0.app?from=iolivares.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  v0.app
                </Link>
              ),
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
