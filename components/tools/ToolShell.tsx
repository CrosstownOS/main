"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { track } from "@vercel/analytics"
import { EVIDENCE_STATES, POSTURE_FOOTER, READINESS_DISCLAIMER, READINESS_LABELS, type EvidenceState, type ReadinessLabel } from "@/lib/tools/evidence"
import { downloadJson, type ToolExport } from "@/lib/tools/schema"
import { cn } from "@/lib/utils"

const EMAIL_KEY = "crosstown_resource_email"

type SaveMode = "save" | "download"

function PostureBanner({ label, statement }: { label: ReadinessLabel; statement: string }) {
  const info = READINESS_LABELS[label]
  const color =
    label === "walk"
      ? "border-critical/60 bg-critical/5"
      : label === "pause"
        ? "border-accent/60 bg-accent/5"
        : label === "retrade"
          ? "border-primary/60 bg-primary/5"
          : "border-success/60 bg-success/5"
  return (
    <div className={cn("border p-6", color)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
        Evidence-readiness posture
      </p>
      <p className="serif-display mt-2 text-3xl tracking-tight text-foreground">{info.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{statement}</p>
      <p className="mt-3 text-xs leading-relaxed text-muted">{POSTURE_FOOTER}</p>
    </div>
  )
}

function EmailSaveModal({
  toolLabel,
  mode,
  getPayload,
  onClose,
  onSaved,
}: {
  toolLabel: string
  mode: SaveMode
  getPayload: () => ToolExport
  onClose: () => void
  onSaved: (email: string) => void
}) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setBusy(true)
    try {
      const formData = new FormData(e.currentTarget)
      const res = await fetch("/api/tool-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tool: toolLabel,
          website: formData.get("website"),
          payload: getPayload(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Something went wrong.")
      try {
        window.localStorage.setItem(EMAIL_KEY, email.trim().toLowerCase())
      } catch { /* ignore */ }
      onSaved(email.trim())
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Email required to save"
    >
      <div
        className="theme-cream w-full max-w-sm border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          {mode === "download" ? "Export your work" : "Save your work"}
        </p>
        <h3 className="serif-display mt-2 text-xl tracking-tight">One email sends the paper to your inbox.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We will email you this working paper as JSON. Your numbers stay in your browser until you send them.
        </p>
        <form onSubmit={submit} className="mt-4">
          <label htmlFor="tool-save-email" className="sr-only">Email address</label>
          <input
            id="tool-save-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted"
          />
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-3 w-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Sending..." : "Save via email"}
          </button>
        </form>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full cursor-pointer text-center text-xs text-muted hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export type ToolShellProps = {
  slug: string
  sourceCode: string
  title: string
  description: string
  timeEstimate: string
  inputCount: string
  dealName: string
  onDealName: (v: string) => void
  onReset: () => void
  getExport: () => ToolExport
  exportFileName: string
  posture: { label: ReadinessLabel; statement: string } | null
  printSummary: ReactNode
  ctaTitle: string
  ctaBody: string
  ctaButton: string
  pdfHref: string
  children: ReactNode
}

export default function ToolShell(props: ToolShellProps) {
  const {
    slug, sourceCode, title, description, timeEstimate, inputCount,
    dealName, onDealName, onReset, getExport, exportFileName, posture,
    printSummary, ctaTitle, ctaBody, ctaButton, pdfHref, children,
  } = props
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveMode, setSaveMode] = useState<SaveMode>("save")
  const [savedEmail, setSavedEmail] = useState<string | null>(null)

  const rememberedEmail = (): string | null => {
    try {
      return window.localStorage.getItem(EMAIL_KEY)
    } catch {
      return null
    }
  }

  const doDownload = () => {
    track("tool_export_json", { tool: slug })
    downloadJson(getExport(), exportFileName)
  }

  const handleSave = () => {
    const existing = rememberedEmail()
    if (existing) {
      setSavedEmail(existing)
      track("tool_save", { tool: slug, mode: "remembered" })
      return
    }
    setSaveMode("save")
    setSaveOpen(true)
  }

  const handlePrint = () => {
    track("tool_print", { tool: slug })
    window.print()
  }

  const handleDownload = () => {
    const existing = rememberedEmail()
    if (existing) {
      setSavedEmail(existing)
      doDownload()
      return
    }
    setSaveMode("download")
    setSaveOpen(true)
  }

  const handleModalSaved = (email: string) => {
    setSavedEmail(email)
    track("tool_save", { tool: slug, mode: saveMode })
    if (saveMode === "download") {
      doDownload()
    }
  }

  return (
    <>
      <style>{`@media print { body * { visibility: hidden; } [data-print-root], [data-print-root] * { visibility: visible; } [data-print-root] { position: absolute; inset: 0 auto auto 0; width: 100%; background: #fff; color: #000; padding: 24px; } }`}</style>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              <li><Link href="/tools" className="transition-colors hover:text-primary">Working Papers</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-primary">{title}</li>
            </ol>
          </nav>

          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {sourceCode}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                Live Diligence Working Paper
              </span>
            </div>
            <h1 className="serif-display mt-5 text-4xl tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {inputCount} &middot; about {timeEstimate} &middot; runs in your browser
            </p>
          </div>

          <div className="theme-cream mt-10 border border-border bg-card p-6">
            <label htmlFor="deal-name" className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              Deal name <span className="normal-case tracking-normal">(keeps each deal&apos;s work separate)</span>
            </label>
            <div className="mt-2 flex flex-wrap gap-3">
              <input
                id="deal-name"
                type="text"
                value={dealName}
                onChange={(e) => onDealName(e.target.value)}
                placeholder="e.g. Pine Ridge MHC"
                className="min-w-0 flex-1 border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={onReset}
                className="border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-primary hover:text-primary"
              >
                Start over
              </button>
            </div>
          </div>

          <div className="mt-10">{children}</div>

          {posture && (
            <div className="mt-10">
              <PostureBanner label={posture.label} statement={posture.statement} />
              <p className="mt-3 text-xs leading-relaxed text-muted">{READINESS_DISCLAIMER}</p>
            </div>
          )}

          <div className="theme-cream mt-10 border border-border bg-card p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Keep the record
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Download JSON
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Print one-page summary
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {savedEmail ? "Sent, check your inbox" : "Save via email"}
              </button>
              <Link
                href={pdfHref}
                className="inline-flex items-center border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
              >
                Get the PDF
              </Link>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              The tool is free to use. Email is only asked when you save or export.
              Your numbers stay in your browser until you choose to move them.
            </p>
          </div>

          <div className="theme-cream paper mt-8 border border-primary/40 bg-primary/5 p-8">
            <p className="mono-label mb-3">The next step</p>
            <p className="serif-display text-2xl tracking-tight">{ctaTitle}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{ctaBody}</p>
            <Link
              href={`/deal-desk?tool=${slug}`}
              className="mt-6 inline-block border border-primary/60 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {ctaButton}
            </Link>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              Evidence states on this page
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(Object.keys(EVIDENCE_STATES) as EvidenceState[]).map((s) => (
                <span
                  key={s}
                  title={EVIDENCE_STATES[s].definition}
                  className={cn(
                    "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]",
                    EVIDENCE_STATES[s].chipClass,
                  )}
                >
                  <span aria-hidden="true">{EVIDENCE_STATES[s].code}</span>
                  <span>{EVIDENCE_STATES[s].title}</span>
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Inputs you type start as Broker-reported. Mark one Verified only when you can point to the source.
              Anything the tool computes is Calculated, with its lineage shown. Missing is named, never zeroed.
            </p>
          </div>
        </div>
      </main>

      {/* Print-only summary */}
      <div data-print-root className="hidden print:block">
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>{title} — {dealName || "Untitled deal"}</h1>
        <p style={{ fontSize: 11, color: "#555", marginBottom: 16 }}>
          CrosstownOS working paper &middot; {sourceCode} &middot; {new Date().toLocaleDateString("en-US")}
        </p>
        {printSummary}
        {posture && (
          <p style={{ marginTop: 16, fontSize: 12 }}>
            Posture: {posture.label.toUpperCase()} — {posture.statement}
          </p>
        )}
        <p style={{ marginTop: 12, fontSize: 10, color: "#555" }}>{READINESS_DISCLAIMER}</p>
      </div>

      {saveOpen && (
        <EmailSaveModal
          toolLabel={title}
          mode={saveMode}
          getPayload={getExport}
          onClose={() => setSaveOpen(false)}
          onSaved={handleModalSaved}
        />
      )}
    </>
  )
}
