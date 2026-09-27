import type { Metadata } from "next"
import Navigation from "@/components/ui/navigation"

export const metadata: Metadata = {
  title: "Acquisition Signal Resources | CrosstownOS // Acquire",
  description:
    "Eighteen free diligence tools for RV park and manufactured-housing buyers: screeners, scripts, checklists, and worksheets. No signup. Download and use on your next deal.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Acquisition Signal Resources | CrosstownOS // Acquire",
    description:
      "Eighteen free diligence tools for RV park and manufactured-housing buyers. Screeners, scripts, checklists, and worksheets. No signup.",
    type: "website",
    url: "/resources",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Acquisition Signal Resources | CrosstownOS // Acquire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acquisition Signal Resources | CrosstownOS // Acquire",
    description:
      "Eighteen free diligence tools for RV park and manufactured-housing buyers. No signup.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

type Resource = {
  file: string
  title: string
  description: string
}

type Shelf = {
  name: string
  description: string
  resources: Resource[]
}

const SHELVES: Shelf[] = [
  {
    name: "Read the Deal",
    description:
      "Everything you gather before the numbers get serious. The package, the people, the first call.",
    resources: [
      {
        file: "CrosstownOS_60-Second-Deal-Screener.pdf",
        title: "60-Second Deal Screener",
        description:
          "Six numbers, one minute, no spreadsheet. If a deal cannot survive this page, it does not deserve a phone call.",
      },
      {
        file: "CrosstownOS_Broker-Package-Intake-Checklist.pdf",
        title: "Broker-Package Intake Checklist",
        description:
          "Every package arrives as a stack of claims. Log what you received, flag what is missing, label everything.",
      },
      {
        file: "CrosstownOS_27-Question-Seller-Call-Script.pdf",
        title: "27-Question Seller Call Script",
        description:
          "The questions that separate a real seller from a storyteller. Ask them on the first call, before you spend a dollar on diligence.",
      },
      {
        file: "CrosstownOS_5-Minute-Mystery-Shopper-Script.pdf",
        title: "5-Minute Mystery Shopper Script",
        description:
          "Call the park like a prospective tenant. What the office tells a renter is often truer than what the seller tells a buyer.",
      },
      {
        file: "CrosstownOS_Manager-Tell-All-Interview.pdf",
        title: "Manager Tell-All Interview",
        description:
          "The on-site manager knows where every body is buried. These questions get them talking.",
      },
    ],
  },
  {
    name: "Verify the Money",
    description:
      "Where the seller's story meets the buyer's math. Every claim gets a check.",
    resources: [
      {
        file: "CrosstownOS_Rent-Roll-Truth-Check.pdf",
        title: "Rent-Roll Truth Check",
        description:
          "Rebuild reported occupancy from deposits and find the gap. The rent roll is a claim. This is the verification.",
      },
      {
        file: "CrosstownOS_Mom-and-Pop-Expense-Normalizer.pdf",
        title: "Mom-and-Pop Expense Normalizer",
        description:
          "Restate the seller's expenses for the operation you will actually run. Related-party costs back on, personal costs off.",
      },
      {
        file: "CrosstownOS_POH-TOH-Split-Valuation-Worksheet.pdf",
        title: "POH-TOH Split-Valuation Worksheet",
        description:
          "Park-owned homes and tenant-owned homes are two different businesses wearing one price tag. Value them separately.",
      },
      {
        file: "CrosstownOS_Vacant-Pad-Fill-Calculator.pdf",
        title: "Vacant-Pad Fill Calculator",
        description:
          "Vacant pads are the upside story in every package. This prices what filling them actually costs and actually returns.",
      },
    ],
  },
  {
    name: "Walk the Asset",
    description:
      "The physical truth. What the ground, the lots, and the pipes tell you that paper never will.",
    resources: [
      {
        file: "CrosstownOS_Lot-by-Lot-Walkthrough.pdf",
        title: "Lot-by-Lot Walkthrough",
        description:
          "Walk every pad, write down what you see. The physical truth of the park, one lot at a time.",
      },
      {
        file: "CrosstownOS_Utility-Wastewater-Diligence-Checklist.pdf",
        title: "Utility and Wastewater Diligence Checklist",
        description:
          "The system nobody underwrites. Condition, capacity, and compliance for water, sewer, and electric before they become your emergency.",
      },
    ],
  },
  {
    name: "Control the Decision",
    description:
      "The moment of commitment. Terms, red flags, deadlines, and the discipline to walk.",
    resources: [
      {
        file: "CrosstownOS_Red-Flag-Triage-Board.pdf",
        title: "Red-Flag Triage Board",
        description:
          "Every deal collects red flags. This sorts them into watch, verify, and walk so nothing festers unlabeled.",
      },
      {
        file: "CrosstownOS_Offer-Term-Sheet-Builder.pdf",
        title: "Offer Term-Sheet Builder",
        description:
          "Build your offer terms before the broker builds them for you. Price, contingencies, and timelines on your paper first.",
      },
      {
        file: "CrosstownOS_Walk-Away-Pact.pdf",
        title: "Walk-Away Pact",
        description:
          "Decide your walk-away conditions before you fall in love with the deal. Sign it with yourself while you are still rational.",
      },
      {
        file: "CrosstownOS_EMD-Countdown-Tracker.pdf",
        title: "EMD Countdown Tracker",
        description:
          "Your earnest money has a clock on it. This tracks every deadline between contract and close so a date never surprises you.",
      },
    ],
  },
  {
    name: "Carry the Record Forward",
    description:
      "The file that survives closing. What you hand the lender, the team, and your future self.",
    resources: [
      {
        file: "CrosstownOS_Evidence-Request-List.pdf",
        title: "Evidence-Request List",
        description:
          "The complete ask list for diligence. What to request, from whom, and what stays missing evidence until it arrives.",
      },
      {
        file: "CrosstownOS_Lender-One-Pager.pdf",
        title: "Lender One-Pager",
        description:
          "Your deal on one page, in the language a lender reads. Hand them the story before they ask for it.",
      },
      {
        file: "CrosstownOS_First-30-Days-Takeover-Checklist.pdf",
        title: "First-30-Days Takeover Checklist",
        description:
          "Day one is not the finish line. The first thirty days of ownership, sequenced so nothing critical slips.",
      },
    ],
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Acquisition Signal Resource Library",
  description:
    "Free diligence tools for RV park and manufactured-housing buyers from CrosstownOS // Acquire.",
  numberOfItems: 18,
  itemListElement: SHELVES.flatMap((shelf, si) =>
    shelf.resources.map((r, ri) => ({
      "@type": "ListItem",
      position: si * 10 + ri + 1,
      name: r.title,
      description: r.description,
    }))
  ),
}

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full bg-background text-foreground">
        {/* Black banner hero, matching the resource PDFs */}
        <div className="w-full bg-black text-white">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-5 px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8">
            <img
              src="/images/badge.png"
              alt="CrosstownOS badge"
              className="h-16 w-16 shrink-0 rounded-full sm:h-20 sm:w-20"
            />
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">
                CrosstownOS // Acquire
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                Acquisition Signal Resource
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
          <p className="mono-label mb-4 mt-12 text-primary">
            The Resource Library
          </p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Free tools for buyers who verify before they wire.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Eighteen worksheets, scripts, and checklists from the CrosstownOS
            diligence desk. Every one exists because a buyer needed it on a
            real deal. No signup. Tap a download, use it on your next park,
            keep the record.
          </p>

          <div className="mt-16 space-y-16">
            {SHELVES.map((shelf) => (
              <section key={shelf.name} aria-label={shelf.name}>
                <div className="border-l-2 border-primary pl-4">
                  <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
                    {shelf.name}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {shelf.description}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {shelf.resources.map((r) => (
                    <div
                      key={r.file}
                      className="flex flex-col border border-border bg-card p-6"
                    >
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                        Acquisition Signal Resource
                      </p>
                      <h3 className="serif-display mt-2 text-xl tracking-tight">
                        {r.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                        {r.description}
                      </p>
                      <a
                        href={`/resources/${r.file}`}
                        download
                        className="mt-5 inline-flex w-fit items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        Download PDF
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 border border-border bg-card p-8 text-center">
            <p className="serif-display text-2xl tracking-tight">
              Know what is true before you buy.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              These are the working papers behind the Field Notes. Read the
              thinking, then use the tools.
            </p>
            <a
              href="/blog"
              className="mt-5 inline-block border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Read Field Notes
            </a>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
