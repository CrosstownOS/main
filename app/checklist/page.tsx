import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Mobile Home Park and RV Park Due Diligence Checklist | CrosstownOS",
  description:
    "Free due diligence checklist for mobile home park and RV park buyers: 15 items covering rent roll verification, P&L normalization, utilities, permits, zoning, and the final decision file.",
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

type ChecklistItem = {
  title: string
  body: string
  tool?: { href: string; label: string }
  resource?: { href: string; label: string }
}

const ITEMS: ChecklistItem[] = [
  {
    title: "Rent roll truth check",
    body: "Prove the income at the bank, not the spreadsheet. The rent roll shows what should have been collected; deposits show what arrived. Any line that does not reconcile is a claim, not income.",
    tool: { href: "/tools/rent-roll-truth-check", label: "Run the Rent-Roll Truth Check" },
    resource: { href: "/resources/the-rent-roll-truth-check", label: "Work it in The Rent-Roll Truth Check" },
  },
  {
    title: "Paying occupancy, not reported occupancy",
    body: "Reported occupancy counts heads. Paying occupancy counts money. Pull the delinquency report, age the receivables, and find out how many of those occupied sites are actually current.",
    tool: { href: "/tools/rent-roll-truth-check", label: "Run the Rent-Roll Truth Check" },
    resource: { href: "/resources/the-rent-roll-truth-check", label: "Work it in The Rent-Roll Truth Check" },
  },
  {
    title: "P&L normalization",
    body: "Prove the run rate, not the story. Restate the seller's P&L without owner add-backs, one-time items, and below-market expenses, especially management fees the seller never paid themselves. The normalizers own the method.",
    tool: { href: "/tools/expense-normalizer", label: "Run the Expense Normalizer" },
    resource: { href: "/resources/mom-and-pop-expense-normalizer", label: "Work it in the Mom-and-Pop Expense Normalizer" },
  },
  {
    title: "Utility systems: who pays and what they cost",
    body: "Confirm who pays for water, sewer, electric, gas, and trash on every site type. Get 12 months of utility bills. A utility bill nobody underwrote is the fastest way to blow up a pro forma.",
    tool: { href: "/tools/utility-capacity-triage", label: "Run the Utility Capacity Risk Triage" },
    resource: { href: "/resources/utility-and-wastewater-diligence-sheet", label: "Work it in the Utility and Wastewater Diligence Sheet" },
  },
  {
    title: "Utility capacity",
    body: "For parks on well, septic, or lagoon: confirm permitted capacity against current and planned site counts. Capacity you assume but cannot prove is missing evidence, not a footnote.",
    tool: { href: "/tools/utility-capacity-triage", label: "Run the Utility Capacity Risk Triage" },
    resource: { href: "/resources/utility-and-wastewater-diligence-sheet", label: "Work it in the Utility and Wastewater Diligence Sheet" },
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "RV Park Due Diligence Checklist",
  description:
    "Fifteen items to verify before you commit capital on an RV park or manufactured housing deal.",
  step: ITEMS.map((item, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: item.title,
    text: item.body,
  })),
  totalTime: "P1D",
};

export default function ChecklistPage() {
  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
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
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Buying an RV park? Start with the full{" "}
            <Link
              href="/buying-an-rv-park"
              className="font-semibold text-primary hover:underline"
            >
              buyer&apos;s verification guide
            </Link>
            . Looking at a campground instead? Read{" "}
            <Link
              href="/buying-a-campground"
              className="font-semibold text-primary hover:underline"
            >
              how to buy a campground
            </Link>
            .
          </p>

          <section className="mt-12" aria-label="Diligence checklist">
            <p className="mb-4 text-sm font-bold text-foreground sm:text-base">
              The fifteen verifications, in order (CrosstownOS):
            </p>
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
                  {item.tool && (
                    <p className="mt-3 text-sm">
                      <Link
                        href={item.tool.href}
                        className="font-semibold text-primary hover:underline"
                      >
                        {item.tool.label} &rarr;
                      </Link>
                    </p>
                  )}
                  {item.resource && (
                    <p className="mt-2 text-sm">
                      <Link
                        href={item.resource.href}
                        className="font-semibold text-primary hover:underline"
                      >
                        {item.resource.label} &rarr;
                      </Link>
                    </p>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Working a manufactured housing deal? Items nine and thirteen
              carry extra weight there, because the homes themselves are
              part of the purchase.{" "}
              <Link
                href="/mobile-home-park-investing#diligence-record"
                className="font-semibold text-primary hover:underline"
              >
                The diligence record for a manufactured housing community
              </Link>{" "}
              lays out what has to be proven on the homes side before
              capital commits.
            </p>
          </section>

          <section className="mt-12 border border-primary/40 bg-primary/5 p-6 sm:p-8">
            <h2 className="serif-display text-2xl tracking-tight text-foreground sm:text-3xl">
              This checklist gets you started.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              A checklist tells you what to verify. It does not hold the
              evidence, track what is missing, or connect the rent roll to the
              bank deposits to the site walk. The states behind that work are
              defined in{" "}
              <Link
                href="/resources/the-evidence-status-standard"
                className="font-semibold text-primary hover:underline"
              >
                The Evidence Status Standard
              </Link>
              : every claim carries one letter, and the letter is the status,
              not the strength. What it leaves you with is the
              honest list: what you proved, what you could not, and what the
              gap is worth. Work the fifteen in order, and what is still
              unresolved at the end is not a footnote. It is the finding, and
              it goes on the record before your money goes hard. If you want
              the whole library in order,{" "}
              <Link
                href="/resources/start-here"
                className="font-semibold text-primary hover:underline"
              >
                Start Here
              </Link>{" "}
              shows how the 35 tools fit together before you print anything.
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

