"use client"
import { Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <img src="/professional-headshot.png" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Lorem Ipsum</h1>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Experienced software engineer with expertise in modern web technologies and full-stack development
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" className="justify-start bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Email contact
              </Button>
              <Button variant="outline" size="sm" className="justify-start bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Cover letter
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">JavaScript</span>
                <span className="text-xs text-muted-foreground">Advanced</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">TypeScript</span>
                <span className="text-xs text-muted-foreground">Advanced</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">React</span>
                <span className="text-xs text-muted-foreground">Expert</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Node.js</span>
                <span className="text-xs text-muted-foreground">Advanced</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Python</span>
                <span className="text-xs text-muted-foreground">Intermediate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">AWS</span>
                <span className="text-xs text-muted-foreground">Intermediate</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Experience</h2>
          <div className="space-y-8">
            {/* Current Position */}
            <div className="border-l-2 border-muted pl-6 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-0"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h3 className="font-semibold text-base">Senior Software Engineer</h3>
                  <p className="text-sm text-muted-foreground">Tech Company Inc.</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 sm:mt-0">2024 - Present</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <div className="w-full max-w-sm">
                <img
                  src="/software-dashboard-interface.png"
                  alt="Project screenshot"
                  className="w-full h-auto rounded border"
                />
              </div>
            </div>

            {/* Previous Position */}
            <div className="border-l-2 border-muted pl-6 relative">
              <div className="absolute w-3 h-3 bg-muted rounded-full -left-2 top-0"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h3 className="font-semibold text-base">Software Engineer</h3>
                  <p className="text-sm text-muted-foreground">Startup Solutions Ltd.</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 sm:mt-0">2023 - 2024</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
              </p>
            </div>

            {/* Earlier Position */}
            <div className="border-l-2 border-muted pl-6 relative">
              <div className="absolute w-3 h-3 bg-muted rounded-full -left-2 top-0"></div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div>
                  <h3 className="font-semibold text-base">Junior Developer</h3>
                  <p className="text-sm text-muted-foreground">Digital Agency Co.</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1 sm:mt-0">2021 - 2023</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Education</h2>
          <div className="border-l-2 border-muted pl-6 relative">
            <div className="absolute w-3 h-3 bg-muted rounded-full -left-2 top-0"></div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
              <div>
                <h3 className="font-semibold text-base">Bachelor of Computer Science</h3>
                <p className="text-sm text-muted-foreground">University of Technology</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 sm:mt-0">2017 - 2021</span>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Projects</h2>
          <div className="space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="font-semibold text-base">E-commerce Platform</h3>
                <span className="text-xs text-muted-foreground mt-1 sm:mt-0">2024</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Built with React, Node.js, and PostgreSQL.
                Features include user authentication, payment processing, and real-time inventory management.
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                <img
                  src="/ecommerce-website-interface.png"
                  alt="E-commerce project"
                  className="w-full h-auto rounded border"
                />
                <img src="/shopping-cart-interface.jpg" alt="Shopping cart" className="w-full h-auto rounded border" />
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h3 className="font-semibold text-base">Task Management App</h3>
                <span className="text-xs text-muted-foreground mt-1 sm:mt-0">2023</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem. A collaborative task management
                application with real-time updates, team collaboration features, and advanced filtering capabilities.
              </p>
              <div className="w-full max-w-sm">
                <img
                  src="/task-management-dashboard.png"
                  alt="Task management app"
                  className="w-full h-auto rounded border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Side Projects Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Side Projects</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base mb-2">Open Source Contributions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Active contributor to various open source projects including React libraries, Node.js tools, and
                developer utilities. Focused on improving developer experience and code quality across the ecosystem.
              </p>
              <div className="w-full max-w-sm">
                <img
                  src="/github-contributions-graph.jpg"
                  alt="GitHub contributions"
                  className="w-full h-auto rounded border"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
