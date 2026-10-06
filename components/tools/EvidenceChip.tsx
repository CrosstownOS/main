"use client"

import { useState } from "react"
import { EVIDENCE_STATES, INPUT_STATES, type EvidenceState } from "@/lib/tools/evidence"
import { cn } from "@/lib/utils"

/**
 * Evidence state chip. Tapping cycles through the input states.
 * Marking Verified asks for a source note, because a verified claim
 * says what the source supports.
 */
export function EvidenceChip({
  state,
  onChange,
  sourceNote,
  onSourceNote,
  className,
}: {
  state: EvidenceState
  onChange?: (next: EvidenceState) => void
  sourceNote?: string
  onSourceNote?: (note: string) => void
  className?: string
}) {
  const [editingNote, setEditingNote] = useState(false)
  const info = EVIDENCE_STATES[state]

  const cycle = () => {
    if (!onChange) return
    const idx = INPUT_STATES.indexOf(state)
    const next = INPUT_STATES[(idx + 1) % INPUT_STATES.length]
    onChange(next)
    if (next === "verified") setEditingNote(true)
    else setEditingNote(false)
  }

  return (
    <span className={cn("inline-flex flex-col items-start gap-1", className)}>
      <button
        type="button"
        onClick={cycle}
        disabled={!onChange}
        title={`${info.title}: ${info.definition}${onChange ? " Tap to change." : ""}`}
        aria-label={`Evidence state: ${info.title}. ${info.definition}`}
        className={cn(
          "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]",
          info.chipClass,
          onChange && "cursor-pointer hover:opacity-80",
        )}
      >
        <span aria-hidden="true">{info.code}</span>
        <span>{info.title}</span>
      </button>
      {editingNote && onSourceNote && (
        <input
          type="text"
          value={sourceNote ?? ""}
          onChange={(e) => onSourceNote(e.target.value)}
          placeholder="Source note: what did you check?"
          aria-label="Source note for verified input"
          className="w-56 border border-border bg-background px-2 py-1 text-xs text-foreground placeholder:text-muted"
        />
      )}
      {state === "verified" && !editingNote && sourceNote && onSourceNote && (
        <button
          type="button"
          onClick={() => setEditingNote(true)}
          className="max-w-56 truncate text-left text-[11px] text-muted underline-offset-2 hover:underline"
        >
          {sourceNote}
        </button>
      )}
    </span>
  )
}

/**
 * Labeled numeric/text input with an evidence chip beside the label.
 * Blank stays blank: it is Missing evidence, never zero.
 */
export function Field({
  id,
  label,
  value,
  onChange,
  state,
  onStateChange,
  sourceNote,
  onSourceNote,
  placeholder,
  hint,
  inputMode = "decimal",
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  state: EvidenceState
  onStateChange: (s: EvidenceState) => void
  sourceNote?: string
  onSourceNote?: (n: string) => void
  placeholder?: string
  hint?: string
  inputMode?: "decimal" | "text" | "numeric"
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <EvidenceChip
          state={state}
          onChange={onStateChange}
          sourceNote={sourceNote}
          onSourceNote={onSourceNote}
        />
      </div>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
      />
      {hint && <p className="mt-1 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

/** Read-only output row: label, computed value, lineage, Calculated chip. */
export function OutputRow({
  label,
  display,
  lineage,
}: {
  label: string
  display: string
  lineage: string
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/60 py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted">{lineage}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="serif-display text-2xl tracking-tight text-foreground">{display}</span>
        <EvidenceChip state="calculated" />
      </div>
    </div>
  )
}
