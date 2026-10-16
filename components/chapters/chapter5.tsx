"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { TerminalLabel } from "@/components/ui/primitives"
import CalBooking from "@/components/CalBooking"
import SuccessPopup from "@/components/SuccessPopup"
import {
  OPEN_BASECAMP_EVENT,
  OPEN_FOUNDING_CIRCLE_EVENT,
  OPEN_GENERAL_EVENT,
  OPEN_OUTPOST_EVENT,
  OPEN_REFERRAL_NETWORK_EVENT,
} from "@/components/zone1/PlatformLinks"
import { cn } from "@/lib/utils"

type FormType =
  | "founding_circle"
  | "referral_network"
  | "not_sure"
  | "outpost"
  | "basecamp"

type FieldInput = "text" | "email" | "tel" | "url" | "select" | "textarea"

type FieldConfig = {
  key: string
  label: string
  input: FieldInput
  required?: boolean
  options?: readonly string[]
  autoComplete?: string
  half?: boolean
}

type FormConfig = {
  type: FormType
  eyebrow: string
  title: string
  intro: string
  microcopy: string[]
  submitLabel: string
  successTitle: string
  successDoor: { href: string; label: string }
  fields: FieldConfig[]
  calUrl?: string
  calTitle?: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Exit fade length for the inquiry modal, matching the old 200ms
// framer-motion exit. The CSS classes live in app/globals.css
// (.inquiry-backdrop / .inquiry-panel + .is-closing).
const MODAL_EXIT_MS = 200

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Global boundary note — rendered above the submit button on every path.
const BOUNDARY_NOTE =
  "Please do not submit confidential deal documents through this form. If a conversation is a fit, we will set up a secure way to share materials."

const FORM_CONFIGS: Record<FormType, FormConfig> = {
  founding_circle: {
    type: "founding_circle",
    eyebrow: "Field Network",
    title: "Request an Invitation",
    intro:
      "The Field Network is for operators, owners, and industry people who want to follow the build from the inside: early updates, a voice in what gets built, and first word when the workspace opens.",
    microcopy: [
      "Built in the open, with the people who know the assets.",
      "We review each request personally. No investor information is requested or required.",
    ],
    submitLabel: "Request an Invitation",
    successTitle: "Your invitation request is in.",
    successDoor: { href: "/trail-log", label: "Read the Trail Log" },
    calUrl: "https://cal.com/crosstownos/field-network-intro",
    calTitle: "Book a Field Network intro call",
    fields: [
      { key: "name", label: "Name", input: "text", required: true, autoComplete: "name", half: true },
      { key: "email", label: "Email", input: "email", required: true, autoComplete: "email", half: true },
      { key: "company", label: "Company/organization", input: "text", required: true, autoComplete: "organization", half: true },
      { key: "role", label: "Role", input: "text", required: true, autoComplete: "organization-title", half: true },
      {
        key: "relationshipToSpace",
        label: "Relationship to the RV/MHC space",
        input: "select",
        required: true,
        options: [
          "Operator",
          "Owner",
          "Acquisition professional",
          "Broker or lender",
          "Industry adviser",
          "Other",
        ],
        half: true,
      },
      {
        key: "howDidYouHear",
        label: "How did you hear about us? (optional)",
        input: "text",
        half: true,
      },
      {
        key: "followOrContribute",
        label: "What would you want to follow or contribute?",
        input: "textarea",
        required: true,
      },
    ],
  },
  referral_network: {
    type: "referral_network",
    eyebrow: "Referral Alliance",
    title: "Start a Partner Conversation",
    intro:
      "The Referral Alliance is for brokers, lenders, operators, and advisers who know the assets and the people, and want a standing partner conversation with Crosstown.",
    microcopy: [
      "No compensation terms are published or implied. If a partnership makes sense, terms are discussed privately.",
      "Submitting this form does not create an agency, brokerage, or partnership relationship.",
    ],
    submitLabel: "Start a Partner Conversation",
    successTitle: "Your partner conversation request is in.",
    successDoor: {
      href: "/parkproof-walkthrough",
      label: "Inside a documented decision file",
    },
    calUrl: "https://cal.com/crosstownos/referral-alliance-intro",
    calTitle: "Book a Referral Alliance intro call",
    fields: [
      { key: "name", label: "Name", input: "text", required: true, autoComplete: "name", half: true },
      { key: "email", label: "Email", input: "email", required: true, autoComplete: "email", half: true },
      { key: "company", label: "Company/organization", input: "text", required: true, autoComplete: "organization", half: true },
      { key: "role", label: "Role", input: "text", required: true, autoComplete: "organization-title", half: true },
      {
        key: "partnerType",
        label: "Partner type",
        input: "select",
        required: true,
        options: ["Broker", "Lender", "Operator", "Adviser", "Other"],
        half: true,
      },
      {
        key: "marketsCovered",
        label: "Markets you cover",
        input: "text",
        required: true,
        half: true,
      },
      {
        key: "howDidYouHear",
        label: "How did you hear about us? (optional)",
        input: "text",
        half: true,
      },
      {
        key: "goodReferral",
        label: "What does a good referral look like from your seat?",
        input: "textarea",
        required: true,
      },
    ],
  },
  not_sure: {
    type: "not_sure",
    eyebrow: "General Conversation",
    title: "Start with the right conversation.",
    intro:
      "Not sure where you fit? Tell us what you are trying to do and we will route it to the right conversation.",
    microcopy: [
      "Every note is read personally.",
      "Submitting this form does not create an advisory, agency, investment, financing, brokerage, or transaction relationship.",
    ],
    submitLabel: "Start the Conversation",
    successTitle: "Your note is in.",
    successDoor: { href: "/blog", label: "Read the Field Notes" },
    calUrl: "https://cal.com/crosstownos/conversation",
    calTitle: "Book a conversation",
    fields: [
      { key: "name", label: "Name", input: "text", required: true, autoComplete: "name", half: true },
      { key: "email", label: "Email", input: "email", required: true, autoComplete: "email", half: true },
      { key: "company", label: "Company/organization", input: "text", required: true, autoComplete: "organization", half: true },
      { key: "role", label: "Role", input: "text", required: true, autoComplete: "organization-title", half: true },
      {
        key: "howDidYouHear",
        label: "How did you hear about us? (optional)",
        input: "text",
        half: true,
      },
      {
        key: "goal",
        label: "What are you trying to do?",
        input: "textarea",
        required: true,
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Dormant legacy configs — retained for future re-linking. Nothing on the
  // public site dispatches these events today.
  // -------------------------------------------------------------------------
  outpost: {
    type: "outpost",
    eyebrow: "The Outpost",
    title: "Submit an Opportunity",
    intro:
      "For owners, brokers, and referral partners submitting a possible sale, recapitalization, operating transition, or strategic opportunity.",
    microcopy: [
      "Crosstown reviews opportunities confidentially. Submission does not create an offer, broker relationship, agency relationship, valuation opinion, financing commitment, or obligation to transact.",
    ],
    submitLabel: "Submit Opportunity",
    successTitle: "Your opportunity is in.",
    successDoor: { href: "/workspace", label: "See the Acquisition Workspace" },
    fields: [
      {
        key: "relationshipToOpportunity",
        label: "Relationship to opportunity",
        input: "text",
        required: true,
        half: true,
      },
      { key: "name", label: "Name", input: "text", required: true, autoComplete: "name", half: true },
      { key: "company", label: "Company", input: "text", autoComplete: "organization", half: true },
      { key: "email", label: "Email", input: "email", required: true, autoComplete: "email", half: true },
      { key: "phone", label: "Phone", input: "tel", required: true, autoComplete: "tel", half: true },
      {
        key: "assetClass",
        label: "Asset class",
        input: "select",
        required: true,
        options: [
          "RV Park",
          "Manufactured-Housing Community",
          "Mixed RV/MHC",
          "Other",
        ],
        half: true,
      },
      { key: "propertyName", label: "Property name (if known)", input: "text", half: true },
      { key: "cityState", label: "City and state", input: "text", required: true, half: true },
      {
        key: "approximateSites",
        label: "Approximate pads/sites",
        input: "text",
        required: true,
        half: true,
      },
      { key: "currentOccupancy", label: "Current occupancy (if known)", input: "text", half: true },
      {
        key: "waterSewerConfiguration",
        label: "Water/sewer configuration (if known)",
        input: "text",
        half: true,
      },
      {
        key: "askingPrice",
        label: "Asking price / expected value (if known)",
        input: "text",
        half: true,
      },
      {
        key: "isCurrentlyListed",
        label: "Is the property currently listed?",
        input: "select",
        required: true,
        options: ["Yes", "No", "Confidential", "Unsure"],
        half: true,
      },
      {
        key: "authorizedToShare",
        label: "Are you authorized to share this opportunity?",
        input: "select",
        required: true,
        options: ["Yes", "No"],
        half: true,
      },
      {
        key: "anticipatedTiming",
        label: "Anticipated timing",
        input: "select",
        required: true,
        options: ["Immediate", "30–90 days", "3–12 months", "Exploring options"],
        half: true,
      },
      {
        key: "conversationSought",
        label: "Conversation sought",
        input: "select",
        required: true,
        options: ["Sale", "Recapitalization", "Operating transition", "Referral", "Other"],
        half: true,
      },
      {
        key: "opportunityContext",
        label: "Brief opportunity/transition context",
        input: "textarea",
        required: true,
      },
    ],
  },
  basecamp: {
    type: "basecamp",
    eyebrow: "The Basecamp",
    title: "Start a Conversation",
    intro:
      "For experienced operators, acquisition principals, advisers, and relevant industry or capital relationships seeking a strategic conversation.",
    microcopy: [
      "Basecamp is for strategic conversations. Submission does not create an offer, solicitation, advisory relationship, partnership, or investment opportunity.",
    ],
    submitLabel: "Start a Conversation",
    successTitle: "Your note is in.",
    successDoor: { href: "/trail-log", label: "Read the Trail Log" },
    fields: [
      { key: "name", label: "Name", input: "text", required: true, autoComplete: "name", half: true },
      { key: "company", label: "Company/entity", input: "text", required: true, autoComplete: "organization", half: true },
      { key: "role", label: "Role", input: "text", required: true, autoComplete: "organization-title", half: true },
      { key: "email", label: "Business email", input: "email", required: true, autoComplete: "email", half: true },
      { key: "phone", label: "Phone (optional)", input: "tel", autoComplete: "tel", half: true },
      { key: "linkedInUrl", label: "LinkedIn URL (optional)", input: "url", autoComplete: "url", half: true },
      {
        key: "relationshipType",
        label: "Relationship type",
        input: "select",
        required: true,
        options: [
          "Operator",
          "Buyer",
          "Advisor",
          "Capital relationship",
          "Industry partner",
          "Other",
        ],
      },
      {
        key: "focusAndGeography",
        label: "RV/MHC focus and geography",
        input: "textarea",
        required: true,
      },
      {
        key: "strategyExperience",
        label: "General strategy or relevant experience",
        input: "textarea",
        required: true,
      },
      {
        key: "conversationGoal",
        label: "What would make a conversation useful?",
        input: "textarea",
        required: true,
      },
    ],
  },
}

const EVENT_TO_FORM: Record<string, FormType> = {
  [OPEN_FOUNDING_CIRCLE_EVENT]: "founding_circle",
  [OPEN_REFERRAL_NETWORK_EVENT]: "referral_network",
  [OPEN_GENERAL_EVENT]: "not_sure",
  // Dormant legacy mappings — retained so the dormant configs stay functional.
  [OPEN_OUTPOST_EVENT]: "outpost",
  [OPEN_BASECAMP_EVENT]: "basecamp",
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error"

export default function Chapter5() {
  const [isMounted, setIsMounted] = useState(false)
  const [activeForm, setActiveForm] = useState<FormType | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [sourcePath, setSourcePath] = useState("")
  const [status, setStatus] = useState<SubmissionStatus>("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [successPopup, setSuccessPopup] = useState<{
    config: FormConfig
    message: string
  } | null>(null)
  const successTimer = useRef<number | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | null>(null)
  const utmRef = useRef<{
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }>({})

  const openForm = (formType: FormType, source = "") => {
    // A form opened mid-exit cancels the pending unmount.
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setIsClosing(false)
    setSuccessPopup(null)
    triggerRef.current = document.activeElement as HTMLElement | null
    setActiveForm(formType)
    setSourcePath(source)
    setStatus("idle")
    setStatusMessage("")
  }

  const closeForm = () => {
    if (isClosing) return
    // Flip .is-closing for the CSS exit fade, then unmount after the
    // transition. Reduced-motion users get the instant path.
    setIsClosing(true)
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    closeTimer.current = window.setTimeout(
      () => {
        closeTimer.current = null
        setActiveForm(null)
        setSourcePath("")
        setStatus("idle")
        setStatusMessage("")
        setIsClosing(false)
        // Return focus to the trigger that opened the dialog
        requestAnimationFrame(() => triggerRef.current?.focus())
      },
      reduced ? 0 : MODAL_EXIT_MS,
    )
  }

  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current)
      }
      if (successTimer.current !== null) {
        window.clearTimeout(successTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    utmRef.current = {
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    }
  }, [])

  useEffect(() => {
    const listeners = Object.entries(EVENT_TO_FORM).map(([eventName, formType]) => {
      const handler = (event: Event) => {
        const source =
          (event as CustomEvent<{ source?: string }>).detail?.source ?? ""
        openForm(formType, source)
      }
      window.addEventListener(eventName, handler)
      return { eventName, handler }
    })

    return () => {
      listeners.forEach(({ eventName, handler }) => {
        window.removeEventListener(eventName, handler)
      })
    }
  }, [])

  useEffect(() => {
    if (!activeForm) {
      document.body.style.overflow = ""
      triggerRef.current?.focus()
      triggerRef.current = null
      return
    }

    document.body.style.overflow = "hidden"

    const focusFrame = requestAnimationFrame(() => {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      focusable?.[0]?.focus()
    })

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeForm()
        return
      }

      if (event.key !== "Tab" || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement as HTMLElement | null
      const focusIsInside = activeElement ? dialogRef.current.contains(activeElement) : false

      if (event.shiftKey && (!focusIsInside || activeElement === first)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (!focusIsInside || activeElement === last)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", trapFocus)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener("keydown", trapFocus)
      document.body.style.overflow = ""
    }
  }, [activeForm])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>, config: FormConfig) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    for (const field of config.fields) {
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

      if (field.input === "url" && value) {
        try {
          const url = new URL(value)
          if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw new Error("Invalid protocol")
          }
        } catch {
          setStatus("error")
          setStatusMessage("LinkedIn URL must be a valid http or https URL.")
          alertRef.current?.focus()
          return
        }
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

    const payload: Record<string, unknown> = {
      formType: config.type,
      consent: true,
      sourcePage: window.location.href,
      sourcePath: sourcePath || "direct",
      utmSource: utmRef.current.utmSource ?? "",
      utmMedium: utmRef.current.utmMedium ?? "",
      utmCampaign: utmRef.current.utmCampaign ?? "",
    }

    config.fields.forEach((field) => {
      payload[field.key] = String(formData.get(field.key) ?? "").trim()
    })

    // Honeypot — must remain empty; passed through untouched for the server to evaluate.
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
        const message =
          body.message || "Thank you. Crosstown will review your submission."
        form.reset()
        // The inquiry modal closes first; the branded success pop-up
        // then presents the same success content on its own, so the
        // two overlays never stack.
        closeForm()
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches
        successTimer.current = window.setTimeout(
          () => {
            successTimer.current = null
            setSuccessPopup({ config, message })
          },
          reduced ? 0 : MODAL_EXIT_MS,
        )
      } else {
        setStatus("error")
        setStatusMessage(
          body?.error || "We could not submit your request. Please try again.",
        )
        alertRef.current?.focus()
      }
    } catch {
      setStatus("error")
      setStatusMessage("Network error. Please try again.")
      alertRef.current?.focus()
    }
  }

  const config = activeForm ? FORM_CONFIGS[activeForm] : null

  // Enter animation plays once via CSS keyframes on mount
  // (.inquiry-backdrop / .inquiry-panel in app/globals.css); exit flips
  // .is-closing and the component unmounts after MODAL_EXIT_MS in closeForm.
  const modal = config ? (
    <div
      className={cn(
        "inquiry-backdrop fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-background/75 p-3 backdrop-blur-sm sm:items-center sm:p-4",
        isClosing && "is-closing",
      )}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeForm()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
        className={cn(
          "inquiry-panel theme-cream flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden border border-border bg-background shadow-2xl sm:max-h-[90dvh]",
          isClosing && "is-closing",
        )}
      >
            <div className="flex flex-none items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <TerminalLabel className="mb-2 block">
                  {config.eyebrow}
                </TerminalLabel>
                <h2
                  id="inquiry-modal-title"
                  className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl"
                >
                  {config.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                aria-label={`Close ${config.eyebrow} form`}
                className="flex h-10 w-10 flex-none items-center justify-center border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6">
              <>
                  <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base">
                    {config.intro}
                  </p>

                  {config.calUrl ? (
                    <CalBooking url={config.calUrl} title={config.calTitle ?? "Book a call"} />
                  ) : null}

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

                  <form
                    onSubmit={(event) => handleSubmit(event, config)}
                    noValidate
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {/* Honeypot — hidden from users, visible to bots. */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="companyWebsite">Company website</label>
                      <input
                        id="companyWebsite"
                        name="companyWebsite"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {config.fields.map((field) => {
                      const fieldId = `${config.type}-${field.key}`
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
                              className={fieldClasses}
                            />
                          )}
                        </div>
                      )
                    })}

                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`${config.type}-consent`}
                        className="flex cursor-pointer items-start gap-3 border border-border/60 bg-card/50 p-4"
                      >
                        <input
                          id={`${config.type}-consent`}
                          name="consent"
                          type="checkbox"
                          required
                          className="mt-0.5 h-4 w-4 flex-none border-border accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                        <span className="text-xs leading-relaxed text-muted">
                          I acknowledge the privacy notice and consent to Crosstown
                          reviewing this submission and following up with me about it.
                        </span>
                      </label>
                    </div>

                    <p className="border border-border/60 bg-card/50 p-4 text-xs leading-relaxed text-muted sm:col-span-2">
                      {BOUNDARY_NOTE}
                    </p>

                    <div className="space-y-3 sm:col-span-2">
                      {config.microcopy.map((line) => (
                        <p
                          key={line}
                          className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted"
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="border border-primary/60 bg-primary px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                    >
                      {status === "submitting" ? "Submitting…" : config.submitLabel}
                    </button>
                  </form>
              </>
            </div>
      </div>
    </div>
  ) : null

  return (
    <>
      {isMounted ? createPortal(modal, document.body) : null}
      {successPopup ? (
        <SuccessPopup
          eyebrow="Submission received"
          title={successPopup.config.successTitle}
          body={successPopup.message}
          door={successPopup.config.successDoor}
          onClose={() => setSuccessPopup(null)}
        />
      ) : null}
    </>
  )
}
