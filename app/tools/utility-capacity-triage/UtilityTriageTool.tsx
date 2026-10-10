"use client"

import { useMemo, useState } from "react"
import ToolShell from "@/components/tools/ToolShell"
import { UTILITY_FAQS } from "@/lib/tools/faqs"
import { EvidenceChip, Field, OutputRow } from "@/components/tools/EvidenceChip"
import { useToolState } from "@/components/tools/useToolState"
import { parseNum } from "@/lib/tools/calc"
import {
  buildExport,
  exportFilename,
  type ExportInput,
  type ExportOutput,
  type ExportOpenItem,
} from "@/lib/tools/schema"
import { type EvidenceState, type ReadinessLabel } from "@/lib/tools/evidence"
import { cn } from "@/lib/utils"

const SLUG = "utility-capacity-triage"
const SOURCE_CODE = "AS-13"
const TOOL_NAME = "Utility Capacity Risk Triage"

const TYPE_OPTIONS = ["Municipal", "Private", "Unknown"]
const PERMIT_OPTIONS = ["Permitted", "Unpermitted", "Unknown"]

type UtilityKey = "water" | "sewer" | "electric"
const UTILITIES: { key: UtilityKey; label: string; gating: boolean }[] = [
  { key: "water", label: "Water", gating: true },
  { key: "sewer", label: "Sewer / Septic / OSSF", gating: true },
  { key: "electric", label: "Electrical", gating: false },
]

type Score = "green" | "amber" | "red" | "missing"

const SCORE_META: Record<Score, { label: string; cls: string }> = {
  green: { label: "Clear", cls: "border-success/60 text-success" },
  amber: { label: "Caution", cls: "border-accent/60 text-accent" },
  red: { label: "Gate risk", cls: "border-critical/60 text-critical" },
  missing: { label: "Missing", cls: "border-border text-muted" },
}

function scoreSystem(type: string, permit: string): { score: Score; reason: string } {
  if (!type || !permit) return { score: "missing", reason: "evidence missing" }
  if (permit === "Unpermitted" || type === "Unknown") {
    return {
      score: "red",
      reason: permit === "Unpermitted" ? "unpermitted" : "an unknown system type",
    }
  }
  if (type === "Municipal" && permit === "Permitted")
    return { score: "green", reason: "municipal and permitted" }
  return { score: "amber", reason: `${type.toLowerCase()}, ${permit.toLowerCase()}` }
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  state,
  onStateChange,
  sourceNote,
  onSourceNote,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
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
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground focus:border-primary focus:outline-none"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

/** Plain text input with no evidence chip: optional context, not scored evidence. */
function PlainField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
      />
    </div>
  )
}

type State = Record<string, string>

const INITIAL: State = {
  siteCount: "",
  siteCountState: "broker-reported" as EvidenceState,
  siteCountNote: "",
  waterType: "",
  waterTypeState: "broker-reported" as EvidenceState,
  waterTypeNote: "",
  waterPermit: "",
  waterPermitState: "broker-reported" as EvidenceState,
  waterPermitNote: "",
  waterAge: "",
  waterIssues: "",
  sewerType: "",
  sewerTypeState: "broker-reported" as EvidenceState,
  sewerTypeNote: "",
  sewerPermit: "",
  sewerPermitState: "broker-reported" as EvidenceState,
  sewerPermitNote: "",
  sewerAge: "",
  sewerIssues: "",
  electricType: "",
  electricTypeState: "broker-reported" as EvidenceState,
  electricTypeNote: "",
  electricPermit: "",
  electricPermitState: "broker-reported" as EvidenceState,
  electricPermitNote: "",
  electricAge: "",
  electricIssues: "",
  openOwner: "",
  openDue: "",
}

export default function UtilityTriageTool() {
  const [dealName, setDealName] = useState("")
  const [state, patch, reset] = useToolState<State>(SLUG, dealName, INITIAL)

  const patchField = (field: string, v: string) => patch({ [field]: v } as Partial<State>)

  const systems = useMemo(
    () =>
      UTILITIES.map((u) => {
        const type = state[`${u.key}Type`] ?? ""
        const permit = state[`${u.key}Permit`] ?? ""
        const age = state[`${u.key}Age`] ?? ""
        const issues = state[`${u.key}Issues`] ?? ""
        const { score, reason } = scoreSystem(type, permit)
        return { ...u, type, permit, age, issues, score, reason }
      }),
    [state],
  )

  const posture: { label: ReadinessLabel; statement: string } = useMemo(() => {
    const gating = systems.filter((s) => s.gating)
    const red = gating.filter((s) => s.score === "red")
    if (red.length > 0) {
      const first = red[0]
      return {
        label: "pause",
        statement: `The record supports Pause: ${first.label.toLowerCase()} is ${first.reason}. Under the Arizona Rule the deal cannot move toward offer while a capacity-gate risk is unresolved unless an authorized person waives it with a documented reason.`,
      }
    }
    const notClear = gating.filter((s) => s.score === "amber" || s.score === "missing")
    if (notClear.length > 0) {
      const first = notClear[0]
      const detail =
        first.score === "missing"
          ? "gating evidence is Missing"
          : `carries an unresolved capacity question (${first.reason})`
      return {
        label: "pause",
        statement: `The record supports Pause: ${first.label.toLowerCase()} ${detail}. Under the Arizona Rule the deal cannot move toward offer while a capacity-gate risk is unresolved unless an authorized person waives it with a documented reason.`,
      }
    }
    return {
      label: "advance",
      statement:
        "The record supports Advance: water and sewer, the two capacity gates, are municipal and permitted on the record. The Arizona Rule is satisfied.",
    }
  }, [systems])

  const openItems: ExportOpenItem[] = useMemo(() => {
    const items: ExportOpenItem[] = []
    const owner = state.openOwner.trim() || undefined
    const dueDate = state.openDue.trim() || undefined
    for (const s of systems) {
      if (!s.type) items.push({ item: `${s.label}: system type not recorded`, owner, dueDate })
      else if (s.type === "Unknown")
        items.push({
          item: `${s.label}: system type is Unknown, confirm with the municipality or operator`,
          owner,
          dueDate,
        })
      if (!s.permit) items.push({ item: `${s.label}: permit status not recorded`, owner, dueDate })
      else if (s.permit === "Unknown")
        items.push({
          item: `${s.label}: permit status is Unknown, pull the permit file`,
          owner,
          dueDate,
        })
      if (!s.age.trim())
        items.push({ item: `${s.label}: age or last upgrade unknown`, owner, dueDate })
      if (s.issues.trim())
        items.push({
          item: `${s.label}: known issue on the record, "${s.issues.trim()}"`,
          owner,
          dueDate,
        })
    }
    return items
  }, [systems, state.openOwner, state.openDue])

  const exportInputs: ExportInput[] = useMemo(() => {
    const inputs: ExportInput[] = [
      {
        id: "site-count",
        label: "Site count",
        value: state.siteCount || null,
        state: state.siteCount ? (state.siteCountState as EvidenceState) : "missing",
        sourceNote: state.siteCountNote || undefined,
      },
    ]
    for (const s of systems) {
      const typeState = state[`${s.key}TypeState`] as EvidenceState
      const permitState = state[`${s.key}PermitState`] as EvidenceState
      inputs.push(
        {
          id: `${s.key}-type`,
          label: `${s.label} system type`,
          value: s.type || null,
          state: s.type ? typeState : "missing",
          sourceNote: state[`${s.key}TypeNote`] || undefined,
        },
        {
          id: `${s.key}-permit`,
          label: `${s.label} permit status`,
          value: s.permit || null,
          state: s.permit ? permitState : "missing",
          sourceNote: state[`${s.key}PermitNote`] || undefined,
        },
        {
          id: `${s.key}-age`,
          label: `${s.label} age or last upgrade`,
          value: s.age || null,
          state: s.age ? "broker-reported" : "missing",
        },
      )
      if (s.issues.trim()) {
        inputs.push({
          id: `${s.key}-issues`,
          label: `${s.label} known issues`,
          value: s.issues.trim(),
          state: "broker-reported",
        })
      }
    }
    return inputs
  }, [state, systems])

  const exportOutputs: ExportOutput[] = useMemo(
    () =>
      systems.map((s) => ({
        id: `${s.key}-score`,
        label: `${s.label} capacity score`,
        value: s.score,
        display: SCORE_META[s.score].label,
        state: "calculated" as EvidenceState,
        lineage: `Municipal + Permitted scores Clear. Unpermitted or Unknown type scores Gate risk. Unknown is never Clear. From ${s.type || "unrecorded"} type and ${s.permit || "unrecorded"} permit.`,
      })),
    [systems],
  )

  const siteCountNum = parseNum(state.siteCount)

  const printSummary = (
    <div>
      <table style={{ fontSize: 12, borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>System</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Type</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Permit</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Score</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #999", padding: 4 }}>Gate</th>
          </tr>
        </thead>
        <tbody>
          {systems.map((s) => (
            <tr key={s.key}>
              <td style={{ padding: 4 }}>{s.label}</td>
              <td style={{ padding: 4 }}>{s.type || "not recorded"}</td>
              <td style={{ padding: 4 }}>{s.permit || "not recorded"}</td>
              <td style={{ padding: 4 }}>{SCORE_META[s.score].label}</td>
              <td style={{ padding: 4 }}>{s.gating ? "Capacity gate" : "Advisory"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, marginTop: 12 }}>
        Sites: {siteCountNum != null ? siteCountNum : "not recorded"}
      </p>
      <p style={{ fontSize: 12, marginTop: 8 }}>
        Open evidence requests ({openItems.length}):
      </p>
      <ul style={{ fontSize: 12 }}>
        {openItems.map((o, i) => (
          <li key={i}>{o.item}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <ToolShell
      slug={SLUG}
      sourceCode={SOURCE_CODE}
      title={TOOL_NAME}
      description={
        <>
          Water, sewer, electric.{" "}
          <a
            href="/blog/the-utility-system-nobody-underwrote"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            The systems nobody underwrites
          </a>{" "}
          until they become the emergency. The Arizona Rule, live.
        </>
      }
      timeEstimate="10 minutes"
      inputCount="13 inputs"
      dealName={dealName}
      onDealName={setDealName}
      onReset={reset}
      getExport={() =>
        buildExport({
          tool: SLUG,
          toolName: TOOL_NAME,
          sourceCode: SOURCE_CODE,
          dealName,
          inputs: exportInputs,
          outputs: exportOutputs,
          posture,
          openItems,
        })
      }
      exportFileName={exportFilename(SLUG, dealName)}
      posture={posture}
      printSummary={printSummary}
      ctaTitle="Capacity gates are where deals die quietly."
      ctaBody="Running a live deal? The Acquisition Workspace keeps every gate in one record."
      ctaButton="Stress-test my infrastructure in the fit call."
      faqs={UTILITY_FAQS}

      pdfHref="/resources/utility-and-wastewater-diligence-sheet"
      relatedNote={{ href: "/blog/the-utility-system-nobody-underwrote", label: "The Utility System Nobody Underwrote" }}
    >
      <section className="border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          The park
        </h2>
        <div className="mt-4 max-w-sm">
          <Field
            id="site-count"
            label="Site count"
            value={state.siteCount}
            onChange={(v) => patchField("siteCount", v)}
            state={state.siteCountState as EvidenceState}
            onStateChange={(s) => patchField("siteCountState", s)}
            sourceNote={state.siteCountNote}
            onSourceNote={(n) => patchField("siteCountNote", n)}
            placeholder="e.g. 87"
            inputMode="numeric"
          />
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {systems.map((s) => (
          <section key={s.key} className="border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="serif-display text-xl tracking-tight">{s.label}</h2>
              <span
                className={cn(
                  "border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]",
                  s.gating ? "border-critical/60 text-critical" : "border-border text-muted",
                )}
              >
                {s.gating ? "Capacity gate" : "Advisory"}
              </span>
            </div>
            <div className="mt-4 space-y-4">
              <SelectField
                id={`${s.key}-type`}
                label="System type"
                value={s.type}
                onChange={(v) => patchField(`${s.key}Type`, v)}
                options={TYPE_OPTIONS}
                state={state[`${s.key}TypeState`] as EvidenceState}
                onStateChange={(st) => patchField(`${s.key}TypeState`, st)}
                sourceNote={state[`${s.key}TypeNote`]}
                onSourceNote={(n) => patchField(`${s.key}TypeNote`, n)}
              />
              <SelectField
                id={`${s.key}-permit`}
                label="Permit status"
                value={s.permit}
                onChange={(v) => patchField(`${s.key}Permit`, v)}
                options={PERMIT_OPTIONS}
                state={state[`${s.key}PermitState`] as EvidenceState}
                onStateChange={(st) => patchField(`${s.key}PermitState`, st)}
                sourceNote={state[`${s.key}PermitNote`]}
                onSourceNote={(n) => patchField(`${s.key}PermitNote`, n)}
              />
              <PlainField
                id={`${s.key}-age`}
                label="Age or last upgrade"
                value={s.age}
                onChange={(v) => patchField(`${s.key}Age`, v)}
                placeholder="Leave blank if unknown"
              />
              <PlainField
                id={`${s.key}-issues`}
                label="Known issues (optional)"
                value={s.issues}
                onChange={(v) => patchField(`${s.key}Issues`, v)}
                placeholder="e.g. lift station flagged in 2024"
              />
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8 border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Capacity scores
        </h2>
        <div className="mt-2">
          {systems.map((s) => (
            <div
              key={s.key}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-border/60 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {s.label}
                  <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                    {s.gating ? "Gate" : "Advisory"}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {s.type || "Type not recorded"} &middot; {s.permit || "Permit not recorded"}
                  {s.age ? ` · Age/upgrade: ${s.age}` : ""}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]",
                  SCORE_META[s.score].cls,
                )}
              >
                {SCORE_META[s.score].label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Scoring: Municipal plus Permitted is Clear. Unpermitted, or an Unknown system type, is a
          gate risk. Everything else is Caution. Unknown is never Clear. Water and sewer are
          capacity gates; electrical is advisory and never gates the deal.
        </p>
      </section>

      <section className="mt-8 border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Open evidence requests
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="open-owner" className="text-sm font-medium text-foreground">
              Owner <span className="text-muted">(applies to every request below)</span>
            </label>
            <input
              id="open-owner"
              type="text"
              value={state.openOwner}
              onChange={(e) => patchField("openOwner", e.target.value)}
              placeholder="e.g. Buyer, broker, seller"
              className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="open-due" className="text-sm font-medium text-foreground">
              Due date <span className="text-muted">(applies to every request below)</span>
            </label>
            <input
              id="open-due"
              type="text"
              value={state.openDue}
              onChange={(e) => patchField("openDue", e.target.value)}
              placeholder="e.g. Before offer"
              className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        {openItems.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No open requests. Every field on the record is answered.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {openItems.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span aria-hidden="true" className="mt-1 inline-block h-2 w-2 shrink-0 bg-critical" />
                <span>
                  {o.item}
                  {o.owner ? ` · Owner: ${o.owner}` : ""}
                  {o.dueDate ? ` · Due: ${o.dueDate}` : ""}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Every Missing or Unknown field above becomes an evidence request. Known issues stay on
          the record until they are resolved or waived with a documented reason.
        </p>
      </section>
    </ToolShell>
  )
}

