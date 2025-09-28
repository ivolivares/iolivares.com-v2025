"use client"

import {
  SiApplemusic,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiSoundcloud,
  SiSpotify,
  SiX,
} from "@icons-pack/react-simple-icons"
import { Calendar, Code, FileText, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useTranslation } from "@/hooks/use-translation"

export default function LinksPage() {
  const { t } = useTranslation()
  const sectionRef = useScrollReveal()
  const links = [
    {
      className: "col-span-2",
      color: "from-gray-900 to-gray-700",
      icon: Code,
      name: t("links.myWebsite"),
      url: "/",
    },
    {
      className: "col-span-1",
      color: "from-blue-300 to-blue-500",
      icon: SiX,
      name: t("links.twitter"),
      url: "https://x.com/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-1",
      color: "from-gray-900 to-gray-700",
      icon: SiGithub,
      name: t("links.github"),
      url: "https://github.com/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-2",
      color: "from-blue-600 to-blue-700",
      icon: Linkedin,
      name: t("links.linkedin"),
      url: "https://linkedin.com/in/ivanolivaresrojas?from=iolivares.com",
    },
    {
      className: "col-span-2",
      color: "from-pink-500 via-red-500 to-yellow-500",
      icon: SiInstagram,
      name: t("links.instagram"),
      url: "https://instagram.com/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-1",
      color: "from-blue-600 to-blue-800",
      icon: SiFacebook,
      name: t("links.facebook"),
      url: "https://fb.me/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-1",
      color: "from-blue-500 to-blue-600",
      icon: Mail,
      name: t("links.email"),
      url: "mailto:hi+fromlinkpage@iolivares.com?subject=Contact+from+iolivares.com/links",
    },
    {
      className: "col-span-2",
      color: "from-indigo-500 to-indigo-600",
      icon: Calendar,
      name: t("links.talkToMe"),
      url: "https://cal.com/iolivares/15min?from=iolivares.com",
    },
    // {
    //   className: "col-span-1",
    //   icon: FileText,
    //   name: "Blog",
    //   url: "/thoughts",
    // },
    {
      className: "col-span-1",
      color: "from-orange-500 to-orange-600",
      icon: SiSoundcloud,
      name: t("links.soundcloud"),
      url: "https://soundcloud.com/djmaxis?from=iolivares.com",
    },
    {
      className: "col-span-1",
      color: "from-green-500 to-green-600",
      icon: SiSpotify,
      name: t("links.spotify"),
      url: "https://open.spotify.com/artist/3cePcnUC1QKI8iX4zf0aQO?si=RdfawXEgTB68o5vz-mlO0g&from=iolivares.com",
    },
    {
      className: "col-span-1",
      color: "from-gray-800 to-gray-900",
      icon: SiApplemusic,
      name: t("links.appleMusic"),
      url: "https://music.apple.com/us/artist/dj-maxis/1661169599?from=iolivares.com",
    },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <main ref={sectionRef} className="max-w-md mx-auto page-content scroll-reveal">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src="/headshot-drawn.png"
              alt="Iván Olivares Rojas - drawn by Nanobanana (Gemini by Google)"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">Iván Olivares Rojas</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{t("links.description")}</p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-3 gap-3">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name?.toString()}
                href={link.url}
                rel="noopener noreferrer"
                className={`${link.className} group relative overflow-hidden rounded-xl bg-gradient-to-br ${link.color} hover:scale-[1.02] transition-all duration-300 hover:shadow-xl p-4 flex flex-col items-center justify-center gap-2`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="relative flex flex-col items-center justify-center gap-2 text-white">
                  <Icon className="w-6 h-6" />
                  <span className="text-sm font-medium text-center">{link.name}</span>
                </div>
                {link.url !== "/" && (
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
                )}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
