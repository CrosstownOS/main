import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export interface Post extends PostMeta {
  content: string
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts")

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDir()
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "")
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8")
    const { data } = matter(raw)

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    } satisfies PostMeta
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  ensurePostsDir()
  const filePath = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  }
}

export function getAllSlugs(): string[] {
  ensurePostsDir()
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const posts = getAllPosts()
  const current = posts.find((p) => p.slug === slug)
  if (!current) return []

  return posts
    .filter(
      (p) =>
        p.slug !== slug && p.tags.some((tag) => current.tags.includes(tag)),
    )
    .slice(0, limit)
}
