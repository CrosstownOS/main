"use client";

/**
 * Elevation motion primitives (2026-11-12): the Hover family rebuilt in
 * the site's own code and dress. Specimens are reference only; the
 * behaviors land here stripped of costume: cream carriers, radius 0,
 * Playfair / Inter / JetBrains Mono, the owning room's swatch as the
 * offset and slab. Motion is spent only where the motion is the meaning,
 * and every primitive resolves static under prefers-reduced-motion.
 */

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export type Room = "source" | "field" | "acquire";

const ROOM_VAR: Record<Room, string> = {
  source: "var(--source)",
  field: "var(--field)",
  acquire: "var(--acquire)",
};

export const SPRING = { type: "spring", stiffness: 380, damping: 30, mass: 0.9 } as const;

// ── SHIFT TABS (shift highlight tabs): a row of white faces, each on a
// base slab in the room color. The selected face lifts off its slab and
// a highlight plate travels between tabs (layout animation); the panels
// crossfade with a short rise. Used where chapters or categories switch.
export interface ShiftTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function ShiftTabs({
  items,
  room = "source",
  ariaLabel,
  className,
}: {
  items: ShiftTabItem[];
  room?: Room;
  ariaLabel: string;
  className?: string;
}) {
  const [selected, setSelected] = React.useState(items[0]?.id);
  const active = items.find((item) => item.id === selected) ?? items[0];
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-3"
      >
        {items.map((item) => {
          const isSelected = item.id === active?.id;
          return (
            <span
              key={item.id}
              className="relative inline-block"
              style={{ paddingRight: 4, paddingBottom: 4 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundColor: ROOM_VAR[room],
                  transform: "translate(4px, 4px)",
                }}
              />
              <button
                role="tab"
                aria-selected={isSelected}
                data-selected={isSelected}
                onClick={() => setSelected(item.id)}
                className={cn(
                  "shift-tab relative border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em]",
                  isSelected
                    ? "border-foreground bg-[var(--paper)] text-foreground"
                    : "border-border bg-[var(--paper)] text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5"
                    style={{ backgroundColor: ROOM_VAR[room] }}
                  />
                )}
              </button>
            </span>
          );
        })}
      </div>
      <div className="relative mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active?.id}
            role="tabpanel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={reduce ? { duration: 0.12 } : { ...SPRING }}
          >
            {active?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── STEPPED PROGRESS (stepped progress / morph stepped progress):
// numbered square stations joined by bars in the room color. Stations
// at or before `current` read as stamped done: the numeral flips into
// a check as the line rules itself when the strip scrolls into view.
export interface StepItem {
  label: string;
  detail?: string;
}

export function SteppedProgress({
  steps,
  current,
  room = "acquire",
  className,
}: {
  steps: StepItem[];
  current: number;
  room?: Room;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const color = ROOM_VAR[room];

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <ol className="flex items-start">
        {steps.map((step, i) => {
          const done = i < current;
          const isCurrent = i === current;
          const reached = done || isCurrent;
          return (
            <React.Fragment key={step.label}>
              <li className="flex w-10 flex-none flex-col items-center">
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center border font-mono text-[11px] font-semibold",
                    reached
                      ? "border-foreground text-white"
                      : "border-border bg-[var(--paper)] text-muted",
                  )}
                  style={
                    reached ? { backgroundColor: color } : undefined
                  }
                >
                  {done && inView && !reduce ? (
                    <motion.span
                      initial={{ rotate: -14, scale: 1.35, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.22, ...SPRING }}
                      aria-hidden="true"
                    >
                      ✓
                    </motion.span>
                  ) : done ? (
                    <span aria-hidden="true">✓</span>
                  ) : (
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  )}
                </span>
              </li>
              {i < steps.length - 1 && (
                <li aria-hidden="true" className="mt-5 min-w-4 flex-1 px-1">
                  <span className="relative block h-0.5 bg-border">
                    <motion.span
                      className="absolute inset-0 block origin-left"
                      style={{ backgroundColor: color }}
                      initial={{ scaleX: 0 }}
                      animate={
                        inView && i < current
                          ? { scaleX: 1 }
                          : { scaleX: 0 }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { delay: 0.1 + i * 0.22, duration: 0.45, ease: "easeOut" }
                      }
                    />
                  </span>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
      <ol className="mt-3 hidden justify-between gap-2 sm:flex">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className={cn(
              "flex-1 text-center",
              i === 0 && "text-left",
              i === steps.length - 1 && "text-right",
            )}
          >
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.18em]",
                i <= current ? "text-foreground" : "text-muted",
              )}
            >
              {step.label}
            </span>
            {step.detail && (
              <span className="mt-1 block text-xs text-muted">
                {step.detail}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── COUNT FIGURE (shifting countdown / count up behavior): a figure
// that arrives by counting up into view, mono and tabular, landing on
// its value instead of blinking into place. Static under reduced
// motion and for no-JS (server renders the final value; the client
// re-counts only when JS and motion allow).
export function CountFigure({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    if (!inView || reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    setDisplay(0);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${value.toLocaleString()}${suffix}`}
    >
      <span aria-hidden="true">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </span>
    </span>
  );
}

// ── STACKED NOTICES (stacked notifications): cream slips that spring
// up in the corner and stack with layout manners. Any surface can file
// a notice by dispatching `evidens:notice` on window with
// { title, body?, room? }. Notices dismiss by hand or after a stay;
// they never carry record facts, only confirmations of an action the
// visitor just took.
export interface NoticeDetail {
  title: string;
  body?: string;
  room?: Room;
}

interface Notice extends NoticeDetail {
  id: number;
}

export function pushNotice(detail: NoticeDetail) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<NoticeDetail>("evidens:notice", { detail }),
    );
  }
}

export function NoticeStack() {
  const [notices, setNotices] = React.useState<Notice[]>([]);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    let nextId = 1;
    const timers = new Map<number, ReturnType<typeof setTimeout>>();
    const onNotice = (event: Event) => {
      const detail = (event as CustomEvent<NoticeDetail>).detail;
      const id = nextId++;
      setNotices((current) => [...current.slice(-2), { ...detail, id }]);
      timers.set(
        id,
        setTimeout(() => {
          setNotices((current) => current.filter((n) => n.id !== id));
        }, 7000),
      );
    };
    window.addEventListener("evidens:notice", onNotice);
    return () => {
      window.removeEventListener("evidens:notice", onNotice);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 right-4 z-[90] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-4"
    >
      <AnimatePresence>
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            layout={!reduce}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: 32 }}
            transition={reduce ? { duration: 0.12 } : { ...SPRING }}
            className={cn(
              "card-stack pointer-events-auto",
              notice.room === "field" && "card-stack-field",
              notice.room === "acquire" && "card-stack-acquire",
              (notice.room === "source" || !notice.room) &&
                "card-stack-source",
            )}
          >
            <div className="record-card flex items-start gap-3 px-4 py-3">
              <span
                aria-hidden="true"
                className="mt-0.5 grid h-5 w-5 flex-none place-items-center border border-foreground font-mono text-[10px] text-white"
                style={{
                  backgroundColor: ROOM_VAR[notice.room ?? "source"],
                }}
              >
                ✓
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {notice.title}
                </p>
                {notice.body && (
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">
                    {notice.body}
                  </p>
                )}
              </div>
              <button
                type="button"
                aria-label="Dismiss notice"
                onClick={() =>
                  setNotices((current) =>
                    current.filter((n) => n.id !== notice.id),
                  )
                }
                className="flex-none px-1 font-mono text-xs text-muted hover:text-foreground"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── MOTION ACCORDION (accordion solutions): rows that expand in place
// to reveal their body, the open row's face lifting off its slab in the
// room color. One row open at a time; the closed rows keep their place.
export interface AccordionItem {
  id: string;
  title: string;
  body: React.ReactNode;
}

export function MotionAccordion({
  items,
  room = "acquire",
  className,
}: {
  items: AccordionItem[];
  room?: Room;
  className?: string;
}) {
  const [open, setOpen] = React.useState<string | null>(items[0]?.id ?? null);
  const reduce = useReducedMotion();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => {
        const isOpen = item.id === open;
        return (
          <div
            key={item.id}
            className={cn(
              "card-stack",
              room === "source" && "card-stack-source",
              room === "field" && "card-stack-field",
              room === "acquire" && "card-stack-acquire",
              !isOpen && "stack-spring",
            )}
          >
            <div className="sheet-card">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-serif text-lg text-foreground">
                  {item.title}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={reduce ? { duration: 0 } : { ...SPRING }}
                  className="flex-none font-mono text-base text-muted"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { height: { ...SPRING }, opacity: { duration: 0.2 } }
                    }
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
                      {item.body}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
