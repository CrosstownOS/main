"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ── STRUCTURAL CONTAINER ──
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, clean = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          !clean && "max-w-7xl",
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

// ── FIELD SECTION BLOCK ──
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  withBorder?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, withBorder = true, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full scroll-mt-[104px] py-16 lg:py-24 overflow-hidden",
          withBorder && "border-b border-border",
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

// ── TELEMETRY PANEL / CARD PRIMITIVE ──
interface TelemetryBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "live" | "alert" | "dormant" | "none";
  interactive?: boolean;
  scrollable?: boolean;
  glass?: "heavy" | "light" | "none";
}

export const TelemetryBox = React.forwardRef<HTMLDivElement, TelemetryBoxProps>(
  ({ className, status = "none", interactive = false, scrollable = false, glass = "light", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-foreground border border-border/60 transition-all duration-200",
          glass === "heavy" && "bg-background md:bg-background/90 md:backdrop-blur",
          glass === "light" && "bg-card md:bg-card/55 md:backdrop-blur-sm",
          glass === "none" && "bg-card",
          interactive && "hover:border-primary/60 hover:bg-primary/10 cursor-pointer",
          scrollable && "overflow-auto custom-scrollbar",
          status === "live" && "border-l-2 border-l-[var(--status-live)]",
          status === "alert" && "border-l-2 border-l-[var(--status-alert)]",
          status === "dormant" && "border-l-2 border-l-[var(--status-dormant)]",
          className
        )}
        {...props}
      />
    );
  }
);
TelemetryBox.displayName = "TelemetryBox";

// ── TYPOGRAPHY PRIMITIVES ──
// Level 1 & 2: Serif for display authority
// Level 3 & 4: Sans for structural UI clarity
export const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 }
>(({ className, level = 2, ...props }, ref) => {
  const Tag = `h${level}` as const;
  return (
    <Tag
      ref={ref}
      className={cn(
        "font-bold tracking-tight text-foreground text-balance",
        level === 1 && "font-serif text-4xl sm:text-5xl lg:text-6xl font-black",
        level === 2 && "font-serif text-2xl sm:text-3xl lg:text-4xl",
        level === 3 && "font-sans text-xl sm:text-2xl",
        level === 4 && "font-sans text-lg font-semibold",
        className
      )}
      {...props}
    />
  );
});
Heading.displayName = "Heading";

export const TerminalLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { pulse?: boolean; variant?: "default" | "alert" | "live" }
>(({ className, pulse = false, variant = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "font-mono text-[10px] tracking-[0.25em] uppercase text-primary",
        variant === "alert" && "text-[var(--status-alert)]",
        variant === "live" && "text-[var(--status-live)]",
        pulse && "wiring-pulse",
        className
      )}
      {...props}
    />
  );
});
TerminalLabel.displayName = "TerminalLabel";

// ── CARD PRIMITIVES: the app grammar (Evidens foundation, 2026-11-11) ──
// Faces and treatments live in globals.css (.sheet-card, .record-card,
// .card-stack). Flat only: hairline borders and the stacked offset carry
// the treatment. No glow, no halo.

// White working sheet on the cream ground.
export const SheetCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("sheet-card", className)} {...props} />;
  }
);
SheetCard.displayName = "SheetCard";

// Cream record card: the dossier face.
export const RecordCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("record-card", className)} {...props} />;
  }
);
RecordCard.displayName = "RecordCard";

// Stacked treatment wrapper: a full card in the room color sits offset
// behind the face card placed inside.
interface RoomStackProps extends React.HTMLAttributes<HTMLDivElement> {
  room: "source" | "field" | "acquire";
}

export const RoomStack = React.forwardRef<HTMLDivElement, RoomStackProps>(
  ({ className, room, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("card-stack", `card-stack-${room}`, className)}
        {...props}
      />
    );
  }
);
RoomStack.displayName = "RoomStack";

// ── EVIDENCE CHIP: the six states, worn like a stamp ──
export type EvidenceState =
  | "verified"
  | "broker-reported"
  | "missing-evidence"
  | "underwriting-assumption"
  | "calculated"
  | "unresolved";

const EVIDENCE_STATE_LABELS: Record<EvidenceState, string> = {
  verified: "Verified",
  "broker-reported": "Broker-reported",
  "missing-evidence": "Missing evidence",
  "underwriting-assumption": "Underwriting assumption",
  calculated: "Calculated",
  unresolved: "Unresolved",
};

const EVIDENCE_STATE_COLORS: Record<EvidenceState, string> = {
  verified: "var(--success)",
  "broker-reported": "var(--accent-secondary)",
  "missing-evidence": "var(--critical)",
  "underwriting-assumption": "var(--status-alert)",
  calculated: "var(--calculated)",
  unresolved: "var(--muted)",
};

interface EvidenceChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  state: EvidenceState;
}

export const EvidenceChip = React.forwardRef<HTMLSpanElement, EvidenceChipProps>(
  ({ className, state, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 border border-border bg-[var(--paper)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 flex-none"
          style={{ backgroundColor: EVIDENCE_STATE_COLORS[state] }}
        />
        {children ?? EVIDENCE_STATE_LABELS[state]}
      </span>
    );
  }
);
EvidenceChip.displayName = "EvidenceChip";

// ── BUTTONS: the established styles, flat. Primary is Acquire navy behind
// white text; outline is hairline ink. No halo on either (2026-11-11). ──
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60",
          variant === "primary" &&
            "border border-primary/60 bg-primary-deep px-6 py-3 text-white hover:bg-primary-deep/90",
          variant === "outline" &&
            "border border-border bg-transparent px-6 py-3 text-foreground hover:border-primary/60 hover:text-primary",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";