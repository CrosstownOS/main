import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "RV Park Due Diligence Checklist | CrosstownOS",
  description:
    "A free RV park due diligence checklist for buyers: rent roll verification, P&L normalization, occupancy, utilities, permits, zoning, and the other items that decide whether the deal is real.",
  alternates: { canonical: "/checklist" },
  openGraph: {
    title: "RV Park Due Diligence Checklist | CrosstownOS",
    description:
      "The 15 items to verify before you commit capital on an RV park or manufactured housing deal.",
    type: "website",
    url: "/checklist",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "RV Park Due Diligence Checklist | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RV Park Due Diligence Checklist | CrosstownOS",
    description:
      "The 15 items to verify before you commit capital on an RV park or manufactured housing deal.",
    images: ["/og-logo.png"],
  },
}

const ITEMS = [
  {
    title: "Rent roll truth check",
    body: "Compare every rent roll line against trailing 12-month bank deposits. The rent roll shows what should have been collected. Deposits show what arrived. Income verification starts at the bank, not the spreadsheet.",
  },
  {
    title: "Paying occupancy, not reported occupancy",
    body: "Reported occupancy counts heads. Paying occupancy counts money. Pull the delinquency report, age the receivables, and find out how many of those occupied sites are actually current.",
  },
  {
    title: "P&L normalization",
    body: "Read the seller's P&L like the other side wrote it. Normalize owner add-backs, one-time items, and below-market expenses (especially management fees the seller never paid themselves). Underwrite the real run rate.",
  },
  {
    title: "Utility systems: who pays and what they cost",
    body: "Confirm who pays for water, sewer, electric, gas, and trash on every site type. Get 12 months of utility bills. A utility bill nobody underwrote is the fastest way to blow up a pro forma.",
  },
  {
    title: "Utility capacity",
    body: "For parks on well, septic, or lagoon: confirm permitted capacity against current and planned site counts. Capacity you assume but cannot prove is missing evidence, not a footnote.",
  },
  {
    title: "Permits and zoning",
    body: "Confirm legal use with the county or municipality directly. Do not rely on the broker package. Ask whether the current use is conforming, grandfathered, or nonconforming, and what that means for expansion or rebuild.",
  },
  {
    title: "Site count vs. permitted count",
    body: "The broker package lists a site count. The county may list a different one. Reconcile them before you price per pad.",
  },
  {
    title: "Infrastructure condition",
    body: "Water lines, sewer lines, roads, electrical pedestals. Get eyes on them or get a report. Deferred infrastructure is the silent deal killer in older parks.",
  },
  {
    title: "Tenant estoppels",
    body: "Verify income beyond the rent roll. Estoppels confirm who lives there, what they pay, and what was promised. On park-owned homes, confirm the home is actually owned by the park.",
  },
  {
    title: "Floodplain, wetlands, and environmental",
    body: "Check FEMA maps, wetlands inventory, and order a Phase I if the history warrants it. Environmental issues do not negotiate.",
  },
  {
    title: "Title and survey",
    body: "Clean title, current survey, confirmed boundaries. Encroachments and easements discovered after close are your problem.",
  },
  {
    title: "Insurance: quotes and claims history",
    body: "Get real quotes, not the seller's historical cost. Pull the claims history. In some markets, insurance is the line item that kills the deal.",
  },
  {
    title: "Lot rents vs. market",
    body: "Compare current lot rents against comparable parks within a realistic drive. Know whether the upside you are underwriting is real or aspirational.",
  },
  {
    title: "Seller responsiveness",
    body: "Slow diligence responses are a signal. A seller who cannot produce basic documents during diligence will not be easier to work with after you are under contract. Absence is the finding.",
  },
  {
    title: "The decision file",
    body: "Document every claim, every source, and every gap before you go hard. If it is not written down with its evidence state, it did not happen. The file is what lets you walk away with confidence or commit with it.",
  },
]

export default function ChecklistPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Free resource</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            RV park due diligence checklist.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Fifteen items to verify before you commit capital on an RV park or
            manufactured housing deal. Work them in order. Every item you skip
            is a question you will answer with your own money later.
          </p>

          <section className="mt-12" aria-label="Diligence checklist">
            <ol className="space-y-3">
              {ITEMS.map((item, i) => (
                <li
                  key={item.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-sans text-base font-bold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12 border border-primary/40 bg-primary/5 p-6 sm:p-8">
            <h2 className="serif-display text-2xl tracking-tight text-foreground sm:text-3xl">
              This checklist gets you started.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              A checklist tells you what to verify. It does not hold the
              evidence, track what is missing, or connect the rent roll to the
              bank deposits to the site walk. When the deal gets real, the
              Acquisition Workspace carries the full record: seller claims,
              source evidence, site observations, unresolved diligence, and
              underwriting, connected before you commit capital.
            </p>
            <div className="mt-6">
              <Link
                href="/workspace"
                className="inline-block border border-primary/60 bg-primary-deep px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the Acquisition Workspace
              </Link>
            </div>
          </section>

          <p className="mt-10 text-sm">
            <Link
              href="/resources"
              className="font-semibold text-primary hover:underline"
            >
              Browse the full resource library
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
