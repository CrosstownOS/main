/**
 * Shared JSON export schema for the CrosstownOS interactive tools.
 * Every tool exports this shape so all six feed one ParkProof decision file assembler.
 */
import type { EvidenceState, ReadinessLabel } from "./evidence"

export const TOOL_EXPORT_SCHEMA = "crosstown.tools.v1" as const

export type ExportInput = {
  id: string
  label: string
  /** Raw value as entered. Numbers stay numbers; text stays text. */
  value: string | number | null
  state: EvidenceState
  /** Source note attached when the user marks an input Verified. */
  sourceNote?: string
}

export type ExportOutput = {
  id: string
  label: string
  value: string | number | null
  /** Human-readable display string, e.g. "7.2%". */
  display: string
  state: EvidenceState
  /** Formula lineage, e.g. "T12 NOI / asking price, from broker-reported inputs". */
  lineage: string
}

export type ExportOpenItem = {
  item: string
  owner?: string
  dueDate?: string
}

export type ToolExport = {
  schema: typeof TOOL_EXPORT_SCHEMA
  /** Tool slug, e.g. "60-second-screener". */
  tool: string
  toolName: string
  /** Source Acquisition Signal code, e.g. "AS-02". */
  sourceCode: string
  dealName: string
  exportedAt: string
  inputs: ExportInput[]
  outputs: ExportOutput[]
  posture: {
    label: ReadinessLabel
    /** Doctrine-style statement, e.g. "The record supports Walk: ...". */
    statement: string
  }
  openItems: ExportOpenItem[]
}

export function buildExport(args: {
  tool: string
  toolName: string
  sourceCode: string
  dealName: string
  inputs: ExportInput[]
  outputs: ExportOutput[]
  posture: { label: ReadinessLabel; statement: string }
  openItems?: ExportOpenItem[]
}): ToolExport {
  return {
    schema: TOOL_EXPORT_SCHEMA,
    tool: args.tool,
    toolName: args.toolName,
    sourceCode: args.sourceCode,
    dealName: args.dealName || "Untitled deal",
    exportedAt: new Date().toISOString(),
    inputs: args.inputs,
    outputs: args.outputs,
    posture: args.posture,
    openItems: args.openItems ?? [],
  }
}

export function downloadJson(payload: ToolExport, filename: string) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function exportFilename(tool: string, dealName: string): string {
  const deal = (dealName || "untitled-deal")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return `crosstown-${tool}-${deal}.json`
}
