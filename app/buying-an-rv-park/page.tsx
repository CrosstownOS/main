import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "How to Buy an RV Park: Verification Guide | CrosstownOS",
  description:
    "Buying an RV park? Verify seller claims, financials, occupancy, utilities, and zoning before you commit capital. Buyer's guide from CrosstownOS.",
  alternates: { canonical: "/buying-an-rv-park" },
  openGraph: {
    title: "How to Buy an RV Park: Verification Guide | CrosstownOS",
    description:
      "The five verification gates every RV park buyer should clear before committing capital.",
    type: "website",
    url: "/buying-an-rv-park",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "How to Buy an RV Park: Verification Guide | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Buy an RV Park: Verification Guide | CrosstownOS",
    description:
      "The five verification gates every RV park buyer should clear before committing capital.",
    images: ["/og-logo.png"],
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Buy an RV Park: The Buyer's Verification Guide",
  description:
    "A buyer's guide to verifying an RV park acquisition: price-per-pad benchmarks, the five verification gates, and the red flags that kill deals.",
  author: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  publisher: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  mainEntityOfPage: "https://www.crosstownosrv.camp/buying-an-rv-park",
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.crosstownosrv.camp/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Buying an RV Park",
      item: "https://www.crosstownosrv.camp/buying-an-rv-park",
    },
  ],
}

const GATES = [
  {
    title: "Gate 1: Financials",
    body: "Rebuild the income from bank deposits, not the rent roll. Normalize the P&L: add back the seller's personal expenses, remove one-time items, and put market-rate management and maintenance back in where the seller ran lean. If the seller will not share 12 to 24 months of bank statements, treat every income number as a claim with no source. Price the deal on the normalized number, not the marketed one.",
  },
  {
    title: "Gate 2: Occupancy",
    body: "There are two occupancies and only one of them pays you. Reported occupancy counts every site with a name on it. Paying occupancy counts every site current on rent. Pull the delinquency report and age the receivables. A park at 90 percent reported occupancy and 70 percent paying occupancy is a different deal at a different price.",
  },
  {
    title: "Gate 3: Utilities",
    body: "Confirm who pays for water, sewer, electric, gas, and trash on each site type, then get 12 months of actual bills. For parks on well, septic, or lagoon, confirm permitted capacity against current and planned site counts with the county, not the seller. Utility exposure is the line item buyers underwrite least and regret most.",
  },
  {
    title: "Gate 4: Zoning and permits",
    body: "Confirm legal use directly with the county or municipality. Ask whether the current use is conforming, grandfathered, or nonconforming, and what each status means for expansion, rebuild, or change of use. Reconcile the broker's site count against the county's permitted count before you price per pad. A park you cannot legally operate is not a park.",
  },
  {
    title: "Gate 5: Tenant mix",
    body: "Overnight, seasonal, and long-term tenants are three different businesses sharing one ledger. Overnight turns drive rate but cost labor. Long-term tenants stabilize income but cap upside. Know the mix, know the trend, and underwrite the mix you are actually buying, not the mix the photos suggest.",
  },
]

const RED_FLAGS = [
  {
    title: "No bank statements",
    body: "A seller who will not share deposits is asking you to underwrite their word. Walk or retrade.",
  },
  {
    title: "Site count mismatch",
    body: "When the broker package and the county disagree on site count, the county is right until proven otherwise.",
  },
  {
    title: "Utility bills nobody has seen",
    body: "If 12 months of utility bills do not exist, the expense line is a guess wearing a costume.",
  },
  {
    title: "Grandfathered use with no paperwork",
    body: "Grandfathered status asserted verbally is not a status. Get the determination in writing from the jurisdiction.",
  },
  {
    title: "Occupancy propped by non-paying tenants",
    body: "Full parks where a third of tenants are behind are not full parks. They are collection problems with a view.",
  },
  {
    title: "Deferred infrastructure with no reserve",
    body: "Old water lines, failing septic, tired pedestals. If the capital plan does not exist, you are writing it with your purchase price.",
  },
]

export default function BuyingAnRvParkPage() {
  return (
    <>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Buyer&apos;s guide</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            How to buy an RV park without buying someone else&apos;s problems.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Buying an RV park means buying a story about income. Your job is
            to check the story against the evidence before the price becomes
            final. This guide covers what to verify, in what order, and the
            red flags that should stop a deal cold.
          </p>

          <section className="mt-12" aria-label="Why buyers overpay">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Why most RV park buyers overpay
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The seller knows the park. The broker packages the park. You get
              the package. Every number in that package was chosen by someone
              with an interest in the sale price, which means every number is
              a claim until you verify it against an independent source. The
              information gap is the whole game: the buyer who closes the gap
              pays for the park that exists, and the buyer who does not pays
              for the park in the brochure.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Overpaying rarely looks like one big mistake. It looks like six
              small ones stacked: income taken from the rent roll instead of
              deposits, expenses taken from the seller&apos;s P&amp;L instead of a
              normalized run rate, occupancy reported instead of paying,
              utilities assumed instead of billed, site count marketed instead
              of permitted. Each gap is a few thousand a year. Together they
              are the difference between a deal that works and a deal that
              owns you.
            </p>
          </section>

          <section className="mt-12" aria-label="Price per pad benchmarks">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Price-per-pad benchmarks
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Price per pad is the shorthand the market uses to compare parks,
              but it is a starting point for questions, not an answer. In
              recent years, stabilized parks in growth markets have traded
              roughly in the $40,000 to $80,000 per pad range, while
              value-add and rural parks have traded lower, often $20,000 to
              $45,000 per pad. Destination and high-amenity parks can clear
              $100,000 per pad. These are broad ranges, not quotes: verify
              against closed comps in your market before you anchor on any
              number.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Cap rates tell the other half. Stabilized parks in strong
              markets have traded in the 7 to 8.5 percent range; value-add
              deals price higher to compensate for the work. When a marketed
              cap rate looks a point better than the market, the income or
              the expenses are usually doing something creative. Normalize
              first, then compare.
            </p>
            <div className="theme-cream mt-6 border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-foreground/85">
                Run the headline numbers in under a minute: implied cap rate,
                price per pad, and gross potential rent from six inputs.{" "}
                <Link
                  href="/tools/60-second-screener"
                  className="font-semibold text-primary hover:underline"
                >
                  Try the 60-Second Deal Screener
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mt-12" aria-label="The five verification gates">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              The five verification gates
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Work these in order. Each gate protects the ones after it: there
              is no point verifying occupancy against income you have not
              rebuilt, and no point pricing per pad against a site count you
              have not confirmed.
            </p>
            <div className="mt-6 space-y-3">
              {GATES.map((gate, i) => (
                <div
                  key={gate.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-sans text-base font-bold tracking-tight text-foreground">
                    {gate.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {gate.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-label="Red flags">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Red flags that kill deals
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Any one of these does not automatically end a deal, but each one
              reprices it. Two or more together usually mean the marketed
              story and the real park are different assets.
            </p>
            <ul className="mt-6 space-y-3">
              {RED_FLAGS.map((flag) => (
                <li
                  key={flag.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                    {flag.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {flag.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12" aria-label="Start with the checklist">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Start with the checklist, finish with the record
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The fifteen-item{" "}
              <Link
                href="/checklist"
                className="font-semibold text-primary hover:underline"
              >
                RV park due diligence checklist
              </Link>{" "}
              is the free starting point: every item in this guide, in the
              order you work them. When the deal gets real and evidence starts
              scattering across inboxes, the{" "}
              <Link
                href="/workspace"
                className="font-semibold text-primary hover:underline"
              >
                Acquisition Workspace
              </Link>{" "}
              holds the full record: seller claims, source evidence, site
              observations, unresolved diligence, and underwriting connected
              before you commit capital.
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
              href="/checklist"
              className="font-semibold text-primary hover:underline"
            >
              Get the free due diligence checklist
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
