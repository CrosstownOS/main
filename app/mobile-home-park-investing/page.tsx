import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Mobile Home Park Investing Guide | CrosstownOS",
  description:
    "Investing in mobile home parks? Verify lot rents, tenant-owned vs park-owned mix, utilities, and infrastructure before you buy. Guide from CrosstownOS.",
  alternates: { canonical: "/mobile-home-park-investing" },
  openGraph: {
    title: "Mobile Home Park Investing Guide | CrosstownOS",
    description:
      "The mix determines everything: tenant-owned vs park-owned, lot rent verification, and the hidden infrastructure capex.",
    type: "website",
    url: "/mobile-home-park-investing",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "Mobile Home Park Investing Guide | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Home Park Investing Guide | CrosstownOS",
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
            Mobile home park investing starts with knowing what you own.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A mobile home park is two businesses in one legal entity: lot rent
            on the land, and whatever the park owns on top of it. Most
            underwriting mistakes in this asset class come from valuing the
            wrong business, or valuing both as one. This guide separates them.
          </p>

          <section className="mt-12" aria-label="Tenant owned versus park owned">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              TOH vs. POH: why the mix determines everything
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Tenant-owned homes (TOH) mean the resident owns the home and
              rents the lot. The park collects lot rent, maintains the land
              and infrastructure, and carries almost no home-level capex.
              This is the business most investors think they are buying, and
              it is the cleanest income in the asset class.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Park-owned homes (POH) mean the park owns the home and rents the
              whole package. The income is higher per site, but so is
              everything else: maintenance, turnover cost, insurance, and the
              slow depreciation of an aging housing stock the park is now
              responsible for. A park that is 80 percent POH is closer to a
              scattered-site landlord business than to a land-lease business,
              and it should be underwritten like one.
            </p>
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
              The rent roll says what lot rent should be. Bank deposits say
              what arrived. Reconcile the two for 12 to 24 months, and age
              every delinquency. In tenant-owned parks, delinquency is stickier
              than in apartments: evicting a homeowner who owns the structure
              is slower, costlier, and politically harder than turning an
              apartment.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Then check the rents against the market. Pull lot rents from
              comparable parks within a realistic drive and adjust for
              utilities included, home age restrictions, and amenity gaps.
              The value-add story in most MHP deals is lot rent growth, so
              the question is never whether rents can go up. It is whether
              the current residents, in these homes, in this market, can
              absorb the increase without the occupancy you underwrote
              walking out the gate.
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
              Verify three things. First, who pays for each utility and
              whether the park is master-metered or sub-metered; master-metered
              parks where the owner eats the bill need immediate sub-metering
              capex in your underwriting. Second, the condition and material
              of water and sewer lines, from inspection reports or a scoped
              sample, not from the seller&apos;s memory. Third, permitted
              capacity on well, septic, or lagoon systems against current and
              planned home counts, confirmed with the county.
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
