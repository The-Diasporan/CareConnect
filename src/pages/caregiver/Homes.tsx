import { useMemo, useState } from "react";
import { useApp } from "../../store/AppContext";
import { AfhCard } from "../../components/cards";
import { EmptyState, SectionHeading } from "../../components/ui";
import { HomeIcon, SearchIcon } from "../../components/icons";

export default function Homes() {
  const { afhs, jobs } = useApp();
  const [query, setQuery] = useState("");

  const jobCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const j of jobs) map[j.afhId] = (map[j.afhId] ?? 0) + 1;
    return map;
  }, [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...afhs].sort((a, b) => b.rating - a.rating);
    if (!q) return sorted;
    return sorted.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.specialties.some((s) => s.toLowerCase().includes(q)),
    );
  }, [afhs, query]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          Caregiver dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Adult Family Homes
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Browse listed homes and read reviews from fellow caregivers.
        </p>
      </div>

      <div className="relative">
        <SearchIcon
          width={18}
          height={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
        />
        <input
          className="input pl-10"
          placeholder="Search homes by name, city, or specialty…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <SectionHeading
        title="Directory & reviews"
        subtitle={`${afhs.length} homes listed — tap any home to read full reviews.`}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((afh) => (
            <AfhCard key={afh.id} afh={afh} jobCount={jobCounts[afh.id] ?? 0} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<HomeIcon width={24} height={24} />}
          title="No homes found"
          description="Try a different search term."
        />
      )}
    </div>
  );
}
