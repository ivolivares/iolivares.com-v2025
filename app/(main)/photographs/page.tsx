"use client"

import { Camera, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Photo {
  id: number
  title: string
  location: string
  camera: string
  src: string
  alt: string
}

const photos: Photo[] = [
  {
    alt: "Rio de Janeiro beach scene with mountains",
    camera: "Shot on iPhone 12 Pro Max",
    id: 1,
    location: "Brazil",
    src: "/rio-de-janeiro-beach-with-mountains.jpg",
    title: "Rio de Janeiro",
  },
  {
    alt: "Historic town of Ouro Preto with church",
    camera: "Camera: Sony Alpha 5100 | Lens: 50mm F1.8",
    id: 2,
    location: "Brazil",
    src: "/historic-town-with-church-towers.jpg",
    title: "Ouro Preto",
  },
  {
    alt: "Waterfall in forest landscape",
    camera: "Shot on iPhone 13",
    id: 3,
    location: "Brazil",
    src: "/waterfall-in-lush-green-forest.jpg",
    title: "Canela",
  },
  {
    alt: "São Paulo modern buildings and skyscrapers",
    camera: "Shot on iPhone 13",
    id: 4,
    location: "Brazil",
    src: "/modern-skyscrapers-and-urban-buildings.jpg",
    title: "São Paulo",
  },
  {
    alt: "Salvador coastal city view",
    camera: "Shot on iPhone 13",
    id: 5,
    location: "Brazil",
    src: "/coastal-city-view-with-harbor.jpg",
    title: "Salvador",
  },
]

export default function PhotographsPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            The world seen through my lenses.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
            My favorite hobby is photography. I love capturing landscapes and moments in the amazing places I've
            visited. On this page, you'll find the best photos I've taken in some of the most incredible locations I've
            had the chance to explore.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div key={photo.id} className="group cursor-pointer" onClick={() => openLightbox(photo)}>
              <div className="relative overflow-hidden rounded-lg bg-muted aspect-[4/3] mb-4">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="h-5 w-5 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground text-lg">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.camera}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedPhoto.src || "/placeholder.svg"}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Photo Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold mb-1">{selectedPhoto.title}</h3>
                <p className="text-white/80 text-sm">{selectedPhoto.camera}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
