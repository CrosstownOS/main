import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  keywords: ["editorial standards", "evidence standards", "verification", "AI-assisted work", "CrosstownOS"],
  title: "Editorial Standards | CrosstownOS",
  description: "How CrosstownOS handles evidence, community learning, and AI-assisted work. What we verify, what we label, and what we never publish. Read the full rules.",
  alternates: { canonical: "/editorial-standards" },
  openGraph: {
    title: "Editorial Standards | CrosstownOS",
    description:
      "What we verify, what we label, and what we never publish.",
    type: "website",
    url: "/editorial-standards",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "Editorial Standards | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Standards | CrosstownOS",
    description:
      "What we verify, what we label, and what we never publish.",
    images: ["/og-logo.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Editorial Standards",
  description:
    "How CrosstownOS handles evidence, community learning, and AI-assisted work: what we verify, what we label, and what we never publish.",
  url: "https://www.crosstownosrv.camp/editorial-standards",
  isPartOf: {
    "@type": "WebSite",
    name: "CrosstownOS",
    url: "https://www.crosstownosrv.camp",
  },
  publisher: {
    "@type": "Organization",
    name: "CrosstownOS",
    logo: {
      "@type": "ImageObject",
      url: "https://www.crosstownosrv.camp/logo.jpg",
    },
  },
}

const STATES = [
  {
    title: "Verified",
    definition: "Backed by evidence you can point to, and reviewed by a person.",
  },
  {
    title: "Broker-reported",
    definition:
      "Reported in an OM, call, model, or broker package; not independently checked yet.",
  },
  {
    title: "Missing evidence",
    definition: "Material information has not been received or located yet.",
  },
  {
    title: "Underwriting assumption",
    definition:
      "A stated input in the investment case; not a verified fact.",
  },
  {
    title: "Calculated",
    definition: "An output calculated from stated inputs. The calculation is only as reliable as the inputs behind it.",
  },
  {
    title: "Unresolved",
    definition: "A material claim remains open because sources conflict, a review is incomplete, or the answer has not been established.",
  },
]

const SECTIONS = [
  {
    heading: "How we handle community learning",
    body: [
      "Our themes come from real conversations with operators, buyers, and industry professionals. When a lesson is shaped by those conversations, we remove identifying details, change nonessential facts, and never quote or name anyone without explicit permission.",
      "Detailed examples are labeled as synthetic or illustrative composites. General principles need no label because they describe no one in particular.",
    ],
  },
  {
    heading: "What we never publish",
    body: [
      "We do not quote, screenshot, or name anyone from private conversations, group discussions, or direct messages without explicit permission. We do not recreate recognizable stories from one person's comment or private discussion. We do not present an anecdote as independently verified if it originated as an unverified statement.",
    ],
  },
  {
    heading: "How we use AI-assisted tools",
    body: [
      "CrosstownOS uses technology, including AI-assisted research and drafting tools, to organize information and accelerate production. Every published resource, Field Note, product rule, website claim, and customer-facing statement receives human review before publication or release.",
      "Every piece covered by the Content Production Protocol publishes with an AI-assistance disclosure. Research-heavy Field Notes carry the standing note verbatim: \"This note may use AI-assisted research and drafting. Sources, claims, and final editorial judgment remain subject to human review.\" The disclosure is part of the piece, not an optional extra, and a piece missing it is incomplete.",
      "AI output is not evidence. Accountability for source selection, claim accuracy, uncertainty labels, and the final publication remains with CrosstownOS.",
    ],
  },
  {
    heading: "The site agent",
    body: [
      "This site's chat is answered by an AI agent, Hitch. He is a customer-facing statement that talks back, so he is governed here, under his own rules, not only by the drafting rules above.",
      "He discloses that he is an AI in his first message, before any interaction, and answers questions about his identity truthfully. He never presents himself as a person.",
      "He may state only what the published record on this site states. His fixed answers to the questions that matter most, pricing, the pilot, the ParkProof Standard, privacy, and every refusal, are founder-approved text. Where the record does not answer, he says so and offers a path to a person.",
      "Every conversation is filed in full and read by the founder. An answer that invents a claim is a defined failure: it is reviewed the same day, the governed record is corrected at the source, and a second invention inside thirty days takes the agent offline until it is re-approved.",
      "The agent never reviews documents, never gives a view on a specific deal, and never verifies anything for a visitor. Verification is the buyer's job, on this site as in the Standard.",
      "His disclosure and data rules are stated in full in the Site Agent Disclosure and Data Standard, adopted October 18, 2026.",
    ],
  },
  {
    heading: "Research first: the dossier and the claims ledger",
    body: [
      "For Field Notes, guides, comparison pages, and other research-heavy content, research comes before drafting. A research dossier is assembled before a draft begins: the sources relied on, identified by name, date, and a location a reader or checker can reach, with notes connecting each source to the claims it supports.",
      "Every such piece carries a claims ledger: a list of its load-bearing claims, each with its source and one status: grounded, consistent but uncited, labeled illustration, or working assumption. A claim with no ledger entry does not publish. A claim that is consistent but uncited does not publish as a statement of fact: it is grounded, rewritten as a labeled judgment, converted to a labeled working assumption where the standard permits, or cut.",
      "No number publishes without a source and an as-of date. A benchmark range requires a named dataset, a geography, and a period. A statement of law names its jurisdiction and cites the instrument relied on. A claim about a named competitor cites that competitor's own current material and carries an as-of date. No source is invented, and a figure whose only source is an earlier CrosstownOS page has no source.",
      "Synthetic examples, scenarios, and worked examples are labeled as illustrative at their first appearance, and their numbers are never restated elsewhere as benchmarks, market figures, or observed results. Frequency and superlative claims, including every, always, never, and only, require evidence or are rewritten as labeled CrosstownOS judgment or cut. An experience claim is stated only where the experience is real and recorded.",
    ],
  },
  {
    heading: "Sources and Limits, published with the piece",
    body: [
      "Every research-heavy piece publishes with a Sources and Limits section. The section names the sources the piece relies on, with enough detail for a reader to locate each one and the as-of dates the rules above require. It also states what the piece does not know: claims that rest on judgment, domains consciously omitted, the limits of the data used, and material questions the research did not answer.",
      "Grounding that exists only in an internal file does not count. If the research was done, the reader sees it cited on the page. A warning or disclaimer does not substitute for a source.",
      "Before publication, each piece is checked across four domains: regulatory, operational, financial, and field observation. A missing domain is filled with grounded material or recorded in the claims ledger as a conscious decision, with the reason stated.",
    ],
  },
  {
    heading: "Flags and corrections to claims",
    body: [
      "When an audit, a review, or the publishing gate flags a claim, the flag attaches to the piece's claims ledger and stays until it is cleared by fixing the underlying claim: grounding it, rewriting it under the rule that governs it, or cutting it. A flagged piece is not republished, linked in a campaign, or given a structured-data version until its flags are cleared. Correcting a claim in the body of a piece includes checking every structured-data version, summary, and internal link description that restates it.",
    ],
  },
  {
    heading: "Professional boundaries",
    body: [
      "CrosstownOS organizes the record. The buyer owns the decision.",
      "Our resources and software organize information and support a disciplined workflow. They do not provide legal, engineering, environmental, tax, title, appraisal, lending, or insurance advice, inspection certification, regulatory determination, or investment advice. The buyer is solely responsible for all investment decisions. CrosstownOS does not provide legal, financial, engineering, environmental, tax, title, appraisal, lending, or insurance advice, and nothing in the workspace constitutes a professional opinion, certification, or recommendation. The buyer is responsible for engaging qualified licensed professionals to review the legal, financial, physical, regulatory, and environmental dimensions of any acquisition before committing capital. Reliance on workspace outputs without appropriate professional review is at the buyer's sole risk.",
    ],
  },
  {
    heading: "How we talk about the product",
    body: [
      "We distinguish capabilities available to customers now from capabilities demonstrated internally, limited to a pilot, or planned. Where access has not opened, we state the intended availability date. A working internal capability is not represented as currently accessible to customers.",
    ],
  },
  {
    heading: "Corrections",
    body: [
      "When a material error is discovered, we stop repeating the claim, correct the original asset where feasible, and add a dated correction note where the error materially affected reader understanding. We never hide a material correction because the original content performed well.",
    ],
  },
]

export default function EditorialStandardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Editorial standards</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Know what is true before you buy. We hold our own work to it.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            CrosstownOS teaches buyers to separate claims from evidence. This
            page states the standard our own publishing is held to: how we
            handle evidence, community learning, AI-assisted work, and
            corrections.
          </p>

          <section className="mt-12">
            <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
              How we label claims
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We distinguish sourced facts, attributed statements, calculations,
              assumptions, and unresolved questions. Where material to reader
              understanding, we identify the basis and limitations of a claim.
              These are the same six evidence states defined in the
              CrosstownOS ParkProof Standard.
            </p>
            <div className="mt-6 space-y-3">
              {STATES.map((s) => (
                <div
                  key={s.title}
                  className="theme-cream border border-border bg-card p-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {s.definition}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-3 text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-12">
            <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
              The publishing gate
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Before anything goes live, we ask one question: can the founder
              defend this without saying &ldquo;the AI told me&rdquo;? If yes,
              it publishes. If no, it needs more source work, clearer labeling,
              or a narrower claim.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              For research-heavy content the gate is also a checklist, kept
              with the piece's record: the dossier and claims ledger exist and
              are attached, no claim publishes as fact without a source or a
              permitted label, the Sources and Limits section and the
              AI-assistance disclosure are in place, the four-domain check is
              recorded, and no flag is open. If any item cannot be checked,
              the piece does not publish.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              These rules are stated in full in the CrosstownOS Content
              Production Protocol, which extends the Editorial Integrity and
              AI-Assistance Standard adopted on October 5, 2026. Where an
              earlier standard and the protocol conflict, the stricter
              requirement applies until the founder resolves the conflict in
              writing.
            </p>
            <p className="mt-6 text-sm">
              <Link
                href="/blog"
                className="font-semibold text-primary hover:underline"
              >
                Read the Field Notes
              </Link>
              {" "}&middot;{" "}
              <Link
                href="/checklist"
                className="font-semibold text-primary hover:underline"
              >
                The diligence checklist
              </Link>
              {" "}&middot;{" "}
              <Link
                href="/tools"
                className="font-semibold text-primary hover:underline"
              >
                The working papers
              </Link>
            </p>
          </section>

          <div className="theme-cream paper mt-12 border border-primary/40 bg-card p-8 text-center">
            <p className="serif-display mx-auto max-w-3xl text-balance text-xl leading-snug text-foreground/85 sm:text-2xl">
              The standard for the writing is the standard for the record: claims labeled, sources named, and gaps stated as gaps, never smoothed over.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
