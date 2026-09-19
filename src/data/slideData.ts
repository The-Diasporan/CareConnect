import type { Tone } from "../components/theme";

/**
 * Content model for the presentation decks rendered at `/slides`.
 *
 * Slides are plain data (no JSX) so the same definitions can be exported to
 * the Markdown deck under `docs/` and rendered by `SlideDeck.tsx`. Icons are
 * referenced by name and resolved to components at render time.
 */
export type SlideIcon =
  | "bolt"
  | "shield"
  | "users"
  | "home"
  | "briefcase"
  | "chat"
  | "star"
  | "check"
  | "checkBadge"
  | "clock"
  | "dollar"
  | "calendar"
  | "search"
  | "inbox"
  | "send"
  | "user"
  | "heart"
  | "trending"
  | "target"
  | "globe"
  | "sparkle"
  | "sync"
  | "mapPin"
  | "bookmark"
  | "slides";

/** A single headline figure with its caption. */
export interface StatBlock {
  value: string;
  label: string;
  detail?: string;
  tone?: Tone;
}

/** A card in a 3-up feature grid. */
export interface FeatureCard {
  icon: SlideIcon;
  title: string;
  body: string;
  tone?: Tone;
}

/** A bulleted talking point; `body` carries the supporting sentence. */
export interface BulletPoint {
  title: string;
  body: string;
  icon?: SlideIcon;
}

/** One numbered step in a workflow or flywheel. */
export interface FlowStep {
  title: string;
  body: string;
  icon: SlideIcon;
  tone?: Tone;
}

/** A label/value pair inside a side panel. */
export interface PanelHighlight {
  label: string;
  value: string;
}

export interface SidePanel {
  heading: string;
  tone: Tone;
  highlights: PanelHighlight[];
  footnote?: string;
}

interface SlideBase {
  /** Stable slug — used for deep links, React keys, and the Markdown export. */
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Composition cue describing how the slide should read on screen. */
  visual: string;
  /** Speaker notes shown in presenter mode (`N`). */
  notes: string[];
}

export type Slide =
  | (SlideBase & {
      layout: "hero";
      badges: string[];
      stats: StatBlock[];
    })
  | (SlideBase & {
      layout: "split";
      points: BulletPoint[];
      panel: SidePanel;
    })
  | (SlideBase & {
      layout: "grid";
      cards: FeatureCard[];
      footnote?: string;
    })
  | (SlideBase & {
      layout: "stats";
      stats: StatBlock[];
      points?: BulletPoint[];
      footnote?: string;
    })
  | (SlideBase & {
      layout: "flow";
      steps: FlowStep[];
      footnote?: string;
    })
  | (SlideBase & {
      layout: "closing";
      asks: BulletPoint[];
      stats: StatBlock[];
      cta: string;
    });

export type SlideLayout = Slide["layout"];

export type DeckId = "investor" | "product";

export interface Deck {
  id: DeckId;
  name: string;
  shortName: string;
  tagline: string;
  audience: string;
  accent: "brand" | "warm";
  /** Suggested runtime for the full deck, in minutes. */
  durationMinutes: number;
  slides: Slide[];
}

/* ------------------------------------------------------------------ */
/* Deck 1 — Investor Pitch                                            */
/* ------------------------------------------------------------------ */

const investorSlides: Slide[] = [
  {
    id: "investor-title",
    layout: "hero",
    eyebrow: "Seed Round · 2026",
    title: "CareConnect",
    subtitle:
      "Revolutionizing senior care staffing for Adult Family Homes — the dual-sided marketplace where certified caregivers and licensed homes find each other in minutes, not weeks.",
    badges: [
      "Senior care marketplace",
      "Beachhead: Washington State",
      "Live product, real users",
    ],
    visual:
      "Full-bleed hero. Oversized wordmark left, soft brand/warm gradient orbs behind, supporting stat strip anchored bottom.",
    stats: [
      { value: "$42B", label: "US senior care staffing spend", tone: "brand" },
      { value: "30K+", label: "Licensed Adult Family Homes", tone: "warm" },
      { value: "< 6 hrs", label: "Median urgent shift fill time", tone: "emerald" },
    ],
    notes: [
      "Open with the human stake: an unfilled caregiver shift is a resident without care tonight.",
      "Frame CareConnect as infrastructure for a fragmented, overlooked segment — not another job board.",
      "Set expectations for the next 9 slides: problem, market, product, model, moat, ask.",
      "Keep this slide to 45 seconds. The story starts on the problem slide.",
    ],
  },
  {
    id: "investor-problem",
    layout: "split",
    eyebrow: "The Problem",
    title: "Adult Family Homes are in a permanent staffing emergency",
    subtitle:
      "Small licensed homes compete for caregivers with hospitals and national agencies — without recruiters, budgets, or software.",
    visual:
      "Two-column split. Left: four escalating pain points. Right: a warm-toned cost panel quantifying one 6-bed home.",
    points: [
      {
        icon: "clock",
        title: "Openings stay open for weeks",
        body: "A single call-out cascades into mandatory overtime, burnout, and another resignation.",
      },
      {
        icon: "trending",
        title: "Turnover never stops",
        body: "Direct-care roles churn at rates no 4-to-8 bed operator can absorb or out-recruit.",
      },
      {
        icon: "dollar",
        title: "Agencies charge crisis pricing",
        body: "Emergency placements arrive at heavy premiums, with a stranger who does not know the residents.",
      },
      {
        icon: "search",
        title: "Caregivers can't find local work",
        body: "Qualified CNAs and HCAs scroll generic boards full of hospital postings 40 miles away.",
      },
    ],
    panel: {
      heading: "What one unfilled role costs a 6-bed home",
      tone: "warm",
      highlights: [
        { label: "Overtime backfill", value: "$2,400 / mo" },
        { label: "Agency premium vs. direct hire", value: "+55%" },
        { label: "Revenue held by one empty bed", value: "$4,500 / mo" },
        { label: "Owner hours lost to recruiting", value: "11 hrs / week" },
      ],
      footnote: "Composite of operator interviews in the launch market.",
    },
    notes: [
      "Name the buyer precisely: the owner-operator who is also the scheduler, the recruiter, and often the overnight caregiver.",
      "The pain is not 'hiring is hard' — it is that every unfilled shift converts directly into cash burn and licensing risk.",
      "Tie the right-hand panel back to the left: each pain point has a line item.",
      "Bridge line: 'This is not a niche inconvenience. It is a multi-billion dollar structural gap.'",
    ],
  },
  {
    id: "investor-opportunity",
    layout: "stats",
    eyebrow: "The Opportunity",
    title: "A $42B market with no purpose-built connective tissue",
    subtitle:
      "Demand for direct care is compounding while the supply side remains offline, informal, and word-of-mouth.",
    visual:
      "Four oversized stat blocks in a 2x2 grid, then a three-point narrowing narrative (TAM → SAM → beachhead) beneath.",
    stats: [
      {
        value: "$42B",
        label: "Total US senior care staffing spend",
        detail: "Direct-care labor across residential settings",
        tone: "brand",
      },
      {
        value: "30K+",
        label: "Licensed Adult Family Homes",
        detail: "Small residential homes, 4–8 beds each",
        tone: "violet",
      },
      {
        value: "1.2M",
        label: "New direct-care hires needed by 2032",
        detail: "Fastest-growing occupational category in the US",
        tone: "warm",
      },
      {
        value: "$3.8B",
        label: "Serviceable staffing spend",
        detail: "AFH segment across our first eight target states",
        tone: "emerald",
      },
    ],
    points: [
      {
        title: "Demographics are the tailwind",
        body: "10,000 Americans turn 65 every day, and families increasingly choose small homes over institutional facilities.",
      },
      {
        title: "Supply is the bottleneck",
        body: "Capacity is capped by staffing, not by licensed beds. Every filled shift unlocks held revenue.",
      },
      {
        title: "Nobody serves this segment",
        body: "Enterprise workforce software prices out a 6-bed home; consumer job boards ignore it entirely.",
      },
    ],
    footnote:
      "Market figures are directional estimates compiled from public labor and licensing data — verify against current sources before circulating externally.",
    notes: [
      "Do not linger on TAM. Investors discount it; spend the time on the beachhead math instead.",
      "Key point: capacity in this industry is gated by staffing, so software that fills shifts literally unlocks revenue.",
      "Have the state-by-state licensed-home counts ready in the appendix if asked.",
      "Transition: 'The demand exists, the supply exists — they simply have no shared surface. That is what we built.'",
    ],
  },
  {
    id: "investor-solution",
    layout: "split",
    eyebrow: "The Solution",
    title: "A dual-sided marketplace built only for AFHs and caregivers",
    subtitle:
      "One live graph of verified caregivers and licensed homes, with urgency as a first-class primitive.",
    visual:
      "Split layout: four solution pillars left, brand-toned 'two sides, one live graph' panel right with marketplace metrics.",
    points: [
      {
        icon: "bolt",
        title: "Urgency is a product feature, not a phone tree",
        body: "Urgent postings are flagged at creation and pinned to the top of every caregiver's feed with a pulsing badge.",
      },
      {
        icon: "shield",
        title: "Verified supply, surfaced up front",
        body: "CNA, HCA, CPR, and specialty credentials sit on the profile card — owners screen before they ever message.",
      },
      {
        icon: "sync",
        title: "One shared, real-time state",
        body: "A posted job appears on the caregiver board instantly; an application lands in the owner pipeline instantly.",
      },
      {
        icon: "heart",
        title: "Built for micro-communities",
        body: "Local, relationship-driven matching that respects how small homes actually hire — reputation first.",
      },
    ],
    panel: {
      heading: "Two sides, one live graph",
      tone: "brand",
      highlights: [
        { label: "Caregiver → shift discovery", value: "1-click apply" },
        { label: "Owner → posting to live feed", value: "Under 60 sec" },
        { label: "Applicant pipeline stages", value: "5 tracked states" },
        { label: "Messaging", value: "Threaded, in-app" },
      ],
    },
    notes: [
      "Emphasize what is deliberately NOT in the product: no ATS bloat, no enterprise onboarding, no implementation fee.",
      "The insight worth repeating: urgency is the wedge. Nobody else treats 'I need someone tonight' as a first-class object.",
      "Point at the panel — every number here is a live behavior in the product we will demo on slide 9.",
      "Transition into the three product pillars.",
    ],
  },
  {
    id: "investor-product",
    layout: "grid",
    eyebrow: "Product Highlights",
    title: "Speed, verification, and real-time matching",
    subtitle: "Three pillars that make a 6-bed home feel like it has a recruiting department.",
    visual:
      "Three large feature cards, each with a tinted icon tile, headline, and two-sentence body. Equal visual weight.",
    cards: [
      {
        icon: "bolt",
        tone: "warm",
        title: "Urgent Fill Engine",
        body: "Mark any posting URGENT and it jumps to a pinned, high-visibility banner across every matching caregiver feed. Notification badges drive caregivers back the moment new urgent work appears.",
      },
      {
        icon: "checkBadge",
        tone: "brand",
        title: "Trust & Verification",
        body: "Caregiver profiles lead with certifications, years of experience, specialty skills, and a verified marker. Owners shortlist on qualifications instead of guesswork.",
      },
      {
        icon: "sync",
        tone: "violet",
        title: "Real-Time Matching",
        body: "A shared state layer keeps both dashboards in lockstep — postings, applications, status changes, and messages propagate without a refresh.",
      },
    ],
    footnote:
      "Every capability on this slide is shipped and demonstrable in the live application.",
    notes: [
      "Keep this to 90 seconds — it is the setup for the live demo, not a feature dump.",
      "If the room is operator-heavy, pivot to the urgent fill story; if it is investor-heavy, pivot to retention mechanics.",
      "Say plainly: this is shipped software, not a roadmap slide.",
      "Transition: 'Individually these are features. Together they compound.'",
    ],
  },
  {
    id: "investor-flywheel",
    layout: "flow",
    eyebrow: "Marketplace Flywheel",
    title: "Network effects that compound locally, then spread",
    subtitle:
      "Density in one county makes the next county cheaper to win — liquidity is regional, and so is our moat.",
    visual:
      "Five numbered steps in a horizontal flow with connecting chevrons; loop-back caption under the final step.",
    steps: [
      {
        icon: "home",
        tone: "warm",
        title: "Homes post real shifts",
        body: "Owners list openings — including tonight's — in under a minute, free.",
      },
      {
        icon: "users",
        tone: "brand",
        title: "Caregivers find local work",
        body: "Verified caregivers discover nearby shifts that match their certifications and availability.",
      },
      {
        icon: "check",
        tone: "emerald",
        title: "Fills happen fast",
        body: "1-click applications and threaded messaging collapse days of phone tag into minutes.",
      },
      {
        icon: "star",
        tone: "amber",
        title: "Reputation accrues",
        body: "Reviews and ratings on both sides turn one good fill into durable, searchable trust.",
      },
      {
        icon: "trending",
        tone: "violet",
        title: "Density attracts density",
        body: "Better fill rates pull in more homes, which pulls in more caregivers, which lowers time-to-fill again.",
      },
    ],
    footnote:
      "The loop closes: every successful fill raises liquidity, which shortens the next fill.",
    notes: [
      "This is the slide investors will interrogate — be ready on cold-start strategy.",
      "Answer before it is asked: we seed the caregiver side first, county by county, because supply is the scarce input.",
      "Reputation is the retention mechanism — a caregiver's rating history is not portable to a competitor.",
      "Transition: 'A flywheel only matters if it monetizes. Here is how it does.'",
    ],
  },
  {
    id: "investor-model",
    layout: "stats",
    eyebrow: "Business Model",
    title: "Subscription core, urgency upside",
    subtitle:
      "Predictable SaaS revenue from homes, with usage-based fees that scale on the moments owners value most.",
    visual:
      "Four unit-economics stat blocks across the top, three revenue-line talking points beneath.",
    stats: [
      { value: "$149", label: "Per home, per month", detail: "Unlimited postings and pipeline", tone: "brand" },
      { value: "$89", label: "Urgent fill fee", detail: "Charged only on a successful urgent match", tone: "warm" },
      { value: "82%", label: "Gross margin", detail: "Self-serve onboarding, no field ops", tone: "emerald" },
      { value: "4.6x", label: "LTV : CAC", detail: "9-month blended payback", tone: "violet" },
    ],
    points: [
      {
        icon: "home",
        title: "Home subscriptions — the base",
        body: "Flat monthly pricing an owner-operator can approve without a committee. Free to post while a market is being seeded.",
      },
      {
        icon: "bolt",
        title: "Urgent fills — the upside",
        body: "Success-based pricing on emergency coverage, priced far under agency placement rates.",
      },
      {
        icon: "checkBadge",
        title: "Verification & placement services — the expansion",
        body: "Background check orchestration and credential monitoring as attach-rate revenue once density is established.",
      },
    ],
    footnote:
      "Unit economics are the current operating model and pricing hypothesis; figures move with market-level data.",
    notes: [
      "Lead with why flat pricing wins here: a 6-bed operator cannot evaluate per-seat enterprise pricing.",
      "The urgent fill fee is the strategic line — it captures value exactly where agencies overcharge today.",
      "Be explicit that caregivers never pay. Charging the supply side would kill liquidity.",
      "Have the cohort retention chart ready in the appendix.",
    ],
  },
  {
    id: "investor-moat",
    layout: "grid",
    eyebrow: "Competitive Advantage",
    title: "Purpose-built for micro-communities generic platforms ignore",
    subtitle:
      "The incumbents are either too broad to be useful or too expensive to adopt.",
    visual:
      "Three comparison cards side by side — two muted incumbents, one brand-accented CareConnect column that visually wins.",
    cards: [
      {
        icon: "search",
        tone: "neutral",
        title: "Generic job boards",
        body: "Built for corporate req volume. No concept of an urgent overnight shift, no credential verification, and an AFH posting drowns beneath hospital listings.",
      },
      {
        icon: "dollar",
        tone: "neutral",
        title: "Staffing agencies",
        body: "Solve the emergency at crisis pricing, send a caregiver who does not know the residents, and keep the relationship as their asset, not the home's.",
      },
      {
        icon: "heart",
        tone: "brand",
        title: "CareConnect",
        body: "One segment, done properly: urgency as a primitive, verification up front, reputation on both sides, and pricing a 6-bed home approves in a single sitting.",
      },
    ],
    footnote:
      "Our moat is segment depth plus local liquidity — neither is reachable by a horizontal platform adding a filter.",
    notes: [
      "Do not disparage incumbents — explain structurally why each cannot serve this segment profitably.",
      "The defensibility question is really 'why won't a big board do this?' Answer: the ACV is too small for their sales motion and too regional for their product.",
      "Reputation data and local density are the compounding assets; neither can be bought.",
      "Transition to proof: 'This is all live today.'",
    ],
  },
  {
    id: "investor-traction",
    layout: "split",
    eyebrow: "Traction & Demo",
    title: "Shipped, live, and deployable in a single region today",
    subtitle:
      "A real-time React application running the full dual-role experience end to end — not a prototype.",
    visual:
      "Split: engineering and go-to-market proof points left; brand-toned 'what you can click right now' panel right.",
    points: [
      {
        icon: "sync",
        title: "Real-time dual-role architecture",
        body: "A shared state layer keeps owner and caregiver views consistent, with role switching in a single click.",
      },
      {
        icon: "slides",
        title: "Complete product surface",
        body: "Job board, urgent banner, apply flow, applicant pipeline, threaded messaging, caregiver directory, and reviews all ship today.",
      },
      {
        icon: "mapPin",
        title: "Localized deployment model",
        body: "Each region launches as its own seeded market, so liquidity is proven county by county before we scale spend.",
      },
      {
        icon: "globe",
        title: "Built to scale sideways",
        body: "The same graph extends to assisted living, memory care, and in-home agencies without re-architecture.",
      },
    ],
    panel: {
      heading: "Click it live, right now",
      tone: "brand",
      highlights: [
        { label: "Post an urgent job", value: "Owner → caregiver feed" },
        { label: "Apply in one click", value: "Caregiver → owner pipeline" },
        { label: "Move a candidate to Hired", value: "Syncs both dashboards" },
        { label: "Switch roles", value: "Single click, no re-login" },
      ],
      footnote: "Live demo runs from this same application.",
    },
    notes: [
      "This is the demo cue — leave the deck and drive the product for two to three minutes.",
      "Demo path: post an urgent shift as the owner, switch roles, apply as the caregiver, switch back, move them to Hired.",
      "If time is short, run only the urgent post and the role switch. That is the 'aha' moment.",
      "Return to the deck on the ask — never end inside the demo.",
    ],
  },
  {
    id: "investor-ask",
    layout: "closing",
    eyebrow: "The Vision & Ask",
    title: "Scaling CareConnect to 50,000+ homes nationally",
    subtitle:
      "Become the default staffing layer for residential senior care — starting with the homes everyone else overlooked.",
    visual:
      "Closing slide: three milestone stats across the top, use-of-funds list below, high-contrast CTA band at the base.",
    stats: [
      { value: "3 states", label: "Year 1 — prove regional liquidity", tone: "brand" },
      { value: "8 states", label: "Year 2 — repeatable market playbook", tone: "violet" },
      { value: "50K+ homes", label: "Year 3 — national default", tone: "emerald" },
    ],
    asks: [
      {
        icon: "users",
        title: "Seed the supply side",
        body: "Caregiver acquisition and verification operations across the first three regional markets.",
      },
      {
        icon: "sparkle",
        title: "Deepen the urgent fill engine",
        body: "Matching intelligence, shift-level notifications, and mobile-first caregiver alerts.",
      },
      {
        icon: "target",
        title: "Build the market playbook",
        body: "A repeatable county-by-county launch motion with instrumented time-to-fill benchmarks.",
      },
    ],
    cta: "Let's make sure no resident goes without care because a shift went unfilled.",
    notes: [
      "State the raise amount and the 18-month milestone it buys out loud — the slide intentionally leaves room for it.",
      "Tie use of funds back to the flywheel: every dollar goes into supply density or fill speed.",
      "Close on the mission line, then stop talking and let the room ask.",
      "Have the data room link ready to share before anyone asks for it.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Deck 2 — Product & Client Demo                                     */
/* ------------------------------------------------------------------ */

const productSlides: Slide[] = [
  {
    id: "product-title",
    layout: "hero",
    eyebrow: "Product Walkthrough",
    title: "CareConnect in action",
    subtitle:
      "Seamless senior care hiring and shift discovery — a guided tour of how homes fill openings and caregivers find work they actually want.",
    badges: ["For AFH owners", "For certified caregivers", "Live demo included"],
    visual:
      "Hero with product-forward framing. Wordmark and subtitle left-weighted, audience badges beneath, stat strip at the base.",
    stats: [
      { value: "60 sec", label: "To publish a job posting", tone: "warm" },
      { value: "1 click", label: "To apply to a shift", tone: "brand" },
      { value: "0", label: "Cost for caregivers, always", tone: "emerald" },
    ],
    notes: [
      "Ask the room up front who is an owner and who is a caregiver — then weight the walkthrough accordingly.",
      "Promise the payoff: by the end they will know exactly what their first week looks like.",
      "Keep this to 30 seconds. The product is the proof, not the intro.",
    ],
  },
  {
    id: "product-summary",
    layout: "stats",
    eyebrow: "Executive Summary",
    title: "Certified caregivers and AFH owners, connected in seconds",
    subtitle:
      "One platform, two dashboards, one shared source of truth that updates the moment anything changes.",
    visual:
      "Four outcome stats in a 2x2 grid, followed by the two audience value propositions side by side.",
    stats: [
      { value: "< 6 hrs", label: "Median urgent shift fill time", tone: "warm" },
      { value: "5 stages", label: "Tracked applicant pipeline", detail: "Pending → Hired", tone: "brand" },
      { value: "4.8★", label: "Average home rating", detail: "Transparent, caregiver-written", tone: "amber" },
      { value: "600+", label: "Verified caregivers", detail: "Credentials surfaced on every profile", tone: "emerald" },
    ],
    points: [
      {
        icon: "home",
        title: "For home owners",
        body: "Post in under a minute, flag urgent fills, screen verified profiles, and track every applicant to a decision.",
      },
      {
        icon: "briefcase",
        title: "For caregivers",
        body: "See real local shifts with pay and hours up front, apply in one click, and read honest reviews before you commit.",
      },
    ],
    notes: [
      "This is the only slide a busy owner needs — make sure the four numbers land clearly.",
      "Stress that both sides see the same truth at the same time; that is what kills the phone tag.",
      "Transition: 'Let's walk it from the caregiver's side first, because that is where supply starts.'",
    ],
  },
  {
    id: "product-caregiver",
    layout: "split",
    eyebrow: "Caregiver Experience",
    title: "Find the right shift, apply in one click",
    subtitle:
      "A job board built around how caregivers actually search — by shift, by distance, by what pays this week.",
    visual:
      "Split: four caregiver capabilities left, brand-toned 'a caregiver's first session' panel right with timings.",
    points: [
      {
        icon: "search",
        title: "Filter to what fits your life",
        body: "Full-time, part-time, and shift-based filters plus keyword search across every live local posting.",
      },
      {
        icon: "bolt",
        title: "Urgent shifts, pinned and obvious",
        body: "A high-visibility urgent banner pins immediate openings — usually the highest-paying work on the board.",
      },
      {
        icon: "check",
        title: "One-click apply with a personal note",
        body: "Apply with a short message to the home, see an instant Applied state, and withdraw any time.",
      },
      {
        icon: "bookmark",
        title: "Save now, decide later",
        body: "Bookmark postings and track every application's live status on the Saved & Applied page.",
      },
    ],
    panel: {
      heading: "A caregiver's first session",
      tone: "brand",
      highlights: [
        { label: "Browse the local board", value: "No account wall" },
        { label: "Check the home's reviews", value: "Before applying" },
        { label: "Apply to a shift", value: "1 click + a note" },
        { label: "Track the outcome", value: "Live status updates" },
      ],
    },
    notes: [
      "Demo cue: open the Job Board, apply a shift-based filter, then point at the urgent banner.",
      "Emphasize pay rate and hours being visible before applying — this is the top caregiver complaint elsewhere.",
      "Mention the notification badge for new urgent jobs; it is what brings caregivers back daily.",
      "Transition: 'Every one of those applications lands somewhere. Let's look at the owner's side.'",
    ],
  },
  {
    id: "product-owner",
    layout: "split",
    eyebrow: "Owner Experience",
    title: "Post in a minute, fill urgent shifts tonight",
    subtitle:
      "Everything an owner-operator needs to fill a role, with nothing they have to be trained on.",
    visual:
      "Split with warm accent: four owner capabilities left, warm-toned urgent fill engine panel right.",
    points: [
      {
        icon: "send",
        title: "Publish a posting in under a minute",
        body: "Title, description, pay rate, hours, type, and shift — then it is live on the caregiver board instantly.",
      },
      {
        icon: "bolt",
        title: "Flag it URGENT for immediate reach",
        body: "One toggle pins the posting to the top of every caregiver feed with a pulsing priority badge.",
      },
      {
        icon: "users",
        title: "Screen on credentials, not guesswork",
        body: "Browse the caregiver directory by certification, experience, and availability before you even post.",
      },
      {
        icon: "star",
        title: "Manage your home's reputation",
        body: "Track reviews and rating breakdowns so strong homes attract stronger applicants over time.",
      },
    ],
    panel: {
      heading: "The urgent fill engine",
      tone: "warm",
      highlights: [
        { label: "Toggle urgent at post time", value: "1 switch" },
        { label: "Placement in caregiver feed", value: "Pinned to top" },
        { label: "Caregiver notification badge", value: "Fires immediately" },
        { label: "Median time to first applicant", value: "Under 6 hrs" },
      ],
    },
    notes: [
      "Demo cue: post a job live, toggle URGENT, then switch roles to show it pinned on the caregiver board.",
      "This role-switch moment is the single most persuasive thing in the demo — do not rush it.",
      "For owners: stress that posting is free while a market is being seeded.",
      "Transition: 'Applications are only useful if you can act on them.'",
    ],
  },
  {
    id: "product-pipeline",
    layout: "flow",
    eyebrow: "Applicant Pipeline",
    title: "From application to hire, without a spreadsheet",
    subtitle:
      "Every applicant moves through five tracked stages, and the caregiver sees each change the moment you make it.",
    visual:
      "Five-stage horizontal pipeline with tone-coded stage chips matching the in-app status colors.",
    steps: [
      {
        icon: "inbox",
        tone: "amber",
        title: "Pending",
        body: "New applications land in the owner's tracker with an unread badge the moment they arrive.",
      },
      {
        icon: "search",
        tone: "blue",
        title: "Reviewed",
        body: "Open the full profile — certifications, experience, skills, and availability — and mark it reviewed.",
      },
      {
        icon: "chat",
        tone: "violet",
        title: "Interview",
        body: "Message the applicant in a threaded conversation tied directly to their application.",
      },
      {
        icon: "checkBadge",
        tone: "emerald",
        title: "Hired",
        body: "Mark the hire and the caregiver's tracker updates instantly — no follow-up call required.",
      },
      {
        icon: "user",
        tone: "neutral",
        title: "Declined",
        body: "Close the loop respectfully so caregivers are never left guessing about where they stand.",
      },
    ],
    footnote:
      "Summary counts at the top of the pipeline show exactly how many applicants sit in each stage.",
    notes: [
      "Demo cue: move a real applicant from Pending to Hired, then switch roles to show the caregiver's view updated.",
      "The 'declined' stage matters to caregivers — silence is the number one complaint about hiring elsewhere.",
      "Point out the summary counts; owners scan those before they scan names.",
      "Transition: 'Most of the pipeline happens in conversation, so messaging is built in.'",
    ],
  },
  {
    id: "product-messaging",
    layout: "grid",
    eyebrow: "Direct In-App Messaging",
    title: "Real-time threaded conversations, tied to the application",
    subtitle: "No personal phone numbers, no lost texts, no context switching.",
    visual:
      "Three feature cards describing threading, context, and notification behavior, with an inbox-style icon language.",
    cards: [
      {
        icon: "chat",
        tone: "brand",
        title: "One thread per application",
        body: "Every conversation is anchored to the job and the candidate, so context never has to be re-explained. Owners and caregivers both open it from the same place they manage applications.",
      },
      {
        icon: "inbox",
        tone: "violet",
        title: "Unread badges that mean something",
        body: "Orange counts appear on the Messages nav for both roles and clear as threads are read. Nothing sits unanswered because it scrolled out of view.",
      },
      {
        icon: "send",
        tone: "emerald",
        title: "Message from wherever you are",
        body: "Start a conversation from an applicant card, an application row, or the inbox itself. The thread is the same conversation regardless of entry point.",
      },
    ],
    notes: [
      "Demo cue: send a message as the owner, switch roles, and show the badge and the message already waiting.",
      "Privacy angle for caregivers: you never hand out your personal number to apply.",
      "Keep this slide short — messaging is table stakes, verification is the differentiator.",
    ],
  },
  {
    id: "product-trust",
    layout: "grid",
    eyebrow: "Trust & Verification",
    title: "Verified profiles that answer the questions owners ask first",
    subtitle:
      "Credentials, experience, and specialties surface before the first message, not after the interview.",
    visual:
      "Three cards on verification, skills, and the profile owners actually read. Verified badge motif repeated.",
    cards: [
      {
        icon: "checkBadge",
        tone: "brand",
        title: "Credentials up front",
        body: "CNA, HCA, CPR, and specialty certifications appear directly on the profile card with a verified marker. Owners shortlist on qualifications in seconds instead of chasing paperwork.",
      },
      {
        icon: "sparkle",
        tone: "violet",
        title: "Skills and specialties, tracked",
        body: "Dementia care, medication management, mobility assistance, hospice support — caregivers tag what they actually do. Owners filter the directory by exactly the skill a resident needs.",
      },
      {
        icon: "user",
        tone: "emerald",
        title: "A profile caregivers control",
        body: "Caregivers edit their title, bio, city, experience, certifications, skills, and availability at any time. Updates flow through to every application already in flight.",
      },
    ],
    footnote:
      "Verification builds the trust that makes a one-click application safe to accept.",
    notes: [
      "This is the slide that closes owners — it directly answers 'how do I know this person is qualified?'",
      "Demo cue: open the Caregivers directory and filter by a certification.",
      "For caregivers: your profile is the asset, and it travels with every application you send.",
      "Transition: 'Trust runs both directions. Homes are rated too.'",
    ],
  },
  {
    id: "product-reputation",
    layout: "split",
    eyebrow: "Reputation Management",
    title: "Transparent ratings for homes, written by caregivers",
    subtitle:
      "Honest reviews on both sides are what make a small-home marketplace work at all.",
    visual:
      "Split: four reputation capabilities left, amber-toned rating breakdown panel right showing a star distribution.",
    points: [
      {
        icon: "star",
        title: "Every home carries a public rating",
        body: "Star ratings and review counts appear across the directory, the job board, and each home's detail page.",
      },
      {
        icon: "chat",
        title: "Reviews written by the people who worked there",
        body: "Caregivers leave feedback tied to their role and experience, so future applicants know what to expect.",
      },
      {
        icon: "trending",
        title: "A breakdown owners can act on",
        body: "The Review Tracker shows rating distribution over time, turning feedback into something operational.",
      },
      {
        icon: "heart",
        title: "Good homes get discovered",
        body: "Strong reputations attract stronger applicants — the single best recruiting advantage a small home can build.",
      },
    ],
    panel: {
      heading: "Why transparency wins here",
      tone: "amber",
      highlights: [
        { label: "Average home rating", value: "4.8 / 5.0" },
        { label: "Reviews visible before applying", value: "Always" },
        { label: "Owner response to feedback", value: "Tracked in-app" },
        { label: "Effect on applicant quality", value: "Compounding" },
      ],
    },
    notes: [
      "Address the fear directly: owners worry about bad reviews. Reframe it as the mechanism that rewards good operators.",
      "Caregivers choose homes on reputation — an untrusted home pays a premium to fill every shift.",
      "Demo cue: open a home detail page and scroll the reviews.",
      "Transition: 'All of this stays in sync because of one architectural decision.'",
    ],
  },
  {
    id: "product-sync",
    layout: "split",
    eyebrow: "Real-Time Synchronized State",
    title: "Both sides of the marketplace, always in lockstep",
    subtitle:
      "One shared store drives both dashboards — including a single-click switch between owner and caregiver views.",
    visual:
      "Split: four sync behaviors left, violet-toned 'switch roles in one click' panel right showing the propagation path.",
    points: [
      {
        icon: "sync",
        title: "Post once, appear everywhere",
        body: "An owner's new job — urgent or not — lands on the caregiver board and urgent banner immediately.",
      },
      {
        icon: "inbox",
        title: "Applications arrive live",
        body: "A caregiver's application shows up in the owner's tracker instantly, with an unread badge on the nav.",
      },
      {
        icon: "check",
        title: "Status changes flow back",
        body: "Move someone to Interview or Hired and their tracker reflects it without a refresh or an email.",
      },
      {
        icon: "user",
        title: "One identity, two roles",
        body: "Switch between owner and caregiver views in a single click — useful for operators who also pick up shifts.",
      },
    ],
    panel: {
      heading: "Dual-role switching",
      tone: "violet",
      highlights: [
        { label: "Role switch", value: "1 click, no re-login" },
        { label: "State propagation", value: "Immediate" },
        { label: "Session persistence", value: "Survives refresh" },
        { label: "Unread badges", value: "Per role, per thread" },
      ],
    },
    notes: [
      "Demo cue: this is the showstopper — post, switch, apply, switch back, hire. Under 90 seconds end to end.",
      "For technical audiences: mention the shared context store and persistence layer.",
      "For operators: translate it as 'you never have to ask whether the other side saw it.'",
      "Transition: 'So what does your first week look like?'",
    ],
  },
  {
    id: "product-onboarding",
    layout: "closing",
    eyebrow: "Getting Started",
    title: "Your first shift filled, this week",
    subtitle:
      "Onboarding takes minutes for either side — no implementation project, no training, no contract to negotiate.",
    visual:
      "Closing slide: three timeline stats across the top, two onboarding tracks below, CTA band at the base.",
    stats: [
      { value: "2 min", label: "Caregiver profile setup", tone: "brand" },
      { value: "5 min", label: "Home onboarding, start to first posting", tone: "warm" },
      { value: "Same day", label: "Typical first applicant on an urgent shift", tone: "emerald" },
    ],
    asks: [
      {
        icon: "briefcase",
        title: "Caregivers — build your profile",
        body: "Add your certifications, skills, and availability, then apply to your first local shift in one click.",
      },
      {
        icon: "home",
        title: "Home owners — post your hardest opening",
        body: "Start with the shift you have struggled to fill. Flag it urgent and watch the applicant pipeline populate.",
      },
      {
        icon: "chat",
        title: "Both — reply fast, build reputation",
        body: "Answer threads quickly and leave honest reviews. Responsiveness is what compounds into trust here.",
      },
    ],
    cta: "Pick a role and start — it takes less time than one recruiting phone call.",
    notes: [
      "End with a concrete next step for each audience in the room, not a generic thank you.",
      "Offer to walk any owner through their first posting right after the session.",
      "Leave the deck on this slide during Q&A — the CTA stays on screen.",
    ],
  },
];

export const investorDeck: Deck = {
  id: "investor",
  name: "Investor Pitch Deck",
  shortName: "Investor Pitch",
  tagline: "Revolutionizing senior care staffing for Adult Family Homes",
  audience: "Seed investors, strategic partners, advisors",
  accent: "brand",
  durationMinutes: 12,
  slides: investorSlides,
};

export const productDeck: Deck = {
  id: "product",
  name: "Product & Client Demo Deck",
  shortName: "Product Demo",
  tagline: "Seamless senior care hiring and shift discovery",
  audience: "AFH owners, caregivers, care network partners",
  accent: "warm",
  durationMinutes: 15,
  slides: productSlides,
};

export const decks: Deck[] = [investorDeck, productDeck];

/** Returns the deck for `id`, falling back to the investor deck. */
export function getDeck(id: string | null | undefined): Deck {
  return decks.find((deck) => deck.id === id) ?? decks[0];
}
