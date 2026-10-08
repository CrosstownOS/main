import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { GatedDownloadButton } from "@/components/GatedDownload"
import { getAllPosts, type PostMeta } from "@/lib/blog"
import {
  PART_BY_ID,
  RESOURCE_DETAIL_BY_SLUG,
  RESOURCE_DETAILS,
  TOOLS,
  resourceSlug,
  type ResourceDetail,
} from "@/lib/resources"

const BASE_URL = "https://www.crosstownosrv.camp"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

const RELATED_POST_SLUGS: Record<string, string[]> = {
  "broker-package-intake-sheet": ["anatomy-of-a-broker-package"],
  "mom-and-pop-expense-normalizer": ["read-the-pl-like-the-other-side-wrote-it"],
  "the-rv-expense-normalizer": ["read-the-pl-like-the-other-side-wrote-it"],
  "utility-and-wastewater-diligence-sheet": ["the-utility-system-nobody-underwrote"],
  "the-rent-roll-truth-check": [
    "the-rent-roll-is-a-claim-not-income-verification",
    "reported-occupancy-is-not-paying-occupancy",
  ],
  "rent-roll-truth-check-rv-edition": [
    "the-rent-roll-is-a-claim-not-income-verification",
    "reported-occupancy-is-not-paying-occupancy",
  ],
  "the-evidence-status-standard": ["before-you-underwrite-establish-what-is-true"],
}

export function generateStaticParams() {
  return RESOURCE_DETAILS.map((resource) => ({ slug: resource.slug }))
}

/** Resources with a live working-paper version. Maps resource slug to tool slug + name. */
const LIVE_TOOL_BY_SLUG: Record<string, { toolSlug: string; toolName: string }> = {
  "60-second-deal-screener": { toolSlug: "60-second-screener", toolName: "60-Second Deal Screener" },
  "the-rent-roll-truth-check": { toolSlug: "rent-roll-truth-check", toolName: "Rent-Roll Truth Check" },
  "rent-roll-truth-check-rv-edition": { toolSlug: "rent-roll-truth-check", toolName: "Rent-Roll Truth Check" },
  "mom-and-pop-expense-normalizer": { toolSlug: "expense-normalizer", toolName: "Expense Normalizer" },
  "the-rv-expense-normalizer": { toolSlug: "expense-normalizer", toolName: "Expense Normalizer" },
  "utility-and-wastewater-diligence-sheet": { toolSlug: "utility-capacity-triage", toolName: "Utility Capacity Risk Triage" },
  "the-emd-countdown-tracker": { toolSlug: "emd-clock", toolName: "EMD Clock and Gate Tracker" },
  "poh-toh-split-valuation-worksheet": { toolSlug: "poh-toh-split", toolName: "POH/TOH Split Valuation" },
}

function getResource(slug: string): ResourceDetail | null {
  return RESOURCE_DETAIL_BY_SLUG[slug] ?? null
}

function displayName(resource: ResourceDetail): string {
  return resource.code ? `${resource.code}: ${resource.title}` : resource.title
}

function relatedPosts(resource: ResourceDetail): PostMeta[] {
  const slugs = RELATED_POST_SLUGS[resource.slug] ?? []
  if (slugs.length === 0) return []

  const posts = getAllPosts()
  return slugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is PostMeta => Boolean(post))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) return { title: "Not found | CrosstownOS" }

  const title = `${displayName(resource)} | CrosstownOS`
  const canonical = `/resources/${slug}`

  return {
    title,
    description: resource.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: resource.description,
      type: "website",
      url: canonical,
      images: [
        {
          url: "/images/opengraph.jpg?v=2",
          width: 1024,
          height: 1024,
          alt: displayName(resource),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resource.description,
      images: ["/images/opengraph.jpg?v=2"],
    },
  }
}

export default async function ResourcePage({ params }: PageProps) {
  const { slug } = await params
  const resource = getResource(slug)
  if (!resource) notFound()

  const isTool = Boolean(resource.code && resource.part)
  const part = resource.part ? PART_BY_ID[resource.part] : null
  const partTools = resource.part
    ? TOOLS.filter((candidate) => candidate.part === resource.part)
    : []
  const partIndex = resource.code
    ? partTools.findIndex((candidate) => candidate.code === resource.code)
    : -1
  const previous = partIndex > 0 ? partTools[partIndex - 1] : null
  const next =
    partIndex >= 0 && partIndex < partTools.length - 1 ? partTools[partIndex + 1] : null
  const liveTool = LIVE_TOOL_BY_SLUG[resource.slug] ?? null
  const related = relatedPosts(resource)
  const showParkProofLinks =
    (resource.part ? ["D", "E", "F"].includes(resource.part) : false) ||
    resource.slug === "the-evidence-status-standard"
  const pageUrl = `${BASE_URL}/resources/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Resources",
        item: `${BASE_URL}/resources`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalog",
        item: `${BASE_URL}/resources/catalog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: displayName(resource),
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              <li>
                <Link href="/resources" className="transition-colors hover:text-primary">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/resources/catalog" className="transition-colors hover:text-primary">
                  Catalog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-primary">
                {resource.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {resource.code ?? "Spine"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                Acquisition Signal Resource
              </span>
            </div>
            <h1 className="serif-display mt-5 text-4xl tracking-tight sm:text-5xl">
              {resource.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {resource.description}
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            <section
              aria-labelledby="resource-purpose"
              className="theme-cream paper border border-border p-6 sm:p-8"
            >
              <h2 id="resource-purpose" className="serif-display text-2xl tracking-tight sm:text-3xl">
                {isTool ? "What this tool is for" : "What this page is for"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {resource.description}
              </p>

            </section>
            <section
              aria-labelledby="resource-fit"
              className="theme-cream paper border border-border p-6 sm:p-8"
            >
              <h2 id="resource-fit" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Where it fits
              </h2>
              {part ? (
                <>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    Part {part.id}: {part.name}. This Part asks: {part.question}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    Run the tools in a Part in order; each tool&apos;s Hands to line
                    tells you the next one.
                  </p>
                </>
              ) : (
                <p className="mt-4 text-base leading-relaxed text-muted">
                  Three pages hold the whole library together. Read these before
                  you print anything.
                </p>
              )}
            </section>

            <section
              aria-labelledby="resource-download"
              className="theme-cream flex flex-col border border-border bg-card p-6 sm:p-8"
            >
              <p className="mono-label">Free PDF download</p>
              <h2 id="resource-download" className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl">
                Get {resource.code ?? resource.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                One email unlocks the whole library. The download stays behind
                the same gate as every other Acquisition Signal Resource.
              </p>
              <GatedDownloadButton
                file={resource.file}
                label={resource.code ?? resource.title}
                className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              />
              <Link
                href="/resources/catalog"
                className="mt-6 text-sm font-semibold text-primary hover:underline"
              >
                Back to the full catalog
              </Link>
            </section>
          </div>

          {liveTool && (
            <section
              aria-label="Run this tool live"
              className="theme-cream mt-12 border border-primary/40 bg-primary/5 p-6 sm:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                Live Diligence Working Paper
              </p>
              <h2 className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl">
                Run the {liveTool.toolName} in your browser.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                The PDF is the paper version. The working paper runs the math live, labels
                every number with its evidence state, and exports a branded working paper
                you can keep. Free to use, no account.
              </p>
              <Link
                href={`/tools/${liveTool.toolSlug}`}
                className="mt-6 inline-block bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Open the live tool
              </Link>
            </section>
          )}

          {part && (previous || next) && (
            <nav aria-label="More tools in this Part" className="mt-12">
              <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
                More in Part {part.id}: {part.name}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {previous ? (
                  <Link
                    href={`/resources/${resourceSlug(previous)}`}
                    className="theme-cream group border border-border bg-card p-6 transition-colors hover:border-primary/60"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      Previous in this Part
                    </p>
                    <p className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                      {previous.code}: {previous.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {previous.description}
                    </p>
                  </Link>
                ) : (
                  <div className="theme-cream border border-dashed border-border p-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                      Start of this Part
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {resource.code} is the first tool listed in Part {part.id}.
                    </p>
                  </div>
                )}

                {next ? (
                  <Link
                    href={`/resources/${resourceSlug(next)}`}
                    className="theme-cream group border border-border bg-card p-6 transition-colors hover:border-primary/60"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      Next in this Part
                    </p>
                    <p className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                      {next.code}: {next.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {next.description}
                    </p>
                  </Link>
                ) : (
                  <div className="theme-cream border border-dashed border-border p-6">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                      End of this Part
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {resource.code} is the last tool listed in Part {part.id}.
                    </p>
                  </div>
                )}
              </div>
            </nav>
          )}

          {showParkProofLinks && (
            <section aria-labelledby="resource-parkproof" className="mt-16">
              <h2 id="resource-parkproof" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Where this evidence lands
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
                The evidence states this work feeds are defined in the
                ParkProof Standard. The ParkProof Walkthrough shows one
                fictional deal file carried through those states to a
                documented posture.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Link
                  href="/parkproof-standard"
                  className="theme-cream group border border-border bg-card p-6 transition-colors hover:border-primary/60"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                    The Standard
                  </p>
                  <p className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                    Read the ParkProof Standard
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Evidence states, gates, and posture labels, defined.
                  </p>
                </Link>
                <Link
                  href="/parkproof-walkthrough"
                  className="theme-cream group border border-border bg-card p-6 transition-colors hover:border-primary/60"
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                    The Walkthrough
                  </p>
                  <p className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                    Walk through the Harbor Pines decision file
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    One fictional file, from broker package to documented
                    posture.
                  </p>
                </Link>
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section aria-labelledby="resource-field-notes" className="mt-16">
              <h2 id="resource-field-notes" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Related Field Notes
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {related.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="theme-cream group border border-border bg-card p-6 transition-colors hover:border-primary/60"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      Field Note
                    </p>
                    <p className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </p>
                    {post.excerpt && (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8">
            <p className="max-w-3xl text-xs leading-relaxed text-muted">
              Acquisition Signal Resources are educational tools, not
              professional advice. They organize a disciplined diligence
              workflow; they do not replace legal, tax, engineering, or
              investment review. Illustrative examples are labeled as such.
              Read{" "}
              <Link
                href="/editorial-standards"
                className="font-semibold text-primary hover:underline"
              >
                our editorial standards
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
