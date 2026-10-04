// Cal.com inline booking embed shared by the inquiry paths.
// Renders the "Book a call" heading, the embedded calendar for one event
// type, and the write-first line that points at the form below it.

type CalBookingProps = {
  url: string
  title: string
}

export default function CalBooking({ url, title }: CalBookingProps) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
        Book a call
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Pick a time that works. You will get a calendar confirmation with the
        call details.
      </p>
      <div className="paper mt-4 border border-border">
        <iframe
          src={`${url}?embed=true`}
          title={title}
          loading="lazy"
          className="h-[640px] w-full"
        />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Prefer to write first? Use the form below.
      </p>
    </div>
  )
}
