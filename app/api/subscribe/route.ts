import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { addToSegment } from '@/lib/resend-segments'
import {
  TRAIL_LOG_EMAIL_BLOCK,
  WALKTHROUGH_EMAIL_BLOCK,
  renderEmailBlocksHtml,
  renderEmailBlocksText,
  type EmailDestinationBlock,
} from '@/lib/email-template'
import { checkRateLimit, getClientIp, FORM_RATE_LIMIT, DOWNLOAD_RATE_LIMIT } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const FROM_ADDRESS = 'Crosstown <jeremy@crosstownosrv.camp>'
const INTERNAL_RECIPIENT = 'jeremy@crosstownosrv.camp'
const LOGO_URL = 'https://www.crosstownosrv.camp/logo.jpg'
const MAX_BODY_SIZE = 5_000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ['companyWebsite', 'website', 'url', 'faxNumber']

const EMAIL_COLORS = {
  background: '#12110e',
  card: '#1c1a16',
  foreground: '#eee9df',
  muted: '#a29b8e',
  border: '#3a352b',
  primary: '#466b96',
  accent: '#a66a35',
}

const START_HERE_EMAIL_BLOCK: EmailDestinationBlock = {
  eyebrow: 'START HERE',
  title: 'Start Here',
  description: 'How the 35 tools fit together. Read this before you print anything.',
  href: 'https://www.crosstownosrv.camp/resources/start-here',
  buttonLabel: 'Start Here',
}

const SIGNATURE_BLOCK = `
<div class="signature-block" style="margin-top:28px; padding-top:24px; border-top:1px solid ${EMAIL_COLORS.border}; border-radius:0;">
  <p style="font-family:'Playfair Display', Georgia, serif; font-size:16px; color:${EMAIL_COLORS.foreground}; margin:0 0 6px 0; font-weight:700; letter-spacing:-0.01em;">
    CrosstownOS
  </p>
  <p style="font-family:'Inter', sans-serif; font-size:11px; color:${EMAIL_COLORS.muted}; margin:0 0 18px 0; line-height:1.5;">
    Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.
  </p>
  <p style="font-family:'JetBrains Mono', monospace; font-size:10px; color:${EMAIL_COLORS.muted}; margin:0 0 3px 0; text-transform:uppercase; letter-spacing:0.15em;">
    Phone: (972) 914-9046
  </p>
  <p style="font-family:'JetBrains Mono', monospace; font-size:10px; color:${EMAIL_COLORS.muted}; margin:0; text-transform:uppercase; letter-spacing:0.15em;">
    Email: jeremy@crosstownosrv.camp
  </p>
</div>
`

const EMAIL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: ${EMAIL_COLORS.background};
    font-family: 'Inter', system-ui, sans-serif;
    color: ${EMAIL_COLORS.foreground};
  }

  .container {
    max-width: 640px;
    margin: 0 auto;
    background-color: ${EMAIL_COLORS.card};
    border: 1px solid ${EMAIL_COLORS.border};
    border-radius: 0;
  }

  .header {
    padding: 40px 32px;
    border-bottom: 1px solid ${EMAIL_COLORS.border};
    text-align: center;
    border-radius: 0;
  }

  .logo {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    border-radius: 50%;
  }

  .header h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 25px;
    font-weight: 700;
    color: ${EMAIL_COLORS.foreground};
    margin: 0 0 10px 0;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .header p {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: ${EMAIL_COLORS.muted};
    margin: 0;
    line-height: 1.5;
  }

  .content {
    padding: 32px;
  }

  .badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: ${EMAIL_COLORS.primary};
    border: 1px solid ${EMAIL_COLORS.primary};
    padding: 5px 12px;
    margin-bottom: 24px;
    border-radius: 0;
  }

  .field {
    margin-bottom: 18px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${EMAIL_COLORS.border};
  }

  .field-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: ${EMAIL_COLORS.muted};
    margin-bottom: 6px;
    display: block;
  }

  .field-value {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${EMAIL_COLORS.foreground};
    font-weight: 500;
    line-height: 1.55;
    overflow-wrap: anywhere;
  }

  .metadata {
    margin-top: 28px;
    border: 1px solid ${EMAIL_COLORS.border};
    border-left: 3px solid ${EMAIL_COLORS.accent};
    padding: 18px;
    background: ${EMAIL_COLORS.background};
  }

  .metadata .field:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }

  .message {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${EMAIL_COLORS.foreground};
    line-height: 1.65;
    margin: 20px 0 0 0;
  }

  .note {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: ${EMAIL_COLORS.muted};
    line-height: 1.6;
    margin: 20px 0 0 0;
  }

  .divider {
    height: 1px;
    background: ${EMAIL_COLORS.border};
    margin: 30px 0;
  }

  .footer {
    padding: 28px 32px;
    text-align: center;
    border-top: 1px solid ${EMAIL_COLORS.border};
    border-radius: 0;
  }

  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: ${EMAIL_COLORS.foreground};
    margin-bottom: 4px;
  }

  .footer-location {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: ${EMAIL_COLORS.muted};
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .signature-block {
    border-radius: 0;
  }
`

function sanitizeText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return ''

  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_PATTERN.test(value)
}

function hasConsent(value: unknown) {
  return value === true || value === 'true' || value === 'on' || value === 'yes' || value === '1'
}

function renderMetadata({
  email,
  sourcePage,
  timestamp,
  consentState,
}: {
  email: string
  sourcePage: string
  timestamp: string
  consentState: string
}) {
  const rows = [
    ['Subscribed email', email],
    ['Submitted at', timestamp],
    ['Source form', 'Footer Crosstown Updates subscription'],
    ['Source page', sourcePage || 'Crosstown single-page site'],
    ['Privacy consent', consentState],
  ]

  return `
    <div class="metadata">
      ${rows
        .map(
          ([label, value]) => `
          <div class="field">
            <span class="field-label">${escapeHtml(label)}</span>
            <div class="field-value">${escapeHtml(value)}</div>
          </div>
          `,
        )
        .join('')}
    </div>
  `
}

const TOOL_NAMES_BY_SLUG: Record<string, string> = {
  '60-second-screener': '60-Second Deal Screener',
  'rent-roll-truth-check': 'Rent-Roll Truth Check',
  'expense-normalizer': 'Expense Normalizer',
  'utility-capacity-triage': 'Utility Capacity Risk Triage',
  'emd-clock': 'EMD Clock and Gate Tracker',
  'poh-toh-split': 'POH/TOH Split Valuation',
}

/**
 * Pick contextual destination blocks based on where the signup came from.
 * A signup on a tool page leads with that tool; a resource page leads with
 * the resource; everything else gets the default set.
 */
function subscribeBlocksFor(sourcePage: string): EmailDestinationBlock[] {
  const page = (sourcePage || '').toLowerCase()

  const toolMatch = page.match(/\/tools\/([a-z0-9-]+)/)
  if (toolMatch) {
    const slug = toolMatch[1]
    const name = TOOL_NAMES_BY_SLUG[slug]
    if (name) {
      return [
        {
          eyebrow: 'CONTINUE WHERE YOU LEFT OFF',
          title: `Back to the ${name}`,
          description: 'Your numbers are still in your browser. Pick up right where you left off.',
          href: `https://www.crosstownosrv.camp/tools/${slug}`,
          buttonLabel: 'Open the live tool',
        },
        START_HERE_EMAIL_BLOCK,
        TRAIL_LOG_EMAIL_BLOCK,
      ]
    }
  }

  const resourceMatch = page.match(/\/resources\/([a-z0-9-]+)/)
  if (resourceMatch && !page.includes('/resources/catalog')) {
    const slug = resourceMatch[1]
    return [
      {
        eyebrow: 'CONTINUE WHERE YOU LEFT OFF',
        title: 'Back to the resource library',
        description: 'All 35 Acquisition Signal tools, organized by the seven Parts of the deal journey.',
        href: `https://www.crosstownosrv.camp/resources/${slug}`,
        buttonLabel: 'Open the resource',
      },
      START_HERE_EMAIL_BLOCK,
      TRAIL_LOG_EMAIL_BLOCK,
    ]
  }

  return [WALKTHROUGH_EMAIL_BLOCK, START_HERE_EMAIL_BLOCK, TRAIL_LOG_EMAIL_BLOCK]
}

function generateSubscribeTemplate(email: string, sourcePage: string) {
  const safeEmail = escapeHtml(email)
  const blocks = subscribeBlocksFor(sourcePage)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Crosstown Updates</title>
  <style>${EMAIL_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="Crosstown" class="logo" style="border-radius:50%;" />
      <h1>Subscribed.</h1>
      <p>You are now following Crosstown Updates.</p>
    </div>

    <div class="content">
      <div class="badge">Crosstown Updates</div>

      <div class="field">
        <span class="field-label">Subscribed Email</span>
        <div class="field-value">${safeEmail}</div>
      </div>

      <p class="message">
        You will receive occasional build notes, diligence patterns, and acquisition-workflow updates. No noise.
      </p>

      ${renderEmailBlocksHtml(blocks, 'dark',)}

      <div class="divider"></div>
      ${SIGNATURE_BLOCK}
    </div>

    <div class="footer">
      <div class="footer-brand">CrosstownOS</div>
    </div>
  </div>
</body>
</html>
  `
}

function generateAdminNotificationTemplate({
  email,
  sourcePage,
  timestamp,
  consentState,
}: {
  email: string
  sourcePage: string
  timestamp: string
  consentState: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Crosstown Updates Subscriber</title>
  <style>${EMAIL_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="Crosstown" class="logo" style="border-radius:50%;" />
      <h1>New Crosstown Updates Subscriber</h1>
      <p>A new email has joined the Crosstown Updates list.</p>
    </div>

    <div class="content">
      <div class="badge">Admin Notification</div>
      ${renderMetadata({ email, sourcePage, timestamp, consentState })}
      <div class="divider"></div>
      ${SIGNATURE_BLOCK}
    </div>

    <div class="footer">
      <div class="footer-brand">CrosstownOS</div>
    </div>
  </div>
</body>
</html>
  `
}

function generatePlainText({
  email,
  sourcePage,
  timestamp,
  consentState,
  admin = false,
}: {
  email: string
  sourcePage: string
  timestamp: string
  consentState: string
  admin?: boolean
}) {
  if (!admin) {
    return [
      'Subscribed.',
      '',
      'You are now following Crosstown Updates.',
      `Subscribed email: ${email}`,
      '',
      'You will receive occasional build notes, diligence patterns, and acquisition-workflow updates. No noise.',
      '',
      ...renderEmailBlocksText(subscribeBlocksFor(sourcePage)),
      'CrosstownOS',
      'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.',
      'Phone: (972) 914-9046',
      'Email: jeremy@crosstownosrv.camp',
    ].join('\n')
  }

  return [
    'New Crosstown Updates Subscriber',
    '',
    `Subscribed email: ${email}`,
    `Submitted at: ${timestamp}`,
    'Source form: Footer Crosstown Updates subscription',
    `Source page: ${sourcePage || 'Crosstown single-page site'}`,
    `Privacy consent: ${consentState}`,
    '',
    'CrosstownOS',
    'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.',
    'Phone: (972) 914-9046',
    'Email: jeremy@crosstownosrv.camp',
  ].join('\n')
}

export async function POST(request: NextRequest) {
  // Rate limit: 5 submissions per 10 minutes per IP
  const clientIp = getClientIp(request)
  const rateLimit = checkRateLimit(
    `form:${clientIp}`,
    FORM_RATE_LIMIT.maxRequests,
    FORM_RATE_LIMIT.windowMs,
  )
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)) } },
    )
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 },
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    let body: Record<string, unknown>

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request body.' },
        { status: 400 },
      )
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid subscription payload.' },
        { status: 400 },
      )
    }

    if (JSON.stringify(body).length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Subscription request is too large.' },
        { status: 413 },
      )
    }

    const hasHoneypotValue = HONEYPOT_FIELDS.some(
      (field) => sanitizeText(body[field], 500).length > 0,
    )

    if (hasHoneypotValue) {
      return NextResponse.json(
        { error: 'Subscription could not be processed.' },
        { status: 400 },
      )
    }

    if ('consent' in body && !hasConsent(body.consent)) {
      return NextResponse.json(
        { error: 'Privacy notice acknowledgement is required.' },
        { status: 400 },
      )
    }

    const email = sanitizeText(body.email, 254).toLowerCase()

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email is required.' },
        { status: 400 },
      )
    }

    const timestamp = new Date().toISOString()
    const sourcePage =
      sanitizeText(body.sourcePage, 500) ||
      sanitizeText(request.headers.get('referer'), 500) ||
      'Crosstown single-page site'
    const consentState =
      'consent' in body
        ? hasConsent(body.consent)
          ? 'Acknowledged'
          : 'Not acknowledged'
        : 'Not collected by footer form'

    const subscriberEmail = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: [INTERNAL_RECIPIENT],
      subject: 'Welcome to Crosstown Updates',
      html: generateSubscribeTemplate(email, sourcePage),
      text: generatePlainText({ email, sourcePage, timestamp, consentState }),
    })

    if (subscriberEmail.error) {
      console.error('Resend subscriber confirmation error:', subscriberEmail.error)
      return NextResponse.json(
        { error: 'We could not complete the subscription. Please try again.' },
        { status: 500 },
      )
    }

    const adminEmail = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [INTERNAL_RECIPIENT],
      replyTo: [email],
      subject: `New Crosstown Updates Subscriber: ${email}`,
      html: generateAdminNotificationTemplate({ email, sourcePage, timestamp, consentState }),
      text: generatePlainText({ email, sourcePage, timestamp, consentState, admin: true }),
    })

    if (adminEmail.error) {
      console.error('Resend admin notification error:', adminEmail.error)
      return NextResponse.json(
        { error: 'We could not complete the subscription. Please try again.' },
        { status: 500 },
      )
    }

    // Best-effort: land the contact in the Crosstown Updates segment.
    // Never blocks the subscription: the emails above are the critical path.
    await addToSegment(resend, 'updates', email)

    return NextResponse.json({
      success: true,
      message: 'You are subscribed to Crosstown Updates.',
      id: subscriberEmail.data?.id,
    })
  } catch (error) {
    console.error('Subscribe API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    )
  }
}