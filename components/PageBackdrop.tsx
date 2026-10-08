"use client"

import { useEffect, useRef } from "react"

export default function PageBackdrop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Pause the backdrop video while the tab is hidden; resume on return.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[32rem] overflow-hidden sm:h-[36rem]"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster="/images/opengraph.jpg"
        className="hidden h-full w-full object-cover opacity-[0.55] md:block"
      >
        <source src="/bg.mp4" type="video/mp4" media="(min-width: 768px)" />
      </video>
      <img
        src="/images/opengraph.jpg"
        alt=""
        className="h-full w-full object-cover opacity-[0.55] md:hidden"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background" />
    </div>
  )
}
