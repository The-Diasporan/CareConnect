import { beforeEach, describe, expect, it } from "vitest";
import {
  loadPersisted,
  mergeById,
  reconcile,
  SCHEMA_VERSION,
  STORAGE_KEY,
  type PersistedState,
} from "./persistence";
import { seedAFHs, seedJobs } from "../data/seed";

const row = (id: string) => ({ id });
const none = new Set<string>();

function writeSnapshot(snapshot: Partial<PersistedState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

describe("mergeById", () => {
  it("keeps the stored row when both sides share an id", () => {
    const stored = [{ id: "a", label: "edited" }];
    const seed = [{ id: "a", label: "original" }];
    expect(mergeById(stored, seed, none)).toEqual(stored);
  });

  it("appends seed rows the snapshot has never seen", () => {
    expect(mergeById([row("a")], [row("a"), row("b")], none)).toEqual([
      row("a"),
      row("b"),
    ]);
  });

  it("does not resurrect a row the user deleted", () => {
    const tombstones = new Set(["b"]);
    expect(mergeById([row("a")], [row("a"), row("b")], tombstones)).toEqual([
      row("a"),
    ]);
  });

  it("falls back to the seed when nothing is stored", () => {
    expect(mergeById(undefined, [row("a")], none)).toEqual([row("a")]);
  });
});

describe("reconcile", () => {
  it("passes a current-version snapshot through untouched", () => {
    const snapshot = {
      version: SCHEMA_VERSION,
      jobs: [],
      afhs: [],
    } as Partial<PersistedState>;
    expect(reconcile(snapshot)).toBe(snapshot);
  });

  it("pulls in new seed rows when the version is behind", () => {
    const stale: Partial<PersistedState> = {
      version: SCHEMA_VERSION - 1,
      jobs: [],
      afhs: [],
    };
    const merged = reconcile(stale);
    expect(merged.jobs).toHaveLength(seedJobs.length);
    expect(merged.afhs).toHaveLength(seedAFHs.length);
  });

  it("honours tombstones across a version bump", () => {
    const deleted = seedJobs[0].id;
    const merged = reconcile({
      version: SCHEMA_VERSION - 1,
      jobs: [],
      deletedSeedIds: [deleted],
    });
    expect(merged.jobs?.map((j) => j.id)).not.toContain(deleted);
    expect(merged.jobs).toHaveLength(seedJobs.length - 1);
  });

  it("preserves user-created rows while merging", () => {
    const mine = { ...seedJobs[0], id: "job-mine", title: "My posting" };
    const merged = reconcile({
      version: SCHEMA_VERSION - 1,
      jobs: [mine],
    });
    expect(merged.jobs?.map((j) => j.id)).toContain("job-mine");
    expect(merged.jobs).toHaveLength(seedJobs.length + 1);
  });
});

describe("loadPersisted", () => {
  beforeEach(() => localStorage.clear());

  it("returns null when nothing is stored", () => {
    expect(loadPersisted()).toBeNull();
  });

  it("returns null rather than throwing on malformed JSON", () => {
    localStorage.setItem(STORAGE_KEY, "{not json");
    expect(loadPersisted()).toBeNull();
  });

  it("reconciles a stale snapshot it reads back", () => {
    writeSnapshot({ version: SCHEMA_VERSION - 1, jobs: [] });
    expect(loadPersisted()?.jobs).toHaveLength(seedJobs.length);
  });
});
