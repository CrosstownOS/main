import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  keywords: ["RV park investing", "RV park cap rates", "price per pad", "occupancy verification", "RV park returns"],
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
        . Triage the exposure before you spend on engineers with the{" "}
        <Link href="/tools/utility-capacity-triage" className="font-semibold text-primary hover:underline">
          Utility Capacity Risk Triage
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
    body: (
      <>
        Self-managed parks look cheap until you price your own time or a
        third-party manager at market rates. Underwrite management whether
        you plan to self-manage or not. As one sourced reference point,
        Newmark&apos;s RV Park Expense Analysis (2021) put the average
        management fee at 5.1 percent of revenue across 62 properties,
        based on financial statements reviewed from 2015 to 2021. See
        Sources and limits below.
      </>
    ),
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
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "RV Park Investing" },
            ]}
          />
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
            This page is about the economics, in plain order. What
            published benchmarks report for 2026, in broad ranges you still
            have to confirm against closed sales near your park. The four places
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
              Source for the figures in this snapshot:{" "}
              <a
                href="https://www.innowave-studio.com/post/2026-u-s-rv-park-development-cost-benchmarks-per-pad-economics-across-50-states"
                className="font-semibold text-primary hover:underline"
              >
                Innowave Studio, 2026 U.S. RV Park Development Cost
                Benchmarks (2026)
              </a>
              .
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-2 font-bold text-foreground">Park type</th>
                    <th className="px-3 py-2 font-bold text-foreground">Price per site</th>
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
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              It also reports a Parks and Places brokerage average of 9.3
              percent across 21 sold properties in 2024. That 9.3 percent
              figure is a brokerage-reported average on sold properties, as
              reported by Innowave. The wider 8 to 10 percent range is a
              published benchmark statement, not a closed-comp dataset and
              not asking price data. These are broad published ranges, not
              appraisals: confirm against closed comps in your target
              market before anchoring any underwriting. Resort is a
              marketing word, not a separate asset class: a high-amenity
              RV park underwrites on the same income, the same occupancy
              questions, and the same utility exposure as any other park,
              with a larger amenity payroll riding on top.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Financing remains the gatekeeper. Expect park debt to come
              from a bank or a local lender rather than an agency program,
              with terms varying by deal, and lenders
              scrutinize trailing income more skeptically than broker
              packages do. If your lender will underwrite only verified
              income, you should too, because their skepticism is a preview
              of your resale buyer&apos;s skepticism.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Market ranges describe other people's parks. The price gets set on the one in front of you, on what its record proves.
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
            <div className="theme-cream mt-6 border border-border bg-card p-6">
              <p className="text-sm leading-relaxed text-foreground/85">
                Normalize the seller&apos;s P&amp;L before you believe any
                return projection: add-backs stated as assumptions, nothing
                hidden.
              </p>
              <div className="mt-4">
                <Link
                  href="/tools/expense-normalizer"
                  className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Run the Expense Normalizer
                </Link>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              A leak found in diligence is a line item. The same leak found after closing is your money leaving.
            </p>
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
              , for the cap rate and per-site figures in the snapshot, and{" "}
              <a
                href="https://www.nmrk.com/storage-nmrk/uploads/documents/The-2021-RV-Expense-Summary.pdf"
                className="font-semibold text-primary hover:underline"
              >
                Newmark, RV Park Expense Analysis (2021)
              </a>
              , for the management fee figure. Newmark evaluated 62
              properties and 10,682 sites in 13 states, using actual
              financial statements reviewed from 2015 to 2021, and put the
              average management fee at $237 per site, or 5.1 percent of
              revenue. That source supports only that 5.1 percent average.
              It does not support a wider management band.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              <strong>What this page does not establish:</strong> The
              Innowave ranges are published benchmark statements drawn from
              industry sources listed on that page. They are not a
              closed-comp dataset that CrosstownOS compiled or verified
              deal by deal, and they are not asking price data. The one
              sold-property figure cited, the 9.3 percent brokerage
              average, is reported by Innowave, not researched by
              CrosstownOS from primary closing records. The Newmark sample
              is older expense data, not a current market quote. Nothing on
              this page establishes the price, cap rate, or value of any
              specific park, and nothing here is an appraisal or investment
              advice. Confirm any figure against closed comps and the
              records of the park in front of you.
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

          <div className="theme-cream paper mt-10 border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 text-center sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              Next step
            </p>
            <h2 className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl">
              The verification framework
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Returns traced to evidence survive a lender's questions. Returns traced to a projection do not.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/buying-an-rv-park"
                className="inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Read the buyer&apos;s verification guide
              </Link>
              <Link
                href="/workspace"
                className="inline-block border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_14px_1px_rgba(58,134,242,0.18)] px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the Acquisition Workspace
              </Link>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tools/60-second-screener"
                className="inline-block border border-[#3a86f2]/60 px-4 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                60-Second Deal Screener
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
