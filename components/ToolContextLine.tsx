"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const TOOL_NAMES: Record<string, string> = {
  "60-second-screener": "60-Second Deal Screener",
  "poh-toh-split": "POH/TOH Split Valuation",
  "rent-roll-truth-check": "Rent-Roll Truth Check",
  "expense-normalizer": "Expense Normalizer",
  "utility-capacity-triage": "Utility Capacity Risk Triage",
  "emd-clock": "EMD Clock and Gate Tracker",
}

function ToolContextInner() {
  const params = useSearchParams()
  const tool = params.get("tool")
  const name = tool ? TOOL_NAMES[tool] : null
  if (!name || !tool) return null
  return (
    <div className="theme-cream mt-6 border border-primary/40 bg-primary/5 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        You came from the {name}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
        Bring your exported numbers to the fit call. The Workspace starts from your
        working paper, not a blank intake.{" "}
        <Link href={`/tools/${tool}`} className="text-primary hover:underline">
          Back to the paper
        </Link>
      </p>
    </div>
  )
}

export default function ToolContextLine() {
  return (
    <Suspense fallback={null}>
      <ToolContextInner />
    </Suspense>
  )
}
