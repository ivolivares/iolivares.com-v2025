import Navigation from "@/components/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
