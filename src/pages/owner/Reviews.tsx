import { useMemo, useState } from "react";
import { useApp } from "../../store/AppContext";
import { ReviewCard } from "../../components/cards";
import { EmptyState, StarRating } from "../../components/ui";
import { ChatIcon } from "../../components/icons";

export default function OwnerReviews() {
  const { session, afhs, reviews } = useApp();
  // `?? []` builds a fresh array on every render, which would invalidate
  // every memo below it. Pin the identity to the session.
  const ownedIds = useMemo(
    () => session?.ownedAfhIds ?? [],
    [session],
  );
  const ownedAfhs = useMemo(
    () => afhs.filter((a) => ownedIds.includes(a.id)),
    [afhs, ownedIds],
  );

  const [activeAfh, setActiveAfh] = useState<string>(ownedIds[0] ?? "");

  const myReviews = useMemo(
    () =>
      reviews
        .filter((r) => r.afhId === activeAfh)
        .sort((a, b) => b.date - a.date),
    [reviews, activeAfh],
  );

  const current = ownedAfhs.find((a) => a.id === activeAfh);

  const breakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    for (const r of myReviews) counts[r.rating - 1] += 1;
    return counts;
  }, [myReviews]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-600 dark:text-warm-400">
          Home owner dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Review tracker
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Monitor feedback caregivers leave about your homes.
        </p>
      </div>

      {/* Home switcher */}
      {ownedAfhs.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {ownedAfhs.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAfh(a.id)}
              className={`chip px-3 py-2 transition ${
                activeAfh === a.id
                  ? "bg-warm-500 text-white"
                  : "bg-surface text-ink/70 ring-1 ring-inset ring-line/10 hover:bg-ink/5"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      )}

      {current && (
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="text-center sm:border-r sm:border-line/5 sm:pr-8 dark:sm:border-line/10">
            <p className="font-display text-5xl font-bold text-ink">
              {current.rating.toFixed(1)}
            </p>
            <StarRating value={current.rating} className="mt-1 justify-center" />
            <p className="mt-1 text-xs text-ink/50">{myReviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = breakdown[star - 1];
              const pct = myReviews.length ? (count / myReviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-3 text-ink/55">{star}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-xs text-ink/45">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {myReviews.length > 0 ? (
        <div className="grid gap-4">
          {myReviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<ChatIcon width={24} height={24} />}
          title="No reviews yet"
          description="When caregivers review this home, their feedback will appear here."
        />
      )}
    </div>
  );
}
