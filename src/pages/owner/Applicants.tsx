import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../store/AppContext";
import { ApplicantCard } from "../../components/cards";
import { EmptyState } from "../../components/ui";
import { InboxIcon } from "../../components/icons";
import type { ApplicationStatus } from "../../types";

type Filter = "all" | ApplicationStatus;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "reviewed", label: "Reviewed" },
  { id: "interview", label: "Interview" },
  { id: "hired", label: "Hired" },
  { id: "declined", label: "Declined" },
];

export default function Applicants() {
  const {
    applicationsForOwner,
    jobs,
    getCaregiver,
    updateApplicationStatus,
    markApplicantsSeen,
  } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    markApplicantsSeen();
  }, [markApplicantsSeen]);

  const all = applicationsForOwner();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length };
    for (const a of all) c[a.status] = (c[a.status] ?? 0) + 1;
    return c;
  }, [all]);

  const visible = useMemo(
    () => (filter === "all" ? all : all.filter((a) => a.status === filter)),
    [all, filter],
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-600 dark:text-warm-400">
          Home owner dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Applicant tracking
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Review caregivers who applied to your openings and move them through your pipeline.
        </p>
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {(["pending", "reviewed", "interview", "hired", "declined"] as ApplicationStatus[]).map(
          (s) => (
            <div key={s} className="card px-4 py-3 text-center">
              <p className="font-display text-2xl font-bold text-ink">
                {counts[s] ?? 0}
              </p>
              <p className="text-xs capitalize text-ink/55">{s}</p>
            </div>
          ),
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`chip px-3 py-2 transition ${
              filter === f.id
                ? "bg-warm-500 text-white"
                : "bg-surface text-ink/70 ring-1 ring-inset ring-line/10 hover:bg-ink/5"
            }`}
          >
            {f.label}
            <span className="ml-1 opacity-70">{counts[f.id] ?? 0}</span>
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-4">
          {visible.map((app) => (
            <ApplicantCard
              key={app.id}
              application={app}
              job={jobs.find((j) => j.id === app.jobId)}
              caregiver={getCaregiver(app.caregiverId)}
              onStatusChange={(status) => updateApplicationStatus(app.id, status)}
              messageHref={`/owner/messages?thread=${app.id}`}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<InboxIcon width={24} height={24} />}
          title={filter === "all" ? "No applicants yet" : `No ${filter} applicants`}
          description={
            filter === "all"
              ? "When caregivers apply to your jobs, they'll show up here."
              : "Try a different filter to see other applicants."
          }
        />
      )}

      <p className="text-center text-sm text-ink/50">
        <Link to="/owner/jobs" className="font-medium text-warm-600 dark:text-warm-400">
          Post another job &rarr;
        </Link>
      </p>
    </div>
  );
}
