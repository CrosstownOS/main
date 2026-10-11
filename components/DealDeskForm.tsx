"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import CalBooking from "@/components/CalBooking"

// OWNER SWITCH: set to true only when /privacy has approved attorney text
// and is live. Until then the privacy consent line stays hidden.
const SHOW_PRIVACY_POLICY_LINE = true

type FieldInput = "text" | "email" | "tel" | "date" | "select" | "textarea"

type FieldConfig = {
  key: string
  label: string
  input: FieldInput
  required?: boolean
  options?: readonly string[]
  autoComplete?: string
  half?: boolean
  placeholder?: string
}

const FIELDS: FieldConfig[] = [
  { key: "name", label: "Name", input: "text", required: true, autoComplete: "name", half: true },
  { key: "email", label: "Email", input: "email", required: true, autoComplete: "email", half: true },
  { key: "company", label: "Shop or company", input: "text", autoComplete: "organization", half: true },
  {
    key: "assetType",
    label: "Asset type",
    input: "select",
    required: true,
    options: ["RV park", "Manufactured housing community", "Both"],
    half: true,
  },
  {
    key: "dealStage",
    label: "Deal stage",
    input: "select",
    required: true,
    options: ["LOI signed", "In diligence", "Pre-LOI but imminent"],
    half: true,
  },
  { key: "decisionDeadline", label: "Decision deadline", input: "date", required: true, half: true },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BOUNDARY_NOTE =
  "Please do not submit confidential deal documents through this form. If a conversation is a fit, we will set up a secure way to share materials."

type SubmissionStatus = "idle" | "submitting" | "success" | "error"

export default function DealDeskForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const alertRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    for (const field of FIELDS) {
      const value = String(formData.get(field.key) ?? "").trim()

      if (field.required && !value) {
        setStatus("error")
        setStatusMessage(`Missing required field: ${field.label}`)
        alertRef.current?.focus()
        return
      }

      if (field.input === "email" && value && !EMAIL_PATTERN.test(value)) {
        setStatus("error")
        setStatusMessage("A valid email is required.")
        alertRef.current?.focus()
        return
      }
    }

    if (formData.get("consent") !== "on") {
      setStatus("error")
      setStatusMessage("Privacy notice acknowledgement is required.")
      alertRef.current?.focus()
      return
    }

    setStatus("submitting")
    setStatusMessage("")
    import("@vercel/analytics").then(({ track }) => track("deal_desk_submit"))

    const payload: Record<string, unknown> = {
      formType: "deal_desk",
      consent: true,
      sourcePage: window.location.href,
      sourcePath: "deal-desk-application",
    }

    FIELDS.forEach((field) => {
      payload[field.key] = String(formData.get(field.key) ?? "").trim()
    })

    // Honeypot, must remain empty; passed through for the server to evaluate.
    payload.companyWebsite = String(formData.get("companyWebsite") ?? "")

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
        import("@vercel/analytics").then(({ track }) => track("deal_desk_success"))
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead");
        }
        setStatus("success")
        setStatusMessage(
          body.message ||
            "Received. Expect a reply within two business days.",
        )
        form.reset()
      } else {
        setStatus("error")
        setStatusMessage(
          body?.error || "We could not submit your application. Please try again.",
        )
        alertRef.current?.focus()
      }
    } catch {
      setStatus("error")
      setStatusMessage("Network error. Please try again.")
      alertRef.current?.focus()
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-primary/50 bg-primary/5 p-6 sm:p-8">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
          Application received
        </p>
        <p className="text-base leading-relaxed text-foreground sm:text-lg">
          {statusMessage}
        </p>
      </div>
    )
  }

  return (
    <>
      {status === "error" && statusMessage ? (
        <div
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="mb-6 border border-accent/60 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-foreground focus-visible:outline-none"
        >
          {statusMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        {/* Honeypot, hidden from users, visible to bots. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="deal-desk-companyWebsite">Company website</label>
          <input
            id="deal-desk-companyWebsite"
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {FIELDS.map((field) => {
          const fieldId = `deal-desk-${field.key}`
          const fieldClasses =
            "w-full border border-border/60 bg-background/50 px-3 py-3 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"

          return (
            <div
              key={field.key}
              className={cn(field.half ? "sm:col-span-1" : "sm:col-span-2", "col-span-1")}
            >
              <label
                htmlFor={fieldId}
                className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted"
              >
                {field.label}
                {field.required ? (
                  <span className="ml-1 text-primary" aria-hidden="true">
                    *
                  </span>
                ) : null}
              </label>

              {field.input === "select" ? (
                <select
                  id={fieldId}
                  name={field.key}
                  required={field.required}
                  defaultValue=""
                  className={fieldClasses}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.input === "textarea" ? (
                <textarea
                  id={fieldId}
                  name={field.key}
                  required={field.required}
                  rows={4}
                  className={cn(fieldClasses, "resize-y")}
                />
              ) : (
                <input
                  id={fieldId}
                  name={field.key}
                  type={field.input}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  className={fieldClasses}
                />
              )}
            </div>
          )
        })}

        <div className="sm:col-span-2">
          <label
            htmlFor="deal-desk-consent"
            className="flex cursor-pointer items-start gap-3 border border-border/60 bg-card/50 p-4"
          >
            <input
              id="deal-desk-consent"
              name="consent"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 flex-none border-border accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
            <span className="text-xs leading-relaxed text-muted">
              I acknowledge the privacy notice and consent to Crosstown
              reviewing this application and following up with me about it.
            </span>
          </label>
          {SHOW_PRIVACY_POLICY_LINE ? (
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
          ) : null}
        </div>

        <p className="border border-border/60 bg-card/50 p-4 text-xs leading-relaxed text-muted sm:col-span-2">
          {BOUNDARY_NOTE}
        </p>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="border border-primary/60 bg-primary px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {status === "submitting" ? "Submitting…" : "Submit for review"}
        </button>
      </form>

      <CalBooking
        url="https://cal.com/crosstownos/workspace-fit-call"
        title="Book a workspace fit call"
        footerText="Prefer to talk first? Book an optional fit call."
      />
    </>
  )
}
