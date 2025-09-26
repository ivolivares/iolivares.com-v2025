import Link from "next/link"

export default function UsesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <h1 className="text-4xl font-bold mb-12 text-balance">Uses</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Hardware</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                14-inch MacBook Pro 16GB (M4, 2025)
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                Mac Mini 16GB (M4, 2024)
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                LG UltraGear UHD Monitor (32GQ750-B)
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                LG UHD Monitor (32UN550-W)
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                Logitech MX Master 3S
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                NuPhy Kick75
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                Logitech MX Keys S
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                iPhone 16 Pro
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Software</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                <span>Editor: </span>
                <Link
                  href="https://cursor.sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors ml-1"
                >
                  Cursor
                </Link>
                <span className="mx-1">/</span>
                <Link
                  href="https://zed.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors"
                >
                  Zed
                </Link>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                <span>Browser: </span>
                <Link
                  href="https://www.microsoft.com/edge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors ml-1"
                >
                  Edge
                </Link>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                <span>Terminal: </span>
                <Link
                  href="https://ghostty.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors ml-1"
                >
                  Ghostty
                </Link>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                <span>Container management: </span>
                <Link
                  href="https://orbstack.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors ml-1"
                >
                  Orbstack
                </Link>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0"></span>
                <span>API testing: </span>
                <Link
                  href="https://httpie.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors ml-1"
                >
                  httpie
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
