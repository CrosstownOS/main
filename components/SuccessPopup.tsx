"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import SignalLine from "@/components/ui/SignalLine"

export type SuccessDoor = {
  href: string
  label: string
}

type SuccessPopupProps = {
  /** Mono eyebrow naming the completion, e.g. "Application received". */
  eyebrow: string
  /** Serif headline confirming what just happened, naming the specific thing. */
  title: string
  /** What happens next, or that nothing is pending. */
  body?: ReactNode
  /** The one contextual next door for this surface. */
  door?: SuccessDoor
  /** Dismiss the pop-up. The in-flow success state stays in place. */
  onClose: () => void
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * The branded success pop-up. When a completion fires, this overlay is
 * the moment: the circular logo and CrosstownOS wordmark over the same
 * confirmation the in-flow SuccessState carries (same eyebrow, title,
 * next-step line, and single contextual door, fed from the same props
 * so the two layers cannot drift). Dismiss by the X, the backdrop, or
 * Escape; focus is trapped while it is open and returned to the element
 * that held it on close. Rendered through a portal so no transformed
 * ancestor can misplace the fixed overlay. Motion is a short fade and
 * rise, collapsed by the global prefers-reduced-motion rule.
 */
export default function SuccessPopup({
  eyebrow,
  title,
  body,
  door,
  onClose,
}: SuccessPopupProps) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement | null
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]?.focus()
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== "Tab" || !dialogRef.current) return
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null
      const inside = active ? dialogRef.current.contains(active) : false
      if (e.shiftKey && (!inside || active === first)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (!inside || active === last)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
      const trigger = triggerRef.current
      if (trigger && trigger.isConnected) {
        requestAnimationFrame(() => trigger.focus())
      }
    }
  }, [mounted])

  if (!mounted) return null

  return createPortal(
    <div
      className="success-popup-backdrop fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="success-popup-panel theme-cream w-full max-w-md border border-primary/40 bg-card p-6 shadow-2xl sm:p-8"
      >
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
            <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
              CrosstownOS
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 flex-none items-center justify-center border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <SignalLine className="mt-5" />

        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
        <p className="serif-display mt-3 text-2xl tracking-tight text-foreground sm:text-3xl">
          {title}
        </p>
        {body ? (
          <div className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {body}
          </div>
        ) : null}
        {door ? (
          <Link
            href={door.href}
            onClick={onClose}
            className="mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {door.label}
          </Link>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
