import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { SYSTEM_PROMPT } from '@/lib/site-agent/knowledge'

/**
 * Site Agent endpoint (spec: site-agent-spec-2026-10-18.md).
 *
 * Provider-agnostic by contract: this route speaks the OpenAI-compatible
 * chat completions format to whatever endpoint the environment names.
 * Nothing in the corpus, the component, or the spec depends on a vendor.
 *
 *   SITE_AGENT_API_KEY       required; the endpoint answers 503 without it
 *   SITE_AGENT_API_BASE_URL  default https://api.x.ai/v1
 *   SITE_AGENT_MODEL         default grok-4-1-fast-non-reasoning
 *   SITE_AGENT_TRANSCRIPT_EMAIL  transcript destination override
 *
 * Two payloads:
 *   { messages: [...] }                 a chat turn; the upstream stream
 *                                       is passed through untouched (SSE).
 *   { type: 'transcript', page, flags,  a finished conversation, filed by
 *     messages: [...] }                 email to the Front Door queue
 *                                       (the internal recipient), per spec
 *                                       Section 6: every conversation is
 *                                       filed, full transcript.
 */

const FROM_ADDRESS = 'Crosstown <jeremy@crosstownosrv.camp>'
const TRANSCRIPT_RECIPIENT =
  process.env.SITE_AGENT_TRANSCRIPT_EMAIL || 'jeremy@crosstownosrv.camp'

const API_BASE = (
  process.env.SITE_AGENT_API_BASE_URL || 'https://api.x.ai/v1'
).replace(/\/$/, '')
const MODEL = process.env.SITE_AGENT_MODEL || 'grok-4-1-fast-non-reasoning'

const CHAT_LIMIT = { maxRequests: 20, windowMs: 10 * 60 * 1000 }
const CHAT_DAY_LIMIT = { maxRequests: 300, windowMs: 24 * 60 * 60 * 1000 }
const TRANSCRIPT_LIMIT = { maxRequests: 10, windowMs: 10 * 60 * 1000 }

type ChatMessage = { role: 'user' | 'assistant'; content: string }

function sanitizeMessages(raw: unknown, cap: number): ChatMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > cap) return null
  const out: ChatMessage[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') return null
    const { role, content } = item as Record<string, unknown>
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string' || content.length === 0 || content.length > 4000)
      return null
    out.push({ role, content })
  }
  return out
}

async function handleTranscript(body: Record<string, unknown>) {
  const messages = sanitizeMessages(body.messages, 80)
  if (!messages) {
    return NextResponse.json({ error: 'Invalid transcript.' }, { status: 400 })
  }
  if (!process.env.RESEND_API_KEY) {
    console.error('Site Agent transcript dropped: RESEND_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Transcript service is not configured.' },
      { status: 500 },
    )
  }
  const page = typeof body.page === 'string' ? body.page.slice(0, 300) : 'unknown page'
  const flags = Array.isArray(body.flags)
    ? body.flags.filter((f): f is string => typeof f === 'string').slice(0, 4)
    : []
  const exchanges = messages.filter((m) => m.role === 'user').length
  const lines = messages.map(
    (m) => `${m.role === 'user' ? 'VISITOR' : 'SITE AGENT'}: ${m.content}`,
  )
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: [TRANSCRIPT_RECIPIENT],
    subject: `Site Agent transcript · ${page} · ${exchanges} exchange${exchanges === 1 ? '' : 's'}${flags.length ? ` · ${flags.join(', ')}` : ''}`,
    text: [
      `Page: ${page}`,
      `Filed: ${new Date().toISOString()}`,
      flags.length ? `Flags: ${flags.join(', ')}` : 'Flags: none',
      '',
      ...lines,
    ].join('\n'),
  })
  if (error) {
    console.error('Site Agent transcript send failed', error)
    return NextResponse.json({ error: 'Transcript could not be filed.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}

async function handleChat(body: Record<string, unknown>, request: NextRequest) {
  const messages = sanitizeMessages(body.messages, 24)
  if (!messages || messages[messages.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'Invalid message history.' }, { status: 400 })
  }
  const apiKey = process.env.SITE_AGENT_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'agent_unavailable' }, { status: 503 })
  }
  const ip = getClientIp(request)
  for (const limit of [CHAT_LIMIT, CHAT_DAY_LIMIT]) {
    const result = checkRateLimit(
      `agent-chat:${limit.windowMs}:${ip}`,
      limit.maxRequests,
      limit.windowMs,
    )
    if (!result.allowed) {
      return NextResponse.json(
        { error: 'rate_limited' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil(result.resetIn / 1000)) },
        },
      )
    }
  }

  let upstream: Response
  try {
    upstream = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.2,
        max_tokens: 800,
        stream: true,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    })
  } catch {
    return NextResponse.json({ error: 'agent_upstream' }, { status: 502 })
  }
  if (!upstream.ok || !upstream.body) {
    console.error('Site Agent upstream error', upstream.status)
    return NextResponse.json({ error: 'agent_upstream' }, { status: 502 })
  }
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
    },
  })
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    try {
      body = JSON.parse(await request.text()) as Record<string, unknown>
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 })
    }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
  }
  if (JSON.stringify(body).length > 120_000) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 })
  }

  const ip = getClientIp(request)
  if (body.type === 'transcript') {
    const limit = checkRateLimit(
      `agent-transcript:${ip}`,
      TRANSCRIPT_LIMIT.maxRequests,
      TRANSCRIPT_LIMIT.windowMs,
    )
    if (!limit.allowed) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
    }
    return handleTranscript(body)
  }
  return handleChat(body, request)
}
