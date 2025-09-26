import { Code, Instagram, Github, Linkedin, Twitter, MessageCircle, Mail, Calendar, FileText } from "lucide-react"
import Image from "next/image"

export default function LinksPage() {
  const links = [
    {
      name: "My website",
      icon: Code,
      url: "/",
      className: "col-span-2",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      className: "col-span-1",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com",
      className: "col-span-1",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
      className: "col-span-2",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      className: "col-span-1",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me",
      className: "col-span-1",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:hello@example.com",
      className: "col-span-1",
    },
    {
      name: "Talk to me",
      icon: Calendar,
      url: "https://cal.com",
      className: "col-span-2",
    },
    {
      name: "Blog",
      icon: FileText,
      url: "/blog",
      className: "col-span-1",
    },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-md mx-auto">
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
      </div>
    </div>
  )
}
