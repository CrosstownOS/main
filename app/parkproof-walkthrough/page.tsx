import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"
import SampleDecisionFileExplorer from "./SampleDecisionFileExplorer"
import SignalLine from "@/components/ui/SignalLine"

export const metadata: Metadata = {
  title: "ParkProof Walkthrough | CrosstownOS",
  description: "Walk a fictional RV park deal from broker package to documented decision. Watch claims gain support or stay unresolved inside the full ParkProof record.",
  alternates: { canonical: "/parkproof-walkthrough" },
  openGraph: {
    title: "ParkProof Walkthrough | CrosstownOS",
    description:
      "The package is not the decision. Walk the record as evidence arrives, the site pushes back, and one gate stays open.",
    type: "website",
    url: "/parkproof-walkthrough",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "ParkProof Walkthrough | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParkProof Walkthrough | CrosstownOS",
    description:
      "An illustrative walk through a documented decision file built to the ParkProof standard.",
    images: ["/og-logo.png"],
  },
}

const BASE_URL = "https://www.crosstownosrv.camp"
const PATH = "/parkproof-walkthrough"

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ParkProof Walkthrough",
  description:
    "Walk a fictional RV park deal from broker package to documented posture as claims gain support, stay unresolved, or remain missing.",
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
      name: "ParkProof Walkthrough",
      item: `${BASE_URL}${PATH}`,
    },
  ],
}

export default function SampleDecisionFilePage() {
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
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "ParkProof Walkthrough" },
            ]}
          />
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="mono-label">ParkProof Walkthrough / Inside the Record</p>
            </div>
            <SignalLine />
            <h1 className="serif-display mt-6 max-w-4xl text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              The package is not the decision.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-xl">
              A broker package can be a useful beginning. It is not proof.
              Walk one fictional deal the way it has to be walked: claim by
              claim, source by source, until the record says what it can
              support and names what it cannot.
            </p>
            <p className="mt-5 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-relaxed text-muted sm:text-base">
              I am not looking for a prettier story. I am looking for the point
              where each claim either earns its place or gets named honestly.
            </p>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                ["One fictional park", "Harbor Pines, from inbox to decision file."],
                ["Five claims followed", "Occupancy, NOI, capacity, site count, expansion."],
                ["One gate still open", "No score. No shortcut around the record."],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="border border-foreground/15 bg-background/45 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="font-sans text-sm font-bold text-foreground">
                    {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SampleDecisionFileExplorer />
          </div>

          <section
            aria-labelledby="sample-boundary"
            className="mt-20 grid gap-4 md:grid-cols-3"
          >
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
                What this does not do
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                It does not turn an upload into truth, certify a deal, or make
                a decision about any actual transaction. The ParkProof decision
                file is not a legal/engineering/environmental certification.
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
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                From sample to live deal
              </p>
              <h2
                id="sample-next"
                className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl"
              >
                The sample is fictional. The deadline pressure is not.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                Read the standard, then bring the deal that is already sitting
                in the inbox. The work is the same: establish what is true
                before capital is committed. The file walked here is the
                ParkProof decision file a buyer builds in the CrosstownOS
                Acquisition Workspace.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/parkproof-standard"
                  className="inline-block border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90"
                >
                  Read the ParkProof Standard
                </Link>
                <Link
                  href="/workspace"
                  className="inline-block border border-border px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  Apply for a pilot place
                </Link>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Start smaller: the{" "}
                <Link href="/checklist" className="font-semibold text-primary hover:underline">
                  free diligence checklist
                </Link>{" "}
                covers the fifteen items in order, and the{" "}
                <Link href="/tools" className="font-semibold text-primary hover:underline">
                  working papers
                </Link>{" "}
                run the math in your browser. When a file like this one has
                to go to a lender, the{" "}
                <Link href="/resources/lender-one-pager" className="font-semibold text-primary hover:underline">
                  Lender One-Pager
                </Link>{" "}
                puts the same deal on one page, in the language a lender
                reads.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Built to the standard, a file like this one is built to let a closing proceed on evidence instead of on the seller's summary.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
