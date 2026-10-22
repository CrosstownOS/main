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
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/workspace", changeFrequency: "weekly", priority: 0.95 },
  { path: "/pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resources", changeFrequency: "monthly", priority: 0.9 },
  { path: "/parkproof-standard", changeFrequency: "monthly", priority: 0.85 },
  { path: "/parkproof-walkthrough", changeFrequency: "monthly", priority: 0.85 },
  { path: "/data-room-vs-diligence-software", changeFrequency: "monthly", priority: 0.8 },
  { path: "/for-brokers-lenders", changeFrequency: "monthly", priority: 0.8 },
  { path: "/trail-log", changeFrequency: "weekly", priority: 0.8 },
  { path: "/resources/catalog", changeFrequency: "monthly", priority: 0.8 },
  { path: "/checklist", changeFrequency: "monthly", priority: 0.8 },
  { path: "/buying-an-rv-park", changeFrequency: "monthly", priority: 0.85 },
  { path: "/buying-a-campground", changeFrequency: "monthly", priority: 0.85 },
  { path: "/mobile-home-park-investing", changeFrequency: "monthly", priority: 0.85 },
  { path: "/rv-park-investing", changeFrequency: "monthly", priority: 0.85 },
  { path: "/tools/60-second-screener", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/rent-roll-truth-check", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/expense-normalizer", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/utility-capacity-triage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/poh-toh-split", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tools/emd-clock", changeFrequency: "monthly", priority: 0.8 },
  { path: "/editorial-standards", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  // Sort by date descending explicitly to find the latest post.
  // Do not rely on getAllPosts() internal ordering.
  const sortedByDate = [...posts].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  )
  const latestPostDate =
    sortedByDate.length > 0
      ? new Date(sortedByDate[0].date + "T12:00:00")
      : new Date()

  return [
    ...CORE_ROUTES.map((route) => ({
      url: `${BASE}${route.path}`,
      ...(route.path === "/blog" ? { lastModified: latestPostDate } : {}),
      changeFrequency: route.changeFrequency as "weekly" | "monthly",
      priority: route.priority,
    })),
    ...RESOURCE_DETAILS.map((resource) => ({
      url: `${BASE}/resources/${resource.slug}`,
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

