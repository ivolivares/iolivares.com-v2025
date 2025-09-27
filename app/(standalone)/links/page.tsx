"use client"

import { Calendar, Code, Facebook, FileText, Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function LinksPage() {
  const sectionRef = useScrollReveal()
  const links = [
    {
      className: "col-span-2",
      icon: Code,
      name: "My website",
      url: "/",
    },
    {
      className: "col-span-1",
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-1",
      icon: Github,
      name: "GitHub",
      url: "https://github.com/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-2",
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/ivanolivaresrojas?from=iolivares.com",
    },
    {
      className: "col-span-1",
      icon: Twitter,
      name: "Twitter",
      url: "https://x.com/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-1",
      icon: Facebook,
      name: "Facebook",
      url: "https://fb.me/ivolivares?from=iolivares.com",
    },
    {
      className: "col-span-1",
      icon: Mail,
      name: "Email",
      url: "mailto:hi+fromlinkpage@iolivares.com?subject=Contact+from+iolivares.com/links",
    },
    {
      className: "col-span-2",
      icon: Calendar,
      name: "Talk to me",
      url: "https://cal.com/iolivares/15min?from=iolivares.com",
    },
    {
      className: "col-span-1",
      icon: FileText,
      name: "Blog",
      url: "/thoughts",
    },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <main ref={sectionRef} className="max-w-md mx-auto page-content scroll-reveal">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image src="/me-draw-transparent.png" alt="Profile photo" fill className="rounded-full object-cover" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">Iván Olivares</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Here are links to other platforms where you can find me. Might not be active on all of them. Not promising
            anything.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-3 gap-3">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.url}
                className={`${link.className} bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-accent transition-colors group`}
              >
                <Icon className="w-6 h-6 text-foreground group-hover:text-accent-foreground" />
                <span className="text-sm font-medium text-foreground group-hover:text-accent-foreground text-center">
                  {link.name}
                </span>
              </a>
            )
          })}
        </div>
      </main>
    </div>
  )
}
