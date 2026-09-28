import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { addToAudience, isAudienceConfigured } from '@/lib/resend-audience'

export const runtime = 'nodejs'

const FROM_ADDRESS = 'Crosstown <jeremy@crosstownosrv.camp>'
const INTERNAL_RECIPIENT = 'jeremy@crosstownosrv.camp'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ['companyWebsite', 'website', 'url']

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 },
      )
    }

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 })
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }

    const hasHoneypotValue = HONEYPOT_FIELDS.some(
      (field) => sanitizeText(body[field], 500).length > 0,
    )
    if (hasHoneypotValue) {
      return NextResponse.json({ error: 'Request could not be processed.' }, { status: 400 })
    }

    const email = sanitizeText(body.email, 254).toLowerCase()
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const tool = sanitizeText(body.tool, 80)

    if (isAudienceConfigured('resources')) {
      // Required gate: the download only proceeds when the contact lands.
      const saved = await addToAudience(resend, 'resources', email)
      if (!saved) {
        return NextResponse.json(
          { error: 'We could not save your email. Please try again.' },
          { status: 500 },
        )
      }
    } else {
      // Audience not wired yet: collect via notification email so the
      // download never breaks. Switches to the audience automatically
      // once the ID is configured.
      const { error } = await resend.emails.send({
        from: FROM_ADDRESS,
        to: [INTERNAL_RECIPIENT],
        replyTo: [email],
        subject: `Resource download: ${tool || 'library'} — ${email}`,
        text: `Email: ${email}\nTool: ${tool || 'unknown'}\nTime: ${new Date().toISOString()}\n\nNote: the Resources Resend audience is not configured yet; this download was collected by email.`,
      })
      if (error) {
        console.error('Resource download notification error:', error)
        return NextResponse.json(
          { error: 'We could not save your email. Please try again.' },
          { status: 500 },
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('resource-download API error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
