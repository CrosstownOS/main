import type { Metadata } from "next"
import ExpenseNormalizerTool from "./ExpenseNormalizerTool"

export const metadata: Metadata = {
  title: "Expense Normalizer | CrosstownOS Working Papers",
  description:
    "Restate the seller's expenses for the operation you will actually run. Mom-and-pop P&Ls are fiction until normalized.",
}

export default function ExpenseNormalizerPage() {
  return <ExpenseNormalizerTool />
}
