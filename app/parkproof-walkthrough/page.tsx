import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"
import SampleDecisionFileExplorer from "./SampleDecisionFileExplorer"
import SignalLine from "@/components/ui/SignalLine"

export const metadata: Metadata = {
  keywords: ["ParkProof walkthrough", "RV park deal", "broker package", "documented decision", "diligence record"],
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
            <div className="theme-cream paper border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 text-center sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                From sample to live deal
              </p>
              <h2
                id="sample-next"
                className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl"
              >
                The sample is fictional. The deadline pressure is not.
              </h2>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/workspace"
                  className="inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Apply for a pilot place
                </Link>
                <Link
                  href="/parkproof-standard"
                  className="inline-block border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_14px_1px_rgba(58,134,242,0.18)] px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read the ParkProof Standard
                </Link>
              </div>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Start smaller
              </p>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/checklist"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Free diligence checklist
                </Link>
                <Link
                  href="/tools"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Working papers
                </Link>
                <Link
                  href="/resources/lender-one-pager"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Lender One-Pager
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
