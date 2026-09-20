import { getAllPosts } from "@/lib/blog"

const BASE = "https://www.crosstownosrv.camp"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map((post) => {
      const url = `${BASE}/blog/${post.slug}`
      const pubDate = new Date(post.date + "T12:00:00").toUTCString()
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>CrosstownOS // Field Notes</title>",
    `    <link>${BASE}/blog</link>`,
    "    <description>Acquisition intelligence for RV park and manufactured-housing buyers. Field notes on diligence, underwriting, and knowing what is true before you buy.</description>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n")

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
