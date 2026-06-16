import { useMemo, useState } from "react";
import { useApp } from "../../store/AppContext";
import { JobManageCard } from "../../components/cards";
import { EmptyState, SectionHeading } from "../../components/ui";
import { BoltIcon, BriefcaseIcon, CheckIcon, PlusIcon } from "../../components/icons";
import type { JobType, Shift } from "../../types";

const jobTypes: JobType[] = ["full-time", "part-time", "shift-based"];
const shifts: Shift[] = ["Day", "Evening", "Overnight", "Weekend"];

export default function PostJobs() {
  const { session, afhs, jobs, addJob, deleteJob } = useApp();
  const ownedIds = session?.ownedAfhIds ?? [];
  const ownedAfhs = useMemo(
    () => afhs.filter((a) => ownedIds.includes(a.id)),
    [afhs, ownedIds],
  );

  const [afhId, setAfhId] = useState(ownedIds[0] ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payRate, setPayRate] = useState("24");
  const [hours, setHours] = useState("");
  const [jobType, setJobType] = useState<JobType>("full-time");
  const [shift, setShift] = useState<Shift>("Day");
  const [urgent, setUrgent] = useState(false);
  const [justPosted, setJustPosted] = useState(false);

  const myJobs = useMemo(
    () =>
      jobs
        .filter((j) => ownedIds.includes(j.afhId))
        .sort((a, b) => b.postedAt - a.postedAt),
    [jobs, ownedIds],
  );

  const valid = afhId && title.trim() && description.trim() && hours.trim() && Number(payRate) > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    addJob({
      afhId,
      title: title.trim(),
      description: description.trim(),
      payRate: Number(payRate),
      hours: hours.trim(),
      jobType,
      shift,
      urgent,
    });
    setTitle("");
    setDescription("");
    setHours("");
    setUrgent(false);
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 3000);
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-600">
          Home owner dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Post & manage jobs
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          New postings appear instantly on every caregiver's job board.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Creator form */}
        <form onSubmit={submit} className="card p-6 lg:col-span-3">
          <h2 className="font-display text-lg font-semibold text-ink">
            Create a new opening
          </h2>

          <div className="mt-4 space-y-4">
            <div>
              <label className="label" htmlFor="afh">
                Home
              </label>
              <select
                id="afh"
                className="input"
                value={afhId}
                onChange={(e) => setAfhId(e.target.value)}
              >
                {ownedAfhs.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="title">
                Job title
              </label>
              <input
                id="title"
                className="input"
                placeholder="e.g. Overnight Caregiver — Memory Care"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="label" htmlFor="desc">
                Description
              </label>
              <textarea
                id="desc"
                className="input min-h-[96px] resize-y"
                placeholder="Describe duties, requirements, and what makes your home a great place to work…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="pay">
                  Pay rate ($/hr)
                </label>
                <input
                  id="pay"
                  type="number"
                  min={1}
                  step={0.5}
                  className="input"
                  value={payRate}
                  onChange={(e) => setPayRate(e.target.value)}
                />
              </div>
              <div>
                <label className="label" htmlFor="hours">
                  Hours
                </label>
                <input
                  id="hours"
                  className="input"
                  placeholder="Mon–Fri, 7a–3p"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="type">
                  Job type
                </label>
                <select
                  id="type"
                  className="input"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as JobType)}
                >
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>
                      {t === "full-time" ? "Full-time" : t === "part-time" ? "Part-time" : "Shift-based"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label" htmlFor="shift">
                  Shift
                </label>
                <select
                  id="shift"
                  className="input"
                  value={shift}
                  onChange={(e) => setShift(e.target.value as Shift)}
                >
                  {shifts.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Urgent toggle */}
            <button
              type="button"
              onClick={() => setUrgent((u) => !u)}
              aria-pressed={urgent}
              className={`flex w-full items-center justify-between rounded-xl border-2 p-3.5 text-left transition ${
                urgent ? "border-warm-500 bg-warm-50 dark:bg-warm-500/10" : "border-line/10 bg-surface hover:border-ink/20"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    urgent ? "bg-warm-500 text-white" : "bg-ink/5 text-ink/50"
                  }`}
                >
                  <BoltIcon width={18} height={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    Mark as URGENT / Immediate fill
                  </span>
                  <span className="block text-xs text-ink/55">
                    Pins to the top of caregiver feeds with a priority banner.
                  </span>
                </span>
              </span>
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  urgent ? "bg-warm-500" : "bg-ink/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                    urgent ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </span>
            </button>

            <button type="submit" className="btn-primary w-full" disabled={!valid}>
              <PlusIcon width={18} height={18} /> Post job opening
            </button>

            {justPosted && (
              <p className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-sm font-medium text-emerald-700">
                <CheckIcon width={16} height={16} /> Posted! It's now live on the caregiver feed.
              </p>
            )}
          </div>
        </form>

        {/* Active postings */}
        <div className="lg:col-span-2">
          <SectionHeading
            title="Active postings"
            subtitle={`${myJobs.length} live`}
          />
          {myJobs.length > 0 ? (
            <div className="grid gap-3">
              {myJobs.map((job) => (
                <JobManageCard key={job.id} job={job} onDelete={() => deleteJob(job.id)} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<BriefcaseIcon width={24} height={24} />}
              title="No active postings"
              description="Create your first opening with the form."
            />
          )}
        </div>
      </div>
    </div>
  );
}
