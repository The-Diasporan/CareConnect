import { useEffect, useMemo, useState } from "react";
import { useApp } from "../../store/AppContext";
import { JobCard } from "../../components/cards";
import { EmptyState, SectionHeading } from "../../components/ui";
import { BoltIcon, BriefcaseIcon, SearchIcon } from "../../components/icons";
import type { JobType } from "../../types";

type Filter = "all" | JobType;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All jobs" },
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "shift-based", label: "Shift-based" },
];

export default function JobBoard() {
  const { jobs, getAfh, markJobsSeen } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    markJobsSeen();
  }, [markJobsSeen]);

  const sorted = useMemo(
    () => [...jobs].sort((a, b) => b.postedAt - a.postedAt),
    [jobs],
  );

  const urgent = useMemo(() => sorted.filter((j) => j.urgent), [sorted]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter((j) => {
      if (filter !== "all" && j.jobType !== filter) return false;
      if (!q) return true;
      const afh = getAfh(j.afhId);
      return (
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        (afh?.name.toLowerCase().includes(q) ?? false) ||
        (afh?.city.toLowerCase().includes(q) ?? false)
      );
    });
  }, [sorted, filter, query, getAfh]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Caregiver dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Find your next shift
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          {jobs.length} open roles from Adult Family Homes near you.
        </p>
      </div>

      {/* Urgent banner */}
      {urgent.length > 0 && (
        <section
          className="overflow-hidden rounded-2xl border border-warm-300 bg-gradient-to-br from-warm-50 to-surface p-5 shadow-card dark:border-warm-500/40 dark:from-warm-500/10"
          aria-label="Urgent shift openings"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 animate-pulse-ring items-center justify-center rounded-full bg-warm-500 text-white">
              <BoltIcon width={18} height={18} />
            </span>
            <h2 className="font-display text-lg font-bold text-warm-700 dark:text-warm-400">
              Urgent fills — {urgent.length} need coverage now
            </h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {urgent.map((job) => (
              <JobCard key={job.id} job={job} afh={getAfh(job.afhId)} showActions />
            ))}
          </div>
        </section>
      )}

      {/* Filters + search */}
      <div>
        <SectionHeading
          eyebrow="Job board"
          title="Browse all openings"
          subtitle="Filter by schedule that fits your life."
        />

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <SearchIcon
              width={18}
              height={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
            />
            <input
              className="input pl-10"
              placeholder="Search by title, home, or city…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`chip px-3 py-2 transition ${
                  filter === f.id
                    ? "bg-brand-600 text-white"
                    : "bg-surface text-ink/70 ring-1 ring-inset ring-line/10 hover:bg-ink/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} afh={getAfh(job.afhId)} showActions />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BriefcaseIcon width={24} height={24} />}
            title="No jobs match your filters"
            description="Try clearing your search or choosing a different schedule."
          />
        )}
      </div>
    </div>
  );
}
