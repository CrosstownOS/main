import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

const BASE = "https://www.crosstownosrv.camp"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].date + "T12:00:00") : new Date()

  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date + "T12:00:00"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
