import { Footer } from "@/components/footer"
import Navigation from "@/components/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-16">
      <Navigation />
      {children}
      <Footer />
    </main>
  )
}
