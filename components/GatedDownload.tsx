'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import SuccessPopup from '@/components/SuccessPopup'

const STORAGE_KEY = 'crosstown_resource_email'

type Props = {
  file: string
  label: string
  className?: string
  /** Full name of the thing being downloaded, used by the success state. */
  title?: string
  /** The one contextual next door offered after the download starts. */
  nextDoor?: { href: string; label: string }
}

/**
 * Download button gated on a one-time email capture.
 * First click opens the email modal; the address is remembered in
 * localStorage so every later download is one click.
 */
export function GatedDownloadButton({ file, label, className, title, nextDoor }: Props) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

  const close = () => {
    setOpen(false)
    // Return focus to the trigger button
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]?.focus()
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1)
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
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const startDownload = () => {
    // Lazy-loaded to avoid a static module-graph edge (TDZ risk).
    void import('@vercel/analytics').then(({ track }) =>
      track('resource_download', { tool: label }),
    )
    const a = document.createElement('a')
    a.href = file
    a.setAttribute('download', '')
    document.body.appendChild(a)
    a.click()
    a.remove()
    setDownloaded(true)
    setPopupOpen(true)
  }

  const handleClick = () => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) {
        startDownload()
        return
      }
    } catch {
      /* storage unavailable — fall through to the modal */
    }
    setError('')
    setOpen(true)
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const formData = new FormData(e.currentTarget)
      const res = await fetch('/api/resource-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          tool: label,
          file,
          website: formData.get('website'),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      try {
        window.localStorage.setItem(STORAGE_KEY, email.trim().toLowerCase())
      } catch {
        /* storage unavailable — download still proceeds */
      }
      close()
      startDownload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button type="button" ref={triggerRef} onClick={handleClick} className={className}>
        Download PDF
      </button>
      {downloaded && (
        <div
          role="status"
          className="theme-cream mt-4 w-full border border-primary/40 bg-card p-4 text-left"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            Download started
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            {title ?? label} is downloading now. Nothing is pending; the file
            is yours.
          </p>
          {nextDoor && (
            <Link
              href={nextDoor.href}
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              {nextDoor.label}
            </Link>
          )}
        </div>
      )}
      {downloaded && popupOpen && (
        <SuccessPopup
          eyebrow="Download started"
          title={title ?? label}
          body={
            <>
              {title ?? label} is downloading now. Nothing is pending; the
              file is yours.
            </>
          }
          door={nextDoor}
          onClose={() => setPopupOpen(false)}
        />
      )}
      {open && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Email required to download"
        >
          <div
            className="theme-cream w-full max-w-sm border border-border bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Free download
            </p>
            <h3 className="serif-display mt-2 text-xl tracking-tight">
              One email, then it&apos;s yours.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Enter your email to download {label}. One email unlocks the whole
              library.
            </p>
            <form onSubmit={submit} className="mt-4">
              <label htmlFor="resource-email" className="sr-only">
                Email address
              </label>
              <input
                id="resource-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted"
              />
              {/* honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              {error && <p role="alert" className="mt-2 text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={busy}
                className="mt-3 w-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {busy ? 'Sending...' : 'Send me the PDF'}
              </button>
            </form>
            <button
              type="button"
              onClick={close}
              className="mt-3 w-full cursor-pointer text-center text-xs text-muted hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
