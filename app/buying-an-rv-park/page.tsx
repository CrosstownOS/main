import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
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
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Buying an RV Park" },
            ]}
          />
          <p className="mono-label mb-4">CrosstownOS / Buyer&apos;s guide</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            How to buy an RV park without buying someone else&apos;s problems.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Buying an RV park means buying a story about income. Your job is
            to check the story against the evidence before the price becomes
            final. That work starts one step earlier when the park never
            listed. The{" "}
            <Link
              href="/resources/off-market-sourcing-system"
              className="font-semibold text-primary hover:underline"
            >
              Off-Market Sourcing System
            </Link>{" "}
            works county records and license lists to find the sellers who
            never listed. This guide covers what to verify, in what order,
            and the red flags that should stop a deal cold.
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
              for the park in the brochure. The Field Note{" "}
              <Link
                href="/blog/anatomy-of-a-broker-package"
                className="font-semibold text-primary hover:underline"
              >
                Anatomy of a Broker Package
              </Link>{" "}
              reads one package claim by claim and lands each claim on an
              evidence state.
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
              but it is a starting point for questions, not an answer. The
              figures on this page come from one cited source:{" "}
              <a
                href="https://www.innowave-studio.com/post/2026-u-s-rv-park-development-cost-benchmarks-per-pad-economics-across-50-states"
                className="font-semibold text-primary hover:underline"
              >
                Innowave Studio, 2026 U.S. RV Park Development Cost
                Benchmarks (2026)
              </a>
              . That report gives general acquisition pricing of $30,000 to
              $55,000 per site, basic rural campgrounds at $10,000 to
              $17,000 per site, and premium resort properties at $50,000 to
              $62,000 per site.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Cap rates tell the other half. The same report puts the
              practical cap rate benchmark for stabilized RV parks in 2025
              to 2026 at 8 to 10 percent, prime destination resorts at 6 to
              7 percent, and value-add going-in cap rate targets at 8 to 12
              percent. The value-add figure is a target reported by
              Innowave, not a traded average. Innowave also reports a Parks
              and Places brokerage average of 9.3 percent across 21 sold
              properties in 2024. When a marketed cap rate looks a point
              better than these benchmarks, the income or the expenses are
              usually doing something creative. Normalize first, then
              compare.
            </p>
            <div className="theme-cream mt-6 border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-foreground/85">
                <strong>Read the table with its caveat first:</strong>{" "}
                These are broad published ranges, not appraisals: confirm
                against closed comps in your target market before anchoring
                any underwriting. The Innowave figures are published
                benchmark statements, not a closed-comp dataset that
                CrosstownOS compiled, and they are not asking price data.
                The per-site figure in the stabilized row is
                Innowave&apos;s general acquisition pricing range, not a
                stabilized-only price series. Innowave gives no separate
                value-add per-pad range, so the table states none instead
                of inventing one.
              </p>
            </div>
            <p className="mt-6 text-sm font-bold text-foreground sm:text-base">
              Price-per-pad and cap rate benchmarks (Innowave Studio, 2026; see Sources and limits below):
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-2 font-bold text-foreground">Park type</th>
                    <th className="px-3 py-2 font-bold text-foreground">Price per pad</th>
                    <th className="px-3 py-2 font-bold text-foreground">Cap rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="px-3 py-2 align-top font-bold text-foreground">Stabilized</td>
                    <td className="px-3 py-2 align-top">$30,000 to $55,000 (general acquisition pricing)</td>
                    <td className="px-3 py-2 align-top">8% to 10%</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="px-3 py-2 align-top font-bold text-foreground">Value-add</td>
                    <td className="px-3 py-2 align-top">No separate range in the cited source</td>
                    <td className="px-3 py-2 align-top">8% to 12% going-in target (a target, not a traded average)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="px-3 py-2 align-top font-bold text-foreground">Basic rural campgrounds</td>
                    <td className="px-3 py-2 align-top">$10,000 to $17,000</td>
                    <td className="px-3 py-2 align-top">No separate range in the cited source</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-bold text-foreground">Destination and premium resort</td>
                    <td className="px-3 py-2 align-top">$50,000 to $62,000</td>
                    <td className="px-3 py-2 align-top">6% to 7% for prime destination resorts</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Benchmarks start the conversation. Only verified numbers are allowed to finish it.
            </p>
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
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Worked in order, the gates turn closing into a confirmation. Skipped, they turn it into a negotiation nobody planned.
            </p>
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
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Every flag resolved before closing is capital that stays yours. Every flag found after closing is capital already spent.
            </p>
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
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The package makes the seller&apos;s case; the CrosstownOS
              Acquisition Workspace is where the buyer&apos;s case gets
              built, claim by claim, against the evidence.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              If the deal file currently lives in a data room or a shared
              drive, the distinction that matters is what the tool does
              with a claim once the document is filed.{" "}
              <Link
                href="/data-room-vs-diligence-software"
                className="font-semibold text-primary hover:underline"
              >
                Data room vs due diligence software
              </Link>{" "}
              puts the two side by side.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Partners and lenders do not have to take the buyer's word for any of it. The record shows its work.
            </p>
            <div className="mt-6 text-center">
              <Link
                href="/workspace"
                className="inline-block border border-primary/60 bg-primary-deep px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the Acquisition Workspace
              </Link>
            </div>
          </section>

          <section className="mt-12" aria-label="Sources and limits">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Sources and limits
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              <strong>What the numbers on this page rest on:</strong>{" "}
              <a
                href="https://www.innowave-studio.com/post/2026-u-s-rv-park-development-cost-benchmarks-per-pad-economics-across-50-states"
                className="font-semibold text-primary hover:underline"
              >
                Innowave Studio, 2026 U.S. RV Park Development Cost
                Benchmarks (2026)
              </a>
              , for every cap rate and per-pad figure in the benchmark
              section and table, and{" "}
              <a
                href="https://www.nmrk.com/storage-nmrk/uploads/documents/The-2021-RV-Expense-Summary.pdf"
                className="font-semibold text-primary hover:underline"
              >
                Newmark, RV Park Expense Analysis (2021)
              </a>
              , cited on the companion investing guide for the management
              fee reference point. Newmark evaluated 62 properties and
              10,682 sites in 13 states, using actual financial statements
              reviewed from 2015 to 2021, and put the average management
              fee at $237 per site, or 5.1 percent of revenue. That source
              supports only that 5.1 percent average. It does not support a
              wider management band, and this page states no such band.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              <strong>What this page does not establish:</strong> The
              Innowave ranges are published benchmark statements drawn from
              industry sources listed on that page. They are not a
              closed-comp dataset that CrosstownOS compiled or verified
              deal by deal, and they are not asking price data. The one
              sold-property figure cited, the 9.3 percent brokerage
              average across 21 sold properties in 2024, is reported by
              Innowave, not researched by CrosstownOS from primary closing
              records. The value-add cap figure is a going-in target, not a
              traded average, and the cited source gives no separate
              value-add per-pad range. Nothing on this page establishes the
              price, cap rate, or value of any specific park, and nothing
              here is an appraisal or investment advice. Confirm any figure
              against closed comps and the records of the park in front of
              you.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              See also our{" "}
              <Link
                href="/editorial-standards"
                className="font-semibold text-primary hover:underline"
              >
                editorial standards
              </Link>
              .
            </p>
          </section>

          <p className="mt-10 text-sm italic leading-relaxed text-muted">
            This page may use AI-assisted research and drafting. Sources,
            claims, and final editorial judgment remain subject to human
            review.
          </p>

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
