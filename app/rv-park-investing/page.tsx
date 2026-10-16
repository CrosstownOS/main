import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "RV Park Investing in 2026: Where Returns Come From and Where They Leak | CrosstownOS",
  description:
    "RV park investing guide for 2026: cap rates, price-per-pad, occupancy verification, and the diligence framework that protects your capital. From CrosstownOS.",
  alternates: { canonical: "/rv-park-investing" },
  openGraph: {
    title: "RV Park Investing in 2026: Where Returns Come From and Where They Leak | CrosstownOS",
    description:
      "Where RV park returns come from, where they leak, and the verification framework that protects your capital.",
    type: "website",
    url: "/rv-park-investing",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "RV Park Investing in 2026: Where Returns Come From and Where They Leak | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RV Park Investing in 2026: Where Returns Come From and Where They Leak | CrosstownOS",
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

const RETURN_DRIVERS: { title: string; body: ReactNode }[] = [
  {
    title: "Site rent growth on owned land",
    body: "The core engine. Parks bought below market rent on long-term and seasonal sites, with a credible path to market, are the classic value-add: the land is fixed, the rent compounds. Transient rates can move faster, but they reset with the season. Verify current rents against comps before you underwrite a dollar of growth.",
  },
  {
    title: "Occupancy lift on undermanaged parks",
    body: (
      <>
        Mom-and-pop parks with no marketing, no online booking, and no revenue
        management leave occupancy on the table. The lift is real but it is
        operational work, not a spreadsheet adjustment. For transient sites,
        run that fill math by season:{" "}
        <Link
          href="/resources/the-transient-site-fill-calculator"
          className="font-semibold text-primary hover:underline"
        >
          The Transient-Site Fill Calculator
        </Link>{" "}
        shows what a filled transient site actually earns once seasonality is
        counted. Underwrite the lift on your plan, not the seller&apos;s
        potential.
      </>
    ),
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

const LEAKS: { title: string; body: ReactNode }[] = [
  {
    title: "Deferred infrastructure",
    body: "Water, sewer, roads, pedestals. The capex the seller deferred becomes your capital plan the day after close. Older parks need a real inspection, not a walkaround.",
  },
  {
    title: "Utility exposure",
    body: (
      <>
        Master-metered parks where the owner pays utilities are one rate
        increase away from a broken pro forma. Know who pays, what it costs,
        and what sub-metering will cost to fix. The utility verification, in
        order, sits on the{" "}
        <Link href="/checklist" className="font-semibold text-primary hover:underline">
          due diligence checklist
        </Link>
        .
      </>
    ),
  },
  {
    title: "Phantom occupancy",
    body: (
      <>
        Reported occupancy that includes non-paying tenants overstates income
        and understates turnover cost. Underwrite paying occupancy or
        underwrite a collection business. Prove the count with the{" "}
        <Link
          href="/resources/rent-roll-truth-check-rv-edition"
          className="font-semibold text-primary hover:underline"
        >
          Rent-Roll Truth Check: RV Edition
        </Link>
        , which rebuilds occupancy from reservation exports, deposits, and tax
        filings.
      </>
    ),
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
            The returns are real. So are the leaks.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            People buy RV parks for the income, and the income is real. A
            well-run park on good land throws off cash in a way few small
            real estate assets can match: site rent that renews monthly,
            guests who come back every season, and expenses a careful
            operator can actually control.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            People lose money on RV parks for quieter reasons. The occupancy
            in the package counted guests who were not paying. The utility
            lines were older than the park&apos;s marketing photos. The
            seller&apos;s profit and loss left out the manager the park
            plainly needs, because the seller was the manager and never paid
            himself. None of that shows up in a cap rate. All of it shows up
            in your first year of ownership.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            This page is about the economics, in plain order. What the
            market is paying in 2026, in broad ranges you still have to
            confirm against closed sales near your park. The four places
            returns actually come from. The four leaks that take them back.
            And the one habit that separates buyers who keep the returns
            from buyers who donate them: verify the income from records you
            can touch before you fall for the story the numbers were
            arranged to tell.
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
              Resort is a marketing word, not a separate asset class: a
              high-amenity RV park underwrites on the same income, the
              same occupancy questions, and the same utility exposure as
              any other park, with a larger amenity payroll riding on top.
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
              Returns are underwritten. Risk is verified. The full process
              for verifying a real deal, gate by gate and in order, lives in
              the{" "}
              <Link
                href="/buying-an-rv-park"
                className="font-semibold text-primary hover:underline"
              >
                RV park buyer&apos;s verification guide
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              When a real deal is in front of you, start small: run the{" "}
              <Link
                href="/tools/60-second-screener"
                className="font-semibold text-primary hover:underline"
              >
                60-Second Deal Screener
              </Link>{" "}
              before the story gets expensive, then work the buyer&apos;s
              guide in order.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Where the package arranges the numbers into a story, the
              CrosstownOS record keeps the same numbers next to the evidence
              that proves or breaks them.
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
