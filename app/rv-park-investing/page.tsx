import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "RV Park Investing 2026: Numbers and Risks | CrosstownOS",
  description:
    "RV park investing guide for 2026: cap rates, price-per-pad, occupancy verification, and the diligence framework that protects your capital. From CrosstownOS.",
  alternates: { canonical: "/rv-park-investing" },
  openGraph: {
    title: "RV Park Investing 2026: Numbers and Risks | CrosstownOS",
    description:
      "Where RV park returns come from, where they leak, and the verification framework that protects your capital.",
    type: "website",
    url: "/rv-park-investing",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "RV Park Investing 2026: Numbers and Risks | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RV Park Investing 2026: Numbers and Risks | CrosstownOS",
    description:
      "Where RV park returns come from, where they leak, and the verification framework that protects your capital.",
    images: ["/og-logo.png"],
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RV Park Investing in 2026: Numbers, Risks, and Verification",
  description:
    "An investor's guide to RV park investing: 2026 market numbers, where returns come from and where they leak, and the verification framework.",
  author: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  publisher: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  mainEntityOfPage: "https://www.crosstownosrv.camp/rv-park-investing",
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
      name: "RV Park Investing",
      item: "https://www.crosstownosrv.camp/rv-park-investing",
    },
  ],
}

const RETURN_DRIVERS = [
  {
    title: "Lot rent growth on owned land",
    body: "The core engine. Parks bought below market rent with a credible path to market are the classic value-add: the land is fixed, the rent compounds. Verify current rents against comps before you underwrite a dollar of growth.",
  },
  {
    title: "Occupancy lift on undermanaged parks",
    body: "Mom-and-pop parks with no marketing, no online booking, and no revenue management leave occupancy on the table. The lift is real but it is operational work, not a spreadsheet adjustment. Underwrite the lift on your plan, not the seller's potential.",
  },
  {
    title: "Expense recapture",
    body: "Sub-metering utilities, rebidding insurance, renegotiating trash and landscaping: the unglamorous work that drops straight to NOI. Get 12 months of actual bills for every line you plan to cut before you count the savings.",
  },
  {
    title: "Expansion and entitlement",
    body: "Unused acreage with a path to permitted sites is the highest-return lever and the highest-risk one. No permit, no value. Confirm expansion capacity with the jurisdiction before it enters your model.",
  },
]

const LEAKS = [
  {
    title: "Deferred infrastructure",
    body: "Water, sewer, roads, pedestals. The capex the seller deferred becomes your capital plan the day after close. Older parks need a real inspection, not a walkaround.",
  },
  {
    title: "Utility exposure",
    body: "Master-metered parks where the owner pays utilities are one rate increase away from a broken pro forma. Know who pays, what it costs, and what sub-metering will cost to fix.",
  },
  {
    title: "Phantom occupancy",
    body: "Reported occupancy that includes non-paying tenants overstates income and understates turnover cost. Underwrite paying occupancy or underwrite a collection business.",
  },
  {
    title: "Management drag",
    body: "Self-managed parks look cheap until you price your own time or a third-party manager at market rates. Underwrite management at 5 to 8 percent whether you plan to self-manage or not.",
  },
]

export default function RvParkInvestingPage() {
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
          <p className="mono-label mb-4">CrosstownOS / Investor&apos;s guide</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            RV park investing rewards the buyer who verifies.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            RV parks can be exceptional investments and exceptional traps,
            sometimes in the same deal. The difference is rarely the market.
            It is what the buyer verified before the price became final. This
            guide covers the 2026 numbers, where returns come from, where
            they leak, and the framework that keeps you on the right side.
          </p>

          <section className="mt-12" aria-label="2026 market snapshot">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              The 2026 snapshot
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Stabilized parks in growth markets have recently traded in the
              7 to 8.5 percent cap rate range, with price per pad commonly
              landing between $40,000 and $80,000 depending on market,
              occupancy, and amenity level. Value-add deals price at higher
              cap rates to compensate for the work required. These are broad
              market ranges, not appraisals: confirm against closed comps in
              your target market before anchoring any underwriting.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Financing remains the gatekeeper. Agency and bank debt for RV
              parks prices wider than multifamily, and lenders scrutinize
              trailing income more skeptically than broker packages do. If
              your lender will underwrite only verified income, you should
              too, because their skepticism is a preview of your resale
              buyer&apos;s skepticism.
            </p>
          </section>

          <section className="mt-12" aria-label="Where returns come from">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Where returns actually come from
            </h2>
            <div className="mt-6 space-y-3">
              {RETURN_DRIVERS.map((d, i) => (
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

          <section className="mt-12" aria-label="Where returns leak">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Where they leak
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Every return driver has a matching leak. The leaks are quieter,
              which is why they win more often.
            </p>
            <ul className="mt-6 space-y-3">
              {LEAKS.map((leak) => (
                <li
                  key={leak.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                    {leak.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {leak.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="theme-cream mt-6 border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-foreground/85">
                Normalize the seller&apos;s P&amp;L before you believe any
                return projection: add-backs stated as assumptions, nothing
                hidden.{" "}
                <Link
                  href="/tools/expense-normalizer"
                  className="font-semibold text-primary hover:underline"
                >
                  Run the Expense Normalizer
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mt-12" aria-label="The verification framework">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              The verification framework
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Returns are underwritten. Risk is verified. Before you commit
              capital, work the five verification gates in order: rebuild
              income from deposits, confirm paying occupancy, verify
              utilities and capacity with the jurisdiction, confirm zoning
              and permitted site count, and underwrite the tenant mix you are
              actually buying. The full framework lives in the{" "}
              <Link
                href="/buying-an-rv-park"
                className="font-semibold text-primary hover:underline"
              >
                RV park buyer&apos;s verification guide
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              When the deal gets real, the{" "}
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
              href="/buying-an-rv-park"
              className="font-semibold text-primary hover:underline"
            >
              Read the buyer&apos;s verification guide
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
