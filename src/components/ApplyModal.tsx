import { useEffect, useState } from "react";
import type { AFH, Job } from "../types";
import { useApp } from "../store/AppContext";
import { Avatar } from "./ui";
import { SendIcon, XIcon } from "./icons";

export function ApplyModal({
  job,
  afh,
  onClose,
}: {
  job: Job;
  afh?: AFH;
  onClose: () => void;
}) {
  const { applyToJob, session } = useApp();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    applyToJob(job.id, message.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply to ${job.title}`}
      onClick={onClose}
    >
      <div
        className="card w-full max-w-lg animate-fade-in rounded-b-none p-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {afh && <Avatar name={afh.name} color={afh.accentColor} size={44} />}
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                Apply to this role
              </h2>
              <p className="text-sm text-ink/60">
                {job.title}
                {afh ? ` · ${afh.name}` : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-ink/50 hover:bg-ink/10 hover:text-ink"
            aria-label="Close"
          >
            <XIcon width={18} height={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-ink/5 px-2 py-2.5">
            <p className="text-xs text-ink/50">Pay</p>
            <p className="text-sm font-semibold text-ink">${job.payRate}/hr</p>
          </div>
          <div className="rounded-xl bg-ink/5 px-2 py-2.5">
            <p className="text-xs text-ink/50">Shift</p>
            <p className="text-sm font-semibold text-ink">{job.shift}</p>
          </div>
          <div className="rounded-xl bg-ink/5 px-2 py-2.5">
            <p className="text-xs text-ink/50">Hours</p>
            <p className="truncate text-sm font-semibold text-ink">{job.hours}</p>
          </div>
        </div>

        <form onSubmit={submit} className="mt-5">
          <label className="label" htmlFor="apply-msg">
            Message to the home {session ? `(from ${session.name})` : ""}
          </label>
          <textarea
            id="apply-msg"
            className="input min-h-[110px] resize-y"
            placeholder="Introduce yourself, highlight relevant certifications and availability…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
          />
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <SendIcon width={16} height={16} /> Submit application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
