"use client"

import { useMemo, useState } from "react"
import ToolShell from "@/components/tools/ToolShell"
import { EvidenceChip, Field } from "@/components/tools/EvidenceChip"
import { useToolState } from "@/components/tools/useToolState"
import { parseNum, fmtMoney, daysUntil } from "@/lib/tools/calc"
import {
  buildExport,
  downloadJson,
  exportFilename,
  type ExportInput,
  type ExportOutput,
  type ExportOpenItem,
} from "@/lib/tools/schema"
import { type EvidenceState, type ReadinessLabel } from "@/lib/tools/evidence"
import { cn } from "@/lib/utils"

const SLUG = "emd-clock"
const SOURCE_CODE = "AS-17"
const TOOL_NAME = "EMD Clock and Gate Tracker"

const STATUS_OPTIONS = ["Open", "Satisfied", "Waived"] as const
type ContingencyStatus = (typeof STATUS_OPTIONS)[number]

type Contingency = {
  id: string
  name: string
  expiry: string
  status: ContingencyStatus
  evidenceComplete: boolean
}

type State = {
  emdAmount: string
  emdAmountState: EvidenceState
  emdAmountNote: string
  depositDate: string
  depositDateState: EvidenceState
  depositDateNote: string
  closingDate: string
  closingDateState: EvidenceState
  closingDateNote: string
  contingencies: Contingency[]
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10)
}

const blankContingency = (): Contingency => ({
  id: newId(),
  name: "",
  expiry: "",
  status: "Open",
  evidenceComplete: false,
})

const INITIAL: State = {
  emdAmount: "",
  emdAmountState: "broker-reported",
  emdAmountNote: "",
  depositDate: "",
  depositDateState: "broker-reported",
  depositDateNote: "",
  closingDate: "",
  closingDateState: "broker-reported",
  closingDateNote: "",
  contingencies: [blankContingency()],
}

function DateField({
  id,
  label,
  value,
  onChange,
  state,
  onStateChange,
  sourceNote,
  onSourceNote,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  state: EvidenceState
  onStateChange: (s: EvidenceState) => void
  sourceNote?: string
  onSourceNote?: (n: string) => void
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
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  )
}

function daysLabel(days: number | null): string {
  if (days == null) return "date not set"
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} left`
  if (days === 0) return "today"
  return `${Math.abs(days)} day${days === -1 ? "" : "s"} past`
}

const STATUS_CHIP: Record<ContingencyStatus, string> = {
  Open: "border-accent/60 text-accent",
  Satisfied: "border-success/60 text-success",
  Waived: "border-border text-muted",
}

export default function EmdClockTool() {
  const [dealName, setDealName] = useState("")
  const [state, patch, reset] = useToolState<State>(SLUG, dealName, INITIAL)

  const emd = parseNum(state.emdAmount)

  const contingencies = useMemo(
    () =>
      state.contingencies.map((c) => ({
        ...c,
        days: daysUntil(c.expiry || null),
      })),
    [state.contingencies],
  )

  const exposureRows = useMemo(
    () =>
      contingencies.filter(
        (c) =>
          c.status === "Open" &&
          !c.evidenceComplete &&
          c.days != null &&
          c.days <= 7 &&
          c.days >= 0,
      ),
    [contingencies],
  )

  const pastDue = useMemo(
    () => contingencies.filter((c) => c.status === "Open" && c.days != null && c.days < 0),
    [contingencies],
  )

  const depositDays = daysUntil(state.depositDate || null)
  const closingDays = daysUntil(state.closingDate || null)

  const posture: { label: ReadinessLabel; statement: string } = useMemo(() => {
    if (exposureRows.length > 0) {
      const lines = exposureRows.map((c) => {
        const name = c.name.trim() || "an unnamed gate"
        return `${fmtMoney(emd)} goes hard in ${c.days} day${c.days === 1 ? "" : "s"} with ${name} evidence unresolved`
      })
      return {
        label: "pause",
        statement: `The record supports Pause: ${lines.join("; ")}.`,
      }
    }
    if (pastDue.length > 0) {
      const lines = pastDue.map((c) => {
        const name = c.name.trim() || "an unnamed gate"
        return `${name} expired ${Math.abs(c.days ?? 0)} day${c.days === -1 ? "" : "s"} ago with the gate still open`
      })
      return {
        label: "pause",
        statement: `The record supports Pause: ${lines.join("; ")}. A date that already passed with an open gate means the money may already be at risk.`,
      }
    }
    return {
      label: "advance",
      statement:
        "The record supports Advance: all gates tracked, no date at risk.",
    }
  }, [exposureRows, pastDue, emd])

  const openItems: ExportOpenItem[] = useMemo(
    () =>
      contingencies
        .filter((c) => c.status === "Open" && !c.evidenceComplete)
        .map((c) => ({
          item: `${c.name.trim() || "Unnamed gate"}: evidence unresolved${
            c.expiry ? `, expires ${c.expiry}` : ""
          }`,
        })),
    [contingencies],
  )

  const exportInputs: ExportInput[] = useMemo(
    () => [
      {
        id: "emd-amount",
        label: "EMD amount",
        value: state.emdAmount || null,
        state: state.emdAmount ? state.emdAmountState : "missing",
        sourceNote: state.emdAmountNote || undefined,
      },
      {
        id: "deposit-date",
        label: "Deposit date",
        value: state.depositDate || null,
        state: state.depositDate ? state.depositDateState : "missing",
        sourceNote: state.depositDateNote || undefined,
      },
      {
        id: "closing-date",
        label: "Closing date",
        value: state.closingDate || null,
        state: state.closingDate ? state.closingDateState : "missing",
        sourceNote: state.closingDateNote || undefined,
      },
      ...contingencies.map((c, i) => ({
        id: `contingency-${i + 1}-name`,
        label: `Contingency ${i + 1}: ${c.name.trim() || "unnamed"} (${c.status})`,
        value: `${c.name.trim() || "unnamed"} | expiry ${c.expiry || "not set"} | ${c.status} | evidence ${c.evidenceComplete ? "complete" : "incomplete"}`,
        state: (c.name && c.expiry ? "broker-reported" : "missing") as EvidenceState,
      })),
    ],
    [state, contingencies],
  )

  const exportOutputs: ExportOutput[] = useMemo(
    () => [
      {
        id: "days-to-closing",
        label: "Days to closing",
        value: closingDays,
        display: daysLabel(closingDays),
        state: "calculated" as EvidenceState,
        lineage: "Whole days from today to the closing date.",
      },
      ...contingencies.map((c, i) => ({
        id: `contingency-${i + 1}-days`,
        label: `Days left: ${c.name.trim() || `Gate ${i + 1}`}`,
        value: c.days,
        display: daysLabel(c.days),
        state: "calculated" as EvidenceState,
        lineage: `Whole days from today to ${c.expiry || "the (unset) expiry date"}.`,
      })),
      {
        id: "emd-exposure",
        label: "EMD exposure in the next 7 days",
        value: exposureRows.length > 0 && emd != null ? emd : 0,
        display: exposureRows.length > 0 ? fmtMoney(emd) : "$0",
        state: "calculated" as EvidenceState,
        lineage:
          "The full EMD is at risk once any gate goes hard unresolved. One exposure row puts the entire amount on the line.",
      },
    ],
    [closingDays, contingencies, exposureRows, emd],
  )

  const updateContingency = (id: string, patchPart: Partial<Contingency>) => {
    patch({
      contingencies: state.contingencies.map((c) =>
        c.id === id ? { ...c, ...patchPart } : c,
      ),
    })
  }

  const removeContingency = (id: string) => {
    patch({ contingencies: state.contingencies.filter((c) => c.id !== id) })
  }

  const printSummary = (
    <div>
      <p style={{ fontSize: 12 }}>
        EMD: {fmtMoney(emd)} &middot; Deposited: {daysLabel(depositDays)} &middot; Closing:{" "}
        {daysLabel(closingDays)}
      </p>
      <table style={{ fontSize: 12, borderCollapse: "collapse", width: "100%", marginTop: 8 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Gate</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Expiry</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Days</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {contingencies.map((c) => (
            <tr key={c.id}>
              <td style={{ padding: 4 }}>{c.name.trim() || "unnamed"}</td>
              <td style={{ padding: 4 }}>{c.expiry || "not set"}</td>
              <td style={{ padding: 4 }}>{daysLabel(c.days)}</td>
              <td style={{ padding: 4 }}>
                {c.status}
                {c.status === "Open" && !c.evidenceComplete ? " (evidence incomplete)" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, marginTop: 12 }}>
        {exposureRows.length > 0
          ? `EXPOSURE: ${fmtMoney(emd)} at risk in the next 7 days across ${exposureRows.length} gate${exposureRows.length === 1 ? "" : "s"}.`
          : "No EMD goes hard in the next 7 days."}
      </p>
    </div>
  )

  return (
    <ToolShell
      slug={SLUG}
      sourceCode={SOURCE_CODE}
      title={TOOL_NAME}
      description="Your earnest money, on a clock. Dates move. Gates do not."
      timeEstimate="5 minutes to set up"
      inputCount="3 inputs"
      dealName={dealName}
      onDealName={setDealName}
      onReset={reset}
      onDownloadJson={() =>
        downloadJson(
          buildExport({
            tool: SLUG,
            toolName: TOOL_NAME,
            sourceCode: SOURCE_CODE,
            dealName,
            inputs: exportInputs,
            outputs: exportOutputs,
            posture,
            openItems,
          }),
          exportFilename(SLUG, dealName),
        )
      }
      posture={posture}
      printSummary={printSummary}
      ctaTitle="In diligence with dates moving?"
      ctaBody="The Desk runs the register so no date surprises you."
      ctaButton="Talk through my timeline."
      pdfHref="/resources/the-emd-countdown-tracker"
    >
      <section className="border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          The money
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <Field
            id="emd-amount"
            label="EMD amount"
            value={state.emdAmount}
            onChange={(v) => patch({ emdAmount: v })}
            state={state.emdAmountState}
            onStateChange={(s) => patch({ emdAmountState: s })}
            sourceNote={state.emdAmountNote}
            onSourceNote={(n) => patch({ emdAmountNote: n })}
            placeholder="e.g. 25000"
            inputMode="decimal"
          />
          <DateField
            id="deposit-date"
            label="Deposit date"
            value={state.depositDate}
            onChange={(v) => patch({ depositDate: v })}
            state={state.depositDateState}
            onStateChange={(s) => patch({ depositDateState: s })}
            sourceNote={state.depositDateNote}
            onSourceNote={(n) => patch({ depositDateNote: n })}
          />
          <DateField
            id="closing-date"
            label="Closing date"
            value={state.closingDate}
            onChange={(v) => patch({ closingDate: v })}
            state={state.closingDateState}
            onStateChange={(s) => patch({ closingDateState: s })}
            sourceNote={state.closingDateNote}
            onSourceNote={(n) => patch({ closingDateNote: n })}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Deposited {daysLabel(depositDays)} &middot; Closing {daysLabel(closingDays)}
        </p>
      </section>

      <section className="mt-8 border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            Contingency register
          </h2>
          <button
            type="button"
            onClick={() =>
              patch({ contingencies: [...state.contingencies, blankContingency()] })
            }
            className="border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Add gate
          </button>
        </div>
        {contingencies.length === 0 && (
          <p className="mt-4 text-sm text-muted">No gates on the register yet. Add one above.</p>
        )}
        <div className="mt-4 space-y-4">
          {contingencies.map((c, i) => (
            <div key={c.id} className="border border-border/60 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Gate {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeContingency(c.id)}
                  aria-label={`Remove gate ${i + 1}`}
                  className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-critical"
                >
                  Remove
                </button>
              </div>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor={`cont-name-${c.id}`} className="text-sm font-medium text-foreground">
                    Gate name
                  </label>
                  <input
                    id={`cont-name-${c.id}`}
                    type="text"
                    value={c.name}
                    onChange={(e) => updateContingency(c.id, { name: e.target.value })}
                    placeholder="e.g. Financing, inspection, appraisal"
                    className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`cont-expiry-${c.id}`} className="text-sm font-medium text-foreground">
                    Expiry date
                  </label>
                  <input
                    id={`cont-expiry-${c.id}`}
                    type="date"
                    value={c.expiry}
                    onChange={(e) => updateContingency(c.id, { expiry: e.target.value })}
                    className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`cont-status-${c.id}`} className="text-sm font-medium text-foreground">
                    Status
                  </label>
                  <select
                    id={`cont-status-${c.id}`}
                    value={c.status}
                    onChange={(e) =>
                      updateContingency(c.id, { status: e.target.value as ContingencyStatus })
                    }
                    className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground focus:border-primary focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={c.evidenceComplete}
                    onChange={(e) => updateContingency(c.id, { evidenceComplete: e.target.checked })}
                    className="h-4 w-4 accent-[#1D4ED8]"
                  />
                  Evidence complete
                </label>
                <span
                  className={cn(
                    "inline-flex items-center border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]",
                    STATUS_CHIP[c.status],
                  )}
                >
                  {daysLabel(c.days)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Exposure summary
        </h2>
        {exposureRows.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No EMD goes hard in the next 7 days.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {exposureRows.map((c) => (
              <p key={c.id} className="text-sm leading-relaxed text-foreground">
                <span className="font-semibold">
                  {fmtMoney(emd)} in earnest money goes hard in {c.days} day
                  {c.days === 1 ? "" : "s"}
                </span>{" "}
                with <span className="font-semibold">{c.name.trim() || "an unnamed gate"}</span>{" "}
                evidence unresolved.
              </p>
            ))}
            <p className="border-t border-border/60 pt-3 text-sm leading-relaxed text-muted">
              Total exposure: {fmtMoney(emd)}. The full EMD is at risk once any gate goes hard
              unresolved. It is not prorated across gates.
            </p>
          </div>
        )}
        {pastDue.length > 0 && (
          <div className="mt-4 border-t border-border/60 pt-3">
            {pastDue.map((c) => (
              <p key={c.id} className="text-sm leading-relaxed text-critical">
                {c.name.trim() || "An unnamed gate"} expired {Math.abs(c.days ?? 0)} day
                {c.days === -1 ? "" : "s"} ago with the gate still open.
              </p>
            ))}
          </div>
        )}
      </section>
    </ToolShell>
  )
}
