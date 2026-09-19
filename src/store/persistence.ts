import type {
  AFH,
  Application,
  Caregiver,
  Job,
  Message,
  ReadState,
  Review,
  Role,
} from "../types";
import {
  seedAFHs,
  seedApplications,
  seedCaregivers,
  seedJobs,
  seedMessages,
  seedReviews,
} from "../data/seed";

export interface Session {
  role: Role;
  name: string;
  ownedAfhIds: string[];
  caregiverId: string | null;
}

export interface AppState {
  session: Session | null;
  jobs: Job[];
  afhs: AFH[];
  reviews: Review[];
  caregivers: Caregiver[];
  applications: Application[];
  savedJobIds: string[];
  messages: Message[];
  readState: ReadState;
  /** Ids of seed rows the user deleted, so a migration can't resurrect them. */
  deletedSeedIds: string[];
}

export const STORAGE_KEY = "careconnect.state.v4";

/**
 * Bump whenever `seed.ts` gains rows that existing users should see.
 *
 * The snapshot carries its own version so a mismatch can be reconciled instead
 * of thrown away. Previously the key itself was the only migration lever
 * (`...state.v3`), which meant adding a home to the seed either did nothing for
 * anyone who had already opened the app, or wiped everything they had done.
 */
export const SCHEMA_VERSION = 4;

export type PersistedState = AppState & { version: number };

/**
 * Union a stored collection with the seed, matching on id.
 *
 * Stored rows win (the user may have edited them), seed rows the snapshot has
 * never seen are appended, and anything the user explicitly deleted stays
 * deleted — without the tombstone check, a version bump would resurrect every
 * seed job an owner had removed.
 */
export function mergeById<T extends { id: string }>(
  stored: T[] | undefined,
  seed: T[],
  tombstones: ReadonlySet<string>,
): T[] {
  if (!stored) return seed.filter((s) => !tombstones.has(s.id));
  const known = new Set(stored.map((row) => row.id));
  return [
    ...stored,
    ...seed.filter((s) => !known.has(s.id) && !tombstones.has(s.id)),
  ];
}

export function reconcile(stored: Partial<PersistedState>): Partial<AppState> {
  if (stored.version === SCHEMA_VERSION) return stored;
  const tombstones = new Set(stored.deletedSeedIds ?? []);
  return {
    ...stored,
    jobs: mergeById(stored.jobs, seedJobs, tombstones),
    afhs: mergeById(stored.afhs, seedAFHs, tombstones),
    caregivers: mergeById(stored.caregivers, seedCaregivers, tombstones),
    reviews: mergeById(stored.reviews, seedReviews, tombstones),
    applications: mergeById(stored.applications, seedApplications, tombstones),
    messages: mergeById(stored.messages, seedMessages, tombstones),
  };
}

/** Ids that ship in `seed.ts` — only these need tombstones on delete. */
export const SEED_IDS: ReadonlySet<string> = new Set(
  [
    ...seedJobs,
    ...seedAFHs,
    ...seedCaregivers,
    ...seedReviews,
    ...seedApplications,
    ...seedMessages,
  ].map((row) => row.id),
);

export function loadPersisted(): Partial<AppState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return reconcile(JSON.parse(raw) as Partial<PersistedState>);
  } catch {
    return null;
  }
}
