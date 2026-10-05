"use client"

import { useState, type FormEvent } from "react"

type Status = "idle" | "submitting" | "success" | "error"

const inputClass =
  "w-full border border-border/60 bg-background/50 px-3 py-3 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"

export default function TrailLogForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get("consent") !== "on") {
      setStatus("error")
      setMessage("Privacy notice acknowledgement is required.")
      return
    }

    setStatus("submitting")
    setMessage("")

    const payload: Record<string, unknown> = {
      formType: "trail_log",
      consent: true,
      sourcePage: window.location.href,
      sourcePath: "/trail-log",
      companyWebsite: "",
    }

    ;["name", "email", "focus", "vote", "note"].forEach((key) => {
      payload[key] = String(formData.get(key) ?? "").trim()
    })

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const body = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string; error?: string }
        | null

      if (response.ok && body?.success) {
        setStatus("success")
        setMessage(body.message || "Received. Thank you for weighing in.")
        form.reset()
      } else {
        setStatus("error")
        setMessage(body?.error || "We could not submit your vote. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <div className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="trail-log-company-website">Company website</label>
        <input id="trail-log-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="trail-log-name" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Name <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <input id="trail-log-name" name="name" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trail-log-email" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Email <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <input id="trail-log-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div>
        <label htmlFor="trail-log-focus" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Build area <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <select id="trail-log-focus" name="focus" required defaultValue="Field" className={inputClass}>
          <option>Source</option>
          <option>Field</option>
          <option>Acquire</option>
          <option>ParkProof</option>
          <option>Site experience</option>
        </select>
      </div>

      <div>
        <label htmlFor="trail-log-vote" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          What should get attention next? <span className="text-primary" aria-hidden="true">*</span>
        </label>
        <select id="trail-log-vote" name="vote" required defaultValue="How Field captures are reviewed in Acquire" className={inputClass}>
          <option>How Field captures are reviewed in Acquire</option>
          <option>How Source shows where a fact came from</option>
          <option>What a worked decision-file example should show</option>
          <option>What belongs in a useful site-walk capture</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="trail-log-note" className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Your note
        </label>
        <textarea id="trail-log-note" name="note" rows={5} maxLength={2000} className={inputClass} placeholder="What would make this useful in a real deal?" />
      </div>

      <label htmlFor="trail-log-consent" className="flex gap-3 text-sm leading-relaxed text-muted sm:col-span-2">
        <input id="trail-log-consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4 flex-none accent-[#00468b]" />
        <span>I understand this vote is input for the build conversation, not a commitment or a product order.</span>
      </label>

      {message ? (
        <div
          role={status === "error" ? "alert" : "status"}
          className={
            status === "error"
              ? "border border-accent/60 bg-accent/10 px-4 py-3 text-sm text-foreground sm:col-span-2"
              : "border border-primary/50 bg-primary/5 px-4 py-3 text-sm text-foreground sm:col-span-2"
          }
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="border border-primary/60 bg-primary px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
      >
        {status === "submitting" ? "Sending..." : "Weigh in"}
      </button>
    </form>
  )
}
