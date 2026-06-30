import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev()
}

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "i.scdn.co", // Spotify Album Art
      },
      {
        hostname: "pbs.twimg.com", // Twitter Profile Picture
      },
      {
        hostname: "res.cloudinary.com", // Cloudinary Pictures
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
