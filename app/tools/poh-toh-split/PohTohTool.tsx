"use client"

import { useMemo, useState } from "react"
import ToolShell from "@/components/tools/ToolShell"
import { Field, OutputRow } from "@/components/tools/EvidenceChip"
import { useToolState } from "@/components/tools/useToolState"
import { parseNum, fmtMoney, fmtPct, splitValuation, grossPotentialAnnual, impliedCapRate } from "@/lib/tools/calc"
import {
  buildExport,
  exportFilename,
  type ExportInput,
  type ExportOutput,
  type ExportOpenItem,
} from "@/lib/tools/schema"
import { type EvidenceState, type ReadinessLabel } from "@/lib/tools/evidence"

const SLUG = "poh-toh-split"
const SOURCE_CODE = "AS-09"
const TOOL_NAME = "POH/TOH Split Valuation"

type State = {
  askingPrice: string
  askingPriceState: EvidenceState
  askingPriceNote: string
  tohCount: string
  tohCountState: EvidenceState
  tohCountNote: string
  lotRent: string
  lotRentState: EvidenceState
  lotRentNote: string
  pohCount: string
  pohCountState: EvidenceState
  pohCountNote: string
  pohRent: string
  pohRentState: EvidenceState
  pohRentNote: string
  pohMultiple: string
  pohMultipleState: EvidenceState
  pohMultipleNote: string
  capRate: string
  capRateState: EvidenceState
  capRateNote: string
}

const INITIAL: State = {
  askingPrice: "",
  askingPriceState: "broker-reported",
  askingPriceNote: "",
  tohCount: "",
  tohCountState: "broker-reported",
  tohCountNote: "",
  lotRent: "",
  lotRentState: "broker-reported",
  lotRentNote: "",
  pohCount: "",
  pohCountState: "broker-reported",
  pohCountNote: "",
  pohRent: "",
  pohRentState: "broker-reported",
  pohRentNote: "",
  pohMultiple: "3",
  pohMultipleState: "assumption",
  pohMultipleNote: "",
  capRate: "",
  capRateState: "assumption",
  capRateNote: "",
}

const FIELD_LABELS: { field: keyof State; label: string }[] = [
  { field: "askingPrice", label: "Asking price" },
  { field: "tohCount", label: "Tenant-owned home count" },
  { field: "lotRent", label: "Average lot rent" },
  { field: "pohCount", label: "Park-owned home count" },
  { field: "pohRent", label: "Average POH rent" },
  { field: "capRate", label: "Target cap rate" },
]

export default function PohTohTool() {
  const [dealName, setDealName] = useState("")
  const [state, patch, reset] = useToolState<State>(SLUG, dealName, INITIAL)

  const asking = parseNum(state.askingPrice)
  const toh = parseNum(state.tohCount)
  const lotRent = parseNum(state.lotRent)
  const poh = parseNum(state.pohCount)
  const pohRent = parseNum(state.pohRent)
  const mult = parseNum(state.pohMultiple)
  const cap = parseNum(state.capRate)
  const capDecimal = cap != null ? cap / 100 : null

  const { lotValue, pohValue, splitValue } = useMemo(
    () =>
      splitValuation({
        tenantOwnedCount: toh,
        lotRent,
        capRate: capDecimal,
        parkOwnedCount: poh,
        pohRent,
        pohMultiple: mult,
      }),
    [toh, lotRent, capDecimal, poh, pohRent, mult],
  )

  const retradeDelta = useMemo(
    () => (asking != null && splitValue != null ? asking - splitValue : null),
    [asking, splitValue],
  )

  const blendedYield = useMemo(() => {
    const lotAnnual = grossPotentialAnnual(toh, lotRent)
    const pohAnnual = grossPotentialAnnual(poh, pohRent)
    const total = lotAnnual != null && pohAnnual != null ? lotAnnual + pohAnnual : null
    return impliedCapRate(total, asking)
  }, [toh, lotRent, poh, pohRent, asking])

  const coreMissing = asking == null || splitValue == null

  const posture: { label: ReadinessLabel; statement: string } = useMemo(() => {
    if (coreMissing) {
      return {
        label: "pause",
        statement:
          "The record supports Pause: core inputs are Missing. The split cannot be valued until asking price, home counts, rents, and the target cap rate are all on the record.",
      }
    }
    if (retradeDelta != null && splitValue != null && retradeDelta > splitValue * 0.05) {
      return {
        label: "retrade",
        statement: `The record supports Retrade: the asking price exceeds the split-implied value by ${fmtMoney(retradeDelta)}. That delta is the retrade number.`,
      }
    }
    return {
      label: "advance",
      statement: "The record supports Advance: the blended price survives the split.",
    }
  }, [coreMissing, retradeDelta, splitValue])

  const openItems: ExportOpenItem[] = useMemo(() => {
    const items: ExportOpenItem[] = []
    const checks: { label: string; ok: boolean }[] = [
      { label: "Asking price", ok: asking != null },
      { label: "Tenant-owned home count", ok: toh != null },
      { label: "Average lot rent", ok: lotRent != null },
      { label: "Park-owned home count", ok: poh != null },
      { label: "Average POH rent", ok: pohRent != null },
      { label: "Target cap rate", ok: capDecimal != null },
    ]
    for (const c of checks) {
      if (!c.ok) items.push({ item: `${c.label}: not on the record` })
    }
    return items
  }, [asking, toh, lotRent, poh, pohRent, capDecimal])

  const exportInputs: ExportInput[] = useMemo(() => {
    const inputs: ExportInput[] = FIELD_LABELS.map(({ field, label }) => ({
      id: field,
      label,
      value: parseNum(state[field] as string),
      state: (state[field] ? state[`${field}State` as keyof State] : "missing") as EvidenceState,
      sourceNote: (state[`${field}Note` as keyof State] as string) || undefined,
    }))
    inputs.push({
      id: "pohMultiple",
      label: "POH valuation multiple (underwriting assumption)",
      value: parseNum(state.pohMultiple),
      state: state.pohMultiple ? state.pohMultipleState : "missing",
      sourceNote: state.pohMultipleNote || undefined,
    })
    return inputs
  }, [state])

  const exportOutputs: ExportOutput[] = useMemo(
    () => [
      {
        id: "lot-value",
        label: "Lot-rent value (real estate)",
        value: lotValue,
        display: fmtMoney(lotValue),
        state: "calculated" as EvidenceState,
        lineage:
          "TOH count × avg lot rent × 12 / target cap rate. Lot rent is capitalized as real estate.",
      },
      {
        id: "poh-value",
        label: "POH value (personal property)",
        value: pohValue,
        display: fmtMoney(pohValue),
        state: "calculated" as EvidenceState,
        lineage:
          "POH count × avg POH rent × 12 × POH multiple. The multiple is a stated underwriting assumption, not a verified fact.",
      },
      {
        id: "split-value",
        label: "Split-implied value",
        value: splitValue,
        display: fmtMoney(splitValue),
        state: "calculated" as EvidenceState,
        lineage: "Lot-rent value + POH value. Two businesses, one number.",
      },
      {
        id: "asking-price",
        label: "Asking price",
        value: asking,
        display: fmtMoney(asking),
        state: (asking != null ? state.askingPriceState : "missing") as EvidenceState,
        lineage: "The asking price input, carried through for comparison.",
      },
      {
        id: "retrade-delta",
        label: "Retrade delta",
        value: retradeDelta,
        display: fmtMoney(retradeDelta),
        state: "calculated" as EvidenceState,
        lineage:
          "Asking price minus split-implied value. Positive means the asking price exceeds the split; that delta is the retrade number.",
      },
      {
        id: "blended-yield",
        label: "Blended gross rent yield (context)",
        value: blendedYield,
        display: fmtPct(blendedYield),
        state: "calculated" as EvidenceState,
        lineage:
          "Total annual gross rent (TOH lot rent + POH rent) / asking price. A gross rent yield, not a cap rate. Context only; the split is the underwriting.",
      },
    ],
    [lotValue, pohValue, splitValue, asking, retradeDelta, blendedYield],
  )

  const printSummary = (
    <div>
      <table style={{ fontSize: 12, borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ padding: 4 }}>Lot-rent value (real estate)</td>
            <td style={{ padding: 4, textAlign: "right" }}>{fmtMoney(lotValue)}</td>
          </tr>
          <tr>
            <td style={{ padding: 4 }}>POH value (personal property)</td>
            <td style={{ padding: 4, textAlign: "right" }}>{fmtMoney(pohValue)}</td>
          </tr>
          <tr>
            <td style={{ padding: 4 }}>Split-implied value</td>
            <td style={{ padding: 4, textAlign: "right" }}>{fmtMoney(splitValue)}</td>
          </tr>
          <tr>
            <td style={{ padding: 4 }}>Asking price</td>
            <td style={{ padding: 4, textAlign: "right" }}>{fmtMoney(asking)}</td>
          </tr>
          <tr>
            <td style={{ padding: 4, fontWeight: "bold" }}>Retrade delta</td>
            <td style={{ padding: 4, textAlign: "right", fontWeight: "bold" }}>
              {retradeDelta == null ? "n/a" : fmtMoney(retradeDelta)}
            </td>
          </tr>
          <tr>
            <td style={{ padding: 4 }}>Blended gross rent yield (context)</td>
            <td style={{ padding: 4, textAlign: "right" }}>{fmtPct(blendedYield)}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: 12, marginTop: 12 }}>
        POH multiple: {state.pohMultiple || "not set"} (underwriting assumption) &middot; Target cap
        rate: {state.capRate ? `${state.capRate}%` : "not set"}
      </p>
      {openItems.length > 0 && (
        <p style={{ fontSize: 12, marginTop: 8 }}>
          Missing inputs: {openItems.map((o) => o.item).join("; ")}
        </p>
      )}
    </div>
  )

  const deltaDisplay = fmtMoney(retradeDelta)

  return (
    <ToolShell
      slug={SLUG}
      sourceCode={SOURCE_CODE}
      title={TOOL_NAME}
      description="Park-owned and tenant-owned homes are two businesses wearing one price tag. Value them separately."
      timeEstimate="5 minutes"
      inputCount="7 inputs"
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
      ctaTitle="This is the number you take back to the seller."
      ctaBody="The Desk builds the full underwriting case behind it, deterministically, from your approved assumptions."
      ctaButton="Build my retrade case in the fit call."
      pdfHref="/resources/poh-toh-split-valuation-worksheet"
    >
      <section className="border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          The ask
        </h2>
        <div className="mt-4 max-w-sm">
          <Field
            id="asking-price"
            label="Asking price"
            value={state.askingPrice}
            onChange={(v) => patch({ askingPrice: v })}
            state={state.askingPriceState}
            onStateChange={(s) => patch({ askingPriceState: s })}
            sourceNote={state.askingPriceNote}
            onSourceNote={(n) => patch({ askingPriceNote: n })}
            placeholder="e.g. 2400000"
            inputMode="decimal"
          />
        </div>
      </section>

      <section className="mt-8 border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          The two businesses
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Tenant-owned homes: the real estate
            </p>
            <Field
              id="toh-count"
              label="Tenant-owned home count"
              value={state.tohCount}
              onChange={(v) => patch({ tohCount: v })}
              state={state.tohCountState}
              onStateChange={(s) => patch({ tohCountState: s })}
              sourceNote={state.tohCountNote}
              onSourceNote={(n) => patch({ tohCountNote: n })}
              placeholder="e.g. 64"
              inputMode="numeric"
            />
            <Field
              id="lot-rent"
              label="Average lot rent (monthly)"
              value={state.lotRent}
              onChange={(v) => patch({ lotRent: v })}
              state={state.lotRentState}
              onStateChange={(s) => patch({ lotRentState: s })}
              sourceNote={state.lotRentNote}
              onSourceNote={(n) => patch({ lotRentNote: n })}
              placeholder="e.g. 450"
              inputMode="decimal"
            />
          </div>
          <div className="space-y-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
              Park-owned homes: the personal property
            </p>
            <Field
              id="poh-count"
              label="Park-owned home count"
              value={state.pohCount}
              onChange={(v) => patch({ pohCount: v })}
              state={state.pohCountState}
              onStateChange={(s) => patch({ pohCountState: s })}
              sourceNote={state.pohCountNote}
              onSourceNote={(n) => patch({ pohCountNote: n })}
              placeholder="e.g. 18"
              inputMode="numeric"
            />
            <Field
              id="poh-rent"
              label="Average POH rent (monthly)"
              value={state.pohRent}
              onChange={(v) => patch({ pohRent: v })}
              state={state.pohRentState}
              onStateChange={(s) => patch({ pohRentState: s })}
              sourceNote={state.pohRentNote}
              onSourceNote={(n) => patch({ pohRentNote: n })}
              placeholder="e.g. 950"
              inputMode="decimal"
            />
          </div>
        </div>
      </section>

      <section className="mt-8 border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Your underwriting assumptions
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <Field
            id="cap-rate"
            label="Target cap rate (%)"
            value={state.capRate}
            onChange={(v) => patch({ capRate: v })}
            state={state.capRateState}
            onStateChange={(s) => patch({ capRateState: s })}
            sourceNote={state.capRateNote}
            onSourceNote={(n) => patch({ capRateNote: n })}
            placeholder="e.g. 8.5"
            hint="Enter as a percent. Lot rent is capitalized as real estate at this rate."
            inputMode="decimal"
          />
          <Field
            id="poh-multiple"
            label="POH valuation multiple"
            value={state.pohMultiple}
            onChange={(v) => patch({ pohMultiple: v })}
            state={state.pohMultipleState}
            onStateChange={(s) => patch({ pohMultipleState: s })}
            sourceNote={state.pohMultipleNote}
            onSourceNote={(n) => patch({ pohMultipleNote: n })}
            placeholder="e.g. 3"
            hint="Underwriting assumption, adjustable. POH rent is personal-property income, valued at this multiple of annual rent."
            inputMode="decimal"
          />
        </div>
      </section>

      <section className="mt-8 border border-primary/40 bg-primary/5 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          The retrade number
        </p>
        <p className="serif-display mt-2 text-5xl tracking-tight text-foreground">
          {deltaDisplay}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {retradeDelta == null
            ? "Enter the inputs above and the retrade number computes itself."
            : retradeDelta > 0
              ? "The asking price exceeds the split-implied value. This is the number you take back to the seller."
              : "The asking price sits at or under the split-implied value."}
        </p>
      </section>

      <section className="mt-8 border border-border bg-card p-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Split valuation
        </h2>
        <div className="mt-2">
          <OutputRow
            label="Lot-rent value (real estate)"
            display={fmtMoney(lotValue)}
            lineage="TOH count × avg lot rent × 12 / target cap rate. Lot rent is capitalized as real estate."
          />
          <OutputRow
            label="POH value (personal property)"
            display={fmtMoney(pohValue)}
            lineage="POH count × avg POH rent × 12 × POH multiple. The multiple is a stated underwriting assumption."
          />
          <OutputRow
            label="Split-implied value"
            display={fmtMoney(splitValue)}
            lineage="Lot-rent value + POH value. Two businesses, one number."
          />
          <OutputRow
            label="Asking price"
            display={fmtMoney(asking)}
            lineage="The broker-reported asking price, carried through for comparison."
          />
          <OutputRow
            label="Blended gross rent yield (context)"
            display={fmtPct(blendedYield)}
            lineage="Total annual gross rent (TOH lot rent + POH rent) / asking price. A gross rent yield, not a cap rate. Context only; the split is the underwriting."
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          POH homes are depreciating personal property, not dirt. Capitalizing their rent as real
          estate is how buyers overpay. The 5% band around the split-implied value is the tolerance
          before the record supports a retrade.
        </p>
      </section>

      {openItems.length > 0 && (
        <section className="mt-8 border border-border bg-card p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            Missing inputs
          </h2>
          <ul className="mt-4 space-y-2">
            {openItems.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span aria-hidden="true" className="mt-1 inline-block h-2 w-2 shrink-0 bg-critical" />
                <span>{o.item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ToolShell>
  )
}
