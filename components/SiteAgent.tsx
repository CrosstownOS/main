"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { AGENT_DISPLAY_NAME, GOVERNED } from "@/lib/site-agent/knowledge"

/**
 * SiteAgent: the Front Door (spec: site-agent-spec-2026-10-18.md).
 *
 * Design follows the site's standing precedents, not a chat-widget kit:
 * square corners, Playfair for the name, JetBrains Mono micro-labels,
 * the border/background/blur panel treatment of QuietCta, the Hero's
 * solid primary-deep button, and the shared focus-ring pattern.
 *
 * Mounted in app/layout.tsx as a direct child of <body>, beside QuietCta,
 * so the .page-enter transform cannot break its position: fixed. The
 * launcher stacks above the QuietCta chip's corner; the open panel
 * covers that corner (z-40 over its z-30).
 *
 * Behavior guarantees that live here, not in the model: the greeting and
 * its AI disclosure render from the governed answer set; every finished
 * conversation files its full transcript to /api/chat; escalation goes
 * through the site's existing inquiry flow (form type not_sure).
 */

type Msg = { role: "user" | "assistant"; content: string }

const OFFERS: { label: string; prompt?: string; human?: boolean }[] = [
  { label: "The product", prompt: "What is CrosstownOS?" },
  { label: "The ParkProof Standard", prompt: "What is the ParkProof Standard?" },
  {
    label: "Pricing and the pilot",
    prompt: "What does it cost, and how does the pilot work?",
  },
  { label: "Talk to a human", human: true },
]

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function renderRich(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          className="text-primary underline underline-offset-2 hover:text-foreground"
        >
          {link[1]}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function SiteAgent() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GOVERNED.greeting },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const [showHuman, setShowHuman] = useState(false)
  const [human, setHuman] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    goal: "",
  })
  const [humanState, setHumanState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  )
  const flagsRef = useRef<Set<string>>(new Set())
  const filedRef = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  const userCount = messages.filter((m) => m.role === "user").length

  const fileTranscript = useCallback(() => {
    const msgs = messagesRef.current
    if (filedRef.current) return
    if (msgs.filter((m) => m.role === "user").length === 0) return
    filedRef.current = true
    const payload = JSON.stringify({
      type: "transcript",
      page: pathname || "/",
      flags: [...flagsRef.current],
      messages: msgs,
    })
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  useEffect(() => {
    const onHide = () => fileTranscript()
    window.addEventListener("pagehide", onHide)
    return () => window.removeEventListener("pagehide", onHide)
  }, [fileTranscript])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open, showHuman])

  useEffect(() => {
    if (open && window.innerWidth >= 768) inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        fileTranscript()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, fileTranscript])

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || sending) return
    const history: Msg[] = [...messagesRef.current, { role: "user", content }]
    setMessages(history)
    setInput("")
    setSending(true)
    let acc = ""
    const pushAssistant = (value: string) =>
      setMessages([...history, { role: "assistant", content: value }])
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok || !res.body) {
        const note =
          res.status === 429
            ? "Too many messages in a short window. Give it a few minutes, or leave a note for a person below."
            : "The agent could not answer just now. Nothing is lost: you can leave a note for a person instead."
        pushAssistant(note)
        if (res.status !== 429) setShowHuman(true)
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split("\n\n")
        buffer = events.pop() || ""
        for (const event of events) {
          for (const line of event.split("\n")) {
            if (!line.startsWith("data: ")) continue
            const data = line.slice(6).trim()
            if (data === "[DONE]") continue
            try {
              const json = JSON.parse(data)
              const delta = json?.choices?.[0]?.delta?.content
              if (typeof delta === "string") {
                acc += delta
                pushAssistant(acc)
              }
            } catch {
              // Partial or non-JSON keepalive lines are ignored by design.
            }
          }
        }
      }
      // Protocol markers from the system prompt: behavior, not copy.
      let escalate = false
      const cleaned = acc
        .split("\n")
        .filter((line) => {
          const t = line.trim()
          if (t === "[[ESCALATE]]") {
            escalate = true
            return false
          }
          if (t === "[[GAP]]") {
            flagsRef.current.add("corpus gap")
            return false
          }
          return true
        })
        .join("\n")
        .trim()
      if (cleaned !== acc) pushAssistant(cleaned)
      if (escalate) {
        flagsRef.current.add("escalated")
        setShowHuman(true)
      }
      if (!cleaned) {
        pushAssistant(
          "The agent returned an empty answer. Leave a note for a person and it will be picked up from there.",
        )
        setShowHuman(true)
      }
    } catch {
      pushAssistant(
        "The agent could not be reached just now. You can leave a note for a person instead.",
      )
      setShowHuman(true)
    } finally {
      setSending(false)
    }
  }

  const submitHuman = async () => {
    if (humanState === "sending" || humanState === "done") return
    setHumanState("sending")
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "not_sure",
          name: human.name,
          email: human.email,
          company: human.company,
          role: human.role,
          goal: `${human.goal}\n\n[Sent from the Site Agent on ${pathname || "/"}]`,
        }),
      })
      if (!res.ok) throw new Error("inquiry failed")
      setHumanState("done")
      flagsRef.current.add("escalated")
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: GOVERNED.escalationFiled },
      ])
      filedRef.current = false
      fileTranscript()
    } catch {
      setHumanState("error")
    }
  }

  const humanField =
    "w-full border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
  const humanLabel =
    "font-mono text-[9px] uppercase tracking-[0.2em] text-muted"

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${AGENT_DISPLAY_NAME}`}
          className={cn(
            "fixed bottom-20 right-4 z-40 flex items-center gap-2 border border-border bg-background/95 px-4 py-3 backdrop-blur transition-colors hover:border-primary/60 md:bottom-24 md:right-6",
            FOCUS_RING,
          )}
        >
          <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="font-serif text-xs text-[#4A90D9]">CrosstownOS</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
            {AGENT_DISPLAY_NAME}
          </span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={`${AGENT_DISPLAY_NAME} conversation`}
          className="fixed inset-x-3 bottom-3 z-40 flex h-[min(600px,80vh)] flex-col border border-border bg-background/95 backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:h-[600px] md:max-h-[80vh] md:w-[384px]"
        >
          <div className="flex items-start justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-serif text-xs text-[#4A90D9]">CrosstownOS</p>
              <p className="font-serif text-lg leading-tight text-foreground">
                {AGENT_DISPLAY_NAME}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                AI agent · answers from the published record
              </p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                setOpen(false)
                fileTranscript()
              }}
              className={cn(
                "flex h-7 w-7 flex-none items-center justify-center text-muted transition-colors hover:text-foreground",
                FOCUS_RING,
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3">
            <div className="space-y-3">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div
                    key={i}
                    className="ml-10 border border-primary/40 bg-card px-3 py-2 text-sm leading-relaxed text-foreground"
                  >
                    {m.content}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="pr-2 text-sm leading-relaxed text-foreground"
                  >
                    <p className="whitespace-pre-wrap">{renderRich(m.content)}</p>
                  </div>
                ),
              )}
              {userCount === 0 && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    {GOVERNED.offersIntro}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {OFFERS.map((offer) => (
                      <button
                        key={offer.label}
                        type="button"
                        onClick={() =>
                          offer.human ? setShowHuman(true) : send(offer.prompt || "")
                        }
                        className={cn(
                          "border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-primary/60",
                          FOCUS_RING,
                        )}
                      >
                        {offer.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {sending && (
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  Working from the record
                </p>
              )}
            </div>

            {showHuman && humanState !== "done" && (
              <div className="mt-4 border border-border bg-card px-3 py-3">
                <p className="text-sm leading-relaxed text-foreground">
                  {GOVERNED.escalation}
                </p>
                <div className="mt-3 space-y-2">
                  <div>
                    <label className={humanLabel} htmlFor="sa-name">Name</label>
                    <input
                      id="sa-name"
                      className={humanField}
                      value={human.name}
                      onChange={(e) => setHuman({ ...human, name: e.target.value })}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className={humanLabel} htmlFor="sa-email">Email</label>
                    <input
                      id="sa-email"
                      type="email"
                      className={humanField}
                      value={human.email}
                      onChange={(e) => setHuman({ ...human, email: e.target.value })}
                      autoComplete="email"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={humanLabel} htmlFor="sa-company">Company</label>
                      <input
                        id="sa-company"
                        className={humanField}
                        value={human.company}
                        onChange={(e) =>
                          setHuman({ ...human, company: e.target.value })
                        }
                        autoComplete="organization"
                      />
                    </div>
                    <div>
                      <label className={humanLabel} htmlFor="sa-role">Role</label>
                      <input
                        id="sa-role"
                        className={humanField}
                        value={human.role}
                        onChange={(e) => setHuman({ ...human, role: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={humanLabel} htmlFor="sa-goal">
                      What are you trying to do
                    </label>
                    <textarea
                      id="sa-goal"
                      rows={3}
                      className={humanField}
                      value={human.goal}
                      onChange={(e) => setHuman({ ...human, goal: e.target.value })}
                    />
                  </div>
                  {humanState === "error" && (
                    <p className="text-sm text-critical">
                      The note could not be filed just now. Please try again.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={submitHuman}
                    disabled={
                      humanState === "sending" ||
                      !human.name ||
                      !human.email ||
                      !human.company ||
                      !human.role ||
                      !human.goal
                    }
                    className={cn(
                      "border border-primary/60 bg-primary-deep px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 disabled:cursor-not-allowed disabled:opacity-50",
                      FOCUS_RING,
                    )}
                  >
                    {humanState === "sending" ? "Filing" : "Send to a person"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border">
            <form
              className="flex items-stretch"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={2000}
                placeholder="Ask about the product, the Standard, pricing"
                aria-label="Your question"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted/70 focus-visible:outline-none"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                className={cn(
                  "flex-none border-l border-primary/60 bg-primary-deep px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 disabled:cursor-not-allowed disabled:opacity-50",
                  FOCUS_RING,
                )}
              >
                Send
              </button>
            </form>
            <p className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
              Filed to Crosstown's record · Do not paste documents or financials here
            </p>
          </div>
        </div>
      )}
    </>
  )
}
