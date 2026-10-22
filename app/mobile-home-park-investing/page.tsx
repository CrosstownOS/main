import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  keywords: ["mobile home park investing", "manufactured housing community", "park-owned homes", "tenant-owned homes", "home ownership mix"],
  title: "Mobile Home Park Investing: Two Businesses, One Price Tag | CrosstownOS",
  description:
    "Buying a manufactured housing community or mobile home park? Verify the home mix from titles, prove the lot rent against deposits, and price the utility systems before the park becomes yours.",
  alternates: { canonical: "/mobile-home-park-investing" },
  openGraph: {
    title: "Mobile Home Park Investing: Two Businesses, One Price Tag | CrosstownOS",
    description:
      "The mix determines everything: tenant-owned vs park-owned, lot rent verification, and the hidden infrastructure capex.",
    type: "website",
    url: "/mobile-home-park-investing",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "Mobile Home Park Investing: Two Businesses, One Price Tag | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Home Park Investing: Two Businesses, One Price Tag | CrosstownOS",
    description:
      "The mix determines everything: tenant-owned vs park-owned, lot rent verification, and the hidden infrastructure capex.",
    images: ["/og-logo.png"],
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mobile Home Park Investing: How to Underwrite Before You Buy",
  description:
    "An underwriting guide for mobile home park investors: tenant-owned vs park-owned mix, lot rent verification, and utility infrastructure diligence.",
  author: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  publisher: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  mainEntityOfPage: "https://www.crosstownosrv.camp/mobile-home-park-investing",
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
      name: "Mobile Home Park Investing",
      item: "https://www.crosstownosrv.camp/mobile-home-park-investing",
    },
  ],
}

export default function MobileHomeParkInvestingPage() {
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
              { label: "Mobile Home Park Investing" },
            ]}
          />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            A mobile home park is two businesses. Price them like it.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Most mobile home park listings quote one price for what is
            actually two businesses. The first business is the land: lots,
            roads, utility lines, and the rent charged for a place to set a
            home. The second business is whatever homes the park itself owns
            and rents out on top of that land. They earn differently, they
            cost differently, and they fail differently.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Tenant-owned homes are the clean business. The resident owns the
            home, pays lot rent, and the park maintains the ground and the
            systems under it. Park-owned homes are a landlord business
            wearing a park&apos;s clothes: higher income per site, and the
            park carries the roof, the furnace, the turnover, and the slow
            wear of housing stock that gets older every year.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            So the first question on any manufactured housing deal is not the
            cap rate. It is the mix, counted home by home from titles, not
            taken from the broker&apos;s summary. A park that is mostly
            tenant-owned is a land business with steady rent. A park that is
            mostly park-owned is a rental housing operation, and it deserves
            a landlord&apos;s underwriting and a landlord&apos;s price. This
            guide shows how to separate the two, verify the lot rent, and
            value each side on its own evidence.
          </p>

          <section className="mt-12" aria-label="Tenant owned versus park owned">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              TOH vs. POH: why the mix determines everything
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Tenant-owned homes (TOH) are the land business: the resident
              owns the home, rents the lot, and the park collects lot rent
              and maintains the ground and infrastructure, with almost no
              home-level capex. Park-owned homes (POH) are the landlord
              business: higher income per site, and the park carries
              maintenance, turnover cost, insurance, and the slow
              depreciation of an aging housing stock. The mix decides which
              business you are really buying, and each side gets priced the
              way it behaves.
            </p>
            <p className="mt-6 text-sm font-bold text-foreground sm:text-base">
              Tenant-owned vs park-owned homes (the CrosstownOS POH/TOH Split):
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-2" aria-label="Comparison point"></th>
                    <th className="px-3 py-2 font-bold text-foreground">Tenant-owned homes (TOH)</th>
                    <th className="px-3 py-2 font-bold text-foreground">Park-owned homes (POH)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <th className="px-3 py-2 font-bold text-foreground">What you are buying</th>
                    <td className="px-3 py-2 align-top">The land business: lots, roads, utility lines, and lot rent</td>
                    <td className="px-3 py-2 align-top">A landlord business on top of the land: the homes and the rent they carry</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <th className="px-3 py-2 font-bold text-foreground">The home itself</th>
                    <td className="px-3 py-2 align-top">The resident&apos;s property, typically titled as personal property in the resident&apos;s name, though in many states a home can be converted to or affixed as real property</td>
                    <td className="px-3 py-2 align-top">The park&apos;s property; the park holds title and the wear</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <th className="px-3 py-2 font-bold text-foreground">Income</th>
                    <td className="px-3 py-2 align-top">Lot rent only, steady</td>
                    <td className="px-3 py-2 align-top">Lot rent plus home rent, higher per site</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <th className="px-3 py-2 font-bold text-foreground">Maintenance exposure</th>
                    <td className="px-3 py-2 align-top">Ground and systems under it; almost no home-level capex</td>
                    <td className="px-3 py-2 align-top">Roof, furnace, turnover, and the slow depreciation of aging housing stock</td>
                  </tr>
                  <tr>
                    <th className="px-3 py-2 font-bold text-foreground">Turnover means</th>
                    <td className="px-3 py-2 align-top">A lot to re-rent</td>
                    <td className="px-3 py-2 align-top">A home to repair, re-price, and re-rent; costs can run into the thousands per turn</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The first diligence question on any mobile home park is the
              mix, verified home by home, not taken from the broker&apos;s
              summary. Titles, not claims. For the full treatment of why
              ownership of the homes is the diligence starting point, read{" "}
              <Link
                href="/blog/manufactured-housing-diligence-starts-with-who-owns-the-homes"
                className="font-semibold text-primary hover:underline"
              >
                Field Notes: manufactured housing diligence starts with who
                owns the homes
              </Link>
              .
            </p>
            <div className="theme-cream mt-6 border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-foreground/85">
                Value the two businesses separately: park-owned homes on
                their title status, typically personal property and
                sometimes converted to real property, and tenant-owned lot
                rent as real estate.{" "}
                <Link
                  href="/tools/poh-toh-split"
                  className="font-semibold text-primary hover:underline"
                >
                  Run the POH/TOH Split Valuation
                </Link>
                .
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Separate businesses get separate prices: the land on proven lot rent, the homes on their rental record.
            </p>
          </section>

          <section className="mt-12" aria-label="Lot rent verification">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Lot rent verification: not just the rent roll
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The rent roll says what lot rent should be. In tenant-owned
              parks, delinquency can be stickier than in apartments, and
              removing a homeowner who owns the structure can be slower and
              costlier than turning an apartment unit. How much slower or
              costlier is not a national rule: eviction of a homeowner, as
              distinct from a renter of a park-owned home, is governed by
              state landlord-tenant law, and timelines, notice, and
              protections vary materially by state. Price the delinquency
              risk for the state the park is actually in. The method for
              proving the income, bank deposits against the rent roll over
              12 to 24 months, lives in{" "}
              <Link
                href="/resources/the-rent-roll-truth-check"
                className="font-semibold text-primary hover:underline"
              >
                The Rent-Roll Truth Check
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Then check the rents against the market. Pull lot rents from
              comparable parks within a realistic drive and adjust for
              utilities included, home age restrictions, and amenity gaps.
              The value-add story in most MHP deals is lot rent growth, so
              the question is never whether rents can go up. It is whether
              the current residents, in these homes, in this market, can
              absorb the increase without the occupancy you underwrote
              walking out the gate. The full sequence, all fifteen
              verifications in order, is laid out in the{" "}
              <Link
                href="/checklist"
                className="font-semibold text-primary hover:underline"
              >
                free due diligence checklist
              </Link>
              .
            </p>
          </section>

          <section className="mt-12" aria-label="Manufactured housing due diligence">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              What due diligence looks like on a manufactured housing community (MHC)
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Due diligence on a manufactured housing community starts with
              paperwork other parks do not have. Every home carries a
              title, and who holds that title decides what you are actually
              buying. Count the homes from the titles, not from the
              broker&apos;s summary. Note which homes the park owns
              outright, which carry liens, and which belong to residents who
              could, at real cost, take theirs somewhere else. A
              resident-owned home is stability you can underwrite. A
              park-owned home is a rental unit you will maintain, insure,
              and one day replace. The land under all of it gets verified
              the way any park does: the permitted site count, the utility
              capacity, the real age of the lines. Work the order on the{" "}
              <Link
                href="/checklist"
                className="font-semibold text-primary hover:underline"
              >
                due diligence checklist
              </Link>
              , then price each side of the split on evidence of its own.
            </p>
          </section>

          <section className="mt-12" aria-label="Utility infrastructure">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Utility infrastructure: the hidden capex
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Many mobile home parks a buyer will see are decades old, and
              the homes in them skew old as well. National Association of
              Home Builders analysis of the U.S. Census Bureau&apos;s 2023
              American Housing Survey found that about 72.2 percent of the
              occupied manufactured home stock was built before 2000 (see
              Sources and limits below). That figure describes homes, not
              park utility lines. For a specific park, the age of the water
              lines, sewer lines, and electrical systems still has to be
              proven from permits, records, and inspection, and in an older
              park those systems may be original. Deferred
              underground infrastructure is the silent deal killer: invisible
              in photos, absent from the P&amp;L, and priced in five or six
              figures when it fails.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Two things are specific to older parks. First, the
              metering: in a master-metered park where the owner eats the
              utility bill, sub-metering is a capex item to underwrite where
              the jurisdiction and utility rules allow it. Some states and
              localities restrict resale of utilities or require specific
              metering arrangements, and where sub-metering or pass-through
              is not allowed, the cost lands differently, as an ongoing
              owner-paid utility expense to price into the deal instead of a
              metering project. Second, the pipe: in an older park, water
              and sewer lines may be original material, and their
              condition, from inspection reports or a scoped sample, not
              from the seller&apos;s memory, sets the capital plan. The
              general utility verification, who pays for each system, what
              it costs, and what capacity is permitted, is worked step by
              step on the{" "}
              <Link
                href="/checklist"
                className="font-semibold text-primary hover:underline"
              >
                due diligence checklist
              </Link>
              .
            </p>
          </section>

          <section className="mt-12" aria-label="The diligence record" id="diligence-record">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              The diligence record for a manufactured housing community
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Everything above reduces to a record: the set of items that
              must be proven, from a source, before capital commits on a
              manufactured housing community. Not presented by the seller.
              Proven by the buyer, and written down with the state of the
              evidence beside it.
            </p>
            <p className="mt-6 text-sm font-bold text-foreground sm:text-base">
              What must be proven before capital commits (the CrosstownOS diligence record):
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-2 font-bold text-foreground">Item</th>
                    <th className="px-3 py-2 font-bold text-foreground">What proves it</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="px-3 py-2 align-top font-bold text-foreground">The home mix</td>
                    <td className="px-3 py-2 align-top">Titles, counted home by home: park-owned outright, park-owned with liens, resident-owned</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="px-3 py-2 align-top font-bold text-foreground">The lot rent</td>
                    <td className="px-3 py-2 align-top">Bank deposits against the rent roll over 12 to 24 months, with delinquency aged, not averaged away</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="px-3 py-2 align-top font-bold text-foreground">The utility systems</td>
                    <td className="px-3 py-2 align-top">Bills, meter records, and permits: who owns each system, who pays for it, and what capacity is permitted</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 align-top font-bold text-foreground">The permitted site count</td>
                    <td className="px-3 py-2 align-top">The county&apos;s count reconciled against the broker&apos;s, before any price per pad is quoted</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              An item with no proof behind it is not a detail to settle
              later. It is an open claim, and it stays open in the record
              until the evidence arrives or the price moves. The record
              this guide describes is the one kept in{" "}
              <Link
                href="/workspace"
                className="font-semibold text-primary hover:underline"
              >
                the manufactured housing acquisition workspace
              </Link>
              : seller claims, source evidence, site observations, and
              unresolved diligence connected in one place, priced only
              when proven.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              What cannot be proven does not get priced. The capital follows the record, not the package.
            </p>
          </section>

          <section className="mt-12" aria-label="Finish with the record">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Underwrite the park that exists
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The pattern across every section is the same: the marketed park
              and the verifiable park are two different assets until you
              close the gap. Verify the home mix from titles. Verify income
              from deposits. Verify utilities from bills and permits. Then
              price the deal on what you proved, not what you were told.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Two free resources work this section. The{" "}
              <Link
                href="/resources/poh-toh-split-valuation-worksheet"
                className="font-semibold text-primary hover:underline"
              >
                POH/TOH Split-Valuation Worksheet
              </Link>{" "}
              values park-owned and tenant-owned homes separately.{" "}
              <Link
                href="/resources/the-park-owned-rental-valuation"
                className="font-semibold text-primary hover:underline"
              >
                The Park-Owned Rental Valuation
              </Link>{" "}
              values the park-owned homes as rentals, not as lot rent.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Two businesses, two prices, one decision. Pay for the land on
              its verified lot rent, pay for the homes on their rental
              record, and never let a single price tag blur the two together
              again. Against the broker&apos;s single blended number, the
              CrosstownOS POH/TOH Split values the land business and the
              homes business on separate evidence.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              When both businesses are proven on their own evidence, the closing is a signature, not a second negotiation.
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
              <span className="font-bold text-foreground">Source:</span>{" "}
              <a
                href="https://eyeonhousing.org/2025/12/top-posts-manufactured-homes-an-alternative-means-of-housing-supply/"
                className="font-semibold text-primary hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                National Association of Home Builders, Eye on Housing,
                &ldquo;Manufactured Homes: An Alternative Means of Housing
                Supply&rdquo; (December 2025)
              </a>
              , an analysis of the U.S. Census Bureau&apos;s 2023 American
              Housing Survey. It reports 7.2 million occupied manufactured
              homes in the United States and that about 72.2 percent of that
              stock was built before 2000. This guide uses that figure only
              for the age of the homes. It does not establish the age or
              condition of any specific park&apos;s utility systems.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              <span className="font-bold text-foreground">Limits:</span>{" "}
              this guide is a diligence framework, not legal advice.
              Eviction, home title, and utility metering and resale are
              governed by state and local law and utility rules, which vary
              materially by jurisdiction. How a home is titled, whether it
              has been converted to real property, and whether sub-metering
              or utility pass-through is allowed on a specific deal must be
              confirmed from the titles, the state&apos;s rules, and the
              utility&apos;s terms for that park, with qualified local
              counsel where the answer matters to the price.
            </p>
            <p className="mt-6 text-sm italic leading-relaxed text-muted">
              This guide may use AI-assisted research and drafting. Sources,
              claims, and final editorial judgment remain subject to human
              review.
            </p>
          </section>

        </div>
      </main>
    </>
  )
}
