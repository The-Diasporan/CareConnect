import type { ApplicationStatus, JobType } from "../types";

/**
 * Semantic color tones shared by chips, badges, and icon tiles.
 *
 * Every tone defines both its light and dark appearance in one place so a new
 * accent can't ship light-mode-only. Callers pick a tone instead of passing raw
 * `bg-*`/`text-*` classes — Tailwind resolves conflicting utilities by CSS
 * source order, not by the order they appear in a className string, so a
 * caller-supplied background silently loses to a component's own default.
 */
export type Tone =
  | "neutral"
  | "brand"
  | "emerald"
  | "blue"
  | "violet"
  | "amber"
  | "warm";

export const toneChip: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink/70 ring-1 ring-inset ring-ink/10",
  brand:
    "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30",
  emerald:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30",
  blue: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30",
  violet:
    "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/30",
  amber:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30",
  warm: "bg-warm-50 text-warm-700 ring-1 ring-inset ring-warm-200 dark:bg-warm-500/15 dark:text-warm-300 dark:ring-warm-500/30",
};

/** Square icon tiles (no ring, slightly stronger fill than a chip). */
export const toneTile: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink/50",
  brand: "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300",
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
  warm: "bg-warm-100 text-warm-600 dark:bg-warm-500/15 dark:text-warm-300",
};

/**
 * Accent text color for large figures, eyebrows, and slide headings.
 *
 * Presentation surfaces need the tone's color without a chip's fill, so this
 * lives beside `toneChip`/`toneTile` rather than being re-derived at each
 * call site.
 */
export const toneText: Record<Tone, string> = {
  neutral: "text-ink/60",
  brand: "text-brand-600 dark:text-brand-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  blue: "text-blue-600 dark:text-blue-400",
  violet: "text-violet-600 dark:text-violet-400",
  amber: "text-amber-600 dark:text-amber-400",
  warm: "text-warm-600 dark:text-warm-400",
};

/** Solid accent fill for progress bars, rules, and step markers. */
export const toneBar: Record<Tone, string> = {
  neutral: "bg-ink/30",
  brand: "bg-brand-600",
  emerald: "bg-emerald-500",
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  warm: "bg-warm-500",
};

export const jobTypeTone: Record<JobType, Tone> = {
  "full-time": "brand",
  "part-time": "blue",
  "shift-based": "violet",
};

export const jobTypeLabel: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "shift-based": "Shift-based",
};

export const statusTone: Record<ApplicationStatus, Tone> = {
  pending: "amber",
  reviewed: "blue",
  interview: "violet",
  hired: "emerald",
  declined: "neutral",
};

export const statusLabel: Record<ApplicationStatus, string> = {
  pending: "Pending",
  reviewed: "Reviewed",
  interview: "Interview",
  hired: "Hired",
  declined: "Declined",
};

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "pending",
  "reviewed",
  "interview",
  "hired",
  "declined",
];

export function statusText(status: ApplicationStatus): string {
  return statusLabel[status];
}

