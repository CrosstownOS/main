import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { getAllSlugs, getPost, getRelatedPosts, getSeoDescription, getSeoTitle } from "@/lib/blog"
import { RESOURCE_DETAIL_BY_SLUG } from "@/lib/resources"
import SignalLine from "@/components/ui/SignalLine"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "Not found | CrosstownOS" }

  const seoTitle = getSeoTitle(post)
  const seoDescription = getSeoDescription(post)

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
      authors: ["CrosstownOS"],
      images: [
        {
          url: "/og-logo.png",
          width: 1024,
          height: 1024,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ["/og-logo.png"],
    },
  }
}

const POST_RESOURCE_SLUGS: Record<string, string> = {
  "anatomy-of-a-broker-package": "broker-package-intake-sheet",
  "before-you-underwrite-establish-what-is-true": "the-evidence-status-standard",
  "manufactured-housing-diligence-starts-with-who-owns-the-homes": "poh-toh-split-valuation-worksheet",
  "read-the-pl-like-the-other-side-wrote-it": "mom-and-pop-expense-normalizer",
  "reported-occupancy-is-not-paying-occupancy": "the-rent-roll-truth-check",
  "speed-is-a-strategy-for-sellers-not-buyers": "the-walk-away-pact",
  "the-permits-buyers-skip": "evidence-request-list",
  "the-rent-roll-is-a-claim-not-income-verification": "the-rent-roll-truth-check",
  "the-utility-system-nobody-underwrote": "utility-and-wastewater-diligence-sheet",
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

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)
  const nextResource = POST_RESOURCE_SLUGS[slug]
    ? RESOURCE_DETAIL_BY_SLUG[POST_RESOURCE_SLUGS[slug]]
    : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "CrosstownOS",
    },
    publisher: {
      "@type": "Organization",
      name: "CrosstownOS",
      logo: {
        "@type": "ImageObject",
        url: "https://www.crosstownosrv.camp/logo.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.crosstownosrv.camp/blog/${slug}`,
    },
  }

  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <article className="relative z-10">
          <div className="mx-auto w-full max-w-3xl px-4 pt-32 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Link
            href="/blog"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary hover:underline"
          >
            &larr; All field notes
          </Link>

          <p className="mono-label mb-4 mt-8">Field Note</p>
          <SignalLine />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              {formatDate(post.date)}
            </p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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
          </div>
          </div>
          <div className="theme-cream mt-10 bg-background">
            <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
          <div className="paper p-6 sm:p-8">
            <div className="prose-blog">
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="serif-display mb-4 mt-10 text-2xl tracking-tight sm:text-3xl">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-3 mt-8 text-lg font-bold tracking-tight">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-5 text-base leading-relaxed text-foreground/90">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-foreground/90">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="theme-cream mb-5 border-l-2 border-primary bg-card px-5 py-4 text-base italic leading-relaxed text-foreground/90">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-foreground">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-2 hover:no-underline"
                  >
                    {children}
                  </a>
                ),
                hr: () => <hr className="my-10 border-border" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="theme-cream mt-16 border border-border bg-card p-6 sm:p-8">
            <p className="mono-label mb-3">Next step</p>
            <p className="text-sm leading-relaxed text-muted">
              Start with the free Acquisition Signal resources: the working
              papers behind the Field Notes, including the tool this note
              points to.
            </p>
            {nextResource ? (
              <>
                <Link
                  href={`/resources/${nextResource.slug}`}
                  className="mt-5 inline-block border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  Get {nextResource.code ? `${nextResource.code}: ` : ""}{nextResource.title}
                </Link>
                <Link
                  href="/resources/catalog"
                  className="mt-4 block text-sm font-semibold text-primary hover:underline"
                >
                  Browse the full catalog
                </Link>
              </>
            ) : (
              <Link
                href="/resources"
                className="mt-5 inline-block border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                Get the free resources
              </Link>
            )}
            <p className="mt-8 border-t border-border/60 pt-6 text-sm leading-relaxed text-muted">
              Running a live deal? Bring it to the Acquisition Workspace and work it inside
              CrosstownOS, from intake to a documented
              decision posture.
            </p>
            <Link
              href="/workspace"
              className="mt-5 inline-block border border-primary/60 bg-primary-deep px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90"
            >
              Apply for a pilot place
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <p className="mono-label mb-6">More field notes</p>
              <div className="space-y-2">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="theme-cream group block border border-border bg-card p-6 transition-colors hover:border-primary/60 sm:p-8"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                      {formatDate(rel.date)}
                    </p>
                    <h2 className="serif-display mt-2 text-2xl tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                      {rel.title}
                    </h2>
                    {rel.excerpt && (
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {rel.excerpt}
                      </p>
                    )}
                    {rel.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {rel.tags.map((tag) => (
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
          )}

          <p className="mt-12 border-t border-border/60 pt-6 text-xs leading-relaxed text-muted">
            Field Notes teaches with synthetic scenarios, anonymized composites,
            and general acquisition patterns. It does not disclose client,
            community-member, or live-deal information.{" "}
            <Link
              href="/editorial-standards"
              className="text-foreground underline underline-offset-2 hover:no-underline"
            >
              Our editorial standards
            </Link>
            .
          </p>
          </div>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
