import { useMemo, useState } from "react";
import { useApp } from "../../store/AppContext";
import { CaregiverCard } from "../../components/cards";
import { EmptyState } from "../../components/ui";
import { SearchIcon, UsersIcon } from "../../components/icons";
import type { JobType } from "../../types";

type Filter = "all" | JobType | "verified";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "shift-based", label: "Shift-based" },
];

export default function OwnerCaregivers() {
  const { caregivers } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...caregivers]
      .sort((a, b) => b.rating - a.rating)
      .filter((c) => {
        if (filter === "verified" && !c.verified) return false;
        if (filter !== "all" && filter !== "verified" && !c.availability.includes(filter))
          return false;
        if (!q) return true;
        return (
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.certifications.some((x) => x.toLowerCase().includes(q)) ||
          c.skills.some((x) => x.toLowerCase().includes(q))
        );
      });
  }, [caregivers, query, filter]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-600">
          Home owner dashboard
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Caregiver directory
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Browse qualified caregivers with their certifications and experience.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <SearchIcon
            width={18}
            height={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
          />
          <input
            className="input pl-10"
            placeholder="Search by name, certification, skill, or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`chip px-3 py-2 transition ${
              filter === f.id
                ? "bg-warm-500 text-white"
                : "bg-surface text-ink/70 ring-1 ring-inset ring-line/10 hover:bg-ink/5"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((c) => (
            <CaregiverCard key={c.id} caregiver={c} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<UsersIcon width={24} height={24} />}
          title="No caregivers match"
          description="Try a different search or filter."
        />
      )}
    </div>
  );
}
