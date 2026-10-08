import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { getAllPosts } from "@/lib/blog"
import SignalLine from "@/components/ui/SignalLine"

export const metadata: Metadata = {
  title: "Field Notes | CrosstownOS",
  description:
    "Acquisition intelligence for RV park and manufactured-housing buyers. Field notes on diligence, underwriting, and knowing what is true before you buy.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Field Notes | CrosstownOS",
    description:
      "Acquisition intelligence for RV park and manufactured-housing buyers. Field notes on diligence, underwriting, and knowing what is true before you buy.",
    type: "website",
    url: "/blog",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Field Notes | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes | CrosstownOS",
    description:
      "Acquisition intelligence for RV park and manufactured-housing buyers. Field notes on diligence, underwriting, and knowing what is true before you buy.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

function formatDate(iso: string) {
  const d = new Date(iso + "T12:00:00")
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS // Field Notes</p>
          <SignalLine />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Know what is true before you buy.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Acquisition intelligence for RV park and manufactured-housing buyers.
            Diligence notes, underwriting discipline, and field observations from
            the deals we study.
          </p>
          <div className="mt-12 space-y-2">
            {posts.length === 0 && (
              <p className="theme-cream border border-border bg-card p-8 text-sm text-muted">
                The first field note is on its way. Check back soon.
              </p>
            )}

            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="theme-cream card-lift group block border border-border bg-card p-6 transition-colors hover:border-primary/60 sm:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  {formatDate(post.date)}
                </p>
                <h2 className="serif-display mt-2 text-2xl tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
