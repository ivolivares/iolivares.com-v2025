import { VinylRecord } from "@/components/vinyl-record"

// Sample vinyl data with lorem ipsum content
const vinylCollection = [
  {
    artist: "Sit Amet",
    coverImage: "/abstract-album-cover-blue-geometric.jpg",
    id: 1,
    isSoldOut: true,
    price: "$35.00",
    title: "Lorem Ipsum Dolor",
  },
  {
    artist: "Elit Sed",
    coverImage: "/vintage-album-cover-orange-sunset.jpg",
    id: 2,
    price: "$42.00",
    title: "Consectetur Adipiscing",
  },
  {
    artist: "Incididunt Ut",
    coverImage: "/minimalist-album-cover-green-nature.jpg",
    id: 3,
    price: "$38.50",
    title: "Eiusmod Tempor",
  },
  {
    artist: "Magna Aliqua",
    coverImage: "/retro-album-cover-purple-neon.jpg",
    id: 4,
    price: "from $44.00",
    title: "Labore Et Dolore",
  },
  {
    artist: "Minim Veniam",
    coverImage: "/dark-album-cover-black-metal.jpg",
    id: 5,
    price: "$36.00",
    title: "Ut Enim Ad",
  },
  {
    artist: "Exercitation",
    coverImage: "/colorful-album-cover-rainbow-pop.jpg",
    id: 6,
    price: "$40.00",
    title: "Quis Nostrud",
  },
  {
    artist: "Nisi Ut",
    coverImage: "/acoustic-album-cover-wood-folk.jpg",
    id: 7,
    price: "from $26.00",
    title: "Ullamco Laboris",
  },
  {
    artist: "Commodo Consequat",
    coverImage: "/electronic-album-cover-cyan-digital.jpg",
    id: 8,
    price: "from $32.00",
    title: "Aliquip Ex Ea",
  },
  {
    artist: "Dolor In",
    coverImage: "/jazz-album-cover-gold-saxophone.jpg",
    id: 9,
    isSoldOut: true,
    price: "$32.00",
    title: "Duis Aute Irure",
  },
  {
    artist: "Voluptate Velit",
    coverImage: "/indie-album-cover-pink-dreamy.jpg",
    id: 10,
    price: "from $18.00",
    title: "Reprehenderit",
  },
  {
    artist: "Eu Fugiat",
    coverImage: "/rock-album-cover-red-guitar.jpg",
    id: 11,
    price: "$42.00",
    title: "Esse Cillum Dolore",
  },
  {
    artist: "Excepteur Sint",
    coverImage: "/classical-album-cover-white-piano.jpg",
    id: 12,
    price: "$16.50",
    title: "Nulla Pariatur",
  },
  {
    artist: "Non Proident",
    coverImage: "/ambient-album-cover-blue-waves.jpg",
    id: 13,
    price: "from $16.00",
    title: "Occaecat Cupidatat",
  },
  {
    artist: "Qui Officia",
    coverImage: "/hip-hop-album-cover-urban-graffiti.jpg",
    id: 14,
    price: "$42.00",
    title: "Sunt In Culpa",
  },
  {
    artist: "Anim Id",
    coverImage: "/country-album-cover-brown-landscape.jpg",
    id: 15,
    price: "$16.50",
    title: "Deserunt Mollit",
  },
  {
    artist: "Sed Ut",
    coverImage: "/placeholder.svg?height=400&width=400",
    id: 16,
    price: "$35.00",
    title: "Est Laborum",
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
