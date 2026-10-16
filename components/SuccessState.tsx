"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import SuccessPopup, { type SuccessDoor } from "@/components/SuccessPopup"

export type { SuccessDoor }

type SuccessStateProps = {
  /** Mono eyebrow naming the completion, e.g. "Application received". */
  eyebrow: string
  /** Serif headline confirming what just happened, naming the specific thing. */
  title: string
  /** What happens next, or that nothing is pending. */
  body?: ReactNode
  /** The one contextual next door for this surface. */
  door?: SuccessDoor
  /** Extra actions rendered under the door in-flow (e.g. a modal Close button). */
  children?: ReactNode
  className?: string
  /**
   * Also present the completion as the branded SuccessPopup overlay on
   * top of this in-flow state. Defaults to true; surfaces whose success
   * presentation is managed elsewhere pass false.
   */
  popup?: boolean
}

/**
 * The site-wide success / thank-you pattern. Every completion point
 * (form submit, download, email save, subscribe) lands on this shape:
 * a plain confirmation naming what happened, what happens next where a
 * next step exists, and one contextual next door. Cream surface, serif
 * display title, module-blue eyebrow: the site's existing card language.
 *
 * The branded pop-up layer rides on the same props: when this state
 * mounts (which is the moment a completion fires), the SuccessPopup
 * overlay presents the identical eyebrow, title, body, and door, and
 * dismissing it returns the visitor to this in-flow record. A changed
 * completion (a different eyebrow or title on the same surface) opens
 * the pop-up again; dismissing it never re-opens it for the same one.
 */
export default function SuccessState({
  eyebrow,
  title,
  body,
  door,
  children,
  className,
  popup = true,
}: SuccessStateProps) {
  const [popupOpen, setPopupOpen] = useState(popup)
  const signature = `${eyebrow}\n${title}`
  const lastSignature = useRef(signature)

  useEffect(() => {
    if (lastSignature.current !== signature) {
      lastSignature.current = signature
      if (popup) setPopupOpen(true)
    }
  }, [signature, popup])

  return (
    <>
      <div
        role="status"
        className={cn(
          "theme-cream border border-primary/40 bg-primary/5 p-6 sm:p-8",
          className,
        )}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </p>
        <p className="serif-display mt-3 text-2xl tracking-tight text-foreground sm:text-3xl">
          {title}
        </p>
        {body ? (
          <div className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {body}
          </div>
        ) : null}
        {door ? (
          <Link
            href={door.href}
            className="mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {door.label}
          </Link>
        ) : null}
        {children}
      </div>
      {popup && popupOpen ? (
        <SuccessPopup
          eyebrow={eyebrow}
          title={title}
          body={body}
          door={door}
          onClose={() => setPopupOpen(false)}
        />
      ) : null}
    </>
  )
}
