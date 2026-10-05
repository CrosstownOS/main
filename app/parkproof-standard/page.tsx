import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "The ParkProof Standard | CrosstownOS // Acquire",
  description:
    "The public ParkProof standard: evidence states, gates, and evidence-readiness labels for a documented decision file.",
  alternates: { canonical: "/parkproof-standard" },
  openGraph: {
    title: "The ParkProof Standard | CrosstownOS // Acquire",
    description:
      "Every material claim carries where it came from and what state it is in. The ParkProof standard, stated plainly.",
    type: "website",
    url: "/parkproof-standard",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "The ParkProof Standard | CrosstownOS // Acquire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The ParkProof Standard | CrosstownOS // Acquire",
    description:
      "Evidence states, gates, and evidence-readiness labels for a documented decision file.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const EVIDENCE_STATES = [
  {
    title: "Verified",
    definition:
      "Backed by evidence you can point to, and reviewed by a person.",
    counts:
      "A cited source, the page or record it came from, how it was obtained, and a named human review. A verified claim says what the source supports. It does not turn a source into a guarantee.",
    className: "border-success/60 text-success",
  },
  {
    title: "Broker-reported",
    definition:
      "Reported in an OM, call, model, or broker package; not independently checked yet.",
    counts:
      "The claim and its source are recorded. Broker-reported information may organize the work, but it is never silently promoted into a verified field.",
    className: "border-accent/60 text-accent",
  },
  {
    title: "Missing evidence",
    definition:
      "Material information has not been received or located yet.",
    counts:
      "The absence is named as an open item, with an owner and a due date. Missing evidence is a finding, not a blank, and it is never treated as zero.",
    className: "border-critical/60 text-critical",
  },
  {
    title: "Underwriting assumption",
    definition:
      "A stated input in the investment case; not a verified fact.",
    counts:
      "The input is labeled, versioned, and approved by a named person. The file shows what the assumption stands in for and which outputs it feeds.",
    className: "border-primary/60 text-primary",
  },
  {
    title: "Calculated",
    definition:
      "An output calculated from stated inputs. The calculation is only as reliable as the inputs behind it.",
    counts:
      "The inputs, their states, and the calculation lineage stay visible. Models may propose. People confirm. Code calculates.",
    className: "border-primary/60 text-primary",
  },
  {
    title: "Unresolved",
    definition:
      "A material claim remains open because sources conflict, a review is incomplete, or the answer has not been established.",
    counts:
      "The disagreement is recorded with both sources cited. It is not averaged away, edited away, or resolved by silence.",
    className: "border-border text-muted",
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

function stateClass(state: string) {
  if (state === "Verified") return "border-success/60 text-success"
  if (state === "Broker-reported") return "border-accent/60 text-accent"
  if (state === "Missing evidence") return "border-critical/60 text-critical"
  if (state === "Underwriting assumption" || state === "Calculated") {
    return "border-primary/60 text-primary"
  }
  return "border-border text-muted"
}

export default function ParkProofStandardPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">ParkProof / The Standard</p>
          <h1 className="serif-display max-w-3xl text-4xl tracking-tight sm:text-5xl">
            ParkProof turns a deal file into a decision file.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Every material claim in the file carries where it came from and
            what state it is in: verified, broker-reported, missing, or
            assumed. The team sees the deal as it stands, not a pile of
            documents.
          </p>

          <div className="theme-cream paper mt-10 border border-primary/40 p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              What this page is
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground/85">
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
              The state names the relationship between a claim and the
              evidence behind it. Changing the state requires new evidence or
              a recorded human decision. It never happens because a document
              was uploaded.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {EVIDENCE_STATES.map((state) => (
                <article
                  key={state.title}
                  className={cn("theme-cream paper border p-6", state.className)}
                >
                  <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                    {state.title}
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
                    className="grid gap-3 border-b border-border/40 py-4 last:border-b-0 sm:grid-cols-[190px_1fr]"
                  >
                    <span
                      className={cn(
                        "h-fit w-fit border bg-background/40 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
                        stateClass(row.state),
                      )}
                    >
                      {row.state}
                    </span>
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
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              Advance, Retrade, Pause, and Walk are evidence-readiness labels.
              They are not recommendations, approvals, or advice. When more
              than one label is triggered, the precedence is Walk, then Pause,
              then Retrade, then Advance.
            </p>
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
            <div className="theme-cream paper border border-border p-6 sm:p-8">
              <h2 id="standard-boundaries" className="serif-display text-2xl tracking-tight sm:text-3xl">
                The boundary of the standard.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
                Evidence sufficient means every gating field is Verified with
                independent support, or is carried as a labeled assumption
                with a named approver, and the governing variance test has
                been run. A count of verified fields does not, by itself, make
                a deal sound.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                ParkProof supports a disciplined decision process. It does
                not replace legal, engineering, environmental, title, tax,
                insurance, regulatory, lending, or investment professionals.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sample-decision-file"
                  className="inline-block border border-primary/60 bg-primary px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90"
                >
                  ParkProof Walkthrough
                </Link>
                <Link
                  href="/deal-desk"
                  className="inline-block border border-border px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  Bring a live deal
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
