import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Buying a Campground: Verification Guide | CrosstownOS",
  description:
    "How to buy a campground: verify financials, occupancy, water/sewer, permits, and seasonal risk before committing capital. Buyer's guide from CrosstownOS.",
  alternates: { canonical: "/buying-a-campground" },
  openGraph: {
    title: "Buying a Campground: Verification Guide | CrosstownOS",
    description:
      "Campground diligence is RV park diligence plus seasonality, water, and permits. Verify it before you buy it.",
    type: "website",
    url: "/buying-a-campground",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "Buying a Campground: Verification Guide | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buying a Campground: Verification Guide | CrosstownOS",
    description:
      "Campground diligence is RV park diligence plus seasonality, water, and permits. Verify it before you buy it.",
    images: ["/og-logo.png"],
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Buy a Campground: What to Verify Before You Buy",
  description:
    "A buyer's guide to campground acquisitions: how campground diligence differs from RV parks, seasonal revenue traps, and water, sewer, and permit verification.",
  author: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  publisher: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  mainEntityOfPage: "https://www.crosstownosrv.camp/buying-a-campground",
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
      name: "Buying a Campground",
      item: "https://www.crosstownosrv.camp/buying-a-campground",
    },
  ],
}

const DIFFERENCES = [
  {
    title: "Seasonality runs the P&L",
    body: "Most campgrounds earn the bulk of annual revenue in a four to six month window. That compresses every mistake: a soft shoulder season, a washed-out holiday weekend, or a rate that lags the market by ten dollars does not average out over twelve months. Underwrite month by month, not on an annualized average that hides the shape of the year.",
  },
  {
    title: "The guest mix is more volatile",
    body: "Campgrounds skew harder toward transient and overnight guests than RV parks with long-term tenants. Transient revenue is rate-sensitive and review-sensitive in a way lot rent is not. Pull the booking platform data and the review history. A campground living on one OTA channel is renting its demand from someone else.",
  },
  {
    title: "Amenities are the product",
    body: "Pools, bathhouses, playgrounds, camp stores, and activity programming are not extras at a campground. They are the reason guests choose it over the park down the road. Price their condition honestly: a bathhouse renovation or a pool resurface is a six-figure line item that never appears in the broker's expense summary.",
  },
  {
    title: "Regulatory exposure is wider",
    body: "Campgrounds intersect with health departments, environmental agencies, and local short-term lodging rules in ways many RV parks do not. Permits for pools, food service, and wastewater carry their own inspections and their own shutdown risk. Confirm every operating permit directly with the issuing authority.",
  },
]

const SEASONAL_TRAPS = [
  {
    title: "The annualized average",
    body: "Twelve-month revenue divided by twelve tells you nothing about a business that makes 70 percent of its money in five months. Build the monthly P&L. Find the breakeven occupancy for the shoulder months. Know exactly how bad a bad summer has to be before the debt service sweats.",
  },
  {
    title: "Last year's weather",
    body: "One great season can be weather, not management. Pull three to five years of monthly revenue and occupancy. If the seller only has last year, discount the story accordingly and underwrite to the weaker years you can document.",
  },
  {
    title: "Rate growth assumed, not demonstrated",
    body: "Broker packages love to underwrite 5 percent annual rate increases on transient sites. Check the actual rate history for the last three years. If rates have been flat while costs rose, the upside is a turnaround story priced as a stabilized asset.",
  },
  {
    title: "The shoulder season headcount",
    body: "Staffing a campground for peak season is straightforward. Carrying payroll through the shoulder is where margins die. Get the actual labor schedule by month, not the annual payroll number. Labor is the expense line most likely to be understated in a seasonal operation.",
  },
]

export default function BuyingACampgroundPage() {
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
              { label: "Buying a Campground" },
            ]}
          />
          <p className="mono-label mb-4">CrosstownOS / Buyer&apos;s guide</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Buying a campground? Verify it before you buy it.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Campground diligence is RV park diligence with three added
            complications: a short earning season, heavier amenity capex, and
            wider regulatory exposure. Everything in the{" "}
            <Link
              href="/buying-an-rv-park"
              className="font-semibold text-primary hover:underline"
            >
              RV park buyer&apos;s guide
            </Link>{" "}
            applies here. This guide covers what changes.
          </p>

          <section className="mt-12" aria-label="Campground versus RV park">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Campground vs. RV park: what changes in diligence
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The verification framework is the same: rebuild income from
              deposits, normalize expenses, confirm occupancy in paying terms,
              verify utilities and permits with the jurisdiction. What changes
              is where the risk concentrates. Four differences matter most.
            </p>
            <div className="mt-6 space-y-3">
              {DIFFERENCES.map((d, i) => (
                <div
                  key={d.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-sans text-base font-bold tracking-tight text-foreground">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12" aria-label="Seasonal revenue traps">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Seasonal revenue traps
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Seasonality does not just change the numbers. It changes which
              numbers you can trust. Four traps catch campground buyers more
              than any others.
            </p>
            <ul className="mt-6 space-y-3">
              {SEASONAL_TRAPS.map((trap) => (
                <li
                  key={trap.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                    {trap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {trap.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12" aria-label="Water sewer and permits">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Water, sewer, and permits: the campground-specific risks
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Many campgrounds sit outside municipal service areas, which
              means the water and wastewater systems are yours to verify and
              yours to fix. Confirm the water source and its permitted
              withdrawal, the wastewater system type and its permitted
              capacity, and the inspection history for both, directly with
              the county or state agency. A lagoon at permitted capacity
              with no expansion path caps your site count no matter what the
              land could hold.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Then walk the permits: health department for pools and food
              service, environmental for wastewater, local jurisdiction for
              the lodging use itself. Ask each office the same question: is
              this operation in good standing, and what would trigger a
              reinspection or a shutdown? Get the answers in writing. Verbal
              comfort from a seller about permits is worth exactly nothing at
              closing.
            </p>
            <div className="theme-cream mt-6 border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-foreground/85">
                Triage the utility risk before you spend on engineers: water,
                sewer, and electric capacity scored red, amber, or green.{" "}
                <Link
                  href="/tools/utility-capacity-triage"
                  className="font-semibold text-primary hover:underline"
                >
                  Run the Utility Capacity Risk Triage
                </Link>
                .
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Capacity proven before the offer is a term of the deal. Capacity assumed is a closing condition waiting to fail.
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
              covers the shared foundation: income verification, occupancy,
              utilities, permits, and the decision file. Layer this
              guide&apos;s campground-specific checks on top. When the deal
              gets real, the{" "}
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
              The campground you can prove is the only one worth paying for. The rest is scenery priced as income.
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

          <p className="mt-10 text-sm">
            <Link
              href="/buying-an-rv-park"
              className="font-semibold text-primary hover:underline"
            >
              Read the RV park buyer&apos;s verification guide
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
