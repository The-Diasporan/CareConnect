# CareConnect

A warm, modern web app for the senior care industry that connects **Caregivers** with **Adult Family Home (AFH) Owners**. Caregivers discover open shifts and read honest reviews; owners post jobs (including urgent fills) and browse certified caregivers.

Built with **Vite + React + TypeScript + Tailwind CSS**.

## Features

### Shared
- **Landing page** explaining the platform's value for both audiences.
- **Role-based login** with a clear Caregiver / Home Owner toggle.
- **One-click role switching** from inside either dashboard.
- **Light / Dark mode toggle** available everywhere (landing, login, both dashboards). Theme is driven by CSS variables so every element stays readable in both modes, persists in `localStorage`, respects the OS preference, and applies before first paint (no flash).
- **Responsive, mobile-first UI** — sidebar on desktop, bottom tab bar on phones.
- **Persistent state** via `localStorage`, so posted jobs, applications, bookmarks, and reviews survive refreshes.
- **Presentation decks** at `/slides` — an interactive investor pitch deck and product/client demo deck built into the app (see below).

### Role 1 — Caregiver Dashboard
- **Job Board feed** of available roles with filters for full-time, part-time, and shift-based work, plus keyword search.
- **Urgent Fillings banner** that pins immediate openings to the top with a high-visibility pulsing badge.
- **Apply flow** — apply to any job through a modal (with a message to the home), see an "Applied" state, and withdraw.
- **Saved / bookmarked jobs** — bookmark any job and revisit it on the **Saved & Applied** page, which also tracks application status and links to **Messages**.
- **Profile editing** — caregivers can update name, title, bio, city, experience, certifications, skills, and availability on the **Profile** page (changes sync to applications and session).
- **In-app messaging** — threaded conversations tied to each application; owners and caregivers can chat from **Messages** or via "Message" buttons on applicant/application cards.
- **Notification badges** — orange counts on nav items for new urgent jobs (caregiver Job Board), new applicants (owner Applicants), and unread messages (both roles). Visiting Job Board or Applicants clears those respective badges.
- **AFH Directory & Reviews** — browse listed homes, view star ratings, read reviews, and leave your own.

### Role 2 — AFH Owner Dashboard
- **Job Creator / Manager** — post openings (title, description, pay rate, hours, type, shift) with an **URGENT / Immediate Fill** toggle, and remove postings.
- **Applicant Tracking** — a pipeline view of everyone who applied to your jobs, with summary counts, per-applicant status control, and direct links to message each applicant.
- **Caregiver Directory** — browse public profiles with qualifications, experience, certifications, and skills (filterable + searchable).
- **Review Tracker** — monitor feedback left about your homes, with a rating breakdown to manage your reputation.

### State management
A shared React context store keeps both roles in sync:
- When an owner posts a job (especially an urgent one), it **dynamically appears on the caregiver's job board and urgent banner**.
- When a caregiver applies, the application **immediately shows up in the owner's applicant tracker**, and status changes flow back to the caregiver's tracker.

## Getting started

```bash
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173). It's demo mode — just pick a role and continue, no real credentials needed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run docs:decks` — regenerate `docs/presentation-decks.md` from the slide data
- `npm run lint` — ESLint (flat config, TypeScript + React Hooks rules)
- `npm test` — run the Vitest suite once
- `npm run test:watch` — Vitest in watch mode
- `npm run coverage` — test run with a V8 coverage report

## Presentation decks

Two ready-to-present decks ship with the app at **`/slides`** (public — no login
required), reachable from the landing page and from the sidebar of either
dashboard:

| Deck | Slides | Focus |
| --- | --- | --- |
| **Investor Pitch** | 10 | Market size, the AFH staffing crisis, the dual-sided marketplace, the urgent fill engine, business model, moat, and the ask |
| **Product & Client Demo** | 10 | Caregiver and owner walkthroughs, urgent fill workflow, applicant pipeline, messaging, verification, reviews, and onboarding |

The viewer supports deck switching, light/dark mode, slide transitions, a slide
picker grid, and a presenter mode with the talk track, visual cue, a rehearsal
timer, and an up-next preview.

| Key | Action |
| --- | --- |
| `←` / `→` / `Space` | Previous / next slide |
| `Home` / `End` | First / last slide |
| `F` | Fullscreen |
| `N` | Presenter notes |
| `G` | Slide picker grid |
| `D` | Switch decks |
| `Esc` | Close an overlay or leave fullscreen |

Any position is linkable: `/slides?deck=product&slide=5`. On touch devices,
swipe left or right.

### Editing slide content

All copy, figures, speaker notes, and visual cues live in
**`src/data/slideData.ts`** as plain data — no JSX. Slides are a discriminated
union over six layouts (`hero`, `split`, `grid`, `stats`, `flow`, `closing`), so
adding a layout forces every renderer to handle it.

`docs/presentation-decks.md` is the same content as a written document and is
**generated** from that file. After editing slide data, run:

```bash
npm run docs:decks
```

> The market and unit-economics figures in the investor deck are directional
> placeholders for the pitch narrative. Confirm the sourcing for every figure
> (they are listed together in the appendix of the generated document) before
> sharing either deck externally.

## Security note

**This is a demo, not an authenticated app.** `RequireRole` in `src/App.tsx`
only guards the client-side router: it decides what to render, nothing more.
There is no server, no token, and no authorization check — every caregiver and
owner record lives in `localStorage` and can be edited from browser devtools.
Anything real would need the role check repeated server-side on every request.

## Project structure

```
src/
  components/    # Layout, cards, ApplyModal, ThemeToggle, UI primitives, icons
  data/seed.ts   # Realistic healthcare placeholder data (homes, jobs, caregivers, reviews, applications)
  data/slideData.ts # Investor & product deck content (copy, figures, speaker notes)
  pages/         # Landing, Login, SlideDeck, caregiver/* and owner/* dashboards
  components/
    theme.ts     # Tone palette — every accent's light AND dark classes
    format.ts    # timeAgo and other display formatting
  store/
    AppContext.tsx  # Shared application + theme state
    persistence.ts  # Snapshot schema, versioning, seed reconciliation
  types.ts       # Shared TypeScript types
scripts/
  generate-deck-docs.ts  # Renders docs/presentation-decks.md from slideData.ts
docs/
  presentation-decks.md  # Generated slide-by-slide deck document
```

### Styling rules

Pick a **tone**, don't pass raw color classes. `Chip`, `JobTypeChip`,
`StatusBadge`, and the icon tiles all read from `toneChip` / `toneTile` in
`src/components/theme.ts`, which define each accent's light *and* dark
appearance together.

Passing `className="bg-brand-50"` to a component that already sets a background
does **not** override it — Tailwind resolves conflicting utilities by their
order in the generated stylesheet, not by the order they appear in your
className string. Use `tone="brand"`; reserve `className` for layout.

### Persisted state

`src/store/persistence.ts` writes a versioned snapshot to `localStorage`. When
you add rows to `src/data/seed.ts` that existing users should see, bump
`SCHEMA_VERSION`: on the next load, new seed rows are merged in by id while the
user's own data — and anything they deleted — is preserved.

## Theming notes

Dark mode uses Tailwind's `class` strategy. Core surface/text/border colors are defined as CSS variables (`--cream`, `--surface`, `--ink`, `--line`) in `src/index.css` and exposed to Tailwind as semantic color tokens, so opacity utilities like `text-ink/60` and `border-line/10` automatically adapt to the active theme.
