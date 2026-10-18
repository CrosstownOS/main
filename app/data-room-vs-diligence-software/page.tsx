import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"
import SignalLine from "@/components/ui/SignalLine"

export const metadata: Metadata = {
  keywords: ["data room vs due diligence software", "deal data room", "diligence record", "RV park acquisitions", "manufactured housing acquisitions"],
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
    dataRoom: "Document storage, access control, and tracked diligence requests",
    workspace: "The diligence record itself: claims, evidence, and decisions in one place",
  },
  {
    point: "Asset scope",
    dataRoom: "Any transaction, any industry",
    workspace: "RV parks, campgrounds, and manufactured housing communities",
  },
  {
    point: "Claim handling",
    dataRoom: "Tracked diligence requests with an owner, due date, and status, with documents filed to the matching folder on completion. No evidence state is assigned to the seller claim itself",
    workspace: "Claims labeled with evidence states: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, Unresolved",
  },
  {
    point: "Site evidence",
    dataRoom: "Files the deal team uploads, including anything collected on a site visit. The room stores the file; it does not grade what the file proves",
    workspace: "Site observations connected to the claims they confirm or break",
  },
  {
    point: "Unresolved items",
    dataRoom: "Open requests stay tracked by status, owner, and priority, with comment and Q&A threads that can be marked resolved. Resolution tracks the request, not whether the underlying claim is proven",
    workspace: "Unresolved diligence stays visible in the record until it resolves or ends the deal",
  },
  {
    point: "Who operates it",
    dataRoom: "Buy-side and sell-side deal teams, plus the sellers and advisors they invite in by permission group",
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
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Data Room vs Due Diligence Software" },
            ]}
          />
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
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Comparison checked against the vendors&apos; own published
            material as of October 2026. Sources are linked under the
            table below.
          </p>

          <section className="mt-12" aria-label="What a data room does well">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              What a data room does well
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Data rooms such as DealRoom and Datasite are mature,
              institutional tools. They provide secure document storage,
              granular permissions, Q&amp;A threads between deal parties,
              and audit trails of who viewed what. They also run tracked
              diligence workflows.{" "}
              <a
                href="https://dealroom.net/product/diligence"
                className="font-semibold text-primary hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                DealRoom documents
              </a>{" "}
              diligence requests that are created, assigned, and tracked,
              with automated workflows, role-based access controls, and
              detailed audit trails.{" "}
              <a
                href="https://media.datasite.com/d5f0c856-e31a-44d6-b773-b1e8012d895c/datasite-diligence-and-prepare-trackers-fact-sheet-original-file.pdf"
                className="font-semibold text-primary hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                Datasite documents
              </a>{" "}
              trackers that work as a central list for tracking requests,
              with ownership, priorities, comments, and permissions
              applied at different levels. They serve buy-side and
              sell-side M&amp;A processes, where many parties need
              controlled access to a large file set. DealRoom, for
              example, documents both{" "}
              <a
                href="https://dealroom.net/industry/investment-banking"
                className="font-semibold text-primary hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                sell-side and buy-side M&amp;A
              </a>{" "}
              use. If your problem is controlled disclosure and tracked
              requests across a multi-party process, a data room is the
              right tool, and this page does not argue otherwise.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              The two vendors also differ from each other. In its{" "}
              <a
                href="https://www.globenewswire.com/news-release/2026/10/15/3381717/0/en/datasite-brings-ai-to-the-entire-deal-lifecycle-from-target-to-transaction.html"
                className="font-semibold text-primary hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                October 15, 2026 release
              </a>
              , Datasite describes authorized users querying live data
              room documents during diligence through Grata Intelligence,
              or through their own approved AI assistant using Datasite
              Connect, with existing permissions determining what the AI
              can retrieve and audit trails kept through the workflow.
              DealRoom separately documents its own AI document analysis
              on its diligence page. Neither feature is an evidence state
              on a seller claim, which is the narrower contrast drawn
              below.
            </p>
          </section>

          <section className="mt-12" aria-label="What a data room does not do">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              What a data room does not do
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              A completed diligence request is not an evidence state on
              the seller claim behind it. DealRoom documents that when a
              seller uploads a file to a request, the document is filed in
              the data room and the request is marked complete, and
              Datasite documents tracker threads being marked resolved. In
              the vendor material cited on this page, neither product
              describes assigning an evidence state, such as Verified,
              Broker-reported, Missing, Assumption, Calculated, or
              Unresolved, to an individual seller claim, and neither
              describes connecting a site observation to the financial
              claim it confirms or breaks. A folder can hold a rent roll,
              a P&amp;L, and a bank statement that contradict each other,
              and the request for that folder can still be marked
              complete. A request marked complete is a workflow state,
              not a proof state. The buyer of a park does not lose money
              because a document was missing from a folder. The buyer
              loses money because a claim inside the documents was
              treated as proven when it was only filed.
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
            <div className="mt-6 text-sm leading-relaxed text-foreground/85">
              <p className="font-bold text-foreground">
                Sources for the data room column, as of October 2026:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <span className="font-semibold">Primary job, Claim handling, Unresolved items, Who operates it (DealRoom):</span>{" "}
                  <a
                    href="https://dealroom.net/product/diligence"
                    className="font-semibold text-primary hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    DealRoom, M&amp;A Diligence Management Software
                  </a>
                  . DealRoom describes requests that carry a status, a
                  seller assignee, an internal reviewer, a priority, and a
                  due date, documents filed into the data room and marked
                  complete when the seller uploads a file, findings logged
                  against a request, comments scoped by permission group,
                  and an audit log of uploads.
                </li>
                <li>
                  <span className="font-semibold">Primary job, Claim handling, Unresolved items (Datasite):</span>{" "}
                  <a
                    href="https://media.datasite.com/d5f0c856-e31a-44d6-b773-b1e8012d895c/datasite-diligence-and-prepare-trackers-fact-sheet-original-file.pdf"
                    className="font-semibold text-primary hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Datasite, Diligence and Prepare Trackers fact sheet
                  </a>
                  . Datasite describes one central list for tracking
                  requests, documents linked to tracker rows and folders,
                  statuses updated as files attach, ownership and
                  priorities assigned, requests discussed in comments with
                  threads marked resolved, and permissions controlled for
                  individual users and teams.
                </li>
                <li>
                  <span className="font-semibold">Who operates it (buy-side and sell-side):</span>{" "}
                  <a
                    href="https://dealroom.net/industry/investment-banking"
                    className="font-semibold text-primary hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    DealRoom, Virtual Data Room for Investment Banking
                  </a>
                  , which covers both sell-side and buy-side M&amp;A, with
                  sellers invited into the room under specified access and
                  bidder groups separated by permission group and audit
                  log.
                </li>
                <li>
                  <span className="font-semibold">Datasite AI querying (Datasite only):</span>{" "}
                  <a
                    href="https://www.globenewswire.com/news-release/2026/10/15/3381717/0/en/datasite-brings-ai-to-the-entire-deal-lifecycle-from-target-to-transaction.html"
                    className="font-semibold text-primary hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Datasite release, GlobeNewswire, October 15, 2026
                  </a>
                  . Datasite describes authorized users querying live data
                  room documents during diligence, with existing
                  permissions determining what can be retrieved and audit
                  trails kept through the workflow.
                </li>
                <li>
                  <span className="font-semibold">Evidence states:</span>{" "}
                  none of the vendor material above describes assigning
                  Verified, Broker-reported, Missing, Assumption,
                  Calculated, or Unresolved states to individual seller
                  claims. That absence in the cited material is the basis
                  for the Claim handling row, not a claim about every
                  feature either vendor may offer.
                </li>
              </ul>
            </div>
          </section>

          <p className="mt-10 text-sm italic leading-relaxed text-muted">
            This page may use AI-assisted research and drafting. Sources,
            claims, and final editorial judgment remain subject to human
            review.
          </p>

          <section className="mt-12" aria-label="Who should use which">
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Who should use which
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              Use a data room for a multi-party sell-side or buy-side
              process, institutional M&amp;A, or regulated disclosure,
              where the work is controlled access and tracked requests
              for many parties. Use CrosstownOS
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
