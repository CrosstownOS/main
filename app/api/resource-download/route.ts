import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { addToAudience } from '@/lib/resend-audience'

export const runtime = 'nodejs'

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
    // Required gate: the download only proceeds when the contact lands.
    const saved = await addToAudience(resend, 'resources', email)
    if (!saved) {
      return NextResponse.json(
        { error: 'We could not save your email. Please try again.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('resource-download API error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
