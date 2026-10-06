"use client"

import { useMemo, useState } from "react"
import ToolShell from "@/components/tools/ToolShell"
import { RENT_ROLL_FAQS } from "@/lib/tools/faqs"
import { EvidenceChip, Field, OutputRow } from "@/components/tools/EvidenceChip"
import { useToolState } from "@/components/tools/useToolState"
import {
  parseNum,
  depositDerivedOccupancy,
  occupancyVariance,
  decideRentRollPosture,
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

type RentRow = {
  id: string
  unit: string
  tenant: string
  rent: string
  balance: string
  daysOverdue: string
  poh: boolean
}

type RentRollState = {
  rows: RentRow[]
  rowsState: EvidenceState
  rowsNote: string
  deposits: string[]
  depositsState: EvidenceState
  depositsNote: string
  reportedOccupancy: string
  reportedOccupancyState: EvidenceState
  reportedOccupancyNote: string
  evidenceOwner: string
  evidenceDueDate: string
}

const BR: EvidenceState = "broker-reported"

function newRow(): RentRow {
  return {
    id: Math.random().toString(36).slice(2),
    unit: "",
    tenant: "",
    rent: "",
    balance: "",
    daysOverdue: "",
    poh: false,
  }
}

const INITIAL: RentRollState = {
  rows: [newRow()],
  rowsState: BR,
  rowsNote: "",
  deposits: Array(12).fill(""),
  depositsState: BR,
  depositsNote: "",
  reportedOccupancy: "",
  reportedOccupancyState: BR,
  reportedOccupancyNote: "",
  evidenceOwner: "",
  evidenceDueDate: "",
}

const inputClass =
  "mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
const labelClass = "text-sm font-medium text-foreground"

export default function RentRollTool() {
  const [dealName, setDealName] = useState("")
  const [state, patch, reset] = useToolState<RentRollState>(
    "rent-roll-truth-check",
    dealName,
    INITIAL,
  )

  const setRow = (id: string, change: Partial<RentRow>) =>
    patch({ rows: state.rows.map((r) => (r.id === id ? { ...r, ...change } : r)) })

  const addRow = () => patch({ rows: [...state.rows, newRow()] })
  const removeRow = (id: string) =>
    patch({ rows: state.rows.length > 1 ? state.rows.filter((r) => r.id !== id) : [newRow()] })

  const rowRent = (r: RentRow) => parseNum(r.rent)
  const rents = state.rows.map(rowRent)
  const totalRentMonthly = rents.reduce<number | null>(
    (acc, n) => (n == null ? acc : (acc ?? 0) + n),
    null,
  )
  const pohRent = state.rows.reduce<number | null>(
    (acc, r) => {
      const n = rowRent(r)
      if (n == null || !r.poh) return acc
      return (acc ?? 0) + n
    },
    null,
  )
  const lotRent =
    totalRentMonthly != null && pohRent != null
      ? totalRentMonthly - pohRent
      : totalRentMonthly != null && pohRent == null
        ? totalRentMonthly
        : null

  const delinquentRows = state.rows.filter((r) => {
    const d = parseNum(r.daysOverdue)
    return d != null && d > 60
  })
  const delinquentCount = delinquentRows.length
  const hasRentRows = state.rows.some(
    (r) => r.unit.trim() || r.tenant.trim() || r.rent.trim() || r.balance.trim() || r.daysOverdue.trim(),
  )
  const delinquencyDisplay = hasRentRows ? fmtNum(delinquentCount) : "n/a"

  const parsedDeposits = useMemo(
    () => state.deposits.map((d) => parseNum(d)),
    [state.deposits],
  )
  const { occupancy: derived, monthsUsed } = useMemo(
    () => depositDerivedOccupancy(parsedDeposits, totalRentMonthly),
    [parsedDeposits, totalRentMonthly],
  )

  const reported = parseNum(state.reportedOccupancy)
  const variance = occupancyVariance(
    reported != null ? reported / 100 : null,
    derived,
  )
  const variancePoints = variance != null ? variance * 100 : null

  const missingMonths = 12 - monthsUsed

  const posture = useMemo<{ label: ReadinessLabel; statement: string }>(
    () => decideRentRollPosture({ reported, variancePoints, monthsUsed, derived }),
    [reported, variancePoints, monthsUsed, derived],
  )

  const inputs: ExportInput[] = useMemo(() => {
    const list: ExportInput[] = [
      {
        id: "reportedOccupancy",
        label: "Reported occupancy (%)",
        value: reported,
        state: reported == null ? "missing" : state.reportedOccupancyState,
        sourceNote: state.reportedOccupancyNote || undefined,
      },
    ]
    state.deposits.forEach((d, i) => {
      list.push({
        id: `depositMonth${i + 1}`,
        label: `Deposit month ${i + 1}`,
        value: parsedDeposits[i],
        state: parsedDeposits[i] == null ? "missing" : state.depositsState,
        sourceNote: state.depositsNote || undefined,
      })
    })
    state.rows.forEach((r, i) => {
      const rent = rowRent(r)
      list.push({
        id: `rentRow${i + 1}`,
        label: `Rent roll row ${i + 1}: ${r.unit || "unit"} / ${r.tenant || "tenant"}`,
        value: rent,
        state: rent == null ? "missing" : state.rowsState,
        sourceNote: state.rowsNote || undefined,
      })
    })
    return list
  }, [reported, state, parsedDeposits])

  const outputs: ExportOutput[] = useMemo(
    () => [
      {
        id: "derivedOccupancy",
        label: "Deposit-derived occupancy",
        value: derived,
        display: fmtPct(derived),
        state: "calculated",
        lineage: `Trailing monthly deposits / gross potential monthly rent, averaged over ${monthsUsed} month(s), from ${state.depositsState} inputs`,
      },
      {
        id: "variance",
        label: "Reported vs derived variance",
        value: variancePoints,
        display: variancePoints == null ? "n/a" : `${fmtNum(variancePoints, 1)} pts`,
        state: "calculated",
        lineage: `Reported occupancy minus deposit-derived occupancy, from a ${state.reportedOccupancyState} input`,
      },
      {
        id: "delinquency",
        label: "Units over 60 days overdue",
        value: hasRentRows ? delinquentCount : null,
        display: delinquencyDisplay,
        state: "calculated",
        lineage: `Rent roll rows with days overdue above 60, from ${state.rowsState} inputs`,
      },
      {
        id: "pohRent",
        label: "POH rent subtotal (monthly)",
        value: pohRent,
        display: fmtMoney(pohRent),
        state: "calculated",
        lineage: `Sum of monthly rent on park-owned-home rows, from ${state.rowsState} inputs`,
      },
      {
        id: "lotRent",
        label: "Lot rent subtotal (monthly)",
        value: lotRent,
        display: fmtMoney(lotRent),
        state: "calculated",
        lineage: `Total monthly rent minus POH rent, from ${state.rowsState} inputs`,
      },
      {
        id: "gprMonthly",
        label: "Gross potential monthly rent",
        value: totalRentMonthly,
        display: fmtMoney(totalRentMonthly),
        state: "calculated",
        lineage: `Sum of monthly rent across all rows, from ${state.rowsState} inputs`,
      },
    ],
    [derived, monthsUsed, variancePoints, delinquentCount, delinquencyDisplay, hasRentRows, pohRent, lotRent, totalRentMonthly, state],
  )

  const openItems = useMemo(() => {
    const items: { item: string; owner?: string; dueDate?: string }[] = []
    if (missingMonths > 0) {
      items.push({
        item: `Deposit statements for ${missingMonths} missing month(s)`,
        owner: state.evidenceOwner || undefined,
        dueDate: state.evidenceDueDate || undefined,
      })
    }
    if (reported == null) {
      items.push({
        item: "Reported occupancy from the OM",
        owner: state.evidenceOwner || undefined,
        dueDate: state.evidenceDueDate || undefined,
      })
    }
    return items
  }, [missingMonths, reported, state.evidenceOwner, state.evidenceDueDate])

  const getExport = () =>
    buildExport({
      tool: "rent-roll-truth-check",
      toolName: "Rent-Roll Truth Check",
      sourceCode: "AS-15",
      dealName,
      inputs,
      outputs,
      posture,
      openItems,
    })

  const onReset = () => {
    reset()
    setDealName("")
  }

  return (
    <ToolShell
      slug="rent-roll-truth-check"
      sourceCode="AS-15"
      title="Rent-Roll Truth Check"
      description="Rebuild reported occupancy from deposits. The rent roll is a claim. Deposits are the verification."
      timeEstimate="10 minutes"
      inputCount="3 sections"
      dealName={dealName}
      onDealName={setDealName}
      onReset={onReset}
      getExport={getExport}
      exportFileName={exportFilename("rent-roll-truth-check", dealName)}
      posture={posture}
      printSummary={
        <>
          <h2 style={{ fontSize: 14, marginBottom: 8 }}>Truth-check numbers</h2>
          <ul style={{ fontSize: 12, lineHeight: 1.8 }}>
            <li>Deposit-derived occupancy: {fmtPct(derived)} ({monthsUsed} months used)</li>
            <li>
              Reported vs derived variance:{" "}
              {variancePoints == null ? "n/a" : `${fmtNum(variancePoints, 1)} pts`}
            </li>
            <li>Units over 60 days overdue: {delinquencyDisplay}</li>
            <li>POH rent subtotal: {fmtMoney(pohRent)} / Lot rent subtotal: {fmtMoney(lotRent)}</li>
            <li>Gross potential monthly rent: {fmtMoney(totalRentMonthly)}</li>
            {missingMonths > 0 && <li>Missing deposit months: {missingMonths}</li>}
          </ul>
        </>
      }
      ctaTitle="The deposits do not match the OM."
      ctaBody="That gap is a retrade or a walk. The Desk runs this reconciliation with provenance on every document."
      ctaButton="Bring my rent roll to the fit call."
      faqs={RENT_ROLL_FAQS}

      pdfHref="/resources/the-rent-roll-truth-check"
    >
      <section aria-label="Rent roll rows">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            (a) Rent roll rows
          </p>
          <EvidenceChip
            state={state.rowsState}
            onChange={(s) => patch({ rowsState: s })}
            sourceNote={state.rowsNote}
            onSourceNote={(n) => patch({ rowsNote: n })}
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          One row per unit or site. Check POH when the park owns the home, not just the lot.
        </p>
        <div className="mt-4 space-y-3">
          {state.rows.map((row, i) => {
            const overdue = parseNum(row.daysOverdue)
            const flagged = overdue != null && overdue > 60
            return (
              <div
                key={row.id}
                className={
                  flagged
                    ? "border border-critical/60 bg-critical/5 p-4"
                    : "border border-border bg-background p-4"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Unit {i + 1}
                    {flagged && (
                      <span className="ml-2 border border-critical/60 px-1.5 py-0.5 text-critical">
                        Over 60 days
                      </span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-critical"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className={labelClass} htmlFor={`unit-${row.id}`}>
                      Unit / site
                    </label>
                    <input
                      id={`unit-${row.id}`}
                      type="text"
                      inputMode="text"
                      value={row.unit}
                      onChange={(e) => setRow(row.id, { unit: e.target.value })}
                      placeholder="e.g. 12A"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`tenant-${row.id}`}>
                      Tenant
                    </label>
                    <input
                      id={`tenant-${row.id}`}
                      type="text"
                      inputMode="text"
                      value={row.tenant}
                      onChange={(e) => setRow(row.id, { tenant: e.target.value })}
                      placeholder="e.g. J. Miller"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`rent-${row.id}`}>
                      Monthly rent
                    </label>
                    <input
                      id={`rent-${row.id}`}
                      type="text"
                      inputMode="decimal"
                      value={row.rent}
                      onChange={(e) => setRow(row.id, { rent: e.target.value })}
                      placeholder="e.g. 425"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`balance-${row.id}`}>
                      Balance owed
                    </label>
                    <input
                      id={`balance-${row.id}`}
                      type="text"
                      inputMode="decimal"
                      value={row.balance}
                      onChange={(e) => setRow(row.id, { balance: e.target.value })}
                      placeholder="e.g. 850"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`overdue-${row.id}`}>
                      Days overdue
                    </label>
                    <input
                      id={`overdue-${row.id}`}
                      type="text"
                      inputMode="numeric"
                      value={row.daysOverdue}
                      onChange={(e) => setRow(row.id, { daysOverdue: e.target.value })}
                      placeholder="e.g. 0"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={row.poh}
                        onChange={(e) => setRow(row.id, { poh: e.target.checked })}
                        className="h-4 w-4 accent-primary"
                      />
                      Park-owned home
                    </label>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-3 border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-primary hover:text-primary"
        >
          Add row
        </button>
      </section>

      <section aria-label="Trailing deposit months" className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            (b) Trailing monthly deposit totals
          </p>
          <EvidenceChip
            state={state.depositsState}
            onChange={(s) => patch({ depositsState: s })}
            sourceNote={state.depositsNote}
            onSourceNote={(n) => patch({ depositsNote: n })}
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Twelve months of bank deposits, most recent first. Blank is fine; blank months are
          Missing evidence, never zero.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {state.deposits.map((d, i) => (
            <div key={i}>
              <label className={labelClass} htmlFor={`deposit-${i}`}>
                Month {i + 1}
              </label>
              <input
                id={`deposit-${i}`}
                type="text"
                inputMode="decimal"
                value={d}
                onChange={(e) =>
                  patch({
                    deposits: state.deposits.map((v, j) => (j === i ? e.target.value : v)),
                  })
                }
                placeholder="e.g. 28500"
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Reported occupancy" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          (c) Reported occupancy
        </p>
        <div className="mt-4 max-w-sm">
          <Field
            id="reported-occupancy"
            label="Reported occupancy (%) from the OM"
            value={state.reportedOccupancy}
            onChange={(v) => patch({ reportedOccupancy: v })}
            state={state.reportedOccupancyState}
            onStateChange={(s) => patch({ reportedOccupancyState: s })}
            sourceNote={state.reportedOccupancyNote}
            onSourceNote={(n) => patch({ reportedOccupancyNote: n })}
            placeholder="e.g. 96"
          />
        </div>
      </section>

      <section aria-label="Truth-check outputs" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          What the deposits say
        </p>
        <div className="mt-2">
          <OutputRow
            label="Deposit-derived occupancy"
            display={fmtPct(derived)}
            lineage={`Trailing deposits / gross potential monthly rent, averaged over ${monthsUsed} month(s)`}
          />
          <OutputRow
            label="Reported vs derived variance"
            display={variancePoints == null ? "n/a" : `${fmtNum(variancePoints, 1)} pts`}
            lineage="Reported occupancy minus deposit-derived occupancy"
          />
          <OutputRow
            label="Units over 60 days overdue"
            display={delinquencyDisplay}
            lineage="Rent roll rows with days overdue above 60"
          />
          <OutputRow
            label="POH rent subtotal (monthly)"
            display={fmtMoney(pohRent)}
            lineage="Sum of monthly rent on park-owned-home rows"
          />
          <OutputRow
            label="Lot rent subtotal (monthly)"
            display={fmtMoney(lotRent)}
            lineage="Total monthly rent minus POH rent"
          />
          <OutputRow
            label="Gross potential monthly rent"
            display={fmtMoney(totalRentMonthly)}
            lineage="Sum of monthly rent across all rows"
          />
        </div>
      </section>

      {missingMonths > 0 && (
        <section aria-label="Request missing statements" className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Close the gaps
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {missingMonths} of 12 deposit months are Missing evidence. Name who gets the statements
            and when.
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="evidence-owner" className={labelClass}>
                Evidence owner
              </label>
              <input
                id="evidence-owner"
                type="text"
                inputMode="text"
                value={state.evidenceOwner}
                onChange={(e) => patch({ evidenceOwner: e.target.value })}
                placeholder="e.g. seller, bank, broker"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="evidence-due" className={labelClass}>
                Due date
              </label>
              <input
                id="evidence-due"
                type="date"
                value={state.evidenceDueDate}
                onChange={(e) => patch({ evidenceDueDate: e.target.value })}
                className={inputClass}
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
