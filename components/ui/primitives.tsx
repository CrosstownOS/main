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
          "relative w-full py-16 lg:py-24 overflow-hidden",
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