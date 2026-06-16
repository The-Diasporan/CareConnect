import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../store/AppContext";
import { Avatar, EmptyState, StatusBadge, timeAgo } from "./ui";
import { ChatIcon, SendIcon } from "./icons";
import type { Application, Role } from "../types";

function threadUnread(
  applicationId: string,
  role: Role,
  messages: ReturnType<typeof useApp>["messages"],
  readState: ReturnType<typeof useApp>["readState"],
): number {
  const otherRole: Role = role === "caregiver" ? "owner" : "caregiver";
  const readMap =
    role === "caregiver"
      ? readState.caregiverThreadReadAt
      : readState.ownerThreadReadAt;
  const lastRead = readMap[applicationId] ?? 0;
  return messages.filter(
    (m) =>
      m.applicationId === applicationId &&
      m.senderRole === otherRole &&
      m.sentAt > lastRead,
  ).length;
}

export function MessagesInbox({ role }: { role: Role }) {
  const {
    myThreads,
    messagesForApplication,
    sendMessage,
    markThreadRead,
    jobs,
    getAfh,
    getCaregiver,
    messages,
    readState,
  } = useApp();

  const [searchParams, setSearchParams] = useSearchParams();
  const paramThread = searchParams.get("thread");
  const [activeId, setActiveId] = useState<string | null>(paramThread);
  const [draft, setDraft] = useState("");

  const threads = myThreads();

  useEffect(() => {
    if (paramThread && threads.some((t) => t.id === paramThread)) {
      setActiveId(paramThread);
    }
  }, [paramThread, threads]);

  useEffect(() => {
    if (activeId) markThreadRead(activeId);
  }, [activeId, markThreadRead, messages.length]);

  const active = threads.find((t) => t.id === activeId);
  const threadMessages = active ? messagesForApplication(active.id) : [];

  const sortedThreads = useMemo(
    () =>
      [...threads].sort((a, b) => {
        const aMsgs = messages.filter((m) => m.applicationId === a.id);
        const bMsgs = messages.filter((m) => m.applicationId === b.id);
        const aLast = aMsgs.length
          ? Math.max(...aMsgs.map((m) => m.sentAt))
          : a.appliedAt;
        const bLast = bMsgs.length
          ? Math.max(...bMsgs.map((m) => m.sentAt))
          : b.appliedAt;
        return bLast - aLast;
      }),
    [threads, messages],
  );

  const selectThread = (id: string) => {
    setActiveId(id);
    setSearchParams({ thread: id });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeId || !draft.trim()) return;
    sendMessage(activeId, draft);
    setDraft("");
  };

  const threadLabel = (app: Application) => {
    const job = jobs.find((j) => j.id === app.jobId);
    if (role === "caregiver") {
      const afh = job ? getAfh(job.afhId) : undefined;
      return {
        title: job?.title ?? "Application",
        sub: afh?.name ?? "",
        avatarName: afh?.name ?? "Home",
        color: afh?.accentColor ?? "#0d9488",
      };
    }
    const cg = getCaregiver(app.caregiverId);
    return {
      title: app.caregiverName,
      sub: job?.title ?? "Role",
      avatarName: app.caregiverName,
      color: cg?.accentColor ?? "#0d9488",
    };
  };

  if (threads.length === 0) {
    return (
      <EmptyState
        icon={<ChatIcon width={24} height={24} />}
        title="No conversations yet"
        description={
          role === "caregiver"
            ? "Apply to a job to start messaging with home owners."
            : "When caregivers apply to your jobs, you can message them here."
        }
      />
    );
  }

  return (
    <div className="card flex min-h-[420px] overflow-hidden">
      {/* Thread list */}
      <div
        className={`w-full shrink-0 border-r border-line/5 dark:border-line/10 md:w-72 lg:w-80 ${
          activeId ? "hidden md:block" : "block"
        }`}
      >
        <div className="border-b border-line/5 px-4 py-3 dark:border-line/10">
          <p className="text-sm font-semibold text-ink">Conversations</p>
          <p className="text-xs text-ink/50">{threads.length} threads</p>
        </div>
        <ul className="max-h-[480px] overflow-y-auto">
          {sortedThreads.map((app) => {
            const { title, sub, avatarName, color } = threadLabel(app);
            const unread = threadUnread(
              app.id,
              role,
              messages,
              readState,
            );
            const selected = app.id === activeId;
            return (
              <li key={app.id}>
                <button
                  onClick={() => selectThread(app.id)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-ink/5 ${
                    selected ? "bg-brand-50 dark:bg-brand-500/10" : ""
                  }`}
                >
                  <Avatar
                    name={avatarName}
                    color={color}
                    size={40}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink">
                        {title}
                      </p>
                      {unread > 0 && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-warm-500 px-1 text-[9px] font-bold text-white">
                          {unread}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-ink/55">{sub}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Message pane */}
      <div
        className={`flex min-w-0 flex-1 flex-col ${
          activeId ? "flex" : "hidden md:flex"
        }`}
      >
        {active ? (
          <>
            <div className="flex items-center gap-3 border-b border-line/5 px-4 py-3 dark:border-line/10">
              <button
                type="button"
                onClick={() => {
                  setActiveId(null);
                  setSearchParams({});
                }}
                className="rounded-lg px-2 py-1 text-sm text-brand-600 md:hidden"
              >
                &larr; Back
              </button>
              <div className="min-w-0 flex-1">
                {(() => {
                  const { title, sub } = threadLabel(active);
                  const job = jobs.find((j) => j.id === active.jobId);
                  return (
                    <>
                      <p className="truncate font-semibold text-ink">{title}</p>
                      <p className="truncate text-xs text-ink/55">
                        {sub}
                        {job ? ` · ${job.hours}` : ""}
                      </p>
                    </>
                  );
                })()}
              </div>
              <StatusBadge status={active.status} />
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              {active.message && (
                <div className="rounded-xl bg-ink/5 px-3.5 py-2.5 text-sm text-ink/70">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink/45">
                    Original application
                  </p>
                  &ldquo;{active.message}&rdquo;
                </div>
              )}
              {threadMessages.map((m) => {
                const mine = m.senderRole === role;
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        mine
                          ? "bg-brand-600 text-white"
                          : "bg-ink/5 text-ink/85"
                      }`}
                    >
                      {!mine && (
                        <p
                          className={`mb-0.5 text-xs font-semibold ${
                            mine ? "text-white/80" : "text-ink/50"
                          }`}
                        >
                          {m.senderName}
                        </p>
                      )}
                      <p className="leading-relaxed">{m.text}</p>
                      <p
                        className={`mt-1 text-[10px] ${
                          mine ? "text-white/70" : "text-ink/40"
                        }`}
                      >
                        {timeAgo(m.sentAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={submit}
              className="flex gap-2 border-t border-line/5 p-3 dark:border-line/10"
            >
              <input
                className="input flex-1"
                placeholder="Type a message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button
                type="submit"
                className="btn-primary shrink-0 px-4"
                disabled={!draft.trim()}
                aria-label="Send message"
              >
                <SendIcon width={18} height={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 text-center text-sm text-ink/50">
            Select a conversation to view messages
          </div>
        )}
      </div>
    </div>
  );
}
