import { VinylRecord } from "@/components/vinyl-record"

// Sample vinyl data with lorem ipsum content
const vinylCollection = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor",
    artist: "Sit Amet",
    price: "$35.00",
    coverImage: "/abstract-album-cover-blue-geometric.jpg",
    isSoldOut: true,
  },
  {
    id: 2,
    title: "Consectetur Adipiscing",
    artist: "Elit Sed",
    price: "$42.00",
    coverImage: "/vintage-album-cover-orange-sunset.jpg",
  },
  {
    id: 3,
    title: "Eiusmod Tempor",
    artist: "Incididunt Ut",
    price: "$38.50",
    coverImage: "/minimalist-album-cover-green-nature.jpg",
  },
  {
    id: 4,
    title: "Labore Et Dolore",
    artist: "Magna Aliqua",
    price: "from $44.00",
    coverImage: "/retro-album-cover-purple-neon.jpg",
  },
  {
    id: 5,
    title: "Ut Enim Ad",
    artist: "Minim Veniam",
    price: "$36.00",
    coverImage: "/dark-album-cover-black-metal.jpg",
  },
  {
    id: 6,
    title: "Quis Nostrud",
    artist: "Exercitation",
    price: "$40.00",
    coverImage: "/colorful-album-cover-rainbow-pop.jpg",
  },
  {
    id: 7,
    title: "Ullamco Laboris",
    artist: "Nisi Ut",
    price: "from $26.00",
    coverImage: "/acoustic-album-cover-wood-folk.jpg",
  },
  {
    id: 8,
    title: "Aliquip Ex Ea",
    artist: "Commodo Consequat",
    price: "from $32.00",
    coverImage: "/electronic-album-cover-cyan-digital.jpg",
  },
  {
    id: 9,
    title: "Duis Aute Irure",
    artist: "Dolor In",
    price: "$32.00",
    coverImage: "/jazz-album-cover-gold-saxophone.jpg",
    isSoldOut: true,
  },
  {
    id: 10,
    title: "Reprehenderit",
    artist: "Voluptate Velit",
    price: "from $18.00",
    coverImage: "/indie-album-cover-pink-dreamy.jpg",
  },
  {
    id: 11,
    title: "Esse Cillum Dolore",
    artist: "Eu Fugiat",
    price: "$42.00",
    coverImage: "/rock-album-cover-red-guitar.jpg",
  },
  {
    id: 12,
    title: "Nulla Pariatur",
    artist: "Excepteur Sint",
    price: "$16.50",
    coverImage: "/classical-album-cover-white-piano.jpg",
  },
  {
    id: 13,
    title: "Occaecat Cupidatat",
    artist: "Non Proident",
    price: "from $16.00",
    coverImage: "/ambient-album-cover-blue-waves.jpg",
  },
  {
    id: 14,
    title: "Sunt In Culpa",
    artist: "Qui Officia",
    price: "$42.00",
    coverImage: "/hip-hop-album-cover-urban-graffiti.jpg",
  },
  {
    id: 15,
    title: "Deserunt Mollit",
    artist: "Anim Id",
    price: "$16.50",
    coverImage: "/country-album-cover-brown-landscape.jpg",
  },
  {
    id: 16,
    title: "Est Laborum",
    artist: "Sed Ut",
    price: "$35.00",
    coverImage: "/placeholder.svg?height=400&width=400",
  },
]

export default function VinylsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">MY VINYL COLLECTION</h1>
        </div>

        {/* Vinyl Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-20">
          {vinylCollection.map((vinyl) => (
            <VinylRecord
              key={vinyl.id}
              title={vinyl.title}
              artist={vinyl.artist}
              price={vinyl.price}
              coverImage={vinyl.coverImage}
              isSoldOut={vinyl.isSoldOut}
            />
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="text-center bg-muted/30 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">BE THE FIRST TO KNOW ABOUT EVERYTHING</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            LEFTOVER DROPS FOR SOLD OUT TITLES, NEW DROPS, SALES, NEW RELEASES, AND MORE THROUGH SMS
          </p>
        </div>
      </div>
    </div>
  )
}
