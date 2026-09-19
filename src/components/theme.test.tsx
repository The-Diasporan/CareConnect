import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip, JobTypeChip, StatusBadge } from "./ui";
import { toneChip, toneTile, type Tone } from "./theme";
import { APPLICATION_STATUSES } from "./theme";

const tones = Object.keys(toneChip) as Tone[];

describe("tone palette", () => {
  it.each(tones)("chip tone %s defines a dark variant", (tone) => {
    // `neutral` is built from the theme-aware `ink` token, so it adapts without
    // an explicit `dark:` class. Every literal color must declare one.
    if (tone === "neutral") {
      expect(toneChip[tone]).toContain("ink");
      return;
    }
    expect(toneChip[tone]).toMatch(/dark:bg-/);
    expect(toneChip[tone]).toMatch(/dark:text-/);
  });

  it.each(tones)("tile tone %s defines a dark variant", (tone) => {
    if (tone === "neutral") {
      expect(toneTile[tone]).toContain("ink");
      return;
    }
    expect(toneTile[tone]).toMatch(/dark:bg-/);
    expect(toneTile[tone]).toMatch(/dark:text-/);
  });

  it("never declares the same dark text color twice in one tone", () => {
    for (const map of [toneChip, toneTile]) {
      for (const classes of Object.values(map)) {
        const darkText = classes
          .split(/\s+/)
          .filter((c) => c.startsWith("dark:text-"));
        expect(darkText.length).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("Chip", () => {
  /**
   * Regression: `Chip` used to hardcode `bg-ink/5` and let callers "override" it
   * with a className. Tailwind resolves conflicts by CSS source order, so the
   * base always won and branded chips silently rendered grey.
   */
  it("does not emit a competing background alongside its tone", () => {
    render(<Chip tone="brand">Dementia Care</Chip>);
    const classes = screen.getByText("Dementia Care").className.split(/\s+/);
    const backgrounds = classes.filter(
      (c) => c.startsWith("bg-") && !c.startsWith("dark:"),
    );
    expect(backgrounds).toEqual(["bg-brand-50"]);
  });

  it("falls back to the neutral tone", () => {
    render(<Chip>Plain</Chip>);
    expect(screen.getByText("Plain").className).toContain("bg-ink/5");
  });

  it("still accepts layout classes without clobbering the tone", () => {
    render(
      <Chip tone="emerald" className="ml-auto">
        Applied
      </Chip>,
    );
    const el = screen.getByText("Applied");
    expect(el.className).toContain("ml-auto");
    expect(el.className).toContain("bg-emerald-50");
  });
});

describe("JobTypeChip", () => {
  it.each(["full-time", "part-time", "shift-based"] as const)(
    "renders %s with a dark-mode-safe tone",
    (type) => {
      const { container } = render(<JobTypeChip type={type} />);
      expect(container.firstElementChild?.className).toMatch(/dark:bg-/);
    },
  );
});

describe("StatusBadge", () => {
  it.each(APPLICATION_STATUSES)("renders %s", (status) => {
    const { container } = render(<StatusBadge status={status} />);
    expect(container.firstElementChild?.className).toContain("chip");
  });
});
