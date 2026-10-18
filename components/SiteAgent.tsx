"use client"

import Image from "next/image"
import Link from "next/link"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import { ArrowRight, MessageSquare, X } from "lucide-react"
import { AGENT_DISPLAY_NAME, GOVERNED } from "@/lib/site-agent/knowledge"
import { EVIDENCE_STATES } from "@/lib/tools/evidence"
import {
  EvidenceStateChip,
  evidenceStateKey,
} from "@/components/evidence/EvidenceStateChip"

/**
 * Hitch, the Site Agent.
 * Spec: engineering/site-agent-spec-2026-10-18.md.
 *
 * Design system: this panel is a site surface, built entirely from the
 * site's own precedents. Cream scope (.theme-cream, the decided scope
 * for "working surfaces: sections, bands, modals"), panel framing from
 * SuccessPopup (border-primary/40, bg-card, shadow-2xl), the logo mark
 * and serif wordmark from the nav and SuccessPopup header, form fields
 * from DealDeskForm, the success pattern from SuccessState, and the
 * evidence chips from components/evidence (the one chip system).
 *
 * Mounted in app/layout.tsx as a direct child of body, outside
 * template.tsx, like QuietCta: a transformed ancestor would break the
 * fixed positioning. Rendered on every page except the suppressed
 * paths below (mirrors the QuietCta convention).
 */

const SUPPRESSED_PREFIXES = ["/workspace", "/privacy", "/terms"]

type ChatMessage = { role: "user" | "assistant"; content: string }
type Flags = { escalated?: boolean; gap?: boolean }

const OFFERS: {
  label: string
  sub: string
  prompt?: string
  action?: "human"
}[] = [
  {
    label: "The product",
    sub: "What CrosstownOS is, in one breath",
    prompt: "What is CrosstownOS?",
  },
  {
    label: "The ParkProof Standard",
    sub: "How every fact in the record gets graded",
    prompt: "What is the ParkProof Standard?",
  },
  {
    label: "Pricing and the pilot",
    sub: "Public pricing, five free pilot places",
    prompt: "What does it cost, and how does the pilot work?",
  },
  { label: "Talk to Jeremy", sub: "File it with the desk", action: "human" },
]

const STATE_TITLES = Object.values(EVIDENCE_STATES).map((s) => s.title)

/** Inline rendering: **bold** and [label](/path) links, site link style. */
function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const key = `${keyBase}-${i}`
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) {
      return (
        <strong key={key} className="font-semibold text-foreground">
          {bold[1]}
        </strong>
      )
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link && link[2].startsWith("/")) {
      return (
        <Link
          key={key}
          href={link[2]}
          className="font-medium text-primary underline underline-offset-2 hover:no-underline"
        >
          {link[1]}
        </Link>
      )
    }
    return <span key={key}>{part}</span>
  })
}

/**
 * Assistant message rendering, branded: a trailing "Record: /path" line
 * becomes the FROM THE RECORD footer; a line opening with an evidence
 * state title renders the site's own EvidenceStateChip.
 */
function renderAssistant(content: string, keyBase: string): ReactNode {
  const lines = content.split("\n")
  let recordPath: string | null = null
  const lastIdx = lines.length - 1
  const recordMatch = lines[lastIdx]?.match(/^Record:\s*(\/\S*)$/)
  if (recordMatch) {
    recordPath = recordMatch[1]
    lines.pop()
  }
  const blocks: ReactNode[] = []
  lines.forEach((line, i) => {
    const key = `${keyBase}-l${i}`
    if (!line.trim()) return
    const stateTitle = STATE_TITLES.find((t) => line.startsWith(`${t}:`))
    if (stateTitle) {
      blocks.push(
        <p key={key} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <EvidenceStateChip state={evidenceStateKey(stateTitle)} />
          <span>{renderInline(line.slice(stateTitle.length + 1).trim(), key)}</span>
        </p>,
      )
      return
    }
    blocks.push(<p key={key}>{renderInline(line, key)}</p>)
  })
  return (
    <>
      <div className="space-y-2">{blocks}</div>
      {recordPath ? (
        <p className="mt-3 flex items-center gap-2 border-t border-border/70 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          From the record
          <Link
            href={recordPath}
            className="font-semibold text-primary underline underline-offset-2 hover:no-underline"
          >
            {recordPath}
          </Link>
        </p>
      ) : null}
    </>
  )
}

export default function SiteAgent() {
  const [pathname, setPathname] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [formError, setFormError] = useState("")
  const [sending, setSending] = useState(false)
  const [note, setNote] = useState("")

  const flagsRef = useRef<Flags>({})
  const filedRef = useRef(false)
  const pageRef = useRef("/")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPathname(window.location.pathname)
    pageRef.current = window.location.pathname
  }, [])

  const suppressed =
    pathname !== null &&
    SUPPRESSED_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    )

  const fileTranscript = useCallback(() => {
    if (filedRef.current) return
    const hasUser = messages.some((m) => m.role === "user")
    if (!hasUser) return
    filedRef.current = true
    void fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "transcript",
        page: pageRef.current,
        flags: flagsRef.current,
        messages,
      }),
      keepalive: true,
    }).catch(() => {})
  }, [messages])

  useEffect(() => {
    const onHide = () => fileTranscript()
    window.addEventListener("pagehide", onHide)
    return () => window.removeEventListener("pagehide", onHide)
  }, [fileTranscript])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, open, showForm, submitted])

  useEffect(() => {
    if (open && window.innerWidth >= 768) inputRef.current?.focus()
  }, [open ])

  if (pathname === null || suppressed) return null

  const closePanel = () => {
    fileTranscript()
    setOpen(false)
  }

  const openHumanForm = () => {
    flagsRef.current.escalated = true
    setShowForm(true)
  }

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim()
    if (!text || busy) return
    setInput("")
    setNote("")
    const history: ChatMessage[] = [...messages, { role: "user", content: text }]
    setMessages([...history, { role: "assistant", content: "" }])
    setBusy(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        setMessages(history)
        if (res.status === 429) {
          setNote(
            "That is the top of what this chat can take for now. Jeremy can still take it from here.",
          )
        } else if (data?.error === "agent_unavailable") {
          setNote(
            "The agent is not answering just yet. Jeremy can take your question from here.",
          )
        } else {
          setNote("Something failed on our side. Jeremy can take it from here.")
        }
        setShowForm(true)
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let acc = ""
      const visible = () =>
        acc
          .replace(/\[\[(ESCALATE|GAP)\]\]/g, "")
          .replace(/\n{0,2}\[\[(ESCALATE|GAP)?$/, "")
          .trim()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const chunks = buffer.split("\n\n")
        buffer = chunks.pop() ?? ""
        for (const chunk of chunks) {
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data:")) continue
            const payload = line.slice(5).trim()
            if (payload === "[DONE]") continue
            try {
              const json = JSON.parse(payload) as {
                choices?: { delta?: { content?: string } }[]
              }
              const delta = json.choices?.[0]?.delta?.content
              if (delta) {
                acc += delta
                setMessages([
                  ...history,
                  { role: "assistant", content: visible() },
                ])
              }
            } catch {
              /* partial frame, wait for more */
            }
          }
        }
      }
      if (acc.includes("[[ESCALATE]]")) openHumanForm()
      if (acc.includes("[[GAP]]")) flagsRef.current.gap = true
      setMessages([...history, { role: "assistant", content: visible() }])
    } catch {
      setMessages(history)
      setNote("Something failed on our side. Jeremy can take it from here.")
      setShowForm(true)
    } finally {
      setBusy(false)
    }
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (sending) return
    const fd = new FormData(event.currentTarget)
    const get = (k: string) => String(fd.get(k) ?? "").trim()
    const required: [string, string][] = [
      ["name", "Name"],
      ["email", "Email"],
      ["company", "Company"],
      ["role", "Your role"],
      ["goal", "What are you trying to do"],
    ]
    for (const [key, label] of required) {
      if (!get(key)) {
        setFormError(`Missing required field: ${label}`)
        return
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) {
      setFormError("A valid email is required.")
      return
    }
    if (fd.get("consent") !== "on") {
      setFormError("Privacy notice acknowledgement is required.")
      return
    }
    const context = `[Sent from the Site Agent on ${pageRef.current}]`
    setSending(true)
    setFormError("")
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "not_sure",
          consent: true,
          name: get("name"),
          email: get("email"),
          company: get("company"),
          role: get("role"),
          goal: `${get("goal")}\n\n${context}`,
          sourcePage: window.location.href,
        }),
      })
      const data = (await res.json().catch(() => null)) as {
        success?: boolean
        error?: string
        message?: string
      } | null
      if (res.ok && data?.success) {
        setSuccessMessage(data.message || "")
        setSubmitted(true)
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: GOVERNED.escalationFiled },
        ])
        setTimeout(() => fileTranscript(), 50)
      } else {
        setFormError(
          data?.error || "We could not file that. Please try again.",
        )
      }
    } catch {
      setFormError("Network error. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const fieldClasses =
    "w-full border border-border/60 bg-background/50 px-3 py-3 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
  const labelClasses =
    "mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted"

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${AGENT_DISPLAY_NAME}`}
          className="theme-cream fixed bottom-20 right-4 z-40 flex items-center gap-2.5 border border-primary/40 bg-card py-2 pl-2 pr-4 shadow-2xl transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:bottom-24 md:right-6"
        >
          <span className="relative h-7 w-7 flex-none overflow-hidden [clip-path:circle(50%)]">
            <Image
              src="/logo.jpg"
              alt=""
              fill
              sizes="28px"
              className="object-cover"
            />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
            {AGENT_DISPLAY_NAME}
          </span>
          <MessageSquare className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </button>
      ) : null}

      {open ? (
        <section
          role="dialog"
          aria-modal="false"
          aria-label={`${AGENT_DISPLAY_NAME} conversation`}
          className="theme-cream fixed inset-x-3 bottom-3 z-40 flex h-[min(640px,84vh)] flex-col border border-primary/40 bg-card shadow-2xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[400px]"
        >
          <header className="border-b border-border bg-background px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative h-10 w-10 flex-none overflow-hidden [clip-path:circle(50%)]">
                  <Image
                    src="/logo.jpg"
                    alt="CrosstownOS"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold leading-tight tracking-tight text-foreground">
                    CrosstownOS
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    {AGENT_DISPLAY_NAME}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label={`Close ${AGENT_DISPLAY_NAME}`}
                className="flex h-10 w-10 flex-none items-center justify-center border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4">
            {showForm ? (
              submitted ? (
                <div className="border border-primary/40 bg-background/60 p-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Filed to the record
                  </p>
                  <p className="mt-2 font-serif text-xl font-semibold tracking-tight text-foreground">
                    Jeremy has it from here.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {successMessage || GOVERNED.escalationFiled}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                    This conversation is attached to it
                  </p>
                  <Link
                    href="/parkproof-walkthrough"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary underline underline-offset-2 hover:no-underline"
                  >
                    See a ParkProof decision record
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Handoff
                  </p>
                  <p className="mt-2 font-serif text-xl font-semibold tracking-tight text-foreground">
                    Talk to Jeremy.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {GOVERNED.escalation}{" "}
                    {pageRef.current === "/"
                      ? "You are filing from the homepage."
                      : `You are filing from ${pageRef.current}.`}
                  </p>

                  {formError || note ? (
                    <div
                      role="alert"
                      className="mt-4 border border-accent/60 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-foreground"
                    >
                      {formError || note}
                    </div>
                  ) : null}

                  <form onSubmit={submitForm} noValidate className="mt-5 grid gap-4">
                    <div>
                      <label htmlFor="sa-name" className={labelClasses}>
                        Name
                        <span className="ml-1 text-primary" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="sa-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className={fieldClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="sa-email" className={labelClasses}>
                        Email
                        <span className="ml-1 text-primary" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="sa-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={fieldClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="sa-company" className={labelClasses}>
                        Company
                        <span className="ml-1 text-primary" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="sa-company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        className={fieldClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="sa-role" className={labelClasses}>
                        Your role
                        <span className="ml-1 text-primary" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="sa-role"
                        name="role"
                        type="text"
                        required
                        className={fieldClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="sa-goal" className={labelClasses}>
                        What are you trying to do
                        <span className="ml-1 text-primary" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <textarea
                        id="sa-goal"
                        name="goal"
                        required
                        rows={3}
                        className={`${fieldClasses} resize-y`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sa-consent"
                        className="flex cursor-pointer items-start gap-3 border border-border/60 bg-background/50 p-4"
                      >
                        <input
                          id="sa-consent"
                          name="consent"
                          type="checkbox"
                          required
                          className="mt-0.5 h-4 w-4 flex-none border-border accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                        <span className="text-xs leading-relaxed text-muted">
                          I acknowledge the privacy notice and consent to
                          Crosstown reviewing this message and following up
                          with me about it.
                        </span>
                      </label>
                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        How we handle your information:{" "}
                        <Link
                          href="/privacy"
                          className="text-primary underline underline-offset-2 hover:no-underline"
                        >
                          privacy policy
                        </Link>
                        .
                      </p>
                    </div>
                    <p className="border border-border/60 bg-background/50 p-4 text-xs leading-relaxed text-muted">
                      Please do not paste confidential deal documents or
                      financials here. If a conversation is a fit, we will set
                      up a secure way to share materials.
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      className="border border-primary/60 bg-primary px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {sending ? "Filing…" : "File it with the desk"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted underline underline-offset-2 hover:text-primary"
                    >
                      Back to the conversation
                    </button>
                  </form>
                </div>
              )
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                    {AGENT_DISPLAY_NAME}
                  </p>
                  <div className="mt-1.5 border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-foreground/90">
                    {renderAssistant(GOVERNED.greeting, "greeting")}
                  </div>
                </div>

                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <p className="max-w-[85%] bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-white">
                        {m.content}
                      </p>
                    </div>
                  ) : (
                    <div key={i}>
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                        {AGENT_DISPLAY_NAME}
                      </p>
                      <div className="mt-1.5 border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-foreground/90">
                        {m.content
                          ? renderAssistant(m.content, `m${i}`)
                          : null}
                        {busy && i === messages.length - 1 ? (
                          <span
                            aria-label="Answering"
                            className="ml-1 inline-block h-2 w-2 animate-pulse bg-primary"
                          />
                        ) : null}
                      </div>
                    </div>
                  ),
                )}

                {messages.length === 0 ? (
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                      {GOVERNED.offersIntro}
                    </p>
                    <div className="mt-3 grid gap-2">
                      {OFFERS.map((offer) => (
                        <button
                          key={offer.label}
                          type="button"
                          onClick={() =>
                            offer.action === "human"
                              ? openHumanForm()
                              : void send(offer.prompt)
                          }
                          className="group border border-border bg-background/60 p-3.5 text-left transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-serif text-[15px] font-semibold tracking-tight text-foreground">
                              {offer.label}
                            </span>
                            <ArrowRight
                              className="h-4 w-4 flex-none text-muted transition-colors group-hover:text-primary"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                            {offer.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {note && !showForm ? (
                  <p className="border border-accent/60 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-foreground">
                    {note}
                  </p>
                ) : null}
              </div>
            )}
          </div>

          {!showForm ? (
            <div className="border-t border-border bg-background px-5 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void send()
                }}
                className="flex gap-2"
              >
                <label htmlFor="sa-input" className="sr-only">
                  Ask a question
                </label>
                <input
                  id="sa-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the product, the Standard, the pilot…"
                  maxLength={2000}
                  className="min-w-0 flex-1 border border-border/60 bg-card px-3 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  className="flex-none border border-primary/60 bg-primary px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Ask
                </button>
              </form>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                Filed to Crosstown&rsquo;s record · Do not paste documents or
                financials here
              </p>
            </div>
          ) : null}
        </section>
      ) : null}
    </>
  )
}
