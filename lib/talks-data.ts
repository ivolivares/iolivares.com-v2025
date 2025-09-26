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
  showScheduleSection: true,
  pageTitle: "Talks",
  pageSubtitle: "Podcasts, Streams, Nexus",
  scheduleTitle: "Talk Schedule 2025",
  latestTalksTitle: "Latest Talks",
  speakerInfoLink: "/giving-talks",
  schedule: [
    {
      date: "Mar 15",
      event: "TechConf",
      location: "Virtual",
      talk: "Lorem Ipsum Development Patterns",
      link: "techconf.com",
    },
    {
      date: "Jan 15",
      event: "DevSummit",
      location: "San Francisco",
      talk: "Dolor Sit Amet Architecture",
      link: "devsummit.io",
    },
    {
      date: "Jul 15",
      event: "CodeFest",
      location: "New York",
      talk: "Consectetur Adipiscing Best Practices",
      link: "codefest.org",
    },
    {
      date: "Aug 18",
      event: "WebConf",
      location: "London",
      talk: "Sed Do Eiusmod Performance",
      link: "webconf.uk",
    },
    {
      date: "Sep 22",
      event: "JSWorld",
      location: "Amsterdam",
      talk: "Tempor Incididunt Frameworks",
      link: "jsworld.nl",
    },
    {
      date: "Oct 10",
      event: "ReactNext",
      location: "Tel Aviv",
      talk: "Ut Labore Component Design",
      link: "reactnext.com",
    },
    {
      date: "Nov 05",
      event: "Frontend",
      location: "Berlin",
      talk: "Dolore Magna State Management",
      link: "frontend.berlin",
    },
  ],
  latestTalks: [
    {
      title: "Lorem Ipsum Development Love",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      event: "TechConf",
      date: "30min",
      slides: "#",
      video: "#",
    },
    {
      title: "Dolor Sit Shaving",
      description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
      event: "CodeFest",
      date: "45 min",
      slides: "#",
      video: "#",
    },
    {
      title: "Consectetur One for All Made Easy",
      description: "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore cum soluta nobis.",
      event: "WebConf",
      date: "60min",
      slides: "#",
      video: "#",
    },
    {
      title: "Adipiscing to Nuxt Icon",
      description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut.",
      event: "JSWorld",
      date: "35min",
      slides: "#",
      video: "#",
    },
    {
      title: "The Elit Progressive Path",
      description: "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.",
      event: "ReactNext",
      date: "50min",
      slides: "#",
      video: "#",
    },
    {
      title: "Sed Do Theory",
      description: "Maxime placeat facere possimus omnis voluptas assumenda est omnis dolor repellendus temporibus.",
      event: "Frontend",
      date: "40min",
      slides: "#",
      video: "#",
    },
    {
      title: "Eiusmod and the Future of Next Devtools",
      description: "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias.",
      event: "TechConf",
      date: "45min",
      slides: "#",
      video: "#",
    },
    {
      title: "Tempor Experience with Nuxt",
      description:
        "Consequatur aut perferendis doloribus asperiores repellat sed ut perspiciatis unde omnis iste natus.",
      event: "DevSummit",
      date: "55min",
      slides: "#",
      video: "#",
    },
    {
      title: "How I Manage Incididunt Notifications",
      description: "Error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo.",
      event: "CodeFest",
      date: "25min",
      slides: "#",
      video: "#",
    },
    {
      title: "Patterns of Ut Labore",
      description: "Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam.",
      event: "WebConf",
      date: "50min",
      slides: "#",
      video: "#",
    },
  ],
}
