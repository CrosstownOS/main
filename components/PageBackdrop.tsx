"use client"

import { useEffect, useRef, useState } from "react"

type PageBackdropProps = {
  /**
   * Full-viewport fixed backdrop (homepage). Default is the 32rem top banner
   * used by every other page. Same video, same poster, same behavior.
   */
  fixed?: boolean
}

const DESKTOP_QUERY = "(min-width: 768px)"
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"
const POSTER_SRC = "/images/bg-poster.jpg"

export default function PageBackdrop({ fixed = false }: PageBackdropProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  // SSR-safe default: poster-only until the client can measure the viewport.
  // Mobile viewports never render the <video> element, so the 859KB bg.mp4
  // is never downloaded on phones.
  const [isDesktop, setIsDesktop] = useState(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const motionMq = window.matchMedia(REDUCED_MOTION_QUERY)
    const applyMotionPreference = () => {
      reducedMotionRef.current = motionMq.matches
      // CSS cannot stop <video> playback, so pause explicitly when the
      // user prefers reduced motion. Runs on mount and on changes.
      if (motionMq.matches) video.pause()
    }
    applyMotionPreference()

    const tryPlay = () => {
      if (reducedMotionRef.current) return
      video.play().catch(() => {})
    }
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else {
        tryPlay()
      }
    }

    motionMq.addEventListener("change", applyMotionPreference)
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("touchstart", tryPlay, { passive: true, once: true })
    window.addEventListener("pointerdown", tryPlay, { once: true })
    return () => {
      motionMq.removeEventListener("change", applyMotionPreference)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("touchstart", tryPlay)
      window.removeEventListener("pointerdown", tryPlay)
    }
  }, [isDesktop])

  return (
    <div
      className={
        fixed
          ? "pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
          : "pointer-events-none absolute inset-x-0 top-0 z-0 h-[32rem] overflow-hidden sm:h-[36rem]"
      }
      aria-hidden="true"
    >
      {isDesktop ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          className="h-full w-full object-cover opacity-[0.55]"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      ) : (
        <img
          src={POSTER_SRC}
          alt=""
          className="h-full w-full object-cover opacity-[0.55]"
        />
      )}

      <div
        className={
          fixed
            ? "absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background/95"
            : "absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background"
        }
      />
    </div>
  )
}
