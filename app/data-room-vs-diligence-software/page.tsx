import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import SignalLine from "@/components/ui/SignalLine"

export const metadata: Metadata = {
  title: "Data Room vs Due Diligence Software | CrosstownOS",
  description:
    "A data room stores the deal documents. CrosstownOS is the diligence record for RV park and manufactured housing acquisitions: claims, evidence, and unresolved diligence in one record before you commit capital.",
  alternates: { canonical: "/data-room-vs-diligence-software" },
  openGraph: {
    title: "Data Room vs Due Diligence Software | CrosstownOS",
    description:
      "Storage with permissions is not a diligence record. What each tool does with a seller claim, side by side.",
    type: "website",
    url: "/data-room-vs-diligence-software",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "Data Room vs Due Diligence Software | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Room vs Due Diligence Software | CrosstownOS",
    description:
      "Storage with permissions is not a diligence record. What each tool does with a seller claim, side by side.",
    images: ["/og-logo.png"],
  },
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Data Room vs Due Diligence Software: Storage Is Not a Record",
  description:
    "A comparison of generic virtual data rooms and the CrosstownOS Acquisition Workspace for buyers of RV parks, campgrounds, and manufactured housing communities.",
  author: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  publisher: { "@type": "Organization", name: "CrosstownOS", url: "https://www.crosstownosrv.camp" },
  mainEntityOfPage: "https://www.crosstownosrv.camp/data-room-vs-diligence-software",
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
      name: "Data Room vs Due Diligence Software",
      item: "https://www.crosstownosrv.camp/data-room-vs-diligence-software",
    },
  ],
}

const ROWS = [
  {
    point: "Primary job",
    dataRoom: "Document storage and access control",
    workspace: "The diligence record itself: claims, evidence, and decisions in one place",
  },
  {
    point: "Asset scope",
    dataRoom: "Any transaction, any industry",
    workspace: "RV parks, campgrounds, and manufactured housing communities",
  },
  {
    point: "Claim handling",
    dataRoom: "Documents filed in folders",
    workspace: "Claims labeled with evidence states: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, Unresolved",
  },
  {
    point: "Site evidence",
    dataRoom: "Files uploaded after the visit",
    workspace: "Site observations connected to the claims they confirm or break",
  },
  {
    point: "Unresolved items",
    dataRoom: "Q&A threads and document request lists",
    workspace: "Unresolved diligence stays visible in the record until it resolves or ends the deal",
  },
  {
    point: "Who operates it",
    dataRoom: "Deal teams, sellers, and intermediaries running a process",
    workspace: "The buyer. You build the record; the workflow guides you",
  },
  {
    point: "The verdict",
    dataRoom: "None. Storage does not decide",
    workspace: "None. CrosstownOS organizes the record; the buyer owns the decision",
  },
] as const

export default function DataRoomComparisonPage() {
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
          <p className="mono-label mb-4">CrosstownOS / Comparison</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            A data room stores the deal. The workspace runs the record.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            A virtual data room is storage with permissions: a secure place
            where deal documents are filed, access is controlled, and a
            process is run. CrosstownOS is an acquisition workspace: the
            diligence record itself, where seller claims, source evidence,
            site observations, and unresolved diligence stay connected in
            one record for an RV park, campground, or manufactured housing
            acquisition, before you commit capital. The two tools answer
            different questions. A data room answers: where are the
            documents, and who may see them. The workspace answers: what
            has been proven, what is still claimed, and what is still open.
          </p>

          <section className="mt-12" aria-label="What a data room does well">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              What a data room does well
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Data rooms such as DealRoom and Datasite are mature,
              institutional tools. They provide secure document storage,
              granular permissions, Q&amp;A threads between deal parties,
              and audit trails of who viewed what. They are built for
              sell-side M&amp;A process at scale, where many parties need
              controlled access to a large file set, and they hold deep
              review profiles and institutional adoption on the strength
              of that work. If your problem is controlled disclosure across
              a multi-party process, a data room is the right tool, and
              this page does not argue otherwise.
            </p>
          </section>

          <section className="mt-12" aria-label="What a data room does not do">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              What a data room does not do
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              A data room does not test a seller claim against evidence. It
              does not carry an evidence state. It does not connect a site
              observation to the financial claim it confirms or breaks. A
              folder can hold a rent roll, a P&amp;L, and a bank statement
              that contradict each other, and the folder is still complete.
              A folder marked complete is a filing state, not a proof
              state. The buyer of a park does not lose money because a
              document was missing from a folder. The buyer loses money
              because a claim inside the documents was treated as proven
              when it was only filed.
            </p>
          </section>

          <section className="mt-12" aria-label="The record a buyer actually needs">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              The record a buyer actually needs
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The diligence work on a park acquisition is not filing. It is
              adjudication: every material claim gets labeled, the
              evidence for it gets attached, the site walk gets connected
              to the claims it tests, and what stays unresolved stays
              visible until it resolves or ends the deal. That is the
              record the{" "}
              <Link
                href="/workspace"
                className="font-semibold text-primary hover:underline"
              >
                Acquisition Workspace
              </Link>{" "}
              holds, under the evidence states defined in the{" "}
              <Link
                href="/parkproof-standard"
                className="font-semibold text-primary hover:underline"
              >
                ParkProof Standard
              </Link>
              . Claims are labeled, evidence is attached, and nothing
              counts as proven until the record proves it.
            </p>
            <p className="mt-6 text-sm font-bold text-foreground sm:text-base">
              Data room vs acquisition workspace (CrosstownOS):
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="px-3 py-2" aria-label="Comparison point"></th>
                    <th className="px-3 py-2 font-bold text-foreground">Generic data room (DealRoom, Datasite)</th>
                    <th className="px-3 py-2 font-bold text-foreground">CrosstownOS Acquisition Workspace</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, i) => (
                    <tr
                      key={row.point}
                      className={i < ROWS.length - 1 ? "border-b border-border/60" : ""}
                    >
                      <th className="px-3 py-2 font-bold text-foreground">{row.point}</th>
                      <td className="px-3 py-2 align-top">{row.dataRoom}</td>
                      <td className="px-3 py-2 align-top">{row.workspace}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12" aria-label="Who should use which">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Who should use which
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Use a data room for a multi-party sell-side process,
              institutional M&amp;A, or regulated disclosure, where the
              work is controlled access for many parties. Use CrosstownOS
              when you are the buyer, the deal is an RV park, campground,
              or manufactured housing community, and the work is proving
              the deal before your capital commits: active buyers with a
              live or imminent deal and a decision deadline in the next 60
              to 90 days. The two are not substitutes. One holds the file
              set for a process other people run. The other holds the
              record for a decision you own.
            </p>
          </section>

          <section className="mt-12" aria-label="The November pilot">
            <SignalLine />
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              The November pilot
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Five free pilot places. Target opening: November 2026. Run
              one live acquisition through Source, Field, and Acquire for
              90 days from activation. No payment required and no automatic
              conversion.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/workspace#apply"
                className="inline-block border border-primary/60 bg-primary-deep px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Apply for a free pilot place
              </Link>
              <Link
                href="/parkproof-standard"
                className="inline-block border border-border px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Read the ParkProof Standard
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
