"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CommandPalette } from "./command-palette"
import { Search } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function Navigation() {
  const [isDark, setIsDark] = useState(true)
  const [commandOpen, setCommandOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const openCommand = () => {
    setCommandOpen(true)
  }

  const navItems = [
    { href: "/", label: t("nav.home") || "ABOUT" },
    { href: "/thoughts", label: t("nav.thoughts") || "THOUGHTS", hasNotification: true },
    { href: "/talks", label: t("nav.talks") || "TALKS" },
    { href: "/connect", label: t("nav.contact") || "CONTACT" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/10 backdrop-blur-lg border-b border-border/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold italic text-foreground">
              Iván Olivares Rojas
            </Link>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs font-medium tracking-wider transition-colors duration-300 relative uppercase ${
                      pathname === item.href ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {item.hasNotification && (
                      <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={openCommand}
                  className="text-foreground/60 hover:text-foreground transition-colors p-1 flex items-center gap-2"
                  aria-label="Open command palette"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs text-foreground/40">⌘K</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="text-foreground/60 hover:text-foreground transition-colors p-1"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
}
