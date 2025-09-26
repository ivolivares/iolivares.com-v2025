"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Home,
  Briefcase,
  MessageSquare,
  Mail,
  ExternalLink,
  Layers,
  Camera,
  Settings,
  Mic,
  User,
  FileText,
  Disc3,
} from "lucide-react"

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

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <Home className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/work"))}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Work</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/thoughts"))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Thoughts</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/talks"))}>
            <Mic className="mr-2 h-4 w-4" />
            <span>Talks</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/giving-talks"))}>
            <User className="mr-2 h-4 w-4" />
            <span>Giving Talks</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/connect"))}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/links"))}>
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>Links</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/stack"))}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Stack</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/photographs"))}>
            <Camera className="mr-2 h-4 w-4" />
            <span>Photographs</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/uses"))}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Uses</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/resume"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Resume</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/vinyls"))}>
            <Disc3 className="mr-2 h-4 w-4" />
            <span>Vinyls</span>
          </CommandItem>
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
