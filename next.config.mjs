/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
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
