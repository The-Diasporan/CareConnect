import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../store/AppContext";
import { JobCard } from "../../components/cards";
import { EmptyState, SectionHeading, StatusBadge } from "../../components/ui";
import { toneTile } from "../../components/theme";
import { timeAgo } from "../../components/format";
import { BookmarkIcon, MapPinIcon, SendIcon } from "../../components/icons";

export default function Activity() {
  const { jobs, savedJobIds, getAfh, myApplications } = useApp();

  const savedJobs = useMemo(
    () => savedJobIds.map((id) => jobs.find((j) => j.id === id)).filter(Boolean),
    [savedJobIds, jobs],
  );

  const applications = myApplications();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Caregiver dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Saved & applied
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Your bookmarked jobs and the applications you've submitted.
        </p>
      </div>

      {/* Applications */}
      <section>
        <SectionHeading
          eyebrow="My applications"
          title="Application status"
          subtitle={`${applications.length} submitted`}
        />
        {applications.length > 0 ? (
          <div className="grid gap-3">
            {applications.map((app) => {
              const job = jobs.find((j) => j.id === app.jobId);
              const afh = job ? getAfh(job.afhId) : undefined;
              return (
                <article key={app.id} className="card flex items-center gap-4 p-4">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneTile.brand}`}>
                    <SendIcon width={18} height={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-ink">
                      {job ? job.title : "Job no longer available"}
                    </h3>
                    {afh && (
                      <p className="flex items-center gap-1 text-xs text-ink/55">
                        <MapPinIcon width={13} height={13} /> {afh.name} &middot; Applied {timeAgo(app.appliedAt)}
                      </p>
                    )}
                  </div>
                  <StatusBadge status={app.status} />
                  <Link
                    to={`/caregiver/messages?thread=${app.id}`}
                    className="btn-secondary shrink-0 px-3 py-1.5 text-xs"
                  >
                    <SendIcon width={14} height={14} /> Message
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<SendIcon width={24} height={24} />}
            title="No applications yet"
            description="Apply to a job from the board and track its status here."
          />
        )}
      </section>

      {/* Saved jobs */}
      <section>
        <SectionHeading
          eyebrow="Bookmarks"
          title="Saved jobs"
          subtitle={`${savedJobs.length} saved`}
        />
        {savedJobs.length > 0 ? (
          <div className="grid gap-4">
            {savedJobs.map((job) => (
              <JobCard key={job!.id} job={job!} afh={getAfh(job!.afhId)} showActions />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookmarkIcon width={24} height={24} />}
            title="No saved jobs yet"
            description="Tap the bookmark on any job to save it for later."
          />
        )}
      </section>

      <p className="text-center text-sm text-ink/50">
        <Link to="/caregiver/jobs" className="font-medium text-brand-600 dark:text-brand-400">
          Browse the job board &rarr;
        </Link>
      </p>
    </div>
  );
}
