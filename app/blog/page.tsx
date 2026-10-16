import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
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
        url: "/og-logo.png",
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
    images: ["/og-logo.png"],
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Field Notes",
    description:
      "Acquisition intelligence for RV park and manufactured-housing buyers. Field notes on diligence, underwriting, and knowing what is true before you buy.",
    url: "https://www.crosstownosrv.camp/blog",
    publisher: {
      "@type": "Organization",
      name: "CrosstownOS",
      logo: {
        "@type": "ImageObject",
        url: "https://www.crosstownosrv.camp/logo.jpg",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        description: post.excerpt,
        url: `https://www.crosstownosrv.camp/blog/${post.slug}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Field Notes" },
            ]}
          />
          <p className="mono-label mb-4">CrosstownOS // Field Notes</p>
          <SignalLine />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Field Notes: what operators learn before they buy.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Acquisition intelligence for RV park and manufactured-housing buyers.
            Diligence notes and underwriting discipline for buyers working a
            live deal.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            {posts.length} Field Notes are published, newest first. Each one
            publishes with a Sources and Limits section and an AI-assistance
            note, under the{" "}
            <Link href="/editorial-standards" className="font-semibold text-primary hover:underline">
              editorial standards
            </Link>
            .
          </p>
          <a
            href="/blog/rss.xml"
            className="mono-label mt-6 inline-block text-primary hover:underline"
          >
            Subscribe via RSS
          </a>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            Reading is the start.{" "}
            <Link href="/tools" className="font-semibold text-primary hover:underline">
              Run the working papers
            </Link>{" "}
            on your live deal, work the{" "}
            <Link href="/checklist" className="font-semibold text-primary hover:underline">
              free diligence checklist
            </Link>
            , or bring it all to the{" "}
            <Link href="/workspace" className="font-semibold text-primary hover:underline">
              Acquisition Workspace
            </Link>
            .
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
