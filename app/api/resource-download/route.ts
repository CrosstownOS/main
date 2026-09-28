import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { addToAudience, isAudienceConfigured } from '@/lib/resend-audience'
import {
  FROM_ADDRESS,
  INTERNAL_RECIPIENT,
  SITE_URL,
  buildBrandedEmail,
  escapeHtml,
} from '@/lib/email-template'

export const runtime = 'nodejs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ['companyWebsite', 'website', 'url']

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function buildDownloadEmail({
  tool,
  fileUrl,
}: {
  tool: string
  fileUrl: string | null
}): { html: string; text: string } {
  const safeTool = escapeHtml(tool || 'your resource')
  const retryBlock = fileUrl
    ? `<p class="message">If the download didn&apos;t start, <a href="${fileUrl}">get it here</a>.</p>`
    : ''
  const plainRetry = fileUrl ? `\n\nIf the download didn't start, get it here: ${fileUrl}` : ''

  const html = buildBrandedEmail({
    pageTitle: 'Your CrosstownOS download',
    headerTitle: 'Your download is ready.',
    headerSubtitle: 'Your PDF should be downloading now.',
    badge: 'Acquisition Signal Resource',
    bodyHtml: `
      <div class="field">
        <span class="field-label">Your Tool</span>
        <div class="field-value">${safeTool}</div>
      </div>
      ${retryBlock}
      <p class="message">
        One email unlocked the whole library. Browse all 38 tools any time:
        <a href="${SITE_URL}/resources">${SITE_URL}/resources</a>
      </p>
    `,
  })

  const text = [
    'Your download is ready.',
    '',
    `Your tool: ${tool || 'your resource'}`,
    plainRetry,
    '',
    'One email unlocked the whole library. Browse all 38 tools any time:',
    `${SITE_URL}/resources`,
    '',
    '— Jeremy',
    'Jeremy Cross, Founder, CrosstownOS // Acquire',
    'Phone: (972) 914-9046',
    'Email: jeremy@crosstownosrv.camp',
  ].join('\n')

  return { html, text }
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

    const tool = sanitizeText(body.tool, 80)
    const rawFile = sanitizeText(body.file, 300)
    const fileUrl =
      rawFile.startsWith('/resources/') && rawFile.endsWith('.pdf')
        ? `${SITE_URL}${rawFile}`
        : null

    const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Welcome email to the downloader. Best-effort: never blocks the download.
    const { html, text } = buildDownloadEmail({ tool, fileUrl })
    const welcome = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: [INTERNAL_RECIPIENT],
      subject: `Your CrosstownOS download${tool ? `: ${tool}` : ''}`,
      html,
      text,
    })
    if (welcome.error) {
      console.error('Resource download welcome email error:', welcome.error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('resource-download API error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
