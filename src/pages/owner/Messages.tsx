import { MessagesInbox } from "../../components/MessagesInbox";

export default function OwnerMessages() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-600 dark:text-warm-400">
          Home owner dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Messages
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Reply to caregivers who applied to your openings.
        </p>
      </div>
      <MessagesInbox role="owner" />
    </div>
  );
}
