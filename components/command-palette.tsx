"use client"

import {
  Briefcase,
  Camera,
  Disc3,
  ExternalLink,
  FileText,
  Home,
  LaptopMinimal,
  Layers,
  Mail,
  MessageSquare,
  Mic,
  Settings,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const router = useRouter()

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const Commands = [
    { icon: Home, label: "About", route: "/" },
    // { icon: MessageSquare, label: "Thoughts", route: "/thoughts" },
    { icon: Mic, label: "Talks", route: "/talks" },
    { icon: User, label: "Giving Talks", route: "/giving-talks" },
    { icon: Mail, label: "Connect", route: "/connect" },
    { icon: ExternalLink, label: "Links", route: "/links" },
    // { icon: Layers, label: "Stack", route: "/stack" },
    // { icon: Camera, label: "Photographs", route: "/photographs" },
    { icon: LaptopMinimal, label: "Uses", route: "/uses" },
    // { icon: FileText, label: "Resume", route: "/resume" },
    // { icon: Disc3, label: "Vinyls", route: "/vinyls" },
  ]

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {Commands.map((item, index) => {
            const Icon = item.icon
            return (
              <CommandItem key={index} onSelect={() => runCommand(() => router.push(item.route))}>
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return { open, setOpen, toggle }
}
