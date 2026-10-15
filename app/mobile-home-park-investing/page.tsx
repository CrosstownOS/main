import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
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
          <p className="mono-label mb-4">CrosstownOS / Investor&apos;s guide</p>
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
            <div className="mt-6 overflow-x-auto">
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
                    <td className="px-3 py-2 align-top">The resident&apos;s property, titled as personal property in the resident&apos;s name</td>
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
                Value the two businesses separately: park-owned homes as
                personal property, tenant-owned lot rent as real estate.{" "}
                <Link
                  href="/tools/poh-toh-split"
                  className="font-semibold text-primary hover:underline"
                >
                  Run the POH/TOH Split Valuation
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="mt-12" aria-label="Lot rent verification">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Lot rent verification: not just the rent roll
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The rent roll says what lot rent should be. In tenant-owned
              parks, delinquency is stickier than in apartments: evicting a
              homeowner who owns the structure is slower, costlier, and
              politically harder than turning an apartment. The method for
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
              Mobile home parks are old. Much of the national stock was built
              in the 1960s through 1980s, which means the water lines, sewer
              lines, and electrical systems are often original. Deferred
              underground infrastructure is the silent deal killer: invisible
              in photos, absent from the P&amp;L, and priced in five or six
              figures when it fails.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Two things are specific to parks of this era. First, the
              metering: master-metered parks where the owner eats the utility
              bill need immediate sub-metering capex in your underwriting.
              Second, the pipe: water and sewer lines from the 1960s to
              1980s build era are often original material, and their
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
              again.
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

        </div>
      </main>
    </>
  )
}
