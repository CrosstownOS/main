import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"
import {
  EvidenceStateChip,
  evidenceStateKey,
} from "@/components/evidence/EvidenceStateChip"
import SignalLine from "@/components/ui/SignalLine"

export const metadata: Metadata = {
  keywords: ["ParkProof Standard", "evidence states", "verified evidence", "broker-reported", "diligence gates", "RV park buyers"],
  title: "The ParkProof Standard | CrosstownOS",
  description: "The ParkProof standard: how RV park buyers label evidence, clear diligence gates, and document the posture behind every single acquisition decision they make.",
  alternates: { canonical: "/parkproof-standard" },
  openGraph: {
    title: "The ParkProof Standard | CrosstownOS",
    description:
      "Every material claim carries where it came from and what state it is in. The ParkProof standard, stated plainly.",
    type: "website",
    url: "/parkproof-standard",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "The ParkProof Standard | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The ParkProof Standard | CrosstownOS",
    description:
      "Evidence states, gates, and evidence-readiness labels for a documented decision file.",
    images: ["/og-logo.png"],
  },
}

const EVIDENCE_STATES = [
  {
    title: "Verified",
    definition:
      "Backed by evidence you can point to, and reviewed by a person.",
    counts:
      "A cited source, the page or record it came from, how it was obtained, and a named human review. A verified claim says what the source supports. It does not turn a source into a guarantee.",
  },
  {
    title: "Broker-reported",
    definition:
      "Reported in an OM, call, model, or broker package; not independently checked yet.",
    counts:
      "The claim and its source are recorded. Broker-reported information may organize the work, but it is never silently promoted into a verified field.",
  },
  {
    title: "Missing evidence",
    definition:
      "Material information has not been received or located yet.",
    counts:
      "The absence is named as an open item, with an owner and a due date. Missing evidence is a finding, not a blank, and it is never treated as zero.",
  },
  {
    title: "Underwriting assumption",
    definition:
      "A stated input in the investment case; not a verified fact.",
    counts:
      "The input is labeled, versioned, and approved by a named person. The file shows what the assumption stands in for and which outputs it feeds.",
  },
  {
    title: "Calculated",
    definition:
      "An output calculated from stated inputs. The calculation is only as reliable as the inputs behind it.",
    counts:
      "The inputs, their states, and the calculation lineage stay visible. Models may propose. People confirm. Code calculates.",
  },
  {
    title: "Unresolved",
    definition:
      "A material claim remains open because sources conflict, a review is incomplete, or the answer has not been established.",
    counts:
      "The disagreement is recorded with both sources cited. It is not averaged away, edited away, or resolved by silence.",
  },
] as const

const WORKED_EXAMPLE = [
  {
    state: "Broker-reported",
    record:
      "The offering package states that water and sewer service support every site in the park.",
  },
  {
    state: "Missing evidence",
    record:
      "No utility capacity letter or service record has been received or located.",
  },
  {
    state: "Unresolved",
    record:
      "The package and a utility record state different service counts. Both sources stay in the file until new evidence resolves the difference.",
  },
  {
    state: "Verified",
    record:
      "A reviewer reconciles the utility record, the site count, and the field observation. The claim now points to evidence a person reviewed.",
  },
  {
    state: "Underwriting assumption",
    record:
      "A future load input is separately labeled and approved. It does not rewrite the verified record for service today.",
  },
  {
    state: "Calculated",
    record:
      "Capacity use is calculated from the verified site count and the approved input. The output carries the lineage of both.",
  },
] as const

const READINESS_LABELS = [
  {
    title: "Walk",
    body: "The buyer's stated walk conditions are met on the record. Walk has the highest precedence when more than one label is triggered.",
  },
  {
    title: "Pause",
    body: "A material gate is missing, sources conflict on a gating field, or the evidence is not yet sufficient. Pause is also the fall-through when no label can be supported.",
  },
  {
    title: "Retrade",
    body: "The evidence is sufficient, but price or terms sit outside the modeled range produced from approved inputs.",
  },
  {
    title: "Advance",
    body: "The evidence is sufficient, the gates are clear, and price and terms sit within the modeled range. Advance records readiness. It does not tell the buyer to transact.",
  },
] as const

const BASE_URL = "https://www.crosstownosrv.camp"
const PATH = "/parkproof-standard"

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The ParkProof Standard",
  description:
    "The public ParkProof standard: evidence states, gates, and evidence-readiness labels for a documented decision file.",
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
    "@id": `${BASE_URL}${PATH}`,
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: BASE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "The ParkProof Standard",
      item: `${BASE_URL}${PATH}`,
    },
  ],
}

export default function ParkProofStandardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "The ParkProof Standard" },
            ]}
          />
          <SignalLine />
          <h1 className="serif-display max-w-3xl text-4xl tracking-tight sm:text-5xl">
            ParkProof turns a deal file into a decision file.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Every material claim in the file carries where it came from and
            what state it is in: verified, broker-reported, missing evidence,
            underwriting assumption, calculated, or unresolved. The team sees
            the deal as it stands, not a pile of documents.
          </p>

          <div className="theme-cream paper mt-10 border border-primary/40 p-6 text-center sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              What this page is
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-foreground/85">
              This page defines a process standard. It does not certify a
              deal, a park, or a decision. No state is ever assigned by
              silence.
            </p>
          </div>

          <section aria-labelledby="standard-states" className="mt-20">
            <h2 id="standard-states" className="serif-display text-2xl tracking-tight sm:text-3xl">
              The evidence states.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              These are the six evidence states of the CrosstownOS ParkProof
              Standard. The state names the relationship between a claim and
              the evidence behind it. Changing the state requires new
              evidence or a recorded human decision. It never happens
              because a document was uploaded.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {EVIDENCE_STATES.map((state) => (
                <article
                  key={state.title}
                  className="theme-cream paper border border-border p-6"
                >
                  <h3>
                    <EvidenceStateChip
                      state={evidenceStateKey(state.title)}
                    />
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/85">
                    {state.definition}
                  </p>
                  <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-foreground">
                      What counts:{" "}
                    </span>
                    {state.counts}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="standard-example" className="mt-20">
            <h2 id="standard-example" className="serif-display text-2xl tracking-tight sm:text-3xl">
              One claim, held to the standard.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              Illustrative example. The claim is the same throughout. The
              record changes only when the evidence changes.
            </p>
            <div className="theme-cream paper mt-6 border border-primary/40 p-5 sm:p-6">
              <p className="border-b border-border/60 pb-4 text-base font-semibold text-foreground">
                Claim: water and sewer capacity supports every site in the park.
              </p>
              <ul>
                {WORKED_EXAMPLE.map((row) => (
                  <li
                    key={row.state}
                    className="grid gap-3 border-b border-border/40 py-4 last:border-b-0 sm:grid-cols-[216px_1fr]"
                  >
                    <EvidenceStateChip
                      state={evidenceStateKey(row.state)}
                      className="h-fit w-fit"
                    />
                    <p className="text-sm leading-relaxed text-foreground/85">
                      {row.record}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="standard-gates" className="mt-20">
            <h2 id="standard-gates" className="serif-display text-2xl tracking-tight sm:text-3xl">
              What a gate does.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="theme-cream border border-border bg-card p-6">
                <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                  It names what can stop the deal.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Capacity-gate risks across water, sewer, electrical, roads,
                  and zoning, permits, and legal stay visible until they are
                  resolved or consciously accepted.
                </p>
              </div>
              <div className="theme-cream border border-border bg-card p-6">
                <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                  It fails closed.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A gating field in Missing evidence holds the record at
                  Pause. Contradictory sources on a gating field stay in the
                  dispute record until new evidence resolves them.
                </p>
              </div>
              <div className="theme-cream border border-border bg-card p-6">
                <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                  It records the human call.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  A gate can move only through verified evidence or an
                  authorized waiver with a documented reason. The override is
                  a record, never an edit that erases the original state.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="standard-labels" className="mt-20">
            <h2 id="standard-labels" className="serif-display text-2xl tracking-tight sm:text-3xl">
              The readiness labels.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {READINESS_LABELS.map((label) => (
                <article key={label.title} className="theme-cream border border-border bg-card p-6">
                  <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                    {label.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {label.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="standard-boundaries" className="mt-20">
            <div className="theme-cream paper border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 text-center sm:p-10">
              <h2 id="standard-boundaries" className="serif-display text-2xl tracking-tight sm:text-3xl">
                The boundary of the standard.
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-foreground/85 sm:text-base">
                Evidence sufficient means every gating field is Verified with
                independent support, or is carried as a labeled assumption
                with a named approver, and the governing variance test has
                been run. A count of verified fields does not, by itself, make
                a deal sound.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted">
                ParkProof supports a disciplined decision process. It does
                not replace legal, engineering, environmental, title, tax,
                insurance, regulatory, lending, or investment professionals.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/parkproof-walkthrough"
                  className="inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  ParkProof Walkthrough
                </Link>
                <Link
                  href="/workspace"
                  className="inline-block border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_14px_1px_rgba(58,134,242,0.18)] px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Apply for a pilot place
                </Link>
              </div>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                See the standard applied
              </p>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/checklist"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Diligence checklist
                </Link>
                <Link
                  href="/tools"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Working papers
                </Link>
                <Link
                  href="/blog"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Field Notes
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
