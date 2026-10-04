"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Container,
  Heading,
  Section,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"
import type { PostMeta } from "@/lib/blog"

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function FieldNotes() {
  const [posts, setPosts] = useState<PostMeta[] | null>(null)

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
  }, [])

  if (!posts || posts.length === 0) return null

  return (
    <Section id="field-notes" className="theme-cream">
      <Container>
        <TerminalLabel>Field notes</TerminalLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Heading level={2}>Notes from the diligence desk.</Heading>
            <p className="mt-3 leading-relaxed text-muted">
              Field observations on RV park and manufactured-housing
              acquisitions. For buyers who like their answers with evidence
              attached.
            </p>
          </div>
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline"
          >
            View all field notes
          </Link>
        </div>

        <div
          className={cn(
            "mt-10 grid gap-4",
            posts.length > 1 && "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/60"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                {formatDate(post.date)}
              </p>
              <h3 className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              )}
              <span className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-primary">
                Read the note
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
