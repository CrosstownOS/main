import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { RESOURCE_DETAILS } from "@/lib/resources"

const BASE = "https://www.crosstownosrv.camp"

type CoreRoute = {
  path: string
  changeFrequency: "weekly" | "monthly"
  priority: number
}

const CORE_ROUTES: CoreRoute[] = [
    { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
{ path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/parkproof-standard", changeFrequency: "monthly", priority: 0.85 },
  { path: "/parkproof-walkthrough", changeFrequency: "monthly", priority: 0.85 },
  { path: "/for-brokers-lenders", changeFrequency: "monthly", priority: 0.8 },
  { path: "/editorial-standards", changeFrequency: "monthly", priority: 0.7 },
  { path: "/workspace", changeFrequency: "weekly", priority: 0.95 },
  { path: "/trail-log", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.9 },
  { path: "/resources/catalog", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools/60-second-screener", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/rent-roll-truth-check", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/expense-normalizer", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/utility-capacity-triage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/poh-toh-split", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/emd-clock", changeFrequency: "monthly", priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const latestPostDate =
    posts.length > 0 ? new Date(posts[0].date + "T12:00:00") : new Date()

  return [
    ...CORE_ROUTES.map((route, index) => ({
      url: `${BASE}${route.path}`,
      lastModified:
        route.path === "/blog" ? latestPostDate : new Date(),
      changeFrequency: route.changeFrequency as "weekly" | "monthly",
      priority: route.priority,
    })),
    ...RESOURCE_DETAILS.map((resource) => ({
      url: `${BASE}/resources/${resource.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...posts.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date + "T12:00:00"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
