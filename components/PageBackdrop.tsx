"use client"

import { useEffect, useRef } from "react"

type PageBackdropProps = {
  /**
   * Full-viewport fixed backdrop (homepage). Default is the 32rem top banner
   * used by every other page. Same video, same poster, same behavior.
   */
  fixed?: boolean
}

export default function PageBackdrop({ fixed = false }: PageBackdropProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Pause the backdrop video while the tab is hidden; resume on return.
  // Mobile browsers often block autoplay: kick playback on first interaction.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const tryPlay = () => {
      video.play().catch(() => {})
    }
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else {
        tryPlay()
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("touchstart", tryPlay, { passive: true, once: true })
    window.addEventListener("pointerdown", tryPlay, { once: true })
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("touchstart", tryPlay)
      window.removeEventListener("pointerdown", tryPlay)
    }
  }, [])

  return (
    <div
      className={
        fixed
          ? "pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
          : "pointer-events-none absolute inset-x-0 top-0 z-0 h-[32rem] overflow-hidden sm:h-[36rem]"
      }
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/bg-poster.jpg"
        className="h-full w-full object-cover opacity-[0.55]"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

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
