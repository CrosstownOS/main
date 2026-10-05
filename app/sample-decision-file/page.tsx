import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import SampleDecisionFileExplorer from "./SampleDecisionFileExplorer"

export const metadata: Metadata = {
  title: "Sample Decision File | CrosstownOS // Acquire",
  description:
    "A self-guided fictional walk-through of a documented decision file built to the ParkProof standard.",
  alternates: { canonical: "/sample-decision-file" },
  openGraph: {
    title: "Sample Decision File | CrosstownOS // Acquire",
    description:
      "From broker package to documented posture, with evidence states changing as evidence arrives.",
    type: "website",
    url: "/sample-decision-file",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Sample Decision File | CrosstownOS // Acquire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sample Decision File | CrosstownOS // Acquire",
    description:
      "An illustrative walk-through of a documented decision file built to the ParkProof standard.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

export default function SampleDecisionFilePage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">Sample Decision File / Illustrative</p>
          <h1 className="serif-display max-w-3xl text-4xl tracking-tight sm:text-5xl">
            Walk the file before you trust the headline.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            This is a static, fictional walk-through of a documented
            decision file built to the ParkProof standard. It is not a live
            deal, not a product demonstration, and not a certification.
          </p>

          <div className="mt-10">
            <SampleDecisionFileExplorer />
          </div>

          <section aria-labelledby="sample-boundary" className="mt-20 grid gap-4 md:grid-cols-3">
            <h2 id="sample-boundary" className="sr-only">
              Sample boundaries
            </h2>
            <article className="theme-cream border border-border bg-card p-6">
              <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                What this shows
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                How a claim keeps its source and state as records arrive,
                observations are reviewed, and gates remain visible.
              </p>
            </article>
            <article className="theme-cream border border-border bg-card p-6">
              <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                What this does not show
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A live product, a real property, a market opinion, or a
                decision about any actual transaction.
              </p>
            </article>
            <article className="theme-cream border border-border bg-card p-6">
              <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                The standard behind it
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Advance, Retrade, Pause, and Walk are evidence-readiness
                labels. They are not recommendations, approvals, or advice.
              </p>
            </article>
          </section>

          <section aria-labelledby="sample-next" className="mt-20">
            <div className="theme-cream paper border border-border p-6 sm:p-8">
              <h2 id="sample-next" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Read the standard, then bring the deal.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                The sample is fictional. The discipline is the point: every
                material claim carries where it came from and what state it
                is in.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/parkproof-standard"
                  className="inline-block border border-primary/60 bg-primary px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90"
                >
                  Read the ParkProof Standard
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
