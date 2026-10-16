/**
 * Branded working-paper HTML export for the CrosstownOS interactive tools.
 *
 * Generates a standalone, print-friendly HTML document from a ToolExport:
 * logo, posture banner, inputs with evidence-state labels, outputs with
 * formula lineage, open items, and footer links back into the site.
 *
 * Dependency-free (types only from schema/evidence) so it can be imported
 * in API routes for server-side email attachments as well as in the browser.
 */
import type { ToolExport } from "./schema"

const SITE_URL = "https://www.crosstownosrv.camp"
const LOGO_URL = `${SITE_URL}/logo.jpg`
const ACQUIRE_BLUE = "#00468B"

const STATE_LABELS: Record<string, string> = {
  verified: "Verified",
  "broker-reported": "Broker-reported",
  missing: "Missing evidence",
  assumption: "Underwriting assumption",
  calculated: "Calculated",
  unresolved: "Unresolved",
}

const POSTURE_TITLES: Record<string, string> = {
  walk: "Walk",
  pause: "Pause",
  retrade: "Retrade",
  advance: "Advance",
}

/** Per-state chip colors (hex, print-safe). Mirrors the EVIDENCE_STATES chip
 *  hues from lib/tools/evidence.ts so the working paper matches the live tool. */
const STATE_COLORS: Record<string, string> = {
  verified: "#1c6c31",
  "broker-reported": "#994a00",
  missing: "#ac3031",
  assumption: "#00468B",
  calculated: "#6246a0",
  unresolved: "#6a5f4e",
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function stateLabel(state: string): string {
  return STATE_LABELS[state] ?? state
}

function stateColor(state: string): string {
  return STATE_COLORS[state] ?? "#6a5f4e"
}

function humanValue(value: string | number | null, display?: string): string {
  if (display) return display
  if (value === null || value === undefined || value === "") return "n/a"
  return String(value)
}

/**
 * Build a standalone branded HTML working paper from a tool export.
 * Inline CSS only. Renders on screen and in print.
 */
export function buildWorkingPaperHtml(exp: ToolExport): string {
  const toolUrl = `${SITE_URL}/tools/${esc(exp.tool)}`
  const dateStr = new Date(exp.exportedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const postureTitle = POSTURE_TITLES[exp.posture.label] ?? exp.posture.label

  const inputsHtml = exp.inputs
    .map(
      (input) => `
      <div class="row">
        <div class="row-main">
          <div class="row-label">${esc(input.label)}</div>
          ${input.sourceNote ? `<div class="row-note">Source: ${esc(input.sourceNote)}</div>` : ""}
        </div>
        <div class="row-side">
          <div class="row-value">${esc(humanValue(input.value))}</div>
          <div class="state-tag" style="color: ${stateColor(input.state)}; border-color: ${stateColor(input.state)};">${esc(stateLabel(input.state))}</div>
        </div>
      </div>`,
    )
    .join("")

  const outputsHtml = exp.outputs
    .map(
      (output) => `
      <div class="row">
        <div class="row-main">
          <div class="row-label">${esc(output.label)}</div>
          <div class="row-note">${esc(output.lineage)}</div>
        </div>
        <div class="row-side">
          <div class="row-value">${esc(humanValue(output.value, output.display))}</div>
          <div class="state-tag" style="color: ${stateColor(output.state)}; border-color: ${stateColor(output.state)};">${esc(stateLabel(output.state))}</div>
        </div>
      </div>`,
    )
    .join("")

  const openItemsHtml =
    exp.openItems.length === 0
      ? `<p class="empty">No open items. Every input on this paper is on the record.</p>`
      : exp.openItems
          .map(
            (item) => `
        <div class="row">
          <div class="row-main">
            <div class="row-label">${esc(item.item)}</div>
          </div>
          <div class="row-side">
            ${item.owner ? `<div class="row-note">Owner: ${esc(item.owner)}</div>` : ""}
            ${item.dueDate ? `<div class="row-note">Due: ${esc(item.dueDate)}</div>` : ""}
          </div>
        </div>`,
          )
          .join("")

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(exp.toolName)} - ${esc(exp.dealName)} | CrosstownOS</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #12110e; color: #eee9df; font-family: 'Inter', system-ui, sans-serif; }
  .page { max-width: 720px; margin: 0 auto; padding: 40px 32px; }
  .brandbar { border-top: 4px solid ${ACQUIRE_BLUE}; padding-top: 28px; }
  .masthead { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
  .masthead img { width: 52px; height: 52px; border-radius: 50%; }
  .eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.22em; color: #466b96; margin: 0; }
  h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 30px; font-weight: 700; margin: 8px 0 4px 0; letter-spacing: -0.01em; }
  .meta { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; color: #a29b8e; margin: 0 0 4px 0; }
  .posture { border: 1px solid ${ACQUIRE_BLUE}; background: #1c1a16; padding: 20px; margin: 28px 0; }
  .posture .eyebrow { color: #466b96; }
  .posture h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 8px 0; }
  .posture p { font-size: 14px; line-height: 1.65; margin: 0; color: #eee9df; }
  .posture .fine { font-size: 11px; color: #a29b8e; margin-top: 12px; line-height: 1.5; }
  h3.section { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.22em; color: #466b96; margin: 32px 0 4px 0; padding-bottom: 8px; border-bottom: 1px solid #3a352b; }
  .row { display: flex; justify-content: space-between; gap: 16px; padding: 14px 0; border-bottom: 1px solid #3a352b; }
  .row-main { flex: 1; }
  .row-label { font-size: 14px; font-weight: 500; }
  .row-note { font-size: 12px; color: #a29b8e; margin-top: 4px; line-height: 1.5; }
  .row-side { text-align: right; flex-shrink: 0; }
  .row-value { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 700; }
  .state-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.14em; color: #a66a35; border: 1px solid #a66a35; padding: 3px 8px; margin-top: 6px; }
  .empty { font-size: 13px; color: #a29b8e; }
  .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #3a352b; }
  .footer-links { margin: 0 0 20px 0; }
  .footer-links a { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #466b96; text-decoration: none; margin: 0 16px 8px 0; }
  .sig-name { font-family: 'Playfair Display', Georgia, serif; font-size: 16px; font-weight: 700; margin: 0 0 6px 0; }
  .sig-tag { font-size: 11px; color: #a29b8e; margin: 0 0 14px 0; line-height: 1.5; }
  .sig-line { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #a29b8e; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 3px 0; }
  .brandline { text-align: center; font-family: 'Playfair Display', Georgia, serif; font-size: 14px; margin-top: 28px; color: #a29b8e; }
  @media print {
    * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    body { background: #fff; color: #1a1a1a; }
    .page { max-width: 100%; padding: 0; }
    .brandbar { border-top-color: ${ACQUIRE_BLUE}; }
    .eyebrow, h3.section { color: ${ACQUIRE_BLUE}; }
    .posture { border-color: ${ACQUIRE_BLUE}; background: #f4f7fb; }
    .posture p { color: #1a1a1a; }
    .posture .fine { color: #555; }
    .row { border-bottom-color: #ddd; }
    .row-note, .meta { color: #555; }
    .state-tag { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    .footer-links a { color: ${ACQUIRE_BLUE}; }
    .sig-tag, .sig-line, .empty, .brandline { color: #555; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="brandbar">
    <div class="masthead">
      <img src="${LOGO_URL}" alt="CrosstownOS">
      <div>
        <p class="eyebrow">Live Diligence Working Paper</p>
        <p class="meta">${esc(exp.sourceCode)} &middot; CrosstownOS</p>
      </div>
    </div>
    <h1>${esc(exp.toolName)}</h1>
    <p class="meta">${esc(exp.dealName)} &middot; ${esc(dateStr)}</p>
  </div>

  <div class="posture">
    <p class="eyebrow">Evidence-readiness posture</p>
    <h2>${esc(postureTitle)}</h2>
    <p>${esc(exp.posture.statement)}</p>
    <p class="fine">Calculated from your inputs. Nothing here is verified until you verify it. The human decides.</p>
  </div>

  <h3 class="section">Inputs on the record</h3>
  ${inputsHtml}

  <h3 class="section">Calculated outputs</h3>
  ${outputsHtml}

  <h3 class="section">Open items</h3>
  ${openItemsHtml}

  <div class="footer">
    <div class="footer-links">
      <a href="${toolUrl}">Continue in the live tool</a>
      <a href="${SITE_URL}/tools">All working papers</a>
      <a href="${SITE_URL}/workspace?tool=${esc(exp.tool)}">Acquisition Workspace</a>
    </div>
    <p class="sig-name">CrosstownOS</p>
    <p class="sig-tag">Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.</p>
    <p class="sig-line">Jeremy Cross, Founder</p>
    <p class="sig-line">Acquisition Intelligence | Diligence Software</p>
    <p class="sig-line">Phone: (972) 914-9046</p>
    <p class="sig-line">Email: jeremy@crosstownosrv.camp</p>
    <p class="brandline">Generated by CrosstownOS &middot; ${esc(dateStr)}</p>
  </div>
</div>
</body>
</html>`
}

/** Browser download of the branded working paper as a standalone .html file. */
export function downloadWorkingPaperHtml(exp: ToolExport, filename: string) {
  const blob = new Blob([buildWorkingPaperHtml(exp)], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function workingPaperFilename(tool: string, dealName: string): string {
  const deal = (dealName || "untitled-deal")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return `crosstown-${tool}-${deal}.html`
}
