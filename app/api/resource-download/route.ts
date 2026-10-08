import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIp, FORM_RATE_LIMIT, DOWNLOAD_RATE_LIMIT } from '@/lib/rate-limit'
import { Resend } from 'resend'
import { addToSegment } from '@/lib/resend-segments'
import {
  FROM_ADDRESS,
  INTERNAL_RECIPIENT,
  SITE_URL,
  STANDARD_EMAIL_BLOCK,
  WALKTHROUGH_EMAIL_BLOCK,
  buildBrandedEmail,
  escapeHtml,
  renderEmailBlocksHtml,
  renderEmailBlocksText,
  type EmailDestinationBlock,
} from '@/lib/email-template'
import {
  RESOURCE_DETAILS,
  type ResourceDetail,
} from '@/lib/resources'
import { getPost } from '@/lib/blog'

export const runtime = 'nodejs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ['companyWebsite', 'website', 'url']

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

const RELATED_FIELD_NOTE_BY_RESOURCE_SLUG: Record<string, string> = {
  'broker-package-intake-sheet': 'anatomy-of-a-broker-package',
  'mom-and-pop-expense-normalizer': 'read-the-pl-like-the-other-side-wrote-it',
  'the-rv-expense-normalizer': 'read-the-pl-like-the-other-side-wrote-it',
  'utility-and-wastewater-diligence-sheet': 'the-utility-system-nobody-underwrote',
  'the-rent-roll-truth-check': 'the-rent-roll-is-a-claim-not-income-verification',
  'rent-roll-truth-check-rv-edition':
    'the-rent-roll-is-a-claim-not-income-verification',
  'the-evidence-status-standard': 'before-you-underwrite-establish-what-is-true',
}

const CATALOG_EMAIL_BLOCK: EmailDestinationBlock = {
  eyebrow: 'THE CATALOG',
  title: 'Browse all 35 tools',
  description:
    'All 35 Acquisition Signal tools, organized by the seven Parts of the deal journey.',
  href: `${SITE_URL}/resources/catalog`,
  buttonLabel: 'Browse the catalog',
}

/** Resources with a live working-paper version. Maps resource slug to tool slug + name. */
const LIVE_TOOL_BY_RESOURCE_SLUG: Record<string, { toolSlug: string; toolName: string }> = {
  '60-second-deal-screener': { toolSlug: '60-second-screener', toolName: '60-Second Deal Screener' },
  'the-rent-roll-truth-check': { toolSlug: 'rent-roll-truth-check', toolName: 'Rent-Roll Truth Check' },
  'rent-roll-truth-check-rv-edition': { toolSlug: 'rent-roll-truth-check', toolName: 'Rent-Roll Truth Check' },
  'mom-and-pop-expense-normalizer': { toolSlug: 'expense-normalizer', toolName: 'Expense Normalizer' },
  'the-rv-expense-normalizer': { toolSlug: 'expense-normalizer', toolName: 'Expense Normalizer' },
  'utility-and-wastewater-diligence-sheet': { toolSlug: 'utility-capacity-triage', toolName: 'Utility Capacity Risk Triage' },
  'the-emd-countdown-tracker': { toolSlug: 'emd-clock', toolName: 'EMD Clock and Gate Tracker' },
  'poh-toh-split-valuation-worksheet': { toolSlug: 'poh-toh-split', toolName: 'POH/TOH Split Valuation' },
}

function resourceDisplayName(resource: ResourceDetail): string {
  return resource.code ? `${resource.code} ${resource.title}` : resource.title
}

function resourceEmailBlocks(
  resource: ResourceDetail | null,
): EmailDestinationBlock[] {
  if (!resource) return [CATALOG_EMAIL_BLOCK]

  const blocks: EmailDestinationBlock[] = [
    {
      eyebrow: resource.code
        ? `${resource.code} / PART ${resource.part}`
        : 'SPINE',
      title: resource.title,
      description: resource.description,
      href: `${SITE_URL}/resources/${resource.slug}`,
      buttonLabel: 'Open the resource page',
    },
  ]

  const fieldNoteSlug = RELATED_FIELD_NOTE_BY_RESOURCE_SLUG[resource.slug]
  const fieldNote = fieldNoteSlug ? getPost(fieldNoteSlug) : null
  if (fieldNote) {
    blocks.push({
      eyebrow: 'FIELD NOTE',
      title: fieldNote.title,
      description: fieldNote.excerpt,
      href: `${SITE_URL}/blog/${fieldNote.slug}`,
      buttonLabel: 'Read the Field Note',
    })
  }

  const liveTool = LIVE_TOOL_BY_RESOURCE_SLUG[resource.slug]
  if (liveTool) {
    blocks.push({
      eyebrow: 'RUN IT LIVE',
      title: `Run the ${liveTool.toolName} in your browser`,
      description:
        'The PDF is the paper version. The working paper runs the math live, labels every number with its evidence state, and exports your work. Free to use, no account.',
      href: `${SITE_URL}/tools/${liveTool.toolSlug}`,
      buttonLabel: 'Open the live tool',
    })
  }

  let parkProofBlock: EmailDestinationBlock | null = null
  if (resource.slug === 'the-evidence-status-standard' || resource.part === 'F') {
    parkProofBlock = STANDARD_EMAIL_BLOCK
  } else if (resource.part === 'D' || resource.part === 'E') {
    parkProofBlock = WALKTHROUGH_EMAIL_BLOCK
  }

  if (parkProofBlock) {
    blocks.push(parkProofBlock)
  } else if (!fieldNote) {
    blocks.push(CATALOG_EMAIL_BLOCK)
  }

  return blocks.slice(0, 3)
}

function buildDownloadEmail({
  tool,
  fileUrl,
  resource,
}: {
  tool: string
  fileUrl: string | null
  resource: ResourceDetail | null
}): { html: string; text: string } {
  const blocks = resourceEmailBlocks(resource)
  const retryBlock = fileUrl
    ? `<p class="message">If the download didn&apos;t start, <a href="${fileUrl}">get it here</a>.</p>`
    : ''
  const unresolvedTool = resource
    ? ''
    : `<div class="field">
        <span class="field-label">Your Tool</span>
        <div class="field-value">${escapeHtml(tool || 'your resource')}</div>
      </div>`

  const html = buildBrandedEmail({
    pageTitle: 'Your CrosstownOS download',
    headerTitle: 'Your download is ready.',
    headerSubtitle: 'Your PDF should be downloading now.',
    badge: 'Acquisition Signal Resource',
    bodyHtml: `
      ${retryBlock}
      ${unresolvedTool}
      ${renderEmailBlocksHtml(blocks, 'dark')}
    `,
  })

  const textLines = [
    'Your download is ready.',
    '',
  ]

  if (fileUrl) {
    textLines.push(`If the download didn't start, get it here: ${fileUrl}`, '')
  }

  if (!resource) {
    textLines.push(`Your tool: ${tool || 'your resource'}`, '')
  }

  textLines.push(
    ...renderEmailBlocksText(blocks),
    'CrosstownOS',
    'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.',
    'Phone: (972) 914-9046',
    'Email: jeremy@crosstownosrv.camp',
  )

  return { html, text: textLines.join('\n') }
}

export async function POST(request: NextRequest) {
  // Rate limit: 10 downloads per 10 minutes per IP
  const clientIp = getClientIp(request)
  const rateLimit = checkRateLimit(
    `download:${clientIp}`,
    DOWNLOAD_RATE_LIMIT.maxRequests,
    DOWNLOAD_RATE_LIMIT.windowMs,
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
    const resource =
      RESOURCE_DETAILS.find((candidate) => candidate.file === rawFile) ?? null
    const emailToolLabel = resource ? resourceDisplayName(resource) : tool
    const fileUrl =
      rawFile.startsWith('/resources/') && rawFile.endsWith('.pdf')
        ? `${SITE_URL}${rawFile}`
        : null

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Required gate: the download only proceeds when the contact lands in
    // the Acquisition Signal Resources segment.
    const saved = await addToSegment(resend, 'acquisitionResources', email)
    if (!saved) {
      return NextResponse.json(
        { error: 'We could not save your email. Please try again.' },
        { status: 500 },
      )
    }

    // Welcome email to the downloader. Best-effort: never blocks the download.
    const { html, text } = buildDownloadEmail({
      tool: emailToolLabel,
      fileUrl,
      resource,
    })
    const welcome = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: [INTERNAL_RECIPIENT],
      subject: `Your CrosstownOS download${emailToolLabel ? `: ${emailToolLabel}` : ''}`,
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
