/**
 * Generates `docs/presentation-decks.md` from `src/data/slideData.ts`.
 *
 * The Markdown deck and the interactive deck at `/slides` are two renderings
 * of one source of truth, so the document is generated rather than
 * transcribed. Run it after editing slide content:
 *
 *   npm run docs:decks
 */
import { writeFileSync } from "node:fs";
import { decks, type Deck, type Slide, type StatBlock } from "../src/data/slideData";

const OUT = new URL("../docs/presentation-decks.md", import.meta.url);

function statTable(stats: StatBlock[]): string[] {
  return [
    "| Figure | Means | Detail |",
    "| --- | --- | --- |",
    ...stats.map(
      (s) => `| **${s.value}** | ${s.label} | ${s.detail ?? "—"} |`,
    ),
    "",
  ];
}

function slideSection(slide: Slide, number: number): string[] {
  const out: string[] = [
    `### Slide ${number} — ${slide.title}`,
    "",
    `**Section:** ${slide.eyebrow} · **Layout:** \`${slide.layout}\``,
    "",
  ];

  if (slide.subtitle) out.push(`> ${slide.subtitle}`, "");

  switch (slide.layout) {
    case "hero":
      out.push("**On-screen badges:** " + slide.badges.map((b) => `\`${b}\``).join(" · "), "");
      out.push("**Supporting figures**", "", ...statTable(slide.stats));
      break;

    case "split":
      out.push("**Talking points**", "");
      for (const point of slide.points) {
        out.push(`- **${point.title}** — ${point.body}`);
      }
      out.push("", `**Side panel — ${slide.panel.heading}**`, "");
      out.push("| | |", "| --- | --- |");
      for (const h of slide.panel.highlights) {
        out.push(`| ${h.label} | **${h.value}** |`);
      }
      out.push("");
      if (slide.panel.footnote) out.push(`_${slide.panel.footnote}_`, "");
      break;

    case "grid":
      for (const card of slide.cards) {
        out.push(`- **${card.title}** — ${card.body}`);
      }
      out.push("");
      if (slide.footnote) out.push(`_${slide.footnote}_`, "");
      break;

    case "stats":
      out.push("**Key metrics**", "", ...statTable(slide.stats));
      if (slide.points) {
        out.push("**Narrative**", "");
        for (const point of slide.points) {
          out.push(`- **${point.title}** — ${point.body}`);
        }
        out.push("");
      }
      if (slide.footnote) out.push(`_${slide.footnote}_`, "");
      break;

    case "flow":
      for (const [i, step] of slide.steps.entries()) {
        out.push(`${i + 1}. **${step.title}** — ${step.body}`);
      }
      out.push("");
      if (slide.footnote) out.push(`_${slide.footnote}_`, "");
      break;

    case "closing":
      out.push("**Milestones**", "", ...statTable(slide.stats));
      out.push("**The ask**", "");
      for (const ask of slide.asks) {
        out.push(`- **${ask.title}** — ${ask.body}`);
      }
      out.push("", `**Closing line:** _${slide.cta}_`, "");
      break;
  }

  out.push("**Visual composition**", "", slide.visual, "");
  out.push("**Speaker notes**", "");
  for (const note of slide.notes) out.push(`- ${note}`);
  out.push("", "---", "");

  return out;
}

function deckSection(deck: Deck): string[] {
  const out: string[] = [
    `## ${deck.name}`,
    "",
    `**Audience:** ${deck.audience}  `,
    `**Runtime:** ~${deck.durationMinutes} minutes · ${deck.slides.length} slides  `,
    `**Open it live:** \`/slides?deck=${deck.id}\``,
    "",
    `_${deck.tagline}_`,
    "",
    "| # | Slide | Section |",
    "| --- | --- | --- |",
    ...deck.slides.map(
      (s, i) => `| ${i + 1} | ${s.title} | ${s.eyebrow} |`,
    ),
    "",
    "---",
    "",
  ];

  deck.slides.forEach((slide, i) => out.push(...slideSection(slide, i + 1)));
  return out;
}

function metricsAppendix(): string[] {
  const rows = decks.flatMap((deck) =>
    deck.slides.flatMap((slide) => {
      const stats =
        slide.layout === "hero" ||
        slide.layout === "stats" ||
        slide.layout === "closing"
          ? slide.stats
          : [];
      return stats.map((stat) => ({
        deck: deck.shortName,
        slide: slide.title,
        stat,
      }));
    }),
  );

  return [
    "## Appendix — every figure in one place",
    "",
    "Each number below appears on a slide. Confirm the sourcing for any figure",
    "before sharing either deck outside the company.",
    "",
    "| Deck | Slide | Figure | Means |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (r) =>
        `| ${r.deck} | ${r.slide} | **${r.stat.value}** | ${r.stat.label} |`,
    ),
    "",
  ];
}

const lines: string[] = [
  "# CareConnect — Presentation Decks",
  "",
  "Complete slide-by-slide copy, visual composition cues, and speaker notes for",
  "both CareConnect decks.",
  "",
  "> **This file is generated.** Slide content lives in `src/data/slideData.ts`",
  "> and is rendered both by the interactive deck at `/slides` and by this",
  "> document. Edit the data, then run `npm run docs:decks`.",
  "",
  "## Presenting",
  "",
  "Run `npm run dev` and open <http://localhost:5173/slides>. Deep link to any",
  "position with `?deck=<investor|product>&slide=<n>`.",
  "",
  "| Key | Action |",
  "| --- | --- |",
  "| `←` / `→` | Previous / next slide |",
  "| `Space` / `PageDown` | Next slide |",
  "| `Home` / `End` | First / last slide |",
  "| `F` | Toggle fullscreen |",
  "| `N` | Toggle presenter notes (talk track, visual cue, timer, up-next) |",
  "| `G` | Toggle the slide picker grid |",
  "| `D` | Switch between the two decks |",
  "| `Esc` | Close the picker or notes, or leave fullscreen |",
  "",
  "On touch devices, swipe left or right to move between slides.",
  "",
  "## Decks at a glance",
  "",
  "| Deck | Slides | Runtime | Audience |",
  "| --- | --- | --- | --- |",
  ...decks.map(
    (d) =>
      `| ${d.name} | ${d.slides.length} | ~${d.durationMinutes} min | ${d.audience} |`,
  ),
  "",
  "---",
  "",
];

for (const deck of decks) lines.push(...deckSection(deck));
lines.push(...metricsAppendix());

writeFileSync(OUT, lines.join("\n").replace(/\n{3,}/g, "\n\n"), "utf8");
console.log(`Wrote ${OUT.pathname}`);
