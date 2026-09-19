import { useEffect, useRef, useState } from "react";
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

  const panelRef = useRef<HTMLDivElement>(null);

  // Callers pass an inline arrow for `onClose`, so its identity changes every
  // render. Reading it through a ref keeps the effect below a true mount/unmount
  // effect — otherwise it tears down and re-runs constantly, which re-captures
  // the "previously focused" element from inside the dialog and never restores
  // focus to the trigger.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Captured during the first render, before React commits `autoFocus` and
  // moves focus into the panel — by the time an effect runs, `activeElement` is
  // already the textarea, so reading it there would restore focus to a node
  // that is about to be unmounted.
  const triggerRef = useRef<HTMLElement | null>(
    typeof document === "undefined"
      ? null
      : (document.activeElement as HTMLElement | null),
  );

  /**
   * Keep focus inside the dialog while it is open, and stop the page behind it
   * from scrolling. Without the trap, tabbing past the last control walks into
   * the job board underneath — invisible to a sighted user, disorienting with a
   * screen reader or keyboard.
   */
  useEffect(() => {
    // Copied into the effect so the cleanup closes over a stable value.
    const trigger = triggerRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      // Only worth restoring if the trigger is still on the page.
      if (trigger?.isConnected) trigger.focus();
    };
  }, []);

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
        ref={panelRef}
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
            Message to the home{" "}
            <span className="font-normal text-ink/45">
              (optional{session ? ` — from ${session.name}` : ""})
            </span>
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
