import { MetadataRoute } from "next"

import { META_THEME_COLORS, siteConfig } from "@/config/site"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    background_color: META_THEME_COLORS.dark,
    description: siteConfig.description,
    display: "minimal-ui",
    icons: [
      {
        sizes: "16x16",
        src: "/favicon-16x16.png",
        type: "image/png",
      },
      {
        sizes: "32x32",
        src: "/favicon-32x32.png",
        type: "image/png",
      },
      {
        sizes: "192x192",
        src: "/io-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/io-512x512.png",
        type: "image/png",
      },
      {
        sizes: "1024x1024",
        src: "/io-1024x1024.png",
        type: "image/png",
      },
      {
        sizes: "1536x1536",
        src: "/io-1536x1536.png",
        type: "image/png",
      },
      {
        sizes: "2048x2048",
        src: "/io-2048x2048.png",
        type: "image/png",
      },
      {
        sizes: "2560x2560",
        src: "/io-2560x2560.png",
        type: "image/png",
      },
      {
        sizes: "3072x3072",
        src: "/io-3072x3072.png",
        type: "image/png",
      },
    ],
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: "/",
    theme_color: META_THEME_COLORS.light,
  }
}
