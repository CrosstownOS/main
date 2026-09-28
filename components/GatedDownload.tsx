'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

const STORAGE_KEY = 'crosstown_resource_email'

type Props = {
  file: string
  label: string
  className?: string
}

/**
 * Download button gated on a one-time email capture.
 * First click opens the email modal; the address is remembered in
 * localStorage so every later download is one click.
 */
export function GatedDownloadButton({ file, label, className }: Props) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const startDownload = () => {
    track('resource_download', { tool: label })
    const a = document.createElement('a')
    a.href = file
    a.setAttribute('download', '')
    document.body.appendChild(a)
    a.click()
    a.remove()
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
      setOpen(false)
      startDownload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        Download PDF
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Email required to download"
        >
          <div
            className="w-full max-w-sm border border-border bg-card p-6"
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
              {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
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
              onClick={() => setOpen(false)}
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
