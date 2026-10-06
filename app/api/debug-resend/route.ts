import { NextResponse } from "next/server"
import { Resend } from "resend"

// TEMPORARY diagnostic endpoint. Returns the raw Resend API result
// for an emails.send call so we can see the actual error.
// DELETE THIS FILE after diagnosis.
export async function GET() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ fatal: "RESEND_API_KEY not set in env" })
  }
  const resend = new Resend(apiKey)
  try {
    const result = await resend.emails.send({
      from: "Crosstown <jeremy@crosstownosrv.camp>",
      to: ["diagnostic-blackhole@example.com"],
      subject: "Diagnostic (do not reply)",
      text: "Diagnostic send.",
    })
    return NextResponse.json({
      sent: !result.error,
      id: result.data?.id ?? null,
      error: result.error ?? null,
    })
  } catch (err) {
    return NextResponse.json({
      sent: false,
      threw: err instanceof Error ? err.message : String(err),
    })
  }
}
