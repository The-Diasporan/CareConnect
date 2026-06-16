import type { ReactNode } from "react";
import type { ApplicationStatus, JobType } from "../types";
import { StarIcon } from "./icons";

export function StarRating({
  value,
  size = 16,
  showValue = false,
  className = "",
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span
        className="inline-flex"
        role="img"
        aria-label={`${value} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((i) => {
          const fill =
            rounded >= i ? "full" : rounded >= i - 0.5 ? "half" : "empty";
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <StarIcon
                width={size}
                height={size}
                className="absolute inset-0 text-ink/15"
              />
              {fill !== "empty" && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: fill === "half" ? size / 2 : size }}
                >
                  <StarIcon width={size} height={size} className="text-amber-400" />
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showValue && (
        <span className="text-sm font-semibold text-ink/80">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}

export function Avatar({
  name,
  color,
  size = 44,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-inner"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.38,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

const jobTypeStyles: Record<JobType, string> = {
  "full-time": "bg-brand-50 text-brand-700 ring-1 ring-brand-200",
  "part-time": "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  "shift-based": "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
};

const jobTypeLabel: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  "shift-based": "Shift-based",
};

export function JobTypeChip({ type }: { type: JobType }) {
  return <span className={`chip ${jobTypeStyles[type]}`}>{jobTypeLabel[type]}</span>;
}

export function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`chip bg-ink/5 text-ink/70 ${className}`}>{children}</span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-ink/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      {icon && (
        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          {icon}
        </div>
      )}
      <p className="font-semibold text-ink">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-ink/60">{description}</p>
      )}
    </div>
  );
}

const statusStyles: Record<ApplicationStatus, string> = {
  pending:
    "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/30",
  reviewed:
    "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/30",
  interview:
    "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:ring-violet-500/30",
  hired:
    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30",
  declined:
    "bg-ink/5 text-ink/55 ring-1 ring-ink/10",
};

const statusLabel: Record<ApplicationStatus, string> = {
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

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={`chip ${statusStyles[status]}`}>{statusLabel[status]}</span>;
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}
