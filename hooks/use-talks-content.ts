import TalksContent from "@/content/talks/talks.json"
import { Language } from "@/hooks/use-translation"

export interface TalkScheduleItem {
  date: string
  event: string
  location: string
  talk: string
  link: string
}

export interface LatestTalk {
  title: string
  description: string
  lang: string
  location: string
  thumbnail: string
  date: string
  duration: string
  slides?: string | null
  video: string
}

export interface TalksPageData {
  showScheduleSection: boolean
  talksSchedule: TalkScheduleItem[]
  latestTalks: LatestTalk[]
  latestTalk: LatestTalk
}

export function useTalksContent(currentLanguage: Language) {
  const talks = TalksContent.filter((talk) => talk.lang === currentLanguage)
  const latestTalks = talks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const latestTalk = latestTalks[0]

  const talksSchedule = [
    {
      date: "Mar 15",
      event: "TechConf",
      link: "techconf.com",
      location: "Virtual",
      talk: "Lorem Ipsum Development Patterns",
    },
    {
      date: "Jan 15",
      event: "DevSummit",
      link: "devsummit.io",
      location: "San Francisco",
      talk: "Dolor Sit Amet Architecture",
    },
    {
      date: "Jul 15",
      event: "CodeFest",
      link: "codefest.org",
      location: "New York",
      talk: "Consectetur Adipiscing Best Practices",
    },
    {
      date: "Aug 18",
      event: "WebConf",
      link: "webconf.uk",
      location: "London",
      talk: "Sed Do Eiusmod Performance",
    },
    {
      date: "Sep 22",
      event: "JSWorld",
      link: "jsworld.nl",
      location: "Amsterdam",
      talk: "Tempor Incididunt Frameworks",
    },
    {
      date: "Oct 10",
      event: "ReactNext",
      link: "reactnext.com",
      location: "Tel Aviv",
      talk: "Ut Labore Component Design",
    },
    {
      date: "Nov 05",
      event: "Frontend",
      link: "frontend.berlin",
      location: "Berlin",
      talk: "Dolore Magna State Management",
    },
  ]
  const showScheduleSection = false

  return {
    latestTalk,
    latestTalks,
    showScheduleSection,
    talksSchedule,
  } satisfies TalksPageData
}
