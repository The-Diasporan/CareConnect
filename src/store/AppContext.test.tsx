import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import type { ReactNode } from "react";
import { AppProvider, useApp } from "./AppContext";
import { DEMO_OWNER_AFH_IDS, seedJobs } from "../data/seed";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter>
      <AppProvider>{children}</AppProvider>
    </MemoryRouter>
  );
}

const mountStore = () => renderHook(() => useApp(), { wrapper });

/** A job belonging to one of the demo owner's homes, so both roles can see it. */
function ownedJobId(store: ReturnType<typeof mountStore>["result"]) {
  const owned = new Set(DEMO_OWNER_AFH_IDS);
  const job = store.current.jobs.find((j) => owned.has(j.afhId));
  if (!job) throw new Error("expected a seeded job for the demo owner");
  return job.id;
}

describe("AppContext", () => {
  beforeEach(() => localStorage.clear());

  it("starts logged out with the seeded catalogue", () => {
    const { result } = mountStore();
    expect(result.current.session).toBeNull();
    expect(result.current.jobs).toHaveLength(seedJobs.length);
  });

  it("surfaces a caregiver's application in the owner's tracker", () => {
    const { result } = mountStore();
    act(() => result.current.login("caregiver"));
    const jobId = ownedJobId(result);

    act(() => result.current.applyToJob(jobId, "Available immediately"));
    expect(result.current.hasApplied(jobId)).toBe(true);

    act(() => result.current.switchRole("owner"));
    const forOwner = result.current.applicationsForOwner();
    expect(forOwner.some((a) => a.jobId === jobId)).toBe(true);
  });

  it("ignores a duplicate application to the same job", () => {
    const { result } = mountStore();
    act(() => result.current.login("caregiver"));
    const jobId = ownedJobId(result);

    act(() => result.current.applyToJob(jobId, "first"));
    const after = result.current.myApplications().length;
    act(() => result.current.applyToJob(jobId, "second"));
    expect(result.current.myApplications()).toHaveLength(after);
  });

  it("drops the thread when an application is withdrawn", () => {
    const { result } = mountStore();
    act(() => result.current.login("caregiver"));
    const jobId = ownedJobId(result);

    act(() => result.current.applyToJob(jobId, "hello"));
    const appId = result.current.myApplications()[0].id;
    act(() => result.current.sendMessage(appId, "any update?"));
    expect(result.current.messagesForApplication(appId)).toHaveLength(1);

    act(() => result.current.withdrawApplication(jobId));
    expect(result.current.hasApplied(jobId)).toBe(false);
    expect(result.current.messagesForApplication(appId)).toHaveLength(0);
  });

  it("counts only messages sent by the other role as unread", () => {
    const { result } = mountStore();
    act(() => result.current.login("caregiver"));
    const jobId = ownedJobId(result);
    act(() => result.current.applyToJob(jobId, "hello"));
    const appId = result.current.myApplications()[0].id;

    act(() => result.current.markThreadRead(appId));
    const baseline = result.current.unreadMessageCount();

    // My own message must not count against me.
    act(() => result.current.sendMessage(appId, "from the caregiver"));
    expect(result.current.unreadMessageCount()).toBe(baseline);

    // The owner replying does.
    act(() => result.current.switchRole("owner"));
    act(() => result.current.sendMessage(appId, "from the owner"));
    act(() => result.current.switchRole("caregiver"));
    expect(result.current.unreadMessageCount()).toBe(baseline + 1);
  });

  it("recomputes a home's rating from its reviews", () => {
    const { result } = mountStore();
    act(() => result.current.login("caregiver"));

    const before = result.current.getAfh("afh-sunnyvale");
    expect(before).toBeDefined();

    act(() =>
      result.current.addReview({
        afhId: "afh-sunnyvale",
        authorName: "Test Reviewer",
        authorRole: "Certified CNA",
        rating: 1,
        text: "Bringing the average down.",
      }),
    );

    const after = result.current.getAfh("afh-sunnyvale")!;
    expect(after.reviewCount).toBe(before!.reviewCount + 1);
    expect(after.rating).toBeLessThan(before!.rating);
  });

  it("keeps a deleted seed job deleted across a remount", () => {
    const first = mountStore();
    act(() => first.result.current.login("owner"));
    const jobId = ownedJobId(first.result);
    act(() => first.result.current.deleteJob(jobId));
    expect(first.result.current.jobs.some((j) => j.id === jobId)).toBe(false);
    first.unmount();

    const second = mountStore();
    expect(second.result.current.jobs.some((j) => j.id === jobId)).toBe(false);
  });

  it("restores saved jobs from the previous session", () => {
    const first = mountStore();
    act(() => first.result.current.login("caregiver"));
    const jobId = ownedJobId(first.result);
    act(() => first.result.current.toggleSaveJob(jobId));
    first.unmount();

    const second = mountStore();
    expect(second.result.current.isSaved(jobId)).toBe(true);
  });

  it("propagates a profile rename onto existing applications", () => {
    const { result } = mountStore();
    act(() => result.current.login("caregiver"));
    const jobId = ownedJobId(result);
    act(() => result.current.applyToJob(jobId, "hello"));

    const profile = result.current.myCaregiverProfile()!;
    act(() =>
      result.current.updateMyProfile({
        ...profile,
        name: "Renamed Caregiver",
      }),
    );

    expect(result.current.session?.name).toBe("Renamed Caregiver");
    expect(result.current.myApplications()[0].caregiverName).toBe(
      "Renamed Caregiver",
    );
  });
});
