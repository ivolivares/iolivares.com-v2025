import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 1,
      url: "https://acme.com",
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.8,
      url: "https://acme.com/about",
    },
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 0.5,
      url: "https://acme.com/blog",
    },
  ]
}
