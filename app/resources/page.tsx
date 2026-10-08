import type { Metadata } from "next"
import SignalLine from "@/components/ui/SignalLine"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { GatedDownloadButton } from "@/components/GatedDownload"
import {
  SITUATIONS,
  SITUATION_B_BRANCHES,
  SPINES,
  TOOL_BY_CODE,
  resourceSlug,
  resourceTitleSlug,
  type Situation,
} from "@/lib/resources"

export const metadata: Metadata = {
  title: "Acquisition Signal Resources | CrosstownOS",
  description:
    "Thirty-five free diligence tools for RV park and manufactured-housing buyers. Tell us where your deal stands and get the right tool first.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Acquisition Signal Resources | CrosstownOS",
    description:
      "Thirty-five free diligence tools for RV park and manufactured-housing buyers. Tell us where your deal stands and get the right tool first.",
    type: "website",
    url: "/resources",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Acquisition Signal Resources | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acquisition Signal Resources | CrosstownOS",
    description:
      "Thirty-five free diligence tools for RV park and manufactured-housing buyers.",
    images: ["/og-image.jpg"],
  },
}

function ToolCard({ code, note }: { code: string; note?: string }) {
  const tool = TOOL_BY_CODE[code]
  if (!tool) return null
  return (
    <div className="theme-cream border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          {tool.code}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
          Acquisition Signal Resource
        </span>
      </div>
      <h3 className="serif-display mt-3 text-2xl tracking-tight sm:text-3xl">
        <Link
          href={`/resources/${resourceSlug(tool)}`}
          className="transition-colors hover:text-primary"
        >
          {tool.title}
        </Link>
      </h3>
      {note && (
        <p className="mt-2 text-sm leading-relaxed text-muted">{note}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>
      <GatedDownloadButton
        file={tool.file}
        label={tool.code}
        className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      />
    </div>
  )
}

function NextSteps({ steps }: { steps: { code: string; why: string }[] }) {
  return (
    <div className="mt-10">
      <h3 className="serif-display text-xl tracking-tight sm:text-2xl">
        Your next three, in order
      </h3>
      <p className="mt-1 text-sm text-muted">
        Each tool hands its output to the next. Run them in this order.
      </p>
      <ol className="mt-6 space-y-4">
        {steps.map((step, i) => {
          const tool = TOOL_BY_CODE[step.code]
          if (!tool) return null
          return (
            <li
              key={step.code}
              className="theme-cream flex gap-4 border border-border bg-card p-5 sm:p-6"
            >
              <span className="serif-display flex-none text-2xl text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-semibold">
                  <Link
                    href={`/resources/${resourceSlug(tool)}`}
                    className="transition-colors hover:text-primary"
                  >
                    {tool.code}: {tool.title}
                  </Link>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.why}
                </p>
                <GatedDownloadButton
                  file={tool.file}
                  label={tool.code}
                  className="mt-3 inline-block cursor-pointer bg-transparent p-0 text-left text-sm font-semibold text-primary hover:underline"
                />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function SituationResult({ situation, branch }: { situation: Situation; branch?: string }) {
  if (situation.id === "b" && branch !== "mhc" && branch !== "rv") {
    return (
      <div className="theme-cream mt-10 border border-primary/40 bg-card p-6 sm:p-8">
        <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
          Which kind of park?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {situation.question}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="/resources?situation=b&branch=mhc"
            className="block border border-border bg-background p-6 transition-colors hover:border-primary/60"
          >
            <p className="serif-display text-xl tracking-tight">
              Manufactured-housing community
            </p>
            <p className="mt-2 text-sm text-muted">
              Lot-rent math. Start with AS-15, The Rent-Roll Truth Check.
            </p>
          </a>
          <a
            href="/resources?situation=b&branch=rv"
            className="block border border-border bg-background p-6 transition-colors hover:border-primary/60"
          >
            <p className="serif-display text-xl tracking-tight">RV park</p>
            <p className="mt-2 text-sm text-muted">
              Transient-site math. Start with AS-15R, Rent-Roll Truth Check: RV
              Edition.
            </p>
          </a>
        </div>
      </div>
    )
  }

  const starts =
    situation.id === "b"
      ? situation.starts.filter((s) =>
          branch === "mhc" ? s.code === "AS-15" : s.code === "AS-15R"
        )
      : situation.starts
  const steps =
    situation.id === "b"
      ? SITUATION_B_BRANCHES[branch === "mhc" ? "AS-15" : "AS-15R"]
      : situation.next

  return (
    <div className="mt-10">
      <div className="border-l-2 border-primary pl-4">
        <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
          Start here
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {situation.question}
        </p>
      </div>
      <div className="mt-6 grid gap-4">
        {starts.map((s) => (
          <ToolCard key={s.code} code={s.code} note={s.note} />
        ))}
      </div>
      <NextSteps steps={steps} />
    </div>
  )
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ situation?: string; branch?: string }>
}) {
  const params = await searchParams
  const activeId = params.situation
  const active = SITUATIONS.find((s) => s.id === activeId)

  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS // Acquisition Signals</p>
          <SignalLine />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            What is happening with your deal right now?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Pick the situation that matches. You get the right first tool and
            the three that come next, in order. No guessing, no wall of
            options.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SITUATIONS.map((s, i) => {
              const isActive = active?.id === s.id
              return (
                <a
                  key={s.id}
                  href={isActive ? "/resources" : `/resources?situation=${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "theme-cream paper border-2 border-primary bg-primary/10 p-5"
                      : "theme-cream card-lift border border-border bg-card p-5 transition-colors hover:border-primary/60"
                  }
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                    Situation {String.fromCharCode(65 + i)}
                  </p>
                  <p className="mt-2 font-semibold leading-snug">{s.label}</p>
                </a>
              )
            })}
            <a
              href="/resources/catalog"
              className="theme-cream paper border border-dashed border-border bg-transparent p-5 transition-colors hover:border-primary/60"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                Full catalog
              </p>
              <p className="mt-2 font-semibold leading-snug">
                Browse all 35 tools by Part
              </p>
            </a>
          </div>

          {active && (
            <SituationResult
              situation={active}
              branch={params.branch}
            />
          )}

          <div className="mt-20">
            <div className="border-l-2 border-primary pl-4">
              <h2 className="serif-display text-2xl tracking-tight sm:text-3xl">
                Start with the spine
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Three pages hold the whole library together. Read these before
                you print anything.
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {SPINES.map((sp) => (
                <div key={sp.title} className="theme-cream border border-border bg-card p-6">
                  <h3 className="serif-display text-xl tracking-tight">
                    <Link
                      href={`/resources/${resourceTitleSlug(sp.title)}`}
                      className="transition-colors hover:text-primary"
                    >
                      {sp.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {sp.description}
                  </p>
                  <GatedDownloadButton
                    file={sp.file}
                    label={sp.title}
                    className="mt-4 inline-block cursor-pointer bg-transparent p-0 text-left text-sm font-semibold text-primary hover:underline"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="theme-cream mt-16 border border-border bg-card p-8 text-center">
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
              className="mt-6 inline-block border border-primary/60 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              See the plans
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
        </div>
      </main>
    </>
  )
}
