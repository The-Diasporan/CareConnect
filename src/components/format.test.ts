import { describe, expect, it, vi, afterEach } from "vitest";
import { timeAgo } from "./format";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function at(now: number) {
  vi.useFakeTimers();
  vi.setSystemTime(now);
}

afterEach(() => vi.useRealTimers());

describe("timeAgo", () => {
  const now = new Date("2026-06-01T12:00:00Z").getTime();

  it.each([
    [0, "just now"],
    [30_000, "just now"],
    [5 * MINUTE, "5m ago"],
    [59 * MINUTE, "59m ago"],
    [2 * HOUR, "2h ago"],
    [23 * HOUR, "23h ago"],
    [3 * DAY, "3d ago"],
    [29 * DAY, "29d ago"],
  ])("renders %ims ago as %s", (delta, expected) => {
    at(now);
    expect(timeAgo(now - delta)).toBe(expected);
  });

  it("falls back to a date once past a month", () => {
    at(now);
    const old = now - 90 * DAY;
    expect(timeAgo(old)).toBe(new Date(old).toLocaleDateString());
  });
});
