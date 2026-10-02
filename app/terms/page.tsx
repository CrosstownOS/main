import type { Metadata } from "next"

// SKELETON ONLY. Every section below is an [ATTORNEY TEXT] slot. Do not link
// this page from the footer, the forms, or the sitemap, and do not remove the
// noindex metadata, until an attorney has written and approved the text and
// Jeremy signs off on going live.

export const metadata: Metadata = {
  title: "Terms of Use | CrosstownOS",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terms" },
}

const SLOTS = [
  {
    heading: "Use of this site",
    slot: "[ATTORNEY TEXT: permitted and prohibited uses of this site and its materials]",
  },
  {
    heading: "No reliance",
    slot: "[ATTORNEY TEXT: site content is not a basis for reliance in any transaction]",
  },
  {
    heading: "No professional advice",
    slot: "[ATTORNEY TEXT: nothing on this site is legal, investment, tax, engineering, environmental, appraisal, title, lending, or insurance advice]",
  },
  {
    heading: "Confidentiality",
    slot: "[ATTORNEY TEXT: confidentiality terms are signed at kickoff, before any deal materials are ingested]",
  },
  {
    heading: "Limitation of liability",
    slot: "[ATTORNEY TEXT: limitation of liability]",
  },
  {
    heading: "Governing law",
    slot: "[ATTORNEY TEXT: governing law for these terms]",
  },
] as const

export default function TermsPage() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <p className="mono-label mb-4">Draft. Awaiting attorney text.</p>
        <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
          Terms of Use
        </h1>

        {SLOTS.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {section.slot}
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
