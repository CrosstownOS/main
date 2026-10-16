"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { EVIDENCE_STATES, POSTURE_FOOTER, READINESS_DISCLAIMER, READINESS_LABELS, type EvidenceState, type ReadinessLabel } from "@/lib/tools/evidence"
import { downloadJson, type ToolExport } from "@/lib/tools/schema"
import { downloadWorkingPaperHtml, workingPaperFilename } from "@/lib/tools/workingPaper"
import type { Faq } from "@/lib/tools/faqs"
import FaqSection from "./FaqSection"
import SuccessState from "@/components/SuccessState"
import { EvidenceStateChip } from "@/components/evidence/EvidenceStateChip"
import { cn } from "@/lib/utils"
import SignalLine from "@/components/ui/SignalLine"

const EMAIL_KEY = "crosstown_resource_email"

type SaveMode = "save" | "download"

function PostureBanner({ label, statement }: { label: ReadinessLabel; statement: string }) {
  const info = READINESS_LABELS[label]
  // Border accents are pinned to the literal :root values so the semantic
  // state color is identical inside the cream scope.
  const color =
    label === "walk"
      ? "border-[color-mix(in_oklab,oklch(0.62_0.16_25)_60%,transparent)]"
      : label === "pause"
        ? "border-[color-mix(in_oklab,oklch(0.65_0.12_55)_60%,transparent)]"
        : label === "retrade"
          ? "border-[color-mix(in_oklab,oklch(0.628_0.179_258)_60%,transparent)]"
          : "border-[color-mix(in_oklab,oklch(0.60_0.13_148)_60%,transparent)]"
  return (
    <div className={cn("theme-cream border bg-card p-6", color)}>
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
  toolSlug,
  mode,
  getPayload,
  onClose,
  onSaved,
}: {
  toolLabel: string
  toolSlug: string
  mode: SaveMode
  getPayload: () => ToolExport
  onClose: () => void
  onSaved: (email: string) => void
}) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]?.focus()
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== "Tab" || !dialogRef.current) return
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      const inside = active ? dialogRef.current.contains(active) : false
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("keydown", onKey)
    }
  }, [onClose])

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
          toolSlug,
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
        ref={dialogRef}
        className="theme-cream w-full max-w-sm border border-border bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          {mode === "download" ? "Export your work" : "Save your work"}
        </p>
        <h3 className="serif-display mt-2 text-xl tracking-tight">One email sends the paper to your inbox.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We will email you this working paper. Your numbers stay in your browser until you send them.
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
            className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted"
          />
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-3 w-full bg-primary-deep px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
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
  description: ReactNode
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
  pdfHrefAlt?: { href: string; label: string }
  faqs?: Faq[]
  relatedNote?: { href: string; label: string }
  children: ReactNode
}

export default function ToolShell(props: ToolShellProps) {
  const {
    slug, sourceCode, title, description, timeEstimate, inputCount,
    dealName, onDealName, onReset, getExport, exportFileName, posture,
    printSummary, ctaTitle, ctaBody, ctaButton, pdfHref, pdfHrefAlt, faqs, relatedNote, children,
  } = props
  const [saveOpen, setSaveOpen] = useState(false)
  const handleSaveClose = useCallback(() => setSaveOpen(false), [])
  const [saveMode, setSaveMode] = useState<SaveMode>("save")
  const [pendingDownload, setPendingDownload] = useState<"paper" | "json" | null>(null)
  const [savedEmail, setSavedEmail] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [completion, setCompletion] = useState<
    | { kind: "paper" }
    | { kind: "json" }
    | { kind: "email"; email: string }
    | null
  >(null)
  const completionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (completion) {
      completionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [completion])

  const sendPaper = async (toEmail: string) => {
    setSending(true)
    try {
      const res = await fetch("/api/tool-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: toEmail,
          tool: title,
          toolSlug: slug,
          payload: getExport(),
        }),
      })
      if (!res.ok) throw new Error("Send failed")
      setSavedEmail(toEmail)
      setCompletion({ kind: "email", email: toEmail })
      import("@vercel/analytics").then(({ track }) => track("tool_save", { tool: slug, mode: "resend" }))
    } catch {
      setSaveMode("save")
      setSaveOpen(true)
    } finally {
      setSending(false)
    }
  }

  const rememberedEmail = (): string | null => {
    try {
      return window.localStorage.getItem(EMAIL_KEY)
    } catch {
      return null
    }
  }

  const doDownloadPaper = () => {
    import("@vercel/analytics").then(({ track }) => track("tool_export_paper", { tool: slug }))
    downloadWorkingPaperHtml(getExport(), workingPaperFilename(slug, dealName))
    setCompletion({ kind: "paper" })
  }

  const doDownloadJson = () => {
    import("@vercel/analytics").then(({ track }) => track("tool_export_json", { tool: slug }))
    downloadJson(getExport(), exportFileName)
    setCompletion({ kind: "json" })
  }

  const handleSave = () => {
    const existing = rememberedEmail()
    if (existing) {
      sendPaper(existing)
      return
    }
    triggerRef.current = document.activeElement as HTMLElement | null
    setSaveMode("save")
    setSaveOpen(true)
  }

  const handlePrint = () => {
    import("@vercel/analytics").then(({ track }) => track("tool_print", { tool: slug }))
    window.print()
  }

  const handleDownload = () => {
    const existing = rememberedEmail()
    if (existing) {
      setSavedEmail(existing)
      doDownloadPaper()
      return
    }
    triggerRef.current = document.activeElement as HTMLElement | null
    setPendingDownload("paper")
    setSaveMode("download")
    setSaveOpen(true)
  }

  const handleDownloadJson = () => {
    const existing = rememberedEmail()
    if (existing) {
      setSavedEmail(existing)
      doDownloadJson()
      return
    }
    triggerRef.current = document.activeElement as HTMLElement | null
    setPendingDownload("json")
    setSaveMode("download")
    setSaveOpen(true)
  }

  const handleModalSaved = (email: string) => {
    setSavedEmail(email)
    import("@vercel/analytics").then(({ track }) => track("tool_save", { tool: slug, mode: saveMode }))
    if (saveMode === "download") {
      if (pendingDownload === "json") {
        doDownloadJson()
      } else {
        doDownloadPaper()
      }
      setPendingDownload(null)
    } else {
      setCompletion({ kind: "email", email })
    }
  }

  return (
    <>
      <style>{`@media print {
        body * { visibility: hidden; }
        [data-print-root], [data-print-root] * { visibility: visible; }
        [data-print-root] { position: absolute; inset: 0 auto auto 0; width: 100%; background: #fff; color: #1a1a1a; padding: 24px; font-family: Inter, system-ui, sans-serif; }
        [data-print-root] .print-brandbar { border-top: 4px solid #00468B; padding-top: 16px; margin-bottom: 16px; }
        [data-print-root] .print-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; color: #00468B; margin: 0 0 4px 0; }
        [data-print-root] .print-title { font-family: Georgia, serif; font-size: 22px; margin: 0 0 4px 0; }
        [data-print-root] .print-meta { font-size: 11px; color: #555; margin: 0 0 4px 0; }
        [data-print-root] .print-posture { border: 1px solid #00468B; background: #f4f7fb; padding: 12px 16px; margin: 16px 0; }
        [data-print-root] .print-posture strong { color: #00468B; }
        [data-print-root] * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      }`}</style>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
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
              <span className="bg-primary-deep px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                {sourceCode}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                Live Diligence Working Paper
              </span>
            </div>
            <SignalLine />
            <h1 className="serif-display mt-5 text-4xl tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {inputCount} &middot; about {timeEstimate} &middot; runs in your browser
            </p>
          </div>

          <div className="theme-cream mt-6 border border-border bg-card p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              How to read this page
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(EVIDENCE_STATES) as EvidenceState[]).map((s) => (
                <EvidenceStateChip key={s} state={s} />
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              What you type starts as Broker-reported. Mark it Verified only when you can point to the source. What the tool computes is Calculated. Missing is named, never zeroed.
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
                className="border border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-primary hover:text-primary"
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
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="bg-primary-deep px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Download working paper
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Print one-page summary
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={sending}
                className="border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
              >
                {sending ? "Sending..." : savedEmail ? "Resend working paper" : "Save via email"}
              </button>
              <Link
                href={pdfHref}
                className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
              >
                Get the PDF
              </Link>
              {pdfHrefAlt ? (
                <Link
                  href={pdfHrefAlt.href}
                  className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {pdfHrefAlt.label}
                </Link>
              ) : null}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              The tool is free to use. Email is only asked when you save or export.
              Take the working paper with you.{" "}
              <button
                type="button"
                onClick={handleDownloadJson}
                className="cursor-pointer underline hover:text-primary"
              >
                Raw data (JSON)
              </button>{" "}
              available for your records.
              Your numbers stay in your browser until you choose to move them.
            </p>
          </div>

          {completion && (
            <div ref={completionRef} className="mt-8">
              <SuccessState
                eyebrow={
                  completion.kind === "email"
                    ? "Working paper sent"
                    : "Working paper downloaded"
                }
                title={
                  completion.kind === "email"
                    ? "Your working paper is on its way."
                    : completion.kind === "json"
                      ? "Your raw data is downloading."
                      : "Your working paper is downloading."
                }
                body={
                  completion.kind === "email"
                    ? `Sent to ${completion.email}. Nothing else is pending; your numbers stayed in your browser until you sent them.`
                    : completion.kind === "json"
                      ? "Nothing is pending. The file carries the same numbers and evidence states as the paper."
                      : "Nothing is pending. The file carries your numbers and their evidence states, ready to sit with the deal record."
                }
                door={{ href: `/workspace?tool=${slug}`, label: ctaButton }}
              />
            </div>
          )}

          {faqs && faqs.length > 0 && <FaqSection faqs={faqs} />}

          <div className="theme-cream paper mt-8 border border-primary/40 bg-primary/5 p-8">
            <p className="mono-label mb-3">The next step</p>
            <p className="serif-display text-2xl tracking-tight">{ctaTitle}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{ctaBody}</p>
            <Link
              href={`/workspace?tool=${slug}`}
              className="mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {ctaButton}
            </Link>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              Go deeper
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Working the full file? Run the{" "}
              <Link href="/checklist" className="font-semibold text-primary hover:underline">
                free RV park due diligence checklist
              </Link>{" "}
              for all fifteen items in order
              {relatedNote ? (
                <>
                  , or read{" "}
                  <Link href={relatedNote.href} className="font-semibold text-primary hover:underline">
                    {relatedNote.label}
                  </Link>{" "}
                  for the thinking behind this verification
                </>
              ) : (
                <>
                  , or{" "}
                  <Link href="/blog" className="font-semibold text-primary hover:underline">
                    read the Field Notes
                  </Link>{" "}
                  for the thinking behind each verification
                </>
              )}
              .
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              One tool settles one question. The record is where the settled questions add up to a decision.
            </p>
          </div>

        </div>
      </main>

      {/* Print-only summary */}
      <div data-print-root className="hidden print:block">
        <div className="print-brandbar">
          <Image src="/logo.jpg" alt="CrosstownOS" width={40} height={40} loading="eager" decoding="async" style={{ borderRadius: "50%", marginBottom: 8 }} />
          <p className="print-eyebrow">CrosstownOS &middot; Live Diligence Working Paper</p>
          <p className="print-title">{title}</p>
          <p className="print-meta">
            {dealName || "Untitled deal"} &middot; {sourceCode} &middot; {new Date().toLocaleDateString("en-US")}
          </p>
        </div>
        {printSummary}
        {posture && (
          <div className="print-posture">
            <p style={{ margin: 0, fontSize: 12 }}>
              <strong>Posture: {posture.label.toUpperCase()}</strong>: {posture.statement}
            </p>
          </div>
        )}
        <p style={{ marginTop: 12, fontSize: 10, color: "#555" }}>{READINESS_DISCLAIMER}</p>
        <p style={{ marginTop: 8, fontSize: 10, color: "#555" }}>
          Generated by CrosstownOS &middot; crosstownosrv.camp/tools/{slug} &middot; (972) 914-9046
        </p>
      </div>

      {saveOpen && (
        <EmailSaveModal
          toolLabel={title}
          toolSlug={slug}
          mode={saveMode}
          getPayload={getExport}
          onClose={handleSaveClose}
          onSaved={handleModalSaved}
        />
      )}
    </>
  )
}

