import { MessagesInbox } from "../../components/MessagesInbox";

export default function CaregiverMessages() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          Caregiver dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Messages
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Chat with home owners about your applications.
        </p>
      </div>
      <MessagesInbox role="caregiver" />
    </div>
  );
}
