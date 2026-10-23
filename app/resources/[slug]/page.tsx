import type { Metadata } from "next"
import type { ReactNode } from "react"
import SignalLine from "@/components/ui/SignalLine"
import Link from "next/link"
import { notFound } from "next/navigation"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { GatedDownloadButton } from "@/components/GatedDownload"
import { EvidenceStateChip } from "@/components/evidence/EvidenceStateChip"
import { getAllPosts, type PostMeta } from "@/lib/blog"
import {
  LIVE_TOOL_BY_RESOURCE_SLUG,
  PART_BY_ID,
  RESOURCE_DETAIL_BY_SLUG,
  RESOURCE_DETAILS,
  TOOL_BY_CODE,
  TOOLS,
  resourceSlug,
  type ResourceDetail,
} from "@/lib/resources"
import { RESOURCE_INSIDE } from "@/lib/resource-inside"

const EVIDENCE_LETTERS = [
  { key: "verified", meaning: "Backed by evidence you can point to, and reviewed by a person." },
  { key: "broker-reported", meaning: "Reported in an OM, call, model, or broker package; not independently checked yet." },
  { key: "missing", meaning: "Material information has not been received or located yet." },
  { key: "assumption", meaning: "A stated input in the investment case; not a verified fact." },
  { key: "calculated", meaning: "An output calculated from stated inputs. The calculation is only as reliable as the inputs behind it." },
  {
    key: "unresolved",
    meaning:
      "A material claim remains open because sources conflict, a review is incomplete, or the answer has not been established.",
  },
] as const

const BASE_URL = "https://www.crosstownosrv.camp"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

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
  "poh-toh-split-valuation-worksheet": [
    "manufactured-housing-diligence-starts-with-who-owns-the-homes",
  ],
  "the-walk-away-pact": ["speed-is-a-strategy-for-sellers-not-buyers"],
  "evidence-request-list": ["the-permits-buyers-skip"],
}

const RELATED_RESOURCE_SLUGS: Record<string, { slug: string; note: string }[]> = {
  "the-offer-term-sheet-builder": [
    {
      slug: "seller-note-anatomy",
      note: "When a seller note is part of the offer, the note is part of the structure, not a detail for later. This page starts with the concerns a seller raises and turns them into terms both sides can price.",
    },
  ],
  "capital-plan-sources-and-uses": [
    {
      slug: "lender-one-pager",
      note: "A lender package starts with sources and uses. This plan sets the price, the capex, and the reserve target first. The one-pager then carries those numbers onto one page for the lender.",
    },
  ],
  "first-30-days-takeover-sheet": [
    {
      slug: "tenant-communication-and-rent-playbook",
      note: "When the first thirty days are underway, hand the takeover to this playbook: tell tenants what is changing before rumors do.",
    },
  ],
}


/**
 * Render an Inside block chain line ("Takes in" / "Hands to") with the
 * resources it names turned into links. The PDF text names counterparts as
 * "Title (AS-xx)"; each such reference links to that resource's page. Text
 * that names no coded resource ("your attorney", "the eventual sale") is
 * left as plain text.
 */
function linkChainText(text: string): ReactNode {
  const codePattern = /\((AS-\d+R?)\)/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null
  while ((match = codePattern.exec(text)) !== null) {
    const target = TOOL_BY_CODE[match[1]]
    if (!target) continue
    const parenStart = match.index
    let nameStart = parenStart
    while (
      nameStart > lastIndex &&
      /[A-Za-z0-9 :/\-.'’]/.test(text[nameStart - 1])
    ) {
      nameStart--
    }
    let linkStart = nameStart
    const rawName = text.slice(nameStart, parenStart)
    const fromSplit = rawName.lastIndexOf(" from the ")
    if (fromSplit >= 0) {
      linkStart = nameStart + fromSplit + " from the ".length
    } else {
      const fillers = ["then ", "or ", "a passing ", "a ", "ten ", "your "]
      let rest = rawName.replace(/^\s+/, "")
      let offset = rawName.length - rest.length
      let stripped = true
      while (stripped) {
        stripped = false
        for (const filler of fillers) {
          if (rest.startsWith(filler)) {
            rest = rest.slice(filler.length)
            offset += filler.length
            stripped = true
          }
        }
      }
      linkStart = nameStart + offset
    }
    if (linkStart > lastIndex) {
      nodes.push(text.slice(lastIndex, linkStart))
    }
    const linkEnd = parenStart + match[0].length
    nodes.push(
      <Link
        key={`chain-${key++}`}
        href={`/resources/${resourceSlug(target)}`}
        className="font-semibold text-primary hover:underline"
      >
        {text.slice(linkStart, linkEnd)}
      </Link>,
    )
    lastIndex = linkEnd
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
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
          url: "/og-logo.png",
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
      images: ["/og-logo.png"],
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
  const liveTool = LIVE_TOOL_BY_RESOURCE_SLUG[resource.slug] ?? null
  const inside = RESOURCE_INSIDE[resource.slug] ?? null
  // The one next door offered after this page's PDF download: the paired
  // live tool where one exists, else the first resource this worksheet
  // hands to (its Inside chain), else the related Field Note.
  const downloadDoor = ((): { href: string; label: string } | undefined => {
    if (liveTool) {
      return {
        href: `/tools/${liveTool.toolSlug}`,
        label: `Run the ${liveTool.toolName} live`,
      }
    }
    if (inside) {
      const code = inside.handsTo.match(/AS-\d+R?/)?.[0]
      const target = code ? TOOL_BY_CODE[code] : undefined
      if (target) {
        return {
          href: `/resources/${resourceSlug(target)}`,
          label: `Next in the chain: ${target.code}: ${target.title}`,
        }
      }
    }
    const firstRelated = relatedPosts(resource)[0]
    if (firstRelated) {
      return {
        href: `/blog/${firstRelated.slug}`,
        label: `Read the Field Note: ${firstRelated.title}`,
      }
    }
    return undefined
  })()
  const showEvidenceLetters = resource.slug === "the-evidence-status-standard"
  const related = relatedPosts(resource)
  const relatedResources = (RELATED_RESOURCE_SLUGS[resource.slug] ?? [])
    .map((item) => {
      const target = RESOURCE_DETAIL_BY_SLUG[item.slug]
      if (!target) return null
      return { slug: item.slug, note: item.note, code: target.code, title: target.title }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
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

  const creativeJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: displayName(resource),
    description: resource.description,
    url: pageUrl,
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
    isAccessibleForFree: true,
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeJsonLd) }}
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
              <span className="bg-primary-deep px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {resource.code ?? "Spine"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                Acquisition Signal Resource
              </span>
            </div>
            <SignalLine />
            <h1 className="serif-display mt-5 text-4xl tracking-tight sm:text-5xl">
              {resource.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {resource.description}
            </p>
          </div>

          {showEvidenceLetters && (
            <section
              aria-labelledby="resource-evidence-letters"
              className="theme-cream mt-12 border border-border bg-card p-6 sm:p-8"
            >
              <h2 id="resource-evidence-letters" className="sr-only">
                The evidence status letters
              </h2>
              <p className="text-base font-bold leading-relaxed text-foreground">
                Every claim in this library carries one letter, from the
                CrosstownOS Evidence Status Standard. The letter is the
                claim&apos;s status, not its strength. A letter changes only
                when the evidence changes.
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="px-3 py-2 font-bold text-foreground">Evidence state</th>
                      <th className="px-3 py-2 font-bold text-foreground">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EVIDENCE_LETTERS.map((row) => (
                      <tr key={row.key} className="border-b border-border/60">
                        <td className="px-3 py-2 align-top">
                          <EvidenceStateChip state={row.key} />
                        </td>
                        <td className="px-3 py-2 align-top">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-5 text-base font-bold leading-relaxed text-foreground">
                The three rules:
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted">
                <li>
                  A broker-reported claim earns nothing in the price until
                  it becomes Verified. Missing evidence is a finding, not a
                  zero, and not a blank.
                </li>
                <li>
                  Every claim carries a source and a date. A claim with no
                  date is a rumor, even with the right letter.
                </li>
                <li>
                  The letter changes when the evidence changes. Crossing out
                  a B and writing V without the document is fiction.
                </li>
              </ol>
            </section>
          )}

          {inside && (
            <section
              aria-labelledby="resource-inside"
              className="theme-cream mt-12 border border-border bg-card p-6 sm:p-8"
            >
              <h2 id="resource-inside" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Inside this CrosstownOS tool
                {resource.code && part
                  ? ` (${resource.code}, Part ${part.id}: ${part.name})`
                  : ""}
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted">
                <li>
                  <strong className="font-bold text-foreground">Takes in:</strong>{" "}
                  {linkChainText(inside.takesIn)}.
                </li>
                <li>
                  <strong className="font-bold text-foreground">Hands to:</strong>{" "}
                  {linkChainText(inside.handsTo)}.
                </li>
                <li>
                  <strong className="font-bold text-foreground">What it holds:</strong>{" "}
                  {inside.holds}.
                </li>
                {inside.standard && (
                  <li>
                    <strong className="font-bold text-foreground">
                      The standard it runs on:
                    </strong>{" "}
                    {inside.standard}.
                  </li>
                )}
              </ul>
            </section>
          )}

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
                title={displayName(resource)}
                nextDoor={downloadDoor}
                className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 self-center bg-primary-deep px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
              className="theme-cream mt-12 border border-primary/40 bg-card p-6 sm:p-8"
            >
              <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
                Run the {liveTool.toolName} in your browser.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                The PDF is the paper version. The working paper runs the math live, labels
                every number with its evidence state, and exports a branded working paper
                you can keep. Free to use, no account.
              </p>
              <Link
                href={`/tools/${liveTool.toolSlug}`}
                className="mt-6 inline-block border border-primary/60 bg-primary-deep px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  <div className="theme-cream border border-dashed border-border bg-card p-6">
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
                  <div className="theme-cream border border-dashed border-border bg-card p-6">
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

          {relatedResources.length > 0 && (
            <section aria-labelledby="resource-related-resources" className="mt-16">
              <h2 id="resource-related-resources" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Related resource
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {relatedResources.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/resources/${item.slug}`}
                    className="theme-cream group border border-border bg-card p-6 transition-colors hover:border-primary/60"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                      Resource
                    </p>
                    <p className="serif-display mt-2 text-xl tracking-tight transition-colors group-hover:text-primary">
                      {item.code}: {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.note}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
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

          <div className="theme-cream paper mt-16 border border-primary/40 bg-card p-8 text-center">
            <p className="serif-display mx-auto max-w-3xl text-balance text-xl leading-snug text-foreground/85 sm:text-2xl">
              On a live deal, the finished sheet joins the record: claimed, proven, or still open, with the evidence attached.
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/workspace"
                className="inline-block border border-primary/60 bg-primary-deep px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the Acquisition Workspace
              </Link>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="border-t border-border pt-8">
            <p className="max-w-3xl text-xs leading-relaxed text-muted">
              Acquisition Signal Resources are educational tools, not
              professional advice. They organize a disciplined diligence
              workflow; they do not replace legal, tax, engineering, or
              investment review. Basis and limits: each worksheet states
              the CrosstownOS diligence method and its Evidence Status
              Standard, not a market benchmark or a sourced rate. Any
              figure in a worked example is an illustration or a working
              assumption, labeled as such, to replace with the deal in
              front of you and its verified numbers. Tax, insurance,
              landlord-tenant, and fair-housing rules vary by state and
              locality; confirm the rule for the park&apos;s own
              jurisdiction before acting on it. Read{" "}
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
