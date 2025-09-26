import {
  PhpIcon,
  HtmlIcon,
  CssIcon,
  JavascriptIcon,
  TypescriptIcon,
  GoIcon,
  PythonIcon,
  RubyIcon,
  KotlinIcon,
  ReactIcon,
  AngularIcon,
  GrpcIcon,
  VueIcon,
  NextjsIcon,
  FlutterIcon,
  NodejsIcon,
  ViteIcon,
  WebpackIcon,
  JetpackComposeIcon,
  KotlinMultiplatformIcon,
  IonicIcon,
  SassIcon,
  RubyOnRailsIcon,
  ReduxIcon,
  NestjsIcon,
  AzureIcon,
  GoogleCloudIcon,
  AwsIcon,
  DigitaloceanIcon,
  PostgresqlIcon,
  MongodbIcon,
  RedisIcon,
  DockerIcon,
  KubernetesIcon,
  GitIcon,
  GithubIcon,
  CloudflareIcon,
  FirebaseIcon,
  NginxIcon,
  SupabaseIcon,
  TailwindcssIcon,
  CypressIcon,
  FigmaIcon,
  MuiIcon,
  NpmIcon,
  PlaywrightIcon,
  PostmanIcon,
  PrismaIcon,
  RollupIcon,
  StorybookIcon,
} from "@/components/ui/icons"

const technologies = [
  { name: "PHP", icon: PhpIcon, color: "#777BB4" },
  { name: "HTML", icon: HtmlIcon, color: "#E34F26" },
  { name: "CSS", icon: CssIcon, color: "#1572B6" },
  { name: "JavaScript", icon: JavascriptIcon, color: "#F7DF1E" },
  { name: "TypeScript", icon: TypescriptIcon, color: "#3178C6" },

  { name: "Golang", icon: GoIcon, color: "#00ADD8" },
  { name: "Python", icon: PythonIcon, color: "#3776AB" },
  { name: "Ruby", icon: RubyIcon, color: "#CC342D" },
  { name: "Kotlin", icon: KotlinIcon, color: "#7F52FF" },
  { name: "React", icon: ReactIcon, color: "#61DAFB" },

  { name: "Angular", icon: AngularIcon, color: "#DD0031" },
  { name: "gRPC", icon: GrpcIcon, color: "#00ADD8" },
  { name: "Vue", icon: VueIcon, color: "#4FC08D" },
  { name: "Next.js", icon: NextjsIcon, color: "#000000" },
  { name: "Flutter", icon: FlutterIcon, color: "#02569B" },

  { name: "Node.js", icon: NodejsIcon, color: "#339933" },
  { name: "Vite.js", icon: ViteIcon, color: "#646CFF" },
  { name: "Webpack", icon: WebpackIcon, color: "#8DD6F9" },
  { name: "Jetpack Compose", icon: JetpackComposeIcon, color: "#7F52FF" },
  { name: "Kotlin Multiplatform", icon: KotlinMultiplatformIcon, color: "#7F52FF" },

  { name: "Ionic", icon: IonicIcon, color: "#3880FF" },
  { name: "Sass", icon: SassIcon, color: "#CC6699" },
  { name: "Ruby on Rails", icon: RubyOnRailsIcon, color: "#CC0000" },
  { name: "Redux", icon: ReduxIcon, color: "#764ABC" },
  { name: "NestJS", icon: NestjsIcon, color: "#E0234E" },

  { name: "Azure", icon: AzureIcon, color: "#0078D4" },
  { name: "Google Cloud", icon: GoogleCloudIcon, color: "#4285F4" },
  { name: "AWS", icon: AwsIcon, color: "#FF9900" },
  { name: "DigitalOcean", icon: DigitaloceanIcon, color: "#0080FF" },
  { name: "PostgreSQL", icon: PostgresqlIcon, color: "#336791" },

  { name: "MongoDB", icon: MongodbIcon, color: "#47A248" },
  { name: "Redis", icon: RedisIcon, color: "#DC382D" },
  { name: "Docker", icon: DockerIcon, color: "#2496ED" },
  { name: "Kubernetes", icon: KubernetesIcon, color: "#326CE5" },
  { name: "Git", icon: GitIcon, color: "#F05032" },

  { name: "GitHub", icon: GithubIcon, color: "#181717" },
  { name: "Cloudflare", icon: CloudflareIcon, color: "#F38020" },
  { name: "Firebase", icon: FirebaseIcon, color: "#FFCA28" },
  { name: "Nginx", icon: NginxIcon, color: "#009639" },
  { name: "Supabase", icon: SupabaseIcon, color: "#3ECF8E" },

  { name: "Tailwind", icon: TailwindcssIcon, color: "#06B6D4" },
  { name: "Cypress", icon: CypressIcon, color: "#17202C" },
  { name: "Figma", icon: FigmaIcon, color: "#F24E1E" },
  { name: "MUI", icon: MuiIcon, color: "#007FFF" },
  { name: "NPM", icon: NpmIcon, color: "#CB3837" },

  { name: "Playwright", icon: PlaywrightIcon, color: "#2EAD33" },
  { name: "Postman", icon: PostmanIcon, color: "#FF6C37" },
  { name: "Prisma", icon: PrismaIcon, color: "#2D3748" },
  { name: "Rollup", icon: RollupIcon, color: "#EC4A3F" },
  { name: "Storybook", icon: StorybookIcon, color: "#FF4785" },
]

export default function StackPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Stack</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto text-balance">
            I often receive many messages asking about the software, tools, languages and services I use in my daily
            life. So I decided to list everything in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech) => {
            const IconComponent = tech.icon
            return (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group"
              >
                <div className="mb-3 transition-transform group-hover:scale-110">
                  <IconComponent size={40} style={{ color: tech.color }} className="drop-shadow-sm" />
                </div>
                <span className="text-sm font-medium text-center text-foreground/90">{tech.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
