"use client"

import { useCallback, useEffect, useRef, useState } from "react"

function storageKey(tool: string, deal: string): string {
  const d = (deal || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "untitled"
  return `crosstown.tools.${tool}.${d}`
}

/**
 * Tool state with localStorage autosave, namespaced per tool and deal name.
 * No account, no backend. State stays in the browser until the user exports it.
 */
export function useToolState<T extends Record<string, unknown>>(
  tool: string,
  deal: string,
  initial: T,
): [T, (patch: Partial<T>) => void, () => void, boolean] {
  const [state, setState] = useState<T>(initial)
  const [loaded, setLoaded] = useState(false)
  const key = storageKey(tool, deal)
  const first = useRef(true)

  // Load when the deal name changes.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<T>
        setState({ ...initial, ...parsed })
      } else {
        setState(initial)
      }
    } catch {
      setState(initial)
    }
    setLoaded(true)
    first.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Autosave on change (skip the load pass).
  useEffect(() => {
    if (!loaded) return
    if (first.current) {
      first.current = false
      return
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(state))
    } catch {
      /* storage unavailable; the tool still works */
    }
  }, [state, loaded, key])

  const patch = useCallback((p: Partial<T>) => {
    setState((s) => ({ ...s, ...p }))
  }, [])

  const reset = useCallback(() => {
    setState(initial)
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [state, patch, reset, loaded]
}
