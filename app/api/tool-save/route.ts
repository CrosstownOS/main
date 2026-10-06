import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { addToSegment } from "@/lib/resend-segments"
import { FROM_ADDRESS, INTERNAL_RECIPIENT, SITE_URL } from "@/lib/email-template"

export const runtime = "nodejs"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ["companyWebsite", "website", "url"]
const MAX_PAYLOAD_BYTES = 500_000

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Email gate for tool save/export. Free to use; email only asked on save.
 * The working paper JSON is emailed to the user as an attachment, and the
 * email is captured in the acquisitionResources segment (Resend free tier
 * caps at 3 segments).
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
    const tool = sanitizeText(body.tool, 120)
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 })
    }
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 500 })
    }
    const resend = new Resend(apiKey)
    await addToSegment(resend, "acquisitionResources", email)

    const toolLabel = tool || "working paper"
    const payloadJson = JSON.stringify(body.payload ?? { tool: toolLabel }, null, 2)
    if (Buffer.byteLength(payloadJson, "utf8") > MAX_PAYLOAD_BYTES) {
      return NextResponse.json({ error: "Working paper is too large to email." }, { status: 413 })
    }
    const filename = `crosstown-${toolLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}.json`

    const { error: sendError } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: [INTERNAL_RECIPIENT],
      subject: `Your CrosstownOS working paper: ${toolLabel}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <p style="font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #1D4ED8;">CrosstownOS working paper</p>
          <h1 style="font-size: 24px;">Your ${escapeHtml(toolLabel)} is attached.</h1>
          <p style="font-size: 14px; line-height: 1.6;">This JSON file is your working paper: inputs, evidence states, calculated outputs, posture, and open items in one record. Bring it to the <a href="${SITE_URL}/deal-desk" style="color: #1D4ED8;">Founding Deal Desk fit call</a> and start with a working session, not a cold conversation.</p>
          <p style="font-size: 12px; color: #666;">Your numbers stayed in your browser until you sent them. Nothing else was kept.</p>
        </div>
      `,
      text: [
        `Your ${toolLabel} is attached as JSON.`,
        "",
        "This file is your working paper: inputs, evidence states, calculated outputs, posture, and open items in one record.",
        `Bring it to the Founding Deal Desk fit call: ${SITE_URL}/deal-desk`,
        "",
        "Your numbers stayed in your browser until you sent them. Nothing else was kept.",
      ].join("\n"),
      attachments: [
        {
          filename,
          content: Buffer.from(payloadJson, "utf8"),
        },
      ],
    })
    if (sendError) {
      console.error("tool-save email send error:", sendError)
      return NextResponse.json(
        { error: "We could not send the working paper. Please try again." },
        { status: 500 },
      )
    }

    console.log(`tool-save: ${email} saved working paper (${toolLabel})`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("tool-save error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
