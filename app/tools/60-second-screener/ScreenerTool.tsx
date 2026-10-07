"use client"

import { useMemo, useState } from "react"
import ToolShell from "@/components/tools/ToolShell"
import { SCREENER_FAQS } from "@/lib/tools/faqs"
import { EvidenceChip, Field, OutputRow } from "@/components/tools/EvidenceChip"
import { useToolState } from "@/components/tools/useToolState"
import {
  parseNum,
  impliedCapRate,
  pricePerPad,
  grossPotentialAnnual,
  expenseRatio,
  fmtMoney,
  fmtPct,
  fmtNum,
} from "@/lib/tools/calc"
import {
  buildExport,
  exportFilename,
  type ExportInput,
  type ExportOutput,
} from "@/lib/tools/schema"
import type { EvidenceState, ReadinessLabel } from "@/lib/tools/evidence"

type ScreenerState = {
  askingPrice: string
  askingPriceState: EvidenceState
  askingPriceNote: string
  siteCount: string
  siteCountState: EvidenceState
  siteCountNote: string
  avgLotRent: string
  avgLotRentState: EvidenceState
  avgLotRentNote: string
  reportedOccupancy: string
  reportedOccupancyState: EvidenceState
  reportedOccupancyNote: string
  t12Noi: string
  t12NoiState: EvidenceState
  t12NoiNote: string
  annualExpenses: string
  annualExpensesState: EvidenceState
  annualExpensesNote: string
  assetType: "mhp" | "rv"
  walkAwayFloor: string
  walkAwayFloorState: EvidenceState
  walkAwayFloorNote: string
  evidenceOwner: string
  evidenceDueDate: string
}

const BR: EvidenceState = "broker-reported"

const INITIAL: ScreenerState = {
  askingPrice: "",
  askingPriceState: BR,
  askingPriceNote: "",
  siteCount: "",
  siteCountState: BR,
  siteCountNote: "",
  avgLotRent: "",
  avgLotRentState: BR,
  avgLotRentNote: "",
  reportedOccupancy: "",
  reportedOccupancyState: BR,
  reportedOccupancyNote: "",
  t12Noi: "",
  t12NoiState: BR,
  t12NoiNote: "",
  annualExpenses: "",
  annualExpensesState: BR,
  annualExpensesNote: "",
  assetType: "mhp",
  walkAwayFloor: "",
  walkAwayFloorState: BR,
  walkAwayFloorNote: "",
  evidenceOwner: "",
  evidenceDueDate: "",
}

const CORE_INPUTS = [
  { id: "askingPrice", label: "Asking price" },
  { id: "siteCount", label: "Site / pad count" },
  { id: "avgLotRent", label: "Average lot rent" },
  { id: "reportedOccupancy", label: "Reported occupancy" },
  { id: "t12Noi", label: "Reported T12 NOI" },
  { id: "annualExpenses", label: "Annual expense total" },
] as const

export default function ScreenerTool() {
  const [dealName, setDealName] = useState("")
  const [state, patch, reset] = useToolState<ScreenerState>(
    "60-second-screener",
    dealName,
    INITIAL,
  )

  const price = parseNum(state.askingPrice)
  const sites = parseNum(state.siteCount)
  const avgRent = parseNum(state.avgLotRent)
  const occ = parseNum(state.reportedOccupancy)
  const noi = parseNum(state.t12Noi)
  const expenses = parseNum(state.annualExpenses)
  const floorPct = parseNum(state.walkAwayFloor)

  const cap = impliedCapRate(noi, price)
  const perPad = pricePerPad(price, sites)
  const gprAnnual = grossPotentialAnnual(sites, avgRent)
  const expRatio = expenseRatio(expenses, gprAnnual)

  const missing = useMemo(
    () =>
      CORE_INPUTS.filter((c) => {
        const key = c.id as keyof ScreenerState
        return parseNum(String(state[key] ?? "")) == null
      }),
    [state],
  )

  const posture = useMemo<{ label: ReadinessLabel; statement: string }>(() => {
    if (floorPct != null && cap != null && cap < floorPct / 100) {
      return {
        label: "walk",
        statement: `The record supports Walk: the implied cap rate (${fmtPct(
          cap,
        )}) sits below your stated floor (${fmtPct(floorPct / 100)}).`,
      }
    }
    if (missing.length > 0) {
      const names = missing.map((m) => m.label.toLowerCase()).join(", ")
      return {
        label: "pause",
        statement: `The record supports Pause: ${missing.length} of 6 inputs are Missing evidence: ${names}.`,
      }
    }
    return {
      label: "advance",
      statement:
        "The record supports Advance: the numbers survive screening. This means proceed to full diligence, never proceed to buy.",
    }
  }, [floorPct, cap, missing])

  const band = state.assetType === "mhp" ? "35-45%" : "45-60%"
  const bandAsset = state.assetType === "mhp" ? "MHP" : "RV park"

  const inputs: ExportInput[] = useMemo(
    () => [
      { id: "askingPrice", label: "Asking price", value: price, state: price == null ? "missing" : state.askingPriceState, sourceNote: state.askingPriceNote || undefined },
      { id: "siteCount", label: "Site / pad count", value: sites, state: sites == null ? "missing" : state.siteCountState, sourceNote: state.siteCountNote || undefined },
      { id: "avgLotRent", label: "Average lot rent", value: avgRent, state: avgRent == null ? "missing" : state.avgLotRentState, sourceNote: state.avgLotRentNote || undefined },
      { id: "reportedOccupancy", label: "Reported occupancy (%)", value: occ, state: occ == null ? "missing" : state.reportedOccupancyState, sourceNote: state.reportedOccupancyNote || undefined },
      { id: "t12Noi", label: "Reported T12 NOI", value: noi, state: noi == null ? "missing" : state.t12NoiState, sourceNote: state.t12NoiNote || undefined },
      { id: "annualExpenses", label: "Annual expense total", value: expenses, state: expenses == null ? "missing" : state.annualExpensesState, sourceNote: state.annualExpensesNote || undefined },
      { id: "assetType", label: "Asset type", value: state.assetType === "mhp" ? "MHP" : "RV park", state: "assumption" },
      { id: "walkAwayFloor", label: "Walk-away cap floor (%)", value: floorPct, state: floorPct == null ? "missing" : state.walkAwayFloorState, sourceNote: state.walkAwayFloorNote || undefined },
    ],
    [price, sites, avgRent, occ, noi, expenses, floorPct, state],
  )

  const outputs: ExportOutput[] = useMemo(
    () => [
      { id: "impliedCap", label: "Implied cap rate", value: cap, display: fmtPct(cap), state: "calculated", lineage: `T12 NOI / asking price, from ${state.t12NoiState} and ${state.askingPriceState} inputs` },
      { id: "pricePerPad", label: "Price per pad", value: perPad, display: fmtMoney(perPad), state: "calculated", lineage: `Asking price / site count, from ${state.askingPriceState} and ${state.siteCountState} inputs` },
      { id: "gprAnnual", label: "Gross potential annual rent", value: gprAnnual, display: fmtMoney(gprAnnual), state: "calculated", lineage: `Site count x average lot rent x 12, from ${state.siteCountState} and ${state.avgLotRentState} inputs` },
      { id: "expenseRatio", label: "Expense ratio", value: expRatio, display: fmtPct(expRatio), state: "calculated", lineage: `Annual expense total / gross potential annual rent; ${bandAsset} sanity band ${band} is an Underwriting assumption` },
    ],
    [cap, perPad, gprAnnual, expRatio, band, bandAsset, state],
  )

  const openItems = useMemo(
    () =>
      missing.map((m) => ({
        item: m.label,
        owner: state.evidenceOwner || undefined,
        dueDate: state.evidenceDueDate || undefined,
      })),
    [missing, state.evidenceOwner, state.evidenceDueDate],
  )

  const onReset = () => {
    reset()
    setDealName("")
  }

  return (
    <ToolShell
      slug="60-second-screener"
      sourceCode="AS-02"
      title="60-Second Deal Screener"
      description="Six numbers, one posture. If a deal cannot survive this page, it does not deserve a phone call."
      timeEstimate="60 seconds"
      inputCount="8 inputs"
      dealName={dealName}
      onDealName={setDealName}
      onReset={onReset}
      getExport={() =>
        buildExport({
          tool: "60-second-screener",
          toolName: "60-Second Deal Screener",
          sourceCode: "AS-02",
          dealName,
          inputs,
          outputs,
          posture,
          openItems,
        })
      }
      exportFileName={exportFilename("60-second-screener", dealName)}
      posture={posture}
      printSummary={
        <>
          <h2 style={{ fontSize: 14, marginBottom: 8 }}>Screening numbers</h2>
          <ul style={{ fontSize: 12, lineHeight: 1.8 }}>
            <li>Implied cap rate: {fmtPct(cap)}</li>
            <li>Price per pad: {fmtMoney(perPad)}</li>
            <li>Gross potential annual rent: {fmtMoney(gprAnnual)}</li>
            <li>
              Expense ratio: {fmtPct(expRatio)} ({bandAsset} sanity band {band}, Underwriting assumption)
            </li>
            <li>
              Missing inputs:{" "}
              {missing.length === 0 ? "none" : missing.map((m) => m.label).join(", ")}
            </li>
          </ul>
        </>
      }
      ctaTitle="This survived sixty seconds."
      ctaBody="Running a live deal? The Acquisition Workspace keeps the full record in one place."
      ctaButton="Bring this deal to the fit call."
      faqs={SCREENER_FAQS}

      pdfHref="/resources/60-second-deal-screener"
    >
      <section aria-label="The six numbers">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          The six numbers
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
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
          />
          <Field
            id="site-count"
            label="Site / pad count"
            value={state.siteCount}
            onChange={(v) => patch({ siteCount: v })}
            state={state.siteCountState}
            onStateChange={(s) => patch({ siteCountState: s })}
            sourceNote={state.siteCountNote}
            onSourceNote={(n) => patch({ siteCountNote: n })}
            placeholder="e.g. 68"
          />
          <Field
            id="avg-lot-rent"
            label="Average lot rent (monthly)"
            value={state.avgLotRent}
            onChange={(v) => patch({ avgLotRent: v })}
            state={state.avgLotRentState}
            onStateChange={(s) => patch({ avgLotRentState: s })}
            sourceNote={state.avgLotRentNote}
            onSourceNote={(n) => patch({ avgLotRentNote: n })}
            placeholder="e.g. 425"
          />
          <Field
            id="reported-occupancy"
            label="Reported occupancy (%)"
            value={state.reportedOccupancy}
            onChange={(v) => patch({ reportedOccupancy: v })}
            state={state.reportedOccupancyState}
            onStateChange={(s) => patch({ reportedOccupancyState: s })}
            sourceNote={state.reportedOccupancyNote}
            onSourceNote={(n) => patch({ reportedOccupancyNote: n })}
            placeholder="e.g. 92"
          />
          <Field
            id="t12-noi"
            label="Reported T12 NOI"
            value={state.t12Noi}
            onChange={(v) => patch({ t12Noi: v })}
            state={state.t12NoiState}
            onStateChange={(s) => patch({ t12NoiState: s })}
            sourceNote={state.t12NoiNote}
            onSourceNote={(n) => patch({ t12NoiNote: n })}
            placeholder="e.g. 168000"
          />
          <Field
            id="annual-expenses"
            label="Annual expense total"
            value={state.annualExpenses}
            onChange={(v) => patch({ annualExpenses: v })}
            state={state.annualExpensesState}
            onStateChange={(s) => patch({ annualExpensesState: s })}
            sourceNote={state.annualExpensesNote}
            onSourceNote={(n) => patch({ annualExpensesNote: n })}
            placeholder="e.g. 210000"
          />
        </div>
      </section>

      <section aria-label="Asset type and walk-away floor" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          Context
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-foreground">Asset type</p>
            <div className="mt-1.5 flex gap-2" role="group" aria-label="Asset type">
              {(
                [
                  { value: "mhp", label: "MHP" },
                  { value: "rv", label: "RV park" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => patch({ assetType: opt.value })}
                  aria-pressed={state.assetType === opt.value}
                  className={
                    state.assetType === opt.value
                      ? "border border-primary bg-primary/10 px-4 py-2.5 text-sm font-semibold text-foreground"
                      : "border border-border bg-background px-4 py-2.5 text-sm text-muted hover:border-primary hover:text-primary"
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Drives the expense sanity band. An Underwriting assumption, not a fact about this deal.
            </p>
          </div>
          <Field
            id="walk-away-floor"
            label="Walk-away cap floor (%) (optional, from your Walk-Away Pact)"
            value={state.walkAwayFloor}
            onChange={(v) => patch({ walkAwayFloor: v })}
            state={state.walkAwayFloorState}
            onStateChange={(s) => patch({ walkAwayFloorState: s })}
            sourceNote={state.walkAwayFloorNote}
            onSourceNote={(n) => patch({ walkAwayFloorNote: n })}
            placeholder="e.g. 7.5"
            hint="Leave blank if you have not set one. With a floor, a cap rate under it is a Walk on the record."
          />
        </div>
      </section>

      <section aria-label="Screening outputs" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          What the numbers say
        </p>
        <div className="mt-2">
          <OutputRow
            label="Implied cap rate"
            display={fmtPct(cap)}
            lineage="T12 NOI / asking price"
          />
          <OutputRow
            label="Price per pad"
            display={fmtMoney(perPad)}
            lineage="Asking price / site count"
          />
          <OutputRow
            label="Gross potential annual rent"
            display={fmtMoney(gprAnnual)}
            lineage="Site count x average lot rent x 12"
          />
          <OutputRow
            label="Expense ratio"
            display={fmtPct(expRatio)}
            lineage="Annual expense total / gross potential annual rent"
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Sanity band, {bandAsset} norm {band}. Underwriting assumption, adjustable per your model,
          not verified data: {fmtNum(expRatio != null ? expRatio * 100 : null, 1)}%{" "}
          {expRatio == null
            ? "cannot be banded until expenses and rent are entered."
            : expRatio * 100 < (state.assetType === "mhp" ? 35 : 45)
              ? "sits under the band: expenses look thin, sellers underreport."
              : expRatio * 100 > (state.assetType === "mhp" ? 45 : 60)
                ? "sits above the band: expenses look heavy or rent is understated."
                : "sits inside the band."}
        </p>
      </section>

      {missing.length > 0 && (
        <section aria-label="Close the gaps" className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Close the gaps
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {missing.length} of 6 inputs are Missing evidence:{" "}
            {missing.map((m) => m.label).join(", ")}. Name who gets them and when.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="evidence-owner"
                className="text-sm font-medium text-foreground"
              >
                Evidence owner
              </label>
              <input
                id="evidence-owner"
                type="text"
                inputMode="text"
                value={state.evidenceOwner}
                onChange={(e) => patch({ evidenceOwner: e.target.value })}
                placeholder="e.g. broker, seller, self"
                className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="evidence-due"
                className="text-sm font-medium text-foreground"
              >
                Due date
              </label>
              <input
                id="evidence-due"
                type="date"
                value={state.evidenceDueDate}
                onChange={(e) => patch({ evidenceDueDate: e.target.value })}
                className="mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </section>
      )}

      <p className="mt-10 flex items-center gap-2">
        <EvidenceChip state="calculated" />
        <span className="text-xs text-muted">
          Outputs are Calculated. Mark each input Verified only when you can point to the source.
        </span>
      </p>
    </ToolShell>
  )
}
