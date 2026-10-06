"use client"

import { useMemo, useState } from "react"
import ToolShell from "@/components/tools/ToolShell"
import { EXPENSE_FAQS } from "@/lib/tools/faqs"
import { EvidenceChip, Field, OutputRow } from "@/components/tools/EvidenceChip"
import { useToolState } from "@/components/tools/useToolState"
import {
  parseNum,
  normalizedNoi,
  managementNormalization,
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

type Category =
  | "Management"
  | "Payroll"
  | "Repairs and maintenance"
  | "Utilities"
  | "Taxes"
  | "Insurance"
  | "Professional"
  | "Other"

const CATEGORIES: Category[] = [
  "Management",
  "Payroll",
  "Repairs and maintenance",
  "Utilities",
  "Taxes",
  "Insurance",
  "Professional",
  "Other",
]

type ExpenseRow = {
  id: string
  label: string
  amount: string
  category: Category
  addBack: boolean
}

type NormalizerState = {
  assetType: "mhp" | "rv"
  revenue: string
  revenueState: EvidenceState
  revenueNote: string
  rows: ExpenseRow[]
  rowsState: EvidenceState
  rowsNote: string
  mgmtRate: string
  applyMgmt: boolean
  sellerNoi: string
  sellerNoiState: EvidenceState
  sellerNoiNote: string
  evidenceOwner: string
  evidenceDueDate: string
}

const BR: EvidenceState = "broker-reported"

const ADD_BACK_SUGGEST = /owner|salary|personal|vehicle|one-time|capital/i

function newRow(): ExpenseRow {
  return {
    id: Math.random().toString(36).slice(2),
    label: "",
    amount: "",
    category: "Other",
    addBack: false,
  }
}

const INITIAL: NormalizerState = {
  assetType: "mhp",
  revenue: "",
  revenueState: BR,
  revenueNote: "",
  rows: [newRow()],
  rowsState: BR,
  rowsNote: "",
  mgmtRate: "8",
  applyMgmt: true,
  sellerNoi: "",
  sellerNoiState: BR,
  sellerNoiNote: "",
  evidenceOwner: "",
  evidenceDueDate: "",
}

const inputClass =
  "mt-1.5 w-full border border-border bg-background px-4 py-2.5 text-base text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
const labelClass = "text-sm font-medium text-foreground"

export default function ExpenseNormalizerTool() {
  const [dealName, setDealName] = useState("")
  const [state, patch, reset] = useToolState<NormalizerState>(
    "expense-normalizer",
    dealName,
    INITIAL,
  )

  const setRow = (id: string, change: Partial<ExpenseRow>) =>
    patch({ rows: state.rows.map((r) => (r.id === id ? { ...r, ...change } : r)) })

  const setRowLabel = (id: string, label: string) => {
    const change: Partial<ExpenseRow> = { label }
    if (ADD_BACK_SUGGEST.test(label)) change.addBack = true
    setRow(id, change)
  }

  const addRow = () => patch({ rows: [...state.rows, newRow()] })
  const removeRow = (id: string) =>
    patch({ rows: state.rows.length > 1 ? state.rows.filter((r) => r.id !== id) : [newRow()] })

  const revenue = parseNum(state.revenue)
  const rate = parseNum(state.mgmtRate)
  const mgmtRateFrac = rate != null ? rate / 100 : null

  const keptRows = useMemo(() => state.rows.filter((r) => !r.addBack), [state.rows])
  const addBackRows = useMemo(() => state.rows.filter((r) => r.addBack), [state.rows])

  const keptSum = useMemo(() => {
    const nums = keptRows.map((r) => parseNum(r.amount)).filter((n): n is number => n != null)
    return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) : null
  }, [keptRows])

  const mgmtNorm =
    state.applyMgmt && mgmtRateFrac != null
      ? managementNormalization(revenue, mgmtRateFrac)
      : null

  const normalizedExpenses =
    keptSum != null || mgmtNorm != null ? (keptSum ?? 0) + (mgmtNorm ?? 0) : null

  const noi = normalizedNoi(revenue, normalizedExpenses)
  const sellerNoi = parseNum(state.sellerNoi)
  const variance = sellerNoi != null && noi != null ? sellerNoi - noi : null
  const variancePct = sellerNoi != null && sellerNoi !== 0 && variance != null ? variance / sellerNoi : null

  const categorySubtotals = useMemo(() => {
    const map = new Map<Category, number>()
    for (const r of keptRows) {
      const n = parseNum(r.amount)
      if (n == null) continue
      map.set(r.category, (map.get(r.category) ?? 0) + n)
    }
    return CATEGORIES.filter((c) => map.has(c)).map((c) => ({
      category: c,
      total: map.get(c) ?? 0,
    }))
  }, [keptRows])

  const posture = useMemo<{ label: ReadinessLabel; statement: string }>(() => {
    if (sellerNoi != null && variance != null && variance > 0.1 * sellerNoi) {
      return {
        label: "retrade",
        statement: `The record supports Retrade: normalized NOI trails the seller's number by ${fmtMoney(
          variance,
        )}. That variance is the retrade.`,
      }
    }
    const hasKeptExpense = keptRows.some((r) => parseNum(r.amount) != null)
    if (revenue == null || !hasKeptExpense) {
      return {
        label: "pause",
        statement:
          "The record supports Pause: revenue is Missing or no kept expense line carries a value. There is no normalized NOI to read yet.",
      }
    }
    return {
      label: "advance",
      statement:
        "The record supports Advance: expenses are restated for the operation you will actually run. Advance means proceed to full diligence, never proceed to buy.",
    }
  }, [sellerNoi, variance, revenue, keptRows])

  const inputs: ExportInput[] = useMemo(() => {
    const list: ExportInput[] = [
      {
        id: "assetType",
        label: "Asset type",
        value: state.assetType === "mhp" ? "MHP" : "RV park",
        state: "assumption",
      },
      {
        id: "revenue",
        label: "T12 revenue (effective gross income)",
        value: revenue,
        state: state.revenueState,
        sourceNote: state.revenueNote || undefined,
      },
      {
        id: "mgmtRate",
        label: "Management normalization rate (%)",
        value: rate,
        state: "assumption",
      },
      {
        id: "applyMgmt",
        label: "Apply normalized management",
        value: state.applyMgmt ? "yes" : "no",
        state: "assumption",
      },
      {
        id: "sellerNoi",
        label: "Seller-stated NOI",
        value: sellerNoi,
        state: state.sellerNoiState,
        sourceNote: state.sellerNoiNote || undefined,
      },
    ]
    state.rows.forEach((r, i) => {
      list.push({
        id: `expenseRow${i + 1}`,
        label: `Expense ${i + 1}: ${r.label || "unlabeled"} (${r.category})${
          r.addBack ? ", add-back" : ""
        }`,
        value: parseNum(r.amount),
        state: state.rowsState,
        sourceNote: state.rowsNote || undefined,
      })
    })
    return list
  }, [revenue, rate, sellerNoi, state])

  const outputs: ExportOutput[] = useMemo(() => {
    const list: ExportOutput[] = [
      {
        id: "normalizedExpenses",
        label: "Normalized expenses",
        value: normalizedExpenses,
        display: fmtMoney(normalizedExpenses),
        state: "calculated",
        lineage: `Kept expense lines${state.applyMgmt ? " plus management normalization" : ""}, from a ${state.revenueState} revenue input`,
      },
      {
        id: "normalizedNoi",
        label: "Normalized NOI",
        value: noi,
        display: fmtMoney(noi),
        state: "calculated",
        lineage: `T12 revenue minus normalized expenses, from a ${state.revenueState} revenue input`,
      },
      {
        id: "noiVariance",
        label: "Seller NOI variance",
        value: variance,
        display: variance == null ? "n/a" : `${fmtMoney(variance)} (${fmtPct(variancePct)})`,
        state: "calculated",
        lineage: `Seller-stated NOI minus normalized NOI, from a ${state.sellerNoiState} input`,
      },
    ]
    for (const s of categorySubtotals) {
      list.push({
        id: `cat-${s.category}`,
        label: `Category: ${s.category}`,
        value: s.total,
        display: fmtMoney(s.total),
        state: "calculated",
        lineage: `Kept expense lines in ${s.category}, from ${state.rowsState} inputs`,
      })
    }
    return list
  }, [normalizedExpenses, noi, variance, variancePct, categorySubtotals, state])

  const openItems = useMemo(() => {
    const items: { item: string; owner?: string; dueDate?: string }[] = []
    if (revenue == null) {
      items.push({
        item: "T12 revenue (effective gross income)",
        owner: state.evidenceOwner || undefined,
        dueDate: state.evidenceDueDate || undefined,
      })
    }
    if (!keptRows.some((r) => parseNum(r.amount) != null)) {
      items.push({
        item: "Expense register (at least one kept expense line with a value)",
        owner: state.evidenceOwner || undefined,
        dueDate: state.evidenceDueDate || undefined,
      })
    }
    return items
  }, [revenue, keptRows, state.evidenceOwner, state.evidenceDueDate])

  const onReset = () => {
    reset()
    setDealName("")
  }

  return (
    <ToolShell
      slug="expense-normalizer"
      sourceCode="AS-08"
      title="Expense Normalizer"
      description="Restate the seller's expenses for the operation you will actually run. Mom-and-pop P&Ls are fiction until normalized."
      timeEstimate="15 minutes"
      inputCount="variable inputs"
      dealName={dealName}
      onDealName={setDealName}
      onReset={onReset}
      getExport={() =>
        buildExport({
          tool: "expense-normalizer",
          toolName: "Expense Normalizer",
          sourceCode: "AS-08",
          dealName,
          inputs,
          outputs,
          posture,
          openItems,
        })
      }
      exportFileName={exportFilename("expense-normalizer", dealName)}
      posture={posture}
      printSummary={
        <>
          <h2 style={{ fontSize: 14, marginBottom: 8 }}>Normalized numbers</h2>
          <ul style={{ fontSize: 12, lineHeight: 1.8 }}>
            <li>Normalized expenses: {fmtMoney(normalizedExpenses)}</li>
            <li>Normalized NOI: {fmtMoney(noi)}</li>
            <li>
              Seller NOI variance:{" "}
              {variance == null ? "n/a" : `${fmtMoney(variance)} (${fmtPct(variancePct)})`}
            </li>
            <li>
              Add-backs excluded: {fmtNum(addBackRows.length)} line(s)
            </li>
            <li>Management normalization: {state.applyMgmt ? `${fmtNum(rate, 2)}%` : "not applied"}</li>
          </ul>
        </>
      }
      ctaTitle="Normalized NOI is where the retrade gets built."
      ctaBody="The Desk builds the whole register this way, line by line, with provenance."
      ctaButton="Work my P&L in the fit call."
      faqs={EXPENSE_FAQS}

      pdfHref="/resources/mom-and-pop-expense-normalizer"
    >
      <section aria-label="Asset type and revenue">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          The operation you will run
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <p className={labelClass}>Asset type</p>
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
              An Underwriting assumption, not a fact about this deal.
            </p>
          </div>
          <Field
            id="t12-revenue"
            label="T12 revenue (effective gross income)"
            value={state.revenue}
            onChange={(v) => patch({ revenue: v })}
            state={state.revenueState}
            onStateChange={(s) => patch({ revenueState: s })}
            sourceNote={state.revenueNote}
            onSourceNote={(n) => patch({ revenueNote: n })}
            placeholder="e.g. 410000"
          />
        </div>
      </section>

      <section aria-label="Expense rows" className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Expense register
          </p>
          <EvidenceChip
            state={state.rowsState}
            onChange={(s) => patch({ rowsState: s })}
            sourceNote={state.rowsNote}
            onSourceNote={(n) => patch({ rowsNote: n })}
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Enter every expense line from the seller&apos;s P&L. Tick Add-back only for costs that
          die with the seller: owner salary, personal vehicles, one-time capital. The suggestion
          is a guess, the call is yours.
        </p>
        <div className="mt-4 space-y-3">
          {state.rows.map((row, i) => {
            const suggested = ADD_BACK_SUGGEST.test(row.label)
            return (
              <div
                key={row.id}
                className={
                  row.addBack
                    ? "border border-border bg-background p-4 opacity-75"
                    : "border border-border bg-background p-4"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Line {i + 1}
                    {suggested && (
                      <span className="ml-2 border border-primary/60 px-1.5 py-0.5 text-primary">
                        Suggested add-back, confirm or reject
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
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="lg:col-span-2">
                    <label className={labelClass} htmlFor={`explabel-${row.id}`}>
                      Label
                    </label>
                    <input
                      id={`explabel-${row.id}`}
                      type="text"
                      inputMode="text"
                      value={row.label}
                      onChange={(e) => setRowLabel(row.id, e.target.value)}
                      placeholder="e.g. Owner salary"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`expamount-${row.id}`}>
                      Amount
                    </label>
                    <input
                      id={`expamount-${row.id}`}
                      type="text"
                      inputMode="decimal"
                      value={row.amount}
                      onChange={(e) => setRow(row.id, { amount: e.target.value })}
                      placeholder="e.g. 45000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor={`expcat-${row.id}`}>
                      Category
                    </label>
                    <select
                      id={`expcat-${row.id}`}
                      value={row.category}
                      onChange={(e) => setRow(row.id, { category: e.target.value as Category })}
                      className={inputClass}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={row.addBack}
                      onChange={(e) => setRow(row.id, { addBack: e.target.checked })}
                      className="h-4 w-4 accent-primary"
                    />
                    Add-back (excluded from normalized expenses)
                  </label>
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
          Add line
        </button>
      </section>

      <section aria-label="Management normalization" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          Management normalization
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="mgmt-rate">
              Normalized management rate (%){" "}
              <span className="text-xs text-muted">Underwriting assumption, adjustable</span>
            </label>
            <input
              id="mgmt-rate"
              type="text"
              inputMode="decimal"
              value={state.mgmtRate}
              onChange={(e) => patch({ mgmtRate: e.target.value })}
              placeholder="8"
              className={inputClass}
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={state.applyMgmt}
                onChange={(e) => patch({ applyMgmt: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Apply normalized management to expenses
            </label>
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted">
          Mom-and-pop sellers run on free family labor. Your operation pays management. The rate
          is your stated assumption, not a market fact.
        </p>
      </section>

      <section aria-label="Seller-stated NOI" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          Seller&apos;s number
        </p>
        <div className="mt-4 max-w-sm">
          <Field
            id="seller-noi"
            label="Seller-stated NOI (optional)"
            value={state.sellerNoi}
            onChange={(v) => patch({ sellerNoi: v })}
            state={state.sellerNoiState}
            onStateChange={(s) => patch({ sellerNoiState: s })}
            sourceNote={state.sellerNoiNote}
            onSourceNote={(n) => patch({ sellerNoiNote: n })}
            placeholder="e.g. 240000"
            hint="The headline number the variance is measured against."
          />
        </div>
      </section>

      <section aria-label="Normalized outputs" className="mt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          The restated operation
        </p>
        <div className="mt-2">
          <OutputRow
            label="Normalized expenses"
            display={fmtMoney(normalizedExpenses)}
            lineage={`Kept expense lines${state.applyMgmt ? " plus management normalization" : ""}`}
          />
          <OutputRow
            label="Normalized NOI"
            display={fmtMoney(noi)}
            lineage="T12 revenue minus normalized expenses"
          />
          <OutputRow
            label="Seller NOI variance"
            display={variance == null ? "n/a" : `${fmtMoney(variance)} (${fmtPct(variancePct)})`}
            lineage="Seller-stated NOI minus normalized NOI"
          />
          {categorySubtotals.map((s) => (
            <OutputRow
              key={s.category}
              label={`Category: ${s.category}`}
              display={fmtMoney(s.total)}
              lineage="Kept expense lines in this category"
            />
          ))}
        </div>
      </section>

      {(revenue == null || !keptRows.some((r) => parseNum(r.amount) != null)) && (
        <section aria-label="Close the gaps" className="mt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            Close the gaps
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Revenue or expense lines are Missing evidence. Name who gets them and when.
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
                placeholder="e.g. seller, broker"
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
