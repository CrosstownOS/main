"use client"

import { useState } from "react"

const MONTHLY = 299
const SINGLE = 1299
const ANNUAL = 2999

function Stepper({
 label,
 value,
 setValue,
 min,
 max,
 suffix,
}: {
 label: string
 value: number
 setValue: (n: number) => void
 min: number
 max: number
 suffix: string
}) {
 return (
  <div className="flex items-center justify-between gap-4">
   <span className="text-sm font-medium text-foreground">{label}</span>
   <span className="flex items-center gap-3">
    <button
     type="button"
     aria-label={`Decrease ${label}`}
     onClick={() => setValue(Math.max(min, value - 1))}
     className="h-8 w-8 border border-border font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
    >
     −
    </button>
    <span className="min-w-20 whitespace-nowrap text-center font-mono text-sm text-foreground">
     {value} {suffix}
    </span>
    <button
     type="button"
     aria-label={`Increase ${label}`}
     onClick={() => setValue(Math.min(max, value + 1))}
     className="h-8 w-8 border border-border font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
    >
     +
    </button>
   </span>
  </div>
 )
}

export default function PlanCalculator() {
 const [deals, setDeals] = useState(2)
 const [months, setMonths] = useState(3)

 const totalMonths = Math.min(12, deals * months)
 const monthlyTotal = MONTHLY * totalMonths
 const singleApplies = months <= 3
 const singleTotal = singleApplies ? SINGLE * deals : null
 const annualTotal = ANNUAL

 const options = [
  { name: "Monthly Workspace", total: monthlyTotal, note: `${totalMonths} months at $299` },
  ...(singleTotal !== null
   ? [{ name: "Single-Deal, per deal", total: singleTotal, note: `${deals} × $1,299, report included` }]
   : []),
  { name: "Annual Workspace", total: annualTotal, note: "Unlimited properties, 12 months" },
 ]
 const best = options.reduce((a, b) => (b.total < a.total ? b : a))

 return (
  <div className="theme-cream mt-8 border border-border bg-card p-6 sm:p-8">
   <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
    Run your own year
   </h3>
   <p className="mt-2 text-sm leading-relaxed text-muted">
    Tell it how you actually buy, and it prices the three doors against each
    other. No email required, nothing stored.
   </p>
   <div className="mt-6 grid gap-4 sm:grid-cols-2">
    <Stepper label="Deals you will work this year" value={deals} setValue={setDeals} min={1} max={8} suffix={deals === 1 ? "deal" : "deals"} />
    <Stepper label="Months you spend on each deal" value={months} setValue={setMonths} min={1} max={6} suffix={months === 1 ? "month" : "months"} />
   </div>
   <ul className="mt-6 space-y-3 border-t border-border/60 pt-5">
    {options.map((o) => (
     <li key={o.name} className="flex items-start justify-between gap-4 text-sm">
      <span className="min-w-0 text-foreground/85">
       <span className="font-semibold text-foreground">{o.name}.</span> {o.note}.
       {o.name === best.name ? (
        <span className="ml-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
         Your cheapest door
        </span>
       ) : null}
      </span>
      <span className="whitespace-nowrap font-mono text-sm font-semibold text-foreground">
       ${o.total.toLocaleString()}
      </span>
     </li>
    ))}
   </ul>
   {!singleApplies ? (
    <p className="mt-4 text-xs leading-relaxed text-muted">
     Single-Deal covers 90 days per property, so a deal you work longer than
     three months runs on Monthly or Annual instead.
    </p>
   ) : null}
  </div>
 )
}
