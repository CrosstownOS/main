import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import ReferralAllianceCta from "./ReferralAllianceCta"

export const metadata: Metadata = {
  title: "For Brokers and Lenders | CrosstownOS",
  description:
    "What a buyer brings when an RV park or manufactured-housing deal is worked in CrosstownOS: one record, cited claims, unresolved gates, and a documented decision file.",
  alternates: { canonical: "/for-brokers-lenders" },
  openGraph: {
    title: "For Brokers and Lenders | CrosstownOS",
    description:
      "One record. Claims with sources and states. Unresolved gates listed instead of buried.",
    type: "website",
    url: "/for-brokers-lenders",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "For Brokers and Lenders | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Brokers and Lenders | CrosstownOS",
    description:
      "What a buyer brings when the deal was worked in CrosstownOS.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const ARRIVAL_ITEMS = [
  {
    title: "One record, not a pile of documents",
    body: "The broker package, diligence materials, site-walk captures, and decision record stay tied to the same deal from intake through the documented posture.",
  },
  {
    title: "Claims with sources and states",
    body: "Every material claim carries where it came from and what state it is in: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, or Unresolved.",
  },
  {
    title: "Unresolved gates, listed",
    body: "Capacity-gate risks across water, sewer, electrical, roads, and zoning, permits, and legal stay named, with an owner and a due date, until they are resolved or consciously accepted.",
  },
  {
    title: "Assumptions kept separate",
    body: "Deterministic underwriting calculates from human-approved assumptions. The file shows which inputs are facts, which are claims, and which are assumptions.",
  },
  {
    title: "Observations tied to the deal",
    body: "Field captures what the paper cannot show. Photos, notes, and observations stay unreviewed evidence until a person reviews them. Captured is not verified.",
  },
  {
    title: "A dated decision posture",
    body: "The buyer owns the decision. The record organizes the documented posture from reviewed evidence, unresolved gates, and approved assumptions.",
  },
] as const

const DECISION_FILE_TOC = [
  "Cover: deal, parties, version, and evidence date",
  "Documented posture: Advance, Retrade, Pause, or Walk",
  "Deal snapshot and stage",
  "Evidence register: claim, source, page, and state",
  "Financial reconciliation: claimed, documented, and reviewed amounts",
  "Infrastructure and utilities: capacity, condition, and open records",
  "Legal and land use: zoning, permits, title, survey, and access items",
  "Field observations from the site walk",
  "Underwriting inputs, assumptions, approver, and calculation lineage",
  "Open items, unresolved gates, disputes, and change log",
  "Source index and assumption history",
] as const

export default function ForBrokersLendersPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">For Brokers + Lenders</p>
          <h1 className="serif-display max-w-3xl text-4xl tracking-tight sm:text-5xl">
            Know what your buyer is bringing to the table.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            The Referral Alliance is for brokers, lenders, operators, and
            advisers who know the assets and the people, and want a standing
            partner conversation with Crosstown.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/85">
            Your buyers keep their record. You get a partner who answers.
          </p>

          <section aria-labelledby="arrival-heading" className="mt-20">
            <h2 id="arrival-heading" className="serif-display text-2xl tracking-tight sm:text-3xl">
              What a buyer arrives with.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              When a deal is worked inside CrosstownOS, the buyer does not
              arrive with a folder of disconnected claims. The buyer arrives
              with the record those claims live in.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {ARRIVAL_ITEMS.map((item) => (
                <article key={item.title} className="theme-cream paper border border-border p-6">
                  <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="toc-heading" className="mt-20">
            <div className="theme-cream paper border border-primary/40 p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                ParkProof Walkthrough / illustrative
              </p>
              <h2 id="toc-heading" className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl">
                Inside a documented decision file.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                A documented decision file built to the ParkProof standard
                organizes the record in this order. The sample walk-through
                is fictional and labeled illustrative on every screen.
              </p>
              <ol className="mt-6 grid gap-x-8 gap-y-3 md:grid-cols-2">
                {DECISION_FILE_TOC.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="font-mono text-[10px] leading-6 tracking-[0.16em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/parkproof-walkthrough"
                  className="inline-block border border-primary/60 bg-primary px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90"
                >
                  ParkProof Walkthrough
                </Link>
                <Link
                  href="/parkproof-standard"
                  className="inline-block border border-border px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  Read the standard
                </Link>
              </div>
            </div>
          </section>

          <section aria-labelledby="sides-heading" className="mt-20">
            <h2 id="sides-heading" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Clear lines on both sides of the table.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="theme-cream border border-border bg-card p-6 sm:p-8">
                <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                  For brokers and advisers
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  A buyer who has worked the record can show what is verified,
                  what was reported, what is missing, and what was assumed.
                  That makes the conversation about the deal, not about
                  reconstructing the file.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  No compensation terms are published or implied. Any
                  partnership terms are discussed privately.
                </p>
              </article>
              <article className="theme-cream border border-border bg-card p-6 sm:p-8">
                <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                  For lenders
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  ParkProof does not certify the deal, verify the property,
                  appraise value, or make a lending decision. Treat the file
                  as borrower-prepared, sources cited, with independent
                  verification under your own policy.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Brokers, lenders, and advisers run their own diligence.
                  CrosstownOS organizes the buyer's record. It replaces none
                  of that work.
                </p>
              </article>
            </div>
          </section>

          <section aria-labelledby="partner-heading" className="mt-20">
            <div className="theme-cream paper border border-border p-6 sm:p-8">
              <h2 id="partner-heading" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Start the partner conversation.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                Book a Referral Alliance intro call, or write first in the
                form that opens with it. Crosstown reviews each partner
                request personally.
              </p>
              <div className="mt-6">
                <ReferralAllianceCta />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
