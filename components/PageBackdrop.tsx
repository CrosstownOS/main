export default function PageBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[32rem] overflow-hidden sm:h-[36rem]"
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-[0.55]"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      <div className="absolute inset-0 z-20 bg-accent/10 mix-blend-color" />
    </div>
  )
}
