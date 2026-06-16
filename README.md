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

## Project structure

```
src/
  components/    # Layout, cards, ApplyModal, ThemeToggle, UI primitives, icons
  data/seed.ts   # Realistic healthcare placeholder data (homes, jobs, caregivers, reviews, applications)
  pages/         # Landing, Login, caregiver/* and owner/* dashboards
  store/         # AppContext — shared, persisted application + theme state
  types.ts       # Shared TypeScript types
```

## Theming notes

Dark mode uses Tailwind's `class` strategy. Core surface/text/border colors are defined as CSS variables (`--cream`, `--surface`, `--ink`, `--line`) in `src/index.css` and exposed to Tailwind as semantic color tokens, so opacity utilities like `text-ink/60` and `border-line/10` automatically adapt to the active theme.
