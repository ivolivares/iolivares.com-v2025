"use client"

import Image from "next/image"
import Link from "next/link"
import { Email } from "@/components/email"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"

export default function Connect() {
  const { t } = useTranslation()
  const sectionRef = useScrollReveal()

  const socialLinks = [
    {
      color: "from-[#1a1a2e] to-[#0a1024] border border-[#00e5b0]/40",
      handle: "The Creator Business OS",
      icon: "/mediacreators-icon.png",
      name: "MediaCreators",
      size: "large",
      url: "https://mediacreators.io/?from=iolivares.com",
    },
    {
      color: "from-gray-900 to-gray-700",
      handle: "@ivolivares",
      name: t("connect.socialLinks.github")?.toString(),
      size: "small",
      url: "https://github.com/ivolivares?from=iolivares.com",
    },
    {
      color: "from-blue-600 to-blue-700",
      handle: "ivanolivaresrojas",
      name: t("connect.socialLinks.linkedIn")?.toString(),
      size: "medium",
      url: "https://www.linkedin.com/in/ivanolivaresrojas/?from=iolivares.com",
    },
    {
      color: "from-blue-300 to-blue-500",
      handle: "@ivolivares",
      name: t("connect.socialLinks.twitter")?.toString(),
      size: "small",
      url: "https://x.com/ivolivares?from=iolivares.com",
    },
    {
      color: "from-blue-600 to-blue-800",
      handle: "@ivolivares",
      name: t("connect.socialLinks.facebook")?.toString(),
      size: "small",
      url: "https://fb.me/ivolivares?from=iolivares.com",
    },
    {
      color: "from-green-500 to-green-600",
      handle: "DJ Maxis",
      name: t("connect.socialLinks.spotify")?.toString(),
      size: "small",
      url: "https://open.spotify.com/artist/3cePcnUC1QKI8iX4zf0aQO?si=RdfawXEgTB68o5vz-mlO0g&from=iolivares.com",
    },
    {
      color: "from-orange-500 to-orange-600",
      handle: "djmaxis",
      name: t("connect.socialLinks.soundCloud")?.toString(),
      size: "large",
      url: "https://soundcloud.com/djmaxis?from=iolivares.com",
    },
    {
      color: "from-pink-500 via-red-500 to-yellow-500",
      handle: "@ivolivares",
      name: t("connect.socialLinks.instagram")?.toString(),
      size: "small",
      url: "https://instagram.com/ivolivares?from=iolivares.com",
    },
    {
      color: "from-gray-800 to-gray-900",
      handle: "DJ Maxis",
      name: t("connect.socialLinks.appleMusic")?.toString(),
      size: "small",
      url: "https://music.apple.com/us/artist/dj-maxis/1661169599?from=iolivares.com",
    },
  ]

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2 p-8"
      case "medium":
        return "col-span-1 row-span-2 p-6"
      case "small":
        return "col-span-1 row-span-1 p-4"
      default:
        return "col-span-1 row-span-1 p-4"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main ref={sectionRef} className="scroll-reveal">
        <section className="min-h-screen py-20 sm:py-32">
          <div className="space-y-12 sm:space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-4xl sm:text-5xl font-light text-balance">{t("connect.title")}</h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
                {t("connect.description")}
              </p>

              <div className="pt-4">
                <Email
                  withIcon={true}
                  className="group inline-flex items-center gap-3 text-xl sm:text-2xl font-medium text-foreground hover:text-muted-foreground transition-colors duration-300"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-sm text-muted-foreground font-mono text-center">{t("connect.elsewhere")}</div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[120px] sm:auto-rows-[140px]">
                {socialLinks.map((social) => (
                  <Link
                    key={`${social.name}-${social.handle}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${social.color} hover:scale-[1.02] transition-all duration-300 hover:shadow-xl ${getSizeClasses(social.size)}`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="relative h-full flex flex-col justify-between text-white">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          {"icon" in social && (
                            <Image
                              src={social.icon as string}
                              alt=""
                              width={48}
                              height={48}
                              className="mx-auto brightness-0 invert"
                            />
                          )}
                          <div
                            className={`font-semibold ${social.size === "large" ? "text-2xl sm:text-3xl" : social.size === "medium" ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}
                          >
                            {social.name}
                          </div>
                          <div
                            className={`text-white/80 ${social.size === "large" ? "text-base sm:text-lg" : "text-sm"}`}
                          >
                            {social.handle}
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
