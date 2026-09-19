import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { AFH, Caregiver, Job, Review } from "../types";
import { useApp } from "../store/AppContext";
import { ApplyModal } from "./ApplyModal";
import { Avatar, Chip, JobTypeChip, StarRating, StatusBadge } from "./ui";
import { APPLICATION_STATUSES, statusText, toneChip, toneTile } from "./theme";
import { timeAgo } from "./format";
import type { Application, ApplicationStatus } from "../types";
import {
  BoltIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckBadgeIcon,
  CheckIcon,
  ClockIcon,
  DollarIcon,
  MapPinIcon,
  SendIcon,
  TrashIcon,
} from "./icons";

export function UrgentPill() {
  return (
    <span className="chip animate-pulse-ring bg-warm-500 text-white">
      <BoltIcon width={13} height={13} />
      URGENT
    </span>
  );
}

export function JobCard({
  job,
  afh,
  action,
  showActions = false,
}: {
  job: Job;
  afh?: AFH;
  action?: ReactNode;
  /** When true, render caregiver bookmark + apply controls. */
  showActions?: boolean;
}) {
  return (
    <article
      className={`card animate-fade-in p-5 transition hover:shadow-soft ${
        job.urgent ? "ring-1 ring-warm-300 dark:ring-warm-500/40" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {afh && <Avatar name={afh.name} color={afh.accentColor} size={44} />}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-base font-semibold text-ink">
                {job.title}
              </h3>
              {job.urgent && <UrgentPill />}
            </div>
            {afh && (
              <p className="mt-0.5 flex items-center gap-1 text-sm text-ink/60">
                <MapPinIcon width={14} height={14} />
                {afh.name} &middot; {afh.city}
              </p>
            )}
          </div>
        </div>
        {action}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/70">
        {job.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <JobTypeChip type={job.jobType} />
        <Chip>
          <ClockIcon width={13} height={13} /> {job.hours}
        </Chip>
        <Chip tone="emerald">
          <DollarIcon width={13} height={13} /> ${job.payRate}/hr
        </Chip>
        <span className="ml-auto text-xs text-ink/40">{timeAgo(job.postedAt)}</span>
      </div>

      {showActions && <JobCardActions job={job} afh={afh} />}
    </article>
  );
}

function JobCardActions({ job, afh }: { job: Job; afh?: AFH }) {
  const { isSaved, toggleSaveJob, hasApplied, withdrawApplication } = useApp();
  const [showApply, setShowApply] = useState(false);
  const saved = isSaved(job.id);
  const applied = hasApplied(job.id);

  return (
    <div className="mt-4 flex items-center gap-2 border-t border-line/5 pt-4 dark:border-line/10">
      <button
        onClick={() => toggleSaveJob(job.id)}
        aria-pressed={saved}
        className={`btn px-3 py-2 text-sm ring-1 ring-inset transition ${
          saved
            ? "bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30"
            : "text-ink/70 ring-line/10 hover:bg-ink/5"
        }`}
        title={saved ? "Remove bookmark" : "Save job"}
      >
        {saved ? (
          <BookmarkFilledIcon width={16} height={16} />
        ) : (
          <BookmarkIcon width={16} height={16} />
        )}
        {saved ? "Saved" : "Save"}
      </button>

      {applied ? (
        <div className="ml-auto flex items-center gap-2">
          <span className={`chip ${toneChip.emerald}`}>
            <CheckIcon width={14} height={14} /> Applied
          </span>
          <button
            onClick={() => withdrawApplication(job.id)}
            className="btn-ghost px-3 py-2 text-sm"
          >
            Withdraw
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowApply(true)}
          className="btn-primary ml-auto px-4 py-2 text-sm"
        >
          Apply now
        </button>
      )}

      {showApply && (
        <ApplyModal job={job} afh={afh} onClose={() => setShowApply(false)} />
      )}
    </div>
  );
}

export function JobManageCard({
  job,
  onDelete,
}: {
  job: Job;
  onDelete: () => void;
}) {
  return (
    <article className="card flex items-center gap-4 p-4">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          job.urgent ? toneTile.warm : toneTile.brand
        }`}
      >
        {job.urgent ? <BoltIcon width={20} height={20} /> : <ClockIcon width={20} height={20} />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-semibold text-ink">{job.title}</h3>
          {job.urgent && <UrgentPill />}
        </div>
        <p className="mt-0.5 text-xs text-ink/55">
          {job.hours} &middot; ${job.payRate}/hr &middot; Posted {timeAgo(job.postedAt)}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="rounded-lg p-2 text-ink/40 transition hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
        aria-label={`Delete ${job.title}`}
        title="Remove posting"
      >
        <TrashIcon width={18} height={18} />
      </button>
    </article>
  );
}

export function AfhCard({ afh, jobCount }: { afh: AFH; jobCount: number }) {
  return (
    <Link
      to={`/caregiver/homes/${afh.id}`}
      className="card animate-fade-in block p-5 transition hover:shadow-soft"
    >
      <div className="flex items-start gap-3">
        <Avatar name={afh.name} color={afh.accentColor} size={48} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-semibold text-ink">
            {afh.name}
          </h3>
          <p className="flex items-center gap-1 text-sm text-ink/60">
            <MapPinIcon width={14} height={14} /> {afh.city}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <StarRating value={afh.rating} showValue />
        <span className="text-xs text-ink/45">({afh.reviewCount} reviews)</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-ink/70">{afh.blurb}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {afh.specialties.slice(0, 3).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line/5 pt-3 text-xs text-ink/55 dark:border-line/10">
        <span>{afh.beds} beds</span>
        <span className="font-medium text-brand-600 dark:text-brand-400">
          {jobCount} open {jobCount === 1 ? "role" : "roles"} &rarr;
        </span>
      </div>
    </Link>
  );
}

export function CaregiverCard({ caregiver }: { caregiver: Caregiver }) {
  return (
    <article className="card animate-fade-in p-5">
      <div className="flex items-start gap-3">
        <Avatar name={caregiver.name} color={caregiver.accentColor} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display text-base font-semibold text-ink">
              {caregiver.name}
            </h3>
            {caregiver.verified && (
              <CheckBadgeIcon
                width={18}
                height={18}
                className="text-brand-500"
                aria-label="Verified"
              />
            )}
          </div>
          <p className="text-sm text-ink/60">{caregiver.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <StarRating value={caregiver.rating} size={14} showValue />
            <span className="text-xs text-ink/45">
              {caregiver.yearsExperience} yrs exp &middot; {caregiver.city}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink/70">{caregiver.bio}</p>

      <div className="mt-4">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink/40">
          Certifications
        </p>
        <div className="flex flex-wrap gap-1.5">
          {caregiver.certifications.map((c) => (
            <Chip key={c} tone="brand">
              {c}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink/40">
          Skills
        </p>
        <div className="flex flex-wrap gap-1.5">
          {caregiver.skills.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ApplicantCard({
  application,
  job,
  caregiver,
  onStatusChange,
  messageHref,
}: {
  application: Application;
  job?: Job;
  caregiver?: Caregiver;
  onStatusChange: (status: ApplicationStatus) => void;
  messageHref?: string;
}) {
  return (
    <article className="card animate-fade-in p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Avatar
            name={application.caregiverName}
            color={caregiver?.accentColor ?? "#0d9488"}
            size={46}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display text-base font-semibold text-ink">
                {application.caregiverName}
              </h3>
              {caregiver?.verified && (
                <CheckBadgeIcon
                  width={16}
                  height={16}
                  className="text-brand-500"
                  aria-label="Verified"
                />
              )}
            </div>
            {caregiver && (
              <p className="text-sm text-ink/60">
                {caregiver.title} &middot; {caregiver.yearsExperience} yrs
              </p>
            )}
            {job && (
              <p className="mt-0.5 text-xs text-ink/45">
                Applied for <span className="font-medium text-ink/70">{job.title}</span>
              </p>
            )}
          </div>
        </div>
        <StatusBadge status={application.status} />
      </div>

      {application.message && (
        <p className="mt-3 rounded-xl bg-ink/5 px-3.5 py-2.5 text-sm leading-relaxed text-ink/75">
          &ldquo;{application.message}&rdquo;
        </p>
      )}

      {caregiver && caregiver.certifications.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {caregiver.certifications.slice(0, 4).map((c) => (
            <Chip key={c} tone="brand">
              {c}
            </Chip>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/5 pt-3 dark:border-line/10">
        <span className="text-xs text-ink/45">{timeAgo(application.appliedAt)}</span>
        <div className="flex flex-wrap items-center gap-2">
          {messageHref && (
            <Link to={messageHref} className="btn-secondary px-3 py-1.5 text-xs">
              <SendIcon width={14} height={14} /> Message
            </Link>
          )}
          <label className="flex items-center gap-2 text-xs text-ink/55">
            Status
            <select
              className="input w-auto py-1.5 text-sm"
              value={application.status}
              onChange={(e) => onStatusChange(e.target.value as ApplicationStatus)}
            >
              {APPLICATION_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {statusText(s)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </article>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="card animate-fade-in p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={review.authorName} color="#0f766e" size={40} />
          <div>
            <p className="font-semibold text-ink">{review.authorName}</p>
            <p className="text-xs text-ink/50">{review.authorRole}</p>
          </div>
        </div>
        <StarRating value={review.rating} size={15} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink/75">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="mt-3 text-xs text-ink/40">{timeAgo(review.date)}</p>
    </article>
  );
}
