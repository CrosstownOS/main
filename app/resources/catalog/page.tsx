import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"
import { GatedDownloadButton } from "@/components/GatedDownload"
import { PARTS, SPINES, TOOLS, resourceSlug, resourceTitleSlug } from "@/lib/resources"
import SignalLine from "@/components/ui/SignalLine"
import StaggerReveal from "@/components/ui/StaggerReveal"

const BASE_URL = "https://www.crosstownosrv.camp"

export const metadata: Metadata = {
  title: "Resource Catalog | CrosstownOS",
  description:
    "All 38 Acquisition Signal resources: 35 coded tools organized by the seven Parts of the deal journey, plus the three spine documents. Free PDF downloads; one email unlocks the whole library.",
  alternates: { canonical: "/resources/catalog" },
  openGraph: {
    title: "Resource Catalog | CrosstownOS",
    description:
      "All 38 Acquisition Signal resources: 35 coded tools organized by the seven Parts of the deal journey, plus the three spine documents.",
    type: "website",
    url: "/resources/catalog",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "Resource Catalog | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Catalog | CrosstownOS",
    description:
      "All 38 Acquisition Signal resources: 35 coded tools organized by the seven Parts of the deal journey, plus the three spine documents.",
    images: ["/og-logo.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Acquisition Signal Resource Library",
  description:
    "Thirty-eight free diligence resources for RV park and manufactured-housing buyers from CrosstownOS // Acquire: 35 coded tools plus the three spine documents.",
  numberOfItems: TOOLS.length + SPINES.length,
  itemListElement: [
    ...TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${t.code}: ${t.title}`,
      description: t.description,
      url: `${BASE_URL}/resources/${resourceSlug(t)}`,
    })),
    ...SPINES.map((sp, i) => ({
      "@type": "ListItem",
      position: TOOLS.length + i + 1,
      name: sp.title,
      description: sp.description,
      url: `${BASE_URL}/resources/${resourceTitleSlug(sp.title)}`,
    })),
  ],
}

export default function CatalogPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: "Catalog" },
            ]}
          />
          <p className="mono-label mb-4">Acquisition Signal Resources // Catalog</p>
          <SignalLine />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            All 38 resources, in journey order.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            The library is 35 coded tools in seven Parts, plus the three spine
            documents below. Each Part answers one question about your deal.
            Run the tools in a Part in order; each tool&apos;s Hands to line
            tells you the next one. One email unlocks every download. Tap a
            download and take it to the truck.
          </p>
          <section
            aria-label="Start with the spine"
            className="theme-cream mt-8 border border-border bg-card p-6"
          >
            <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
              Start with the spine.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Three resources hold the library together. Read them first, then
              run the Parts in order.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>
                <Link
                  href="/resources/start-here"
                  className="font-semibold text-primary hover:underline"
                >
                  Start Here
                </Link>{" "}
                shows how the 38 resources fit together. Read this before you
                print anything.
              </li>
              <li>
                <Link
                  href="/resources/the-journey-map"
                  className="font-semibold text-primary hover:underline"
                >
                  The Journey Map
                </Link>{" "}
                puts all 38 resources in one order. Find the Part that
                matches where you are.
              </li>
              <li>
                <Link
                  href="/resources/the-evidence-status-standard"
                  className="font-semibold text-primary hover:underline"
                >
                  The Evidence Status Standard
                </Link>{" "}
                gives every claim one letter: V, B, M, A, C, U. The letter is
                the status, not the strength.
              </li>
            </ul>
          </section>
          <div className="theme-cream mt-8 border border-primary/40 bg-card p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Prefer to run the math?
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Six of these tools now run live in your browser as{" "}
              <Link href="/tools" className="font-semibold text-primary hover:underline">
                Diligence Working Papers
              </Link>
              : same methodology, real inputs, evidence states on everything, JSON export.
              Or start from zero with the{" "}
              <Link href="/checklist" className="font-semibold text-primary hover:underline">
                free RV park due diligence checklist
              </Link>
              .
            </p>
          </div>
          <div className="mt-14 space-y-14">
            {PARTS.map((part) => {
              const tools = TOOLS.filter((t) => t.part === part.id)
              return (
                <section key={part.id} aria-label={`Part ${part.id}: ${part.name}`}>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                      Part {part.id}
                    </p>
                    <h2 className="serif-display mt-1 text-2xl tracking-tight sm:text-3xl">
                      {part.name}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {part.question}
                    </p>
                  </div>
                  <StaggerReveal className="mt-6 grid gap-4 sm:grid-cols-2">
                    {tools.map((tool) => (
                      <div
                        key={tool.code}
                        data-reveal-item
                        className="theme-cream card-lift flex flex-col border border-border bg-card p-6"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-primary-deep px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                            {tool.code}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                            Acquisition Signal Resource
                          </span>
                        </div>
                        <h3 className="serif-display mt-2 text-xl tracking-tight">
                          <Link
                            href={`/resources/${resourceSlug(tool)}`}
                            className="transition-colors hover:text-primary"
                          >
                            {tool.title}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {tool.description}
                        </p>
                        <GatedDownloadButton
                          file={tool.file}
                          label={tool.code}
                          title={`${tool.code}: ${tool.title}`}
                          nextDoor={{
                            href: `/resources/${resourceSlug(tool)}`,
                            label: "See how it fits the chain",
                          }}
                          className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 bg-primary-deep px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        />
                      </div>
                    ))}
                  </StaggerReveal>
                </section>
              )
            })}
          </div>

          <p className="theme-cream paper mt-6 border border-border/60 bg-card/40 p-4 text-sm leading-relaxed text-muted">
            Advance, Retrade, Pause, and Walk are evidence-readiness labels.
            They are not recommendations, approvals, or advice.
          </p>

          <div className="theme-cream mt-20 border border-border bg-card p-8 text-center">
            <p className="serif-display text-2xl tracking-tight">
              Know what is true before you buy.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              These are the working papers behind the Field Notes. Read the
              thinking, then use the tools.
            </p>
            <a
              href="/blog"
              className="mt-5 inline-block border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-deep hover:text-white"
            >
              Read Field Notes
            </a>
          </div>

          <div className="theme-cream paper mt-8 border border-primary/40 bg-primary/5 p-8">
            <p className="mono-label mb-3">The next step</p>
            <p className="serif-display text-2xl tracking-tight">
              Running a live deal? Bring it to the Acquisition Workspace.
            </p>
            <ul className="mt-5 space-y-3 text-left text-sm leading-relaxed text-muted">
              <li>
                Screened a deal worth pursuing? Bring it to the Acquisition Workspace
                before diligence scatters across inboxes.
              </li>
              <li>
                Walking a park soon? Bring the deal and walk it inside the
                Workspace, where every capture lands in the record instead of
                a photo folder.
              </li>
              <li>
                Building the record by hand? The Acquisition Workspace connects it: source evidence, field observations, and underwriting in one deal record.
              </li>
            </ul>
            <a
              href="/workspace"
              className="mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Apply for a pilot place
            </a>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-muted">
            Acquisition Signal Resources are educational tools built from
            general diligence patterns. They do not contain client,
            community-member, or live-deal information.{" "}
            <a
              href="/editorial-standards"
              className="text-foreground underline underline-offset-2 hover:no-underline"
            >
              Our editorial standards
            </a>
            .
          </p>
          <div className="theme-cream paper mt-12 border border-primary/40 bg-card p-8 text-center">
            <p className="serif-display mx-auto max-w-3xl text-balance text-xl leading-snug text-foreground/85 sm:text-2xl">
              Every sheet in the library exists to move one claim from asserted to proven.
            </p>
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
