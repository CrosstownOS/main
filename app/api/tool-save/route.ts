import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { addToSegment } from "@/lib/resend-segments"
import {
  FROM_ADDRESS,
  INTERNAL_RECIPIENT,
  SITE_URL,
  buildBrandedEmail,
  escapeHtml,
  renderEmailBlocksHtml,
} from "@/lib/email-template"
import { buildWorkingPaperHtml } from "@/lib/tools/workingPaper"
import type { ToolExport } from "@/lib/tools/schema"

export const runtime = "nodejs"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ["companyWebsite", "website", "url"]
const MAX_PAYLOAD_BYTES = 500_000

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

function sanitizeSlug(value: unknown): string {
  if (typeof value !== "string") return ""
  const slug = value.trim().toLowerCase().slice(0, 80)
  return /^[a-z0-9-]+$/.test(slug) ? slug : ""
}

/** Map tool slug to its matching PDF resource page slug. */
const RESOURCE_BY_TOOL_SLUG: Record<string, string> = {
  "60-second-screener": "60-second-deal-screener",
  "rent-roll-truth-check": "the-rent-roll-truth-check",
  "expense-normalizer": "mom-and-pop-expense-normalizer",
  "utility-capacity-triage": "utility-and-wastewater-diligence-sheet",
  "emd-clock": "the-emd-countdown-tracker",
  "poh-toh-split": "poh-toh-split-valuation-worksheet",
}

function isToolExport(value: unknown): value is ToolExport {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    typeof v.toolName === "string" &&
    typeof v.sourceCode === "string" &&
    Array.isArray(v.inputs) &&
    Array.isArray(v.outputs) &&
    typeof v.posture === "object"
  )
}

function htmlFilename(toolLabel: string): string {
  const slug = toolLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  return `crosstown-${slug || "working-paper"}.html`
}

/**
 * Email gate for tool save/export. Free to use; email only asked on save.
 * The branded working paper HTML is emailed as an attachment, and the
 * address is captured in the acquisitionResources segment.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    for (const field of HONEYPOT_FIELDS) {
      if (sanitizeText(body[field], 200)) {
        return NextResponse.json({ ok: true })
      }
    }
    const email = sanitizeText(body.email, 200).toLowerCase()
    const toolLabel = sanitizeText(body.tool, 120) || "working paper"
    const toolSlug = sanitizeSlug(body.toolSlug)
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
    }
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
    }

    const payload: ToolExport | null = isToolExport(body.payload)
      ? (body.payload as ToolExport)
      : null

    const resend = new Resend(apiKey)
    await addToSegment(resend, "acquisitionResources", email)

    const toolUrl = toolSlug ? `${SITE_URL}/tools/${toolSlug}` : `${SITE_URL}/tools`
    const resourceSlug = toolSlug ? RESOURCE_BY_TOOL_SLUG[toolSlug] : undefined
    const dealDeskUrl = toolSlug ? `${SITE_URL}/deal-desk?tool=${toolSlug}` : `${SITE_URL}/deal-desk`

    let attachment: { filename: string; content: Buffer } | null = null
    if (payload) {
      const paperHtml = buildWorkingPaperHtml(payload)
      if (Buffer.byteLength(paperHtml, "utf8") > MAX_PAYLOAD_BYTES) {
        return NextResponse.json({ error: "Working paper is too large to email." }, { status: 413 })
      }
      attachment = {
        filename: htmlFilename(toolLabel),
        content: Buffer.from(paperHtml, "utf8"),
      }
    }

    const blocks = [
      ...(toolSlug
        ? [
            {
              eyebrow: "CONTINUE WORKING",
              title: `Continue the ${toolLabel}`,
              description:
                "Your numbers are still in your browser. Pick up right where you left off.",
              href: toolUrl,
              buttonLabel: "Open the live tool",
            },
          ]
        : []),
      ...(resourceSlug
        ? [
            {
              eyebrow: "THE PDF WORKSHEET",
              title: "Get the PDF worksheet",
              description: "The paper version of this working paper, for print and pencil.",
              href: `${SITE_URL}/resources/${resourceSlug}`,
              buttonLabel: "Get the PDF",
            },
          ]
        : []),
      {
        eyebrow: "THE NEXT STEP",
        title: "Bring this to the Founding Deal Desk",
        description:
          "A working session that starts from your numbers, not a cold conversation.",
        href: dealDeskUrl,
        buttonLabel: "Book the fit call",
      },
    ]

    const html = buildBrandedEmail({
      pageTitle: `Your CrosstownOS working paper: ${toolLabel}`,
      headerTitle: "Your working paper is attached.",
      headerSubtitle: `${toolLabel}: inputs, evidence states, calculated outputs, posture, and open items in one record.`,
      badge: "Live Diligence Working Paper",
      bodyHtml: `
        <p class="message">
          This is your working paper, branded and ready to keep. Your numbers stayed in your
          browser until you sent them. Nothing else was kept.
        </p>
        ${renderEmailBlocksHtml(blocks, "dark")}
      `,
    })

    const textLines = [
      `Your ${toolLabel} is attached.`,
      "",
      "Inputs, evidence states, calculated outputs, posture, and open items in one record.",
      "Your numbers stayed in your browser until you sent them. Nothing else was kept.",
      "",
      ...blocks.flatMap((b) => [b.eyebrow, b.title, b.description, b.href, ""]),
      "CrosstownOS",
      "Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.",
      "Phone: (972) 914-9046",
      "Email: jeremy@crosstownosrv.camp",
    ]

    const { error: sendError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: [INTERNAL_RECIPIENT],
      subject: `Your CrosstownOS working paper: ${toolLabel}`,
      html,
      text: textLines.join("\n"),
      ...(attachment ? { attachments: [attachment] } : {}),
    })
    if (sendError) {
      console.error("tool-save email send error:", sendError)
      return NextResponse.json(
        { error: "We could not send the working paper. Please try again." },
        { status: 500 },
      )
    }

    console.log(`tool-save: ${email} saved working paper (${escapeHtml(toolLabel)})`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("tool-save error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
