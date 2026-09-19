import type { ReactNode } from "react";
import type { ApplicationStatus, JobType } from "../types";
import { StarIcon } from "./icons";
import {
  jobTypeLabel,
  jobTypeTone,
  statusLabel,
  statusTone,
  toneChip,
  toneTile,
  type Tone,
} from "./theme";

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

export function JobTypeChip({ type }: { type: JobType }) {
  return <Chip tone={jobTypeTone[type]}>{jobTypeLabel[type]}</Chip>;
}

export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return <span className={`chip ${toneChip[tone]} ${className}`}>{children}</span>;
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
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
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
        <div className={`mb-1 flex h-12 w-12 items-center justify-center rounded-full ${toneTile.brand}`}>
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

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <Chip tone={statusTone[status]}>{statusLabel[status]}</Chip>;
}

