import {
  AngularIcon,
  AwsIcon,
  AzureIcon,
  CloudflareIcon,
  CssIcon,
  CypressIcon,
  DigitaloceanIcon,
  DockerIcon,
  FigmaIcon,
  FirebaseIcon,
  FlutterIcon,
  GithubIcon,
  GitIcon,
  GoIcon,
  GoogleCloudIcon,
  GrpcIcon,
  HtmlIcon,
  IonicIcon,
  JavascriptIcon,
  JetpackComposeIcon,
  KotlinIcon,
  KotlinMultiplatformIcon,
  KubernetesIcon,
  MongodbIcon,
  MuiIcon,
  NestjsIcon,
  NextjsIcon,
  NginxIcon,
  NodejsIcon,
  NpmIcon,
  PhpIcon,
  PlaywrightIcon,
  PostgresqlIcon,
  PostmanIcon,
  PrismaIcon,
  PythonIcon,
  ReactIcon,
  RedisIcon,
  ReduxIcon,
  RollupIcon,
  RubyIcon,
  RubyOnRailsIcon,
  SassIcon,
  StorybookIcon,
  SupabaseIcon,
  TailwindcssIcon,
  TypescriptIcon,
  ViteIcon,
  VueIcon,
  WebpackIcon,
} from "@/components/ui/icons"

const technologies = [
  { color: "#777BB4", icon: PhpIcon, name: "PHP" },
  { color: "#E34F26", icon: HtmlIcon, name: "HTML" },
  { color: "#1572B6", icon: CssIcon, name: "CSS" },
  { color: "#F7DF1E", icon: JavascriptIcon, name: "JavaScript" },
  { color: "#3178C6", icon: TypescriptIcon, name: "TypeScript" },

  { color: "#00ADD8", icon: GoIcon, name: "Golang" },
  { color: "#3776AB", icon: PythonIcon, name: "Python" },
  { color: "#CC342D", icon: RubyIcon, name: "Ruby" },
  { color: "#7F52FF", icon: KotlinIcon, name: "Kotlin" },
  { color: "#61DAFB", icon: ReactIcon, name: "React" },

  { color: "#DD0031", icon: AngularIcon, name: "Angular" },
  { color: "#00ADD8", icon: GrpcIcon, name: "gRPC" },
  { color: "#4FC08D", icon: VueIcon, name: "Vue" },
  { color: "#000000", icon: NextjsIcon, name: "Next.js" },
  { color: "#02569B", icon: FlutterIcon, name: "Flutter" },

  { color: "#339933", icon: NodejsIcon, name: "Node.js" },
  { color: "#646CFF", icon: ViteIcon, name: "Vite.js" },
  { color: "#8DD6F9", icon: WebpackIcon, name: "Webpack" },
  { color: "#7F52FF", icon: JetpackComposeIcon, name: "Jetpack Compose" },
  { color: "#7F52FF", icon: KotlinMultiplatformIcon, name: "Kotlin Multiplatform" },

  { color: "#3880FF", icon: IonicIcon, name: "Ionic" },
  { color: "#CC6699", icon: SassIcon, name: "Sass" },
  { color: "#CC0000", icon: RubyOnRailsIcon, name: "Ruby on Rails" },
  { color: "#764ABC", icon: ReduxIcon, name: "Redux" },
  { color: "#E0234E", icon: NestjsIcon, name: "NestJS" },

  { color: "#0078D4", icon: AzureIcon, name: "Azure" },
  { color: "#4285F4", icon: GoogleCloudIcon, name: "Google Cloud" },
  { color: "#FF9900", icon: AwsIcon, name: "AWS" },
  { color: "#0080FF", icon: DigitaloceanIcon, name: "DigitalOcean" },
  { color: "#336791", icon: PostgresqlIcon, name: "PostgreSQL" },

  { color: "#47A248", icon: MongodbIcon, name: "MongoDB" },
  { color: "#DC382D", icon: RedisIcon, name: "Redis" },
  { color: "#2496ED", icon: DockerIcon, name: "Docker" },
  { color: "#326CE5", icon: KubernetesIcon, name: "Kubernetes" },
  { color: "#F05032", icon: GitIcon, name: "Git" },

  { color: "#181717", icon: GithubIcon, name: "GitHub" },
  { color: "#F38020", icon: CloudflareIcon, name: "Cloudflare" },
  { color: "#FFCA28", icon: FirebaseIcon, name: "Firebase" },
  { color: "#009639", icon: NginxIcon, name: "Nginx" },
  { color: "#3ECF8E", icon: SupabaseIcon, name: "Supabase" },

  { color: "#06B6D4", icon: TailwindcssIcon, name: "Tailwind" },
  { color: "#17202C", icon: CypressIcon, name: "Cypress" },
  { color: "#F24E1E", icon: FigmaIcon, name: "Figma" },
  { color: "#007FFF", icon: MuiIcon, name: "MUI" },
  { color: "#CB3837", icon: NpmIcon, name: "NPM" },

  { color: "#2EAD33", icon: PlaywrightIcon, name: "Playwright" },
  { color: "#FF6C37", icon: PostmanIcon, name: "Postman" },
  { color: "#2D3748", icon: PrismaIcon, name: "Prisma" },
  { color: "#EC4A3F", icon: RollupIcon, name: "Rollup" },
  { color: "#FF4785", icon: StorybookIcon, name: "Storybook" },
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
