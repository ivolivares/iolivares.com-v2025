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
  event: string
  date: string
  slides: string
  video: string
}

export interface TalksPageData {
  showScheduleSection: boolean
  pageTitle: string
  pageSubtitle: string
  scheduleTitle: string
  latestTalksTitle: string
  speakerInfoLink: string
  schedule: TalkScheduleItem[]
  latestTalks: LatestTalk[]
}

export const talksData: TalksPageData = {
  latestTalks: [
    {
      date: "30min",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      event: "TechConf",
      slides: "#",
      title: "Lorem Ipsum Development Love",
      video: "#",
    },
    {
      date: "45 min",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      event: "CodeFest",
      slides: "#",
      title: "Dolor Sit Shaving",
      video: "#",
    },
    {
      date: "60min",
      description: "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis.",
      event: "WebConf",
      slides: "#",
      title: "Consectetur One for All Made Easy",
      video: "#",
    },
    {
      date: "35min",
      description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut.",
      event: "JSWorld",
      slides: "#",
      title: "Adipiscing to Nuxt Icon",
      video: "#",
    },
    {
      date: "50min",
      description: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.",
      event: "ReactNext",
      slides: "#",
      title: "The Elit Progressive Path",
      video: "#",
    },
    {
      date: "40min",
      description: "Maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus.",
      event: "Frontend",
      slides: "#",
      title: "Sed Do Theory",
      video: "#",
    },
    {
      date: "45min",
      description: "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias.",
      event: "TechConf",
      slides: "#",
      title: "Eiusmod and the Future of Next Devtools",
      video: "#",
    },
    {
      date: "55min",
      description:
        "Consequatur aut perferendis doloribus asperiores repellat sed ut perspiciatis unde omnis iste natus.",
      event: "DevSummit",
      slides: "#",
      title: "Tempor Experience with Nuxt",
      video: "#",
    },
    {
      date: "25min",
      description: "Error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo.",
      event: "CodeFest",
      slides: "#",
      title: "How I Manage Incididunt Notifications",
      video: "#",
    },
    {
      date: "50min",
      description: "Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.",
      event: "WebConf",
      slides: "#",
      title: "Patterns of Ut Labore",
      video: "#",
    },
  ],
  latestTalksTitle: "Latest Talks",
  pageSubtitle: "Podcasts, Streams, Nexus",
  pageTitle: "Talks",
  schedule: [
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
  ],
  scheduleTitle: "Talk Schedule 2025",
  showScheduleSection: true,
  speakerInfoLink: "/giving-talks",
}
