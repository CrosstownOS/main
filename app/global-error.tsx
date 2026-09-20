"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="en" className="dark">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "oklch(0.06 0.005 80)",
          color: "oklch(0.94 0.01 80)",
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        }}
      >
        <main
          style={{
            maxWidth: "32rem",
            padding: "2rem",
            border: "1px solid oklch(0.20 0.02 80)",
            backgroundColor: "oklch(0.11 0.01 80)",
          }}
        >
          <p
            style={{
              margin: "0 0 1rem",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "oklch(0.50 0.08 250)",
            }}
          >
            System Notice
          </p>
          <h1
            style={{
              margin: "0 0 1rem",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "1.75rem",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Something went wrong.
          </h1>
          <p
            style={{
              margin: "0 0 2rem",
              fontSize: "0.8rem",
              lineHeight: 1.7,
              color: "oklch(0.60 0.02 80)",
            }}
          >
            An unexpected error interrupted this page. You can try again, or
            reach Crosstown directly at jeremy@crosstownosrv.camp.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              width: "100%",
              padding: "0.9rem 1.25rem",
              border: "1px solid oklch(0.50 0.08 250)",
              backgroundColor: "oklch(0.50 0.08 250)",
              color: "#ffffff",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: 0,
            }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  )
}