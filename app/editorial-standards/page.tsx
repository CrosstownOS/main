import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Editorial Standards | CrosstownOS",
  description:
    "How CrosstownOS handles evidence, community learning, and AI-assisted work: what we verify, what we label, and what we never publish.",
  alternates: { canonical: "/editorial-standards" },
  openGraph: {
    title: "Editorial Standards | CrosstownOS",
    description:
      "What we verify, what we label, and what we never publish.",
    type: "website",
    url: "/editorial-standards",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Editorial Standards | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Standards | CrosstownOS",
    description:
      "What we verify, what we label, and what we never publish.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const STATES = [
  {
    title: "Verified",
    definition: "Evidence was reviewed and the required source standard was met.",
  },
  {
    title: "Broker-reported",
    definition:
      "A claim attributed to broker or seller material that has not been independently verified.",
  },
  {
    title: "Missing",
    definition: "Required evidence is absent, unavailable, or still requested.",
  },
  {
    title: "Assumed",
    definition:
      "A buyer-selected planning input while the underlying fact remains unsettled.",
  },
  {
    title: "Calculated",
    definition: "A deterministic output derived from stated inputs and formula.",
  },
  {
    title: "Unresolved",
    definition: "An open issue that remains material to the decision.",
  },
]

const SECTIONS = [
  {
    heading: "How we handle community learning",
    body: [
      "Our themes come from real conversations with operators, buyers, and industry professionals. When a lesson is shaped by those conversations, we remove identifying details, change nonessential facts, and never quote or name anyone without explicit permission.",
      "Detailed examples are labeled as synthetic or illustrative composites. General principles need no label because they describe no one in particular.",
    ],
  },
  {
    heading: "What we never publish",
    body: [
      "We do not quote, screenshot, or name anyone from private conversations, group discussions, or direct messages without explicit permission. We do not recreate recognizable stories from one person's comment or private discussion. We do not present an anecdote as independently verified if it originated as an unverified statement.",
    ],
  },
  {
    heading: "How we use AI-assisted tools",
    body: [
      "CrosstownOS uses technology, including AI-assisted research and drafting tools, to organize information and accelerate production. Every published resource, Field Note, product rule, website claim, and customer-facing statement is subject to human review and remains governed by CrosstownOS evidence standards.",
      "We do not place a loud AI-generated disclaimer on ordinary posts merely because AI assisted with drafting or research. Research-heavy Field Notes carry a brief note stating that AI-assisted research and drafting may have been used and that sources, claims, and final editorial judgment remain subject to human review.",
      "Our credibility does not come from whether the founder physically typed every word. It comes from the doctrine he sets, the real source material behind the work, honest labeling of uncertainty, and human accountability for everything published.",
    ],
  },
  {
    heading: "Professional boundaries",
    body: [
      "CrosstownOS organizes the record. The buyer owns the decision.",
      "Our resources and software organize information and support a disciplined workflow. They do not provide legal, engineering, environmental, tax, title, appraisal, lending, or insurance advice, inspection certification, regulatory determination, or investment advice. You remain responsible for your facts, assumptions, professional review, and investment decisions.",
    ],
  },
  {
    heading: "How we talk about the product",
    body: [
      "Every public product claim is one of: live now, available in the Founding Deal Desk, pilot-only, internal testing, planned or system direction, or not available. We do not describe a prototype, roadmap item, or intention as a current capability.",
    ],
  },
  {
    heading: "Corrections",
    body: [
      "When a material error is discovered, we stop repeating the claim, correct the original asset where feasible, and add a dated correction note where the error materially affected reader understanding. We never hide a material correction because the original content performed well.",
    ],
  },
]

export default function EditorialStandardsPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Editorial standards</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Know what is true before you buy. We hold our own work to it.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            CrosstownOS teaches buyers to separate claims from evidence. This
            page states the standard our own publishing is held to: how we
            handle evidence, community learning, AI-assisted work, and
            corrections.
          </p>

          <section className="mt-12">
            <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
              The states every claim carries
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We teach the same discipline we practice. Every material claim
              in our content carries one of these states:
            </p>
            <div className="mt-6 space-y-3">
              {STATES.map((s) => (
                <div
                  key={s.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {s.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-3 text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-12">
            <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
              The publishing gate
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Before anything goes live, we ask one question: can the founder
              defend this without saying &ldquo;the AI told me&rdquo;? If yes,
              it publishes. If no, it needs more source work, clearer labeling,
              or a narrower claim.
            </p>
            <p className="mt-6 text-sm">
              <Link
                href="/blog"
                className="font-semibold text-primary hover:underline"
              >
                Read the Field Notes
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
