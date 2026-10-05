import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { GatedDownloadButton } from "@/components/GatedDownload"
import { PARTS, TOOLS, resourceSlug } from "@/lib/resources"

const BASE_URL = "https://www.crosstownosrv.camp"

export const metadata: Metadata = {
  title: "Resource Catalog | CrosstownOS // Acquire",
  description:
    "All 38 Acquisition Signal Resources, organized by the seven Parts of the deal journey, in order. Free PDF downloads; one email unlocks the whole library.",
  alternates: { canonical: "/resources/catalog" },
  openGraph: {
    title: "Resource Catalog | CrosstownOS // Acquire",
    description:
      "All 38 Acquisition Signal Resources, organized by the seven Parts of the deal journey, in order.",
    type: "website",
    url: "/resources/catalog",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Resource Catalog | CrosstownOS // Acquire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Catalog | CrosstownOS // Acquire",
    description:
      "All 38 Acquisition Signal Resources, organized by the seven Parts of the deal journey.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Acquisition Signal Resource Library",
  description:
    "Thirty-eight free diligence tools for RV park and manufactured-housing buyers from CrosstownOS // Acquire.",
  numberOfItems: 38,
  itemListElement: TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${t.code}: ${t.title}`,
    description: t.description,
    url: `${BASE_URL}/resources/${resourceSlug(t)}`,
  })),
}

export default function CatalogPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">Acquisition Signal Resources // Catalog</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            All 38 tools, in journey order.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Seven Parts, one order. Each Part answers one question about your
            deal. Run the tools in a Part in order; each tool&apos;s Hands to
            line tells you the next one. One email unlocks every download. Tap a
            download and take it to the truck.
          </p>
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
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {tools.map((tool) => (
                      <div
                        key={tool.code}
                        className="theme-cream flex flex-col border border-border bg-card p-6"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-primary px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
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
                          className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        />
                      </div>
                    ))}
                  </div>
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
              className="mt-5 inline-block border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Read Field Notes
            </a>
          </div>

          <div className="theme-cream paper mt-8 border border-primary/40 bg-primary/5 p-8">
            <p className="mono-label mb-3">The next step</p>
            <p className="serif-display text-2xl tracking-tight">
              Running a live deal? Bring it to the Deal Desk.
            </p>
            <ul className="mt-5 space-y-3 text-left text-sm leading-relaxed text-muted">
              <li>
                Screened a deal worth pursuing? Bring it to the Deal Desk
                before diligence scatters across inboxes.
              </li>
              <li>
                Walking a park soon? Bring the deal and walk it inside the
                Deal Desk, where every capture lands in the record instead of
                a photo folder.
              </li>
              <li>
                Building the record by hand? The Founding Deal Desk runs the
                whole deal, register to decision file.
              </li>
            </ul>
            <a
              href="/deal-desk"
              className="mt-6 inline-block border border-primary/60 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Bring a live deal
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
