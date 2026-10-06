import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { addToSegment } from "@/lib/resend-segments"

export const runtime = "nodejs"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ["companyWebsite", "website", "url"]

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

/**
 * Email gate for tool save/export. Free to use; email only asked on save.
 * Reuses the acquisitionResources segment (Resend free tier caps at 3 segments).
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
    console.log(`tool-save: ${email} saved working paper (${tool || "unknown tool"})`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("tool-save error:", err)
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 })
  }
}
