# CareConnect — Presentation Decks

Complete slide-by-slide copy, visual composition cues, and speaker notes for
both CareConnect decks.

> **This file is generated.** Slide content lives in `src/data/slideData.ts`
> and is rendered both by the interactive deck at `/slides` and by this
> document. Edit the data, then run `npm run docs:decks`.

## Presenting

Run `npm run dev` and open <http://localhost:5173/slides>. Deep link to any
position with `?deck=<investor|product>&slide=<n>`.

| Key | Action |
| --- | --- |
| `←` / `→` | Previous / next slide |
| `Space` / `PageDown` | Next slide |
| `Home` / `End` | First / last slide |
| `F` | Toggle fullscreen |
| `N` | Toggle presenter notes (talk track, visual cue, timer, up-next) |
| `G` | Toggle the slide picker grid |
| `D` | Switch between the two decks |
| `Esc` | Close the picker or notes, or leave fullscreen |

On touch devices, swipe left or right to move between slides.

## Decks at a glance

| Deck | Slides | Runtime | Audience |
| --- | --- | --- | --- |
| Investor Pitch Deck | 10 | ~12 min | Seed investors, strategic partners, advisors |
| Product & Client Demo Deck | 10 | ~15 min | AFH owners, caregivers, care network partners |

---

## Investor Pitch Deck

**Audience:** Seed investors, strategic partners, advisors  
**Runtime:** ~12 minutes · 10 slides  
**Open it live:** `/slides?deck=investor`

_Revolutionizing senior care staffing for Adult Family Homes_

| # | Slide | Section |
| --- | --- | --- |
| 1 | CareConnect | Seed Round · 2026 |
| 2 | Adult Family Homes are in a permanent staffing emergency | The Problem |
| 3 | A $42B market with no purpose-built connective tissue | The Opportunity |
| 4 | A dual-sided marketplace built only for AFHs and caregivers | The Solution |
| 5 | Speed, verification, and real-time matching | Product Highlights |
| 6 | Network effects that compound locally, then spread | Marketplace Flywheel |
| 7 | Subscription core, urgency upside | Business Model |
| 8 | Purpose-built for micro-communities generic platforms ignore | Competitive Advantage |
| 9 | Shipped, live, and deployable in a single region today | Traction & Demo |
| 10 | Scaling CareConnect to 50,000+ homes nationally | The Vision & Ask |

---

### Slide 1 — CareConnect

**Section:** Seed Round · 2026 · **Layout:** `hero`

> Revolutionizing senior care staffing for Adult Family Homes — the dual-sided marketplace where certified caregivers and licensed homes find each other in minutes, not weeks.

**On-screen badges:** `Senior care marketplace` · `Beachhead: Washington State` · `Live product, real users`

**Supporting figures**

| Figure | Means | Detail |
| --- | --- | --- |
| **$42B** | US senior care staffing spend | — |
| **30K+** | Licensed Adult Family Homes | — |
| **< 6 hrs** | Median urgent shift fill time | — |

**Visual composition**

Full-bleed hero. Oversized wordmark left, soft brand/warm gradient orbs behind, supporting stat strip anchored bottom.

**Speaker notes**

- Open with the human stake: an unfilled caregiver shift is a resident without care tonight.
- Frame CareConnect as infrastructure for a fragmented, overlooked segment — not another job board.
- Set expectations for the next 9 slides: problem, market, product, model, moat, ask.
- Keep this slide to 45 seconds. The story starts on the problem slide.

---

### Slide 2 — Adult Family Homes are in a permanent staffing emergency

**Section:** The Problem · **Layout:** `split`

> Small licensed homes compete for caregivers with hospitals and national agencies — without recruiters, budgets, or software.

**Talking points**

- **Openings stay open for weeks** — A single call-out cascades into mandatory overtime, burnout, and another resignation.
- **Turnover never stops** — Direct-care roles churn at rates no 4-to-8 bed operator can absorb or out-recruit.
- **Agencies charge crisis pricing** — Emergency placements arrive at heavy premiums, with a stranger who does not know the residents.
- **Caregivers can't find local work** — Qualified CNAs and HCAs scroll generic boards full of hospital postings 40 miles away.

**Side panel — What one unfilled role costs a 6-bed home**

| | |
| --- | --- |
| Overtime backfill | **$2,400 / mo** |
| Agency premium vs. direct hire | **+55%** |
| Revenue held by one empty bed | **$4,500 / mo** |
| Owner hours lost to recruiting | **11 hrs / week** |

_Composite of operator interviews in the launch market._

**Visual composition**

Two-column split. Left: four escalating pain points. Right: a warm-toned cost panel quantifying one 6-bed home.

**Speaker notes**

- Name the buyer precisely: the owner-operator who is also the scheduler, the recruiter, and often the overnight caregiver.
- The pain is not 'hiring is hard' — it is that every unfilled shift converts directly into cash burn and licensing risk.
- Tie the right-hand panel back to the left: each pain point has a line item.
- Bridge line: 'This is not a niche inconvenience. It is a multi-billion dollar structural gap.'

---

### Slide 3 — A $42B market with no purpose-built connective tissue

**Section:** The Opportunity · **Layout:** `stats`

> Demand for direct care is compounding while the supply side remains offline, informal, and word-of-mouth.

**Key metrics**

| Figure | Means | Detail |
| --- | --- | --- |
| **$42B** | Total US senior care staffing spend | Direct-care labor across residential settings |
| **30K+** | Licensed Adult Family Homes | Small residential homes, 4–8 beds each |
| **1.2M** | New direct-care hires needed by 2032 | Fastest-growing occupational category in the US |
| **$3.8B** | Serviceable staffing spend | AFH segment across our first eight target states |

**Narrative**

- **Demographics are the tailwind** — 10,000 Americans turn 65 every day, and families increasingly choose small homes over institutional facilities.
- **Supply is the bottleneck** — Capacity is capped by staffing, not by licensed beds. Every filled shift unlocks held revenue.
- **Nobody serves this segment** — Enterprise workforce software prices out a 6-bed home; consumer job boards ignore it entirely.

_Market figures are directional estimates compiled from public labor and licensing data — verify against current sources before circulating externally._

**Visual composition**

Four oversized stat blocks in a 2x2 grid, then a three-point narrowing narrative (TAM → SAM → beachhead) beneath.

**Speaker notes**

- Do not linger on TAM. Investors discount it; spend the time on the beachhead math instead.
- Key point: capacity in this industry is gated by staffing, so software that fills shifts literally unlocks revenue.
- Have the state-by-state licensed-home counts ready in the appendix if asked.
- Transition: 'The demand exists, the supply exists — they simply have no shared surface. That is what we built.'

---

### Slide 4 — A dual-sided marketplace built only for AFHs and caregivers

**Section:** The Solution · **Layout:** `split`

> One live graph of verified caregivers and licensed homes, with urgency as a first-class primitive.

**Talking points**

- **Urgency is a product feature, not a phone tree** — Urgent postings are flagged at creation and pinned to the top of every caregiver's feed with a pulsing badge.
- **Verified supply, surfaced up front** — CNA, HCA, CPR, and specialty credentials sit on the profile card — owners screen before they ever message.
- **One shared, real-time state** — A posted job appears on the caregiver board instantly; an application lands in the owner pipeline instantly.
- **Built for micro-communities** — Local, relationship-driven matching that respects how small homes actually hire — reputation first.

**Side panel — Two sides, one live graph**

| | |
| --- | --- |
| Caregiver → shift discovery | **1-click apply** |
| Owner → posting to live feed | **Under 60 sec** |
| Applicant pipeline stages | **5 tracked states** |
| Messaging | **Threaded, in-app** |

**Visual composition**

Split layout: four solution pillars left, brand-toned 'two sides, one live graph' panel right with marketplace metrics.

**Speaker notes**

- Emphasize what is deliberately NOT in the product: no ATS bloat, no enterprise onboarding, no implementation fee.
- The insight worth repeating: urgency is the wedge. Nobody else treats 'I need someone tonight' as a first-class object.
- Point at the panel — every number here is a live behavior in the product we will demo on slide 9.
- Transition into the three product pillars.

---

### Slide 5 — Speed, verification, and real-time matching

**Section:** Product Highlights · **Layout:** `grid`

> Three pillars that make a 6-bed home feel like it has a recruiting department.

- **Urgent Fill Engine** — Mark any posting URGENT and it jumps to a pinned, high-visibility banner across every matching caregiver feed. Notification badges drive caregivers back the moment new urgent work appears.
- **Trust & Verification** — Caregiver profiles lead with certifications, years of experience, specialty skills, and a verified marker. Owners shortlist on qualifications instead of guesswork.
- **Real-Time Matching** — A shared state layer keeps both dashboards in lockstep — postings, applications, status changes, and messages propagate without a refresh.

_Every capability on this slide is shipped and demonstrable in the live application._

**Visual composition**

Three large feature cards, each with a tinted icon tile, headline, and two-sentence body. Equal visual weight.

**Speaker notes**

- Keep this to 90 seconds — it is the setup for the live demo, not a feature dump.
- If the room is operator-heavy, pivot to the urgent fill story; if it is investor-heavy, pivot to retention mechanics.
- Say plainly: this is shipped software, not a roadmap slide.
- Transition: 'Individually these are features. Together they compound.'

---

### Slide 6 — Network effects that compound locally, then spread

**Section:** Marketplace Flywheel · **Layout:** `flow`

> Density in one county makes the next county cheaper to win — liquidity is regional, and so is our moat.

1. **Homes post real shifts** — Owners list openings — including tonight's — in under a minute, free.
2. **Caregivers find local work** — Verified caregivers discover nearby shifts that match their certifications and availability.
3. **Fills happen fast** — 1-click applications and threaded messaging collapse days of phone tag into minutes.
4. **Reputation accrues** — Reviews and ratings on both sides turn one good fill into durable, searchable trust.
5. **Density attracts density** — Better fill rates pull in more homes, which pulls in more caregivers, which lowers time-to-fill again.

_The loop closes: every successful fill raises liquidity, which shortens the next fill._

**Visual composition**

Five numbered steps in a horizontal flow with connecting chevrons; loop-back caption under the final step.

**Speaker notes**

- This is the slide investors will interrogate — be ready on cold-start strategy.
- Answer before it is asked: we seed the caregiver side first, county by county, because supply is the scarce input.
- Reputation is the retention mechanism — a caregiver's rating history is not portable to a competitor.
- Transition: 'A flywheel only matters if it monetizes. Here is how it does.'

---

### Slide 7 — Subscription core, urgency upside

**Section:** Business Model · **Layout:** `stats`

> Predictable SaaS revenue from homes, with usage-based fees that scale on the moments owners value most.

**Key metrics**

| Figure | Means | Detail |
| --- | --- | --- |
| **$149** | Per home, per month | Unlimited postings and pipeline |
| **$89** | Urgent fill fee | Charged only on a successful urgent match |
| **82%** | Gross margin | Self-serve onboarding, no field ops |
| **4.6x** | LTV : CAC | 9-month blended payback |

**Narrative**

- **Home subscriptions — the base** — Flat monthly pricing an owner-operator can approve without a committee. Free to post while a market is being seeded.
- **Urgent fills — the upside** — Success-based pricing on emergency coverage, priced far under agency placement rates.
- **Verification & placement services — the expansion** — Background check orchestration and credential monitoring as attach-rate revenue once density is established.

_Unit economics are the current operating model and pricing hypothesis; figures move with market-level data._

**Visual composition**

Four unit-economics stat blocks across the top, three revenue-line talking points beneath.

**Speaker notes**

- Lead with why flat pricing wins here: a 6-bed operator cannot evaluate per-seat enterprise pricing.
- The urgent fill fee is the strategic line — it captures value exactly where agencies overcharge today.
- Be explicit that caregivers never pay. Charging the supply side would kill liquidity.
- Have the cohort retention chart ready in the appendix.

---

### Slide 8 — Purpose-built for micro-communities generic platforms ignore

**Section:** Competitive Advantage · **Layout:** `grid`

> The incumbents are either too broad to be useful or too expensive to adopt.

- **Generic job boards** — Built for corporate req volume. No concept of an urgent overnight shift, no credential verification, and an AFH posting drowns beneath hospital listings.
- **Staffing agencies** — Solve the emergency at crisis pricing, send a caregiver who does not know the residents, and keep the relationship as their asset, not the home's.
- **CareConnect** — One segment, done properly: urgency as a primitive, verification up front, reputation on both sides, and pricing a 6-bed home approves in a single sitting.

_Our moat is segment depth plus local liquidity — neither is reachable by a horizontal platform adding a filter._

**Visual composition**

Three comparison cards side by side — two muted incumbents, one brand-accented CareConnect column that visually wins.

**Speaker notes**

- Do not disparage incumbents — explain structurally why each cannot serve this segment profitably.
- The defensibility question is really 'why won't a big board do this?' Answer: the ACV is too small for their sales motion and too regional for their product.
- Reputation data and local density are the compounding assets; neither can be bought.
- Transition to proof: 'This is all live today.'

---

### Slide 9 — Shipped, live, and deployable in a single region today

**Section:** Traction & Demo · **Layout:** `split`

> A real-time React application running the full dual-role experience end to end — not a prototype.

**Talking points**

- **Real-time dual-role architecture** — A shared state layer keeps owner and caregiver views consistent, with role switching in a single click.
- **Complete product surface** — Job board, urgent banner, apply flow, applicant pipeline, threaded messaging, caregiver directory, and reviews all ship today.
- **Localized deployment model** — Each region launches as its own seeded market, so liquidity is proven county by county before we scale spend.
- **Built to scale sideways** — The same graph extends to assisted living, memory care, and in-home agencies without re-architecture.

**Side panel — Click it live, right now**

| | |
| --- | --- |
| Post an urgent job | **Owner → caregiver feed** |
| Apply in one click | **Caregiver → owner pipeline** |
| Move a candidate to Hired | **Syncs both dashboards** |
| Switch roles | **Single click, no re-login** |

_Live demo runs from this same application._

**Visual composition**

Split: engineering and go-to-market proof points left; brand-toned 'what you can click right now' panel right.

**Speaker notes**

- This is the demo cue — leave the deck and drive the product for two to three minutes.
- Demo path: post an urgent shift as the owner, switch roles, apply as the caregiver, switch back, move them to Hired.
- If time is short, run only the urgent post and the role switch. That is the 'aha' moment.
- Return to the deck on the ask — never end inside the demo.

---

### Slide 10 — Scaling CareConnect to 50,000+ homes nationally

**Section:** The Vision & Ask · **Layout:** `closing`

> Become the default staffing layer for residential senior care — starting with the homes everyone else overlooked.

**Milestones**

| Figure | Means | Detail |
| --- | --- | --- |
| **3 states** | Year 1 — prove regional liquidity | — |
| **8 states** | Year 2 — repeatable market playbook | — |
| **50K+ homes** | Year 3 — national default | — |

**The ask**

- **Seed the supply side** — Caregiver acquisition and verification operations across the first three regional markets.
- **Deepen the urgent fill engine** — Matching intelligence, shift-level notifications, and mobile-first caregiver alerts.
- **Build the market playbook** — A repeatable county-by-county launch motion with instrumented time-to-fill benchmarks.

**Closing line:** _Let's make sure no resident goes without care because a shift went unfilled._

**Visual composition**

Closing slide: three milestone stats across the top, use-of-funds list below, high-contrast CTA band at the base.

**Speaker notes**

- State the raise amount and the 18-month milestone it buys out loud — the slide intentionally leaves room for it.
- Tie use of funds back to the flywheel: every dollar goes into supply density or fill speed.
- Close on the mission line, then stop talking and let the room ask.
- Have the data room link ready to share before anyone asks for it.

---

## Product & Client Demo Deck

**Audience:** AFH owners, caregivers, care network partners  
**Runtime:** ~15 minutes · 10 slides  
**Open it live:** `/slides?deck=product`

_Seamless senior care hiring and shift discovery_

| # | Slide | Section |
| --- | --- | --- |
| 1 | CareConnect in action | Product Walkthrough |
| 2 | Certified caregivers and AFH owners, connected in seconds | Executive Summary |
| 3 | Find the right shift, apply in one click | Caregiver Experience |
| 4 | Post in a minute, fill urgent shifts tonight | Owner Experience |
| 5 | From application to hire, without a spreadsheet | Applicant Pipeline |
| 6 | Real-time threaded conversations, tied to the application | Direct In-App Messaging |
| 7 | Verified profiles that answer the questions owners ask first | Trust & Verification |
| 8 | Transparent ratings for homes, written by caregivers | Reputation Management |
| 9 | Both sides of the marketplace, always in lockstep | Real-Time Synchronized State |
| 10 | Your first shift filled, this week | Getting Started |

---

### Slide 1 — CareConnect in action

**Section:** Product Walkthrough · **Layout:** `hero`

> Seamless senior care hiring and shift discovery — a guided tour of how homes fill openings and caregivers find work they actually want.

**On-screen badges:** `For AFH owners` · `For certified caregivers` · `Live demo included`

**Supporting figures**

| Figure | Means | Detail |
| --- | --- | --- |
| **60 sec** | To publish a job posting | — |
| **1 click** | To apply to a shift | — |
| **0** | Cost for caregivers, always | — |

**Visual composition**

Hero with product-forward framing. Wordmark and subtitle left-weighted, audience badges beneath, stat strip at the base.

**Speaker notes**

- Ask the room up front who is an owner and who is a caregiver — then weight the walkthrough accordingly.
- Promise the payoff: by the end they will know exactly what their first week looks like.
- Keep this to 30 seconds. The product is the proof, not the intro.

---

### Slide 2 — Certified caregivers and AFH owners, connected in seconds

**Section:** Executive Summary · **Layout:** `stats`

> One platform, two dashboards, one shared source of truth that updates the moment anything changes.

**Key metrics**

| Figure | Means | Detail |
| --- | --- | --- |
| **< 6 hrs** | Median urgent shift fill time | — |
| **5 stages** | Tracked applicant pipeline | Pending → Hired |
| **4.8★** | Average home rating | Transparent, caregiver-written |
| **600+** | Verified caregivers | Credentials surfaced on every profile |

**Narrative**

- **For home owners** — Post in under a minute, flag urgent fills, screen verified profiles, and track every applicant to a decision.
- **For caregivers** — See real local shifts with pay and hours up front, apply in one click, and read honest reviews before you commit.

**Visual composition**

Four outcome stats in a 2x2 grid, followed by the two audience value propositions side by side.

**Speaker notes**

- This is the only slide a busy owner needs — make sure the four numbers land clearly.
- Stress that both sides see the same truth at the same time; that is what kills the phone tag.
- Transition: 'Let's walk it from the caregiver's side first, because that is where supply starts.'

---

### Slide 3 — Find the right shift, apply in one click

**Section:** Caregiver Experience · **Layout:** `split`

> A job board built around how caregivers actually search — by shift, by distance, by what pays this week.

**Talking points**

- **Filter to what fits your life** — Full-time, part-time, and shift-based filters plus keyword search across every live local posting.
- **Urgent shifts, pinned and obvious** — A high-visibility urgent banner pins immediate openings — usually the highest-paying work on the board.
- **One-click apply with a personal note** — Apply with a short message to the home, see an instant Applied state, and withdraw any time.
- **Save now, decide later** — Bookmark postings and track every application's live status on the Saved & Applied page.

**Side panel — A caregiver's first session**

| | |
| --- | --- |
| Browse the local board | **No account wall** |
| Check the home's reviews | **Before applying** |
| Apply to a shift | **1 click + a note** |
| Track the outcome | **Live status updates** |

**Visual composition**

Split: four caregiver capabilities left, brand-toned 'a caregiver's first session' panel right with timings.

**Speaker notes**

- Demo cue: open the Job Board, apply a shift-based filter, then point at the urgent banner.
- Emphasize pay rate and hours being visible before applying — this is the top caregiver complaint elsewhere.
- Mention the notification badge for new urgent jobs; it is what brings caregivers back daily.
- Transition: 'Every one of those applications lands somewhere. Let's look at the owner's side.'

---

### Slide 4 — Post in a minute, fill urgent shifts tonight

**Section:** Owner Experience · **Layout:** `split`

> Everything an owner-operator needs to fill a role, with nothing they have to be trained on.

**Talking points**

- **Publish a posting in under a minute** — Title, description, pay rate, hours, type, and shift — then it is live on the caregiver board instantly.
- **Flag it URGENT for immediate reach** — One toggle pins the posting to the top of every caregiver feed with a pulsing priority badge.
- **Screen on credentials, not guesswork** — Browse the caregiver directory by certification, experience, and availability before you even post.
- **Manage your home's reputation** — Track reviews and rating breakdowns so strong homes attract stronger applicants over time.

**Side panel — The urgent fill engine**

| | |
| --- | --- |
| Toggle urgent at post time | **1 switch** |
| Placement in caregiver feed | **Pinned to top** |
| Caregiver notification badge | **Fires immediately** |
| Median time to first applicant | **Under 6 hrs** |

**Visual composition**

Split with warm accent: four owner capabilities left, warm-toned urgent fill engine panel right.

**Speaker notes**

- Demo cue: post a job live, toggle URGENT, then switch roles to show it pinned on the caregiver board.
- This role-switch moment is the single most persuasive thing in the demo — do not rush it.
- For owners: stress that posting is free while a market is being seeded.
- Transition: 'Applications are only useful if you can act on them.'

---

### Slide 5 — From application to hire, without a spreadsheet

**Section:** Applicant Pipeline · **Layout:** `flow`

> Every applicant moves through five tracked stages, and the caregiver sees each change the moment you make it.

1. **Pending** — New applications land in the owner's tracker with an unread badge the moment they arrive.
2. **Reviewed** — Open the full profile — certifications, experience, skills, and availability — and mark it reviewed.
3. **Interview** — Message the applicant in a threaded conversation tied directly to their application.
4. **Hired** — Mark the hire and the caregiver's tracker updates instantly — no follow-up call required.
5. **Declined** — Close the loop respectfully so caregivers are never left guessing about where they stand.

_Summary counts at the top of the pipeline show exactly how many applicants sit in each stage._

**Visual composition**

Five-stage horizontal pipeline with tone-coded stage chips matching the in-app status colors.

**Speaker notes**

- Demo cue: move a real applicant from Pending to Hired, then switch roles to show the caregiver's view updated.
- The 'declined' stage matters to caregivers — silence is the number one complaint about hiring elsewhere.
- Point out the summary counts; owners scan those before they scan names.
- Transition: 'Most of the pipeline happens in conversation, so messaging is built in.'

---

### Slide 6 — Real-time threaded conversations, tied to the application

**Section:** Direct In-App Messaging · **Layout:** `grid`

> No personal phone numbers, no lost texts, no context switching.

- **One thread per application** — Every conversation is anchored to the job and the candidate, so context never has to be re-explained. Owners and caregivers both open it from the same place they manage applications.
- **Unread badges that mean something** — Orange counts appear on the Messages nav for both roles and clear as threads are read. Nothing sits unanswered because it scrolled out of view.
- **Message from wherever you are** — Start a conversation from an applicant card, an application row, or the inbox itself. The thread is the same conversation regardless of entry point.

**Visual composition**

Three feature cards describing threading, context, and notification behavior, with an inbox-style icon language.

**Speaker notes**

- Demo cue: send a message as the owner, switch roles, and show the badge and the message already waiting.
- Privacy angle for caregivers: you never hand out your personal number to apply.
- Keep this slide short — messaging is table stakes, verification is the differentiator.

---

### Slide 7 — Verified profiles that answer the questions owners ask first

**Section:** Trust & Verification · **Layout:** `grid`

> Credentials, experience, and specialties surface before the first message, not after the interview.

- **Credentials up front** — CNA, HCA, CPR, and specialty certifications appear directly on the profile card with a verified marker. Owners shortlist on qualifications in seconds instead of chasing paperwork.
- **Skills and specialties, tracked** — Dementia care, medication management, mobility assistance, hospice support — caregivers tag what they actually do. Owners filter the directory by exactly the skill a resident needs.
- **A profile caregivers control** — Caregivers edit their title, bio, city, experience, certifications, skills, and availability at any time. Updates flow through to every application already in flight.

_Verification builds the trust that makes a one-click application safe to accept._

**Visual composition**

Three cards on verification, skills, and the profile owners actually read. Verified badge motif repeated.

**Speaker notes**

- This is the slide that closes owners — it directly answers 'how do I know this person is qualified?'
- Demo cue: open the Caregivers directory and filter by a certification.
- For caregivers: your profile is the asset, and it travels with every application you send.
- Transition: 'Trust runs both directions. Homes are rated too.'

---

### Slide 8 — Transparent ratings for homes, written by caregivers

**Section:** Reputation Management · **Layout:** `split`

> Honest reviews on both sides are what make a small-home marketplace work at all.

**Talking points**

- **Every home carries a public rating** — Star ratings and review counts appear across the directory, the job board, and each home's detail page.
- **Reviews written by the people who worked there** — Caregivers leave feedback tied to their role and experience, so future applicants know what to expect.
- **A breakdown owners can act on** — The Review Tracker shows rating distribution over time, turning feedback into something operational.
- **Good homes get discovered** — Strong reputations attract stronger applicants — the single best recruiting advantage a small home can build.

**Side panel — Why transparency wins here**

| | |
| --- | --- |
| Average home rating | **4.8 / 5.0** |
| Reviews visible before applying | **Always** |
| Owner response to feedback | **Tracked in-app** |
| Effect on applicant quality | **Compounding** |

**Visual composition**

Split: four reputation capabilities left, amber-toned rating breakdown panel right showing a star distribution.

**Speaker notes**

- Address the fear directly: owners worry about bad reviews. Reframe it as the mechanism that rewards good operators.
- Caregivers choose homes on reputation — an untrusted home pays a premium to fill every shift.
- Demo cue: open a home detail page and scroll the reviews.
- Transition: 'All of this stays in sync because of one architectural decision.'

---

### Slide 9 — Both sides of the marketplace, always in lockstep

**Section:** Real-Time Synchronized State · **Layout:** `split`

> One shared store drives both dashboards — including a single-click switch between owner and caregiver views.

**Talking points**

- **Post once, appear everywhere** — An owner's new job — urgent or not — lands on the caregiver board and urgent banner immediately.
- **Applications arrive live** — A caregiver's application shows up in the owner's tracker instantly, with an unread badge on the nav.
- **Status changes flow back** — Move someone to Interview or Hired and their tracker reflects it without a refresh or an email.
- **One identity, two roles** — Switch between owner and caregiver views in a single click — useful for operators who also pick up shifts.

**Side panel — Dual-role switching**

| | |
| --- | --- |
| Role switch | **1 click, no re-login** |
| State propagation | **Immediate** |
| Session persistence | **Survives refresh** |
| Unread badges | **Per role, per thread** |

**Visual composition**

Split: four sync behaviors left, violet-toned 'switch roles in one click' panel right showing the propagation path.

**Speaker notes**

- Demo cue: this is the showstopper — post, switch, apply, switch back, hire. Under 90 seconds end to end.
- For technical audiences: mention the shared context store and persistence layer.
- For operators: translate it as 'you never have to ask whether the other side saw it.'
- Transition: 'So what does your first week look like?'

---

### Slide 10 — Your first shift filled, this week

**Section:** Getting Started · **Layout:** `closing`

> Onboarding takes minutes for either side — no implementation project, no training, no contract to negotiate.

**Milestones**

| Figure | Means | Detail |
| --- | --- | --- |
| **2 min** | Caregiver profile setup | — |
| **5 min** | Home onboarding, start to first posting | — |
| **Same day** | Typical first applicant on an urgent shift | — |

**The ask**

- **Caregivers — build your profile** — Add your certifications, skills, and availability, then apply to your first local shift in one click.
- **Home owners — post your hardest opening** — Start with the shift you have struggled to fill. Flag it urgent and watch the applicant pipeline populate.
- **Both — reply fast, build reputation** — Answer threads quickly and leave honest reviews. Responsiveness is what compounds into trust here.

**Closing line:** _Pick a role and start — it takes less time than one recruiting phone call._

**Visual composition**

Closing slide: three timeline stats across the top, two onboarding tracks below, CTA band at the base.

**Speaker notes**

- End with a concrete next step for each audience in the room, not a generic thank you.
- Offer to walk any owner through their first posting right after the session.
- Leave the deck on this slide during Q&A — the CTA stays on screen.

---

## Appendix — every figure in one place

Each number below appears on a slide. Confirm the sourcing for any figure
before sharing either deck outside the company.

| Deck | Slide | Figure | Means |
| --- | --- | --- | --- |
| Investor Pitch | CareConnect | **$42B** | US senior care staffing spend |
| Investor Pitch | CareConnect | **30K+** | Licensed Adult Family Homes |
| Investor Pitch | CareConnect | **< 6 hrs** | Median urgent shift fill time |
| Investor Pitch | A $42B market with no purpose-built connective tissue | **$42B** | Total US senior care staffing spend |
| Investor Pitch | A $42B market with no purpose-built connective tissue | **30K+** | Licensed Adult Family Homes |
| Investor Pitch | A $42B market with no purpose-built connective tissue | **1.2M** | New direct-care hires needed by 2032 |
| Investor Pitch | A $42B market with no purpose-built connective tissue | **$3.8B** | Serviceable staffing spend |
| Investor Pitch | Subscription core, urgency upside | **$149** | Per home, per month |
| Investor Pitch | Subscription core, urgency upside | **$89** | Urgent fill fee |
| Investor Pitch | Subscription core, urgency upside | **82%** | Gross margin |
| Investor Pitch | Subscription core, urgency upside | **4.6x** | LTV : CAC |
| Investor Pitch | Scaling CareConnect to 50,000+ homes nationally | **3 states** | Year 1 — prove regional liquidity |
| Investor Pitch | Scaling CareConnect to 50,000+ homes nationally | **8 states** | Year 2 — repeatable market playbook |
| Investor Pitch | Scaling CareConnect to 50,000+ homes nationally | **50K+ homes** | Year 3 — national default |
| Product Demo | CareConnect in action | **60 sec** | To publish a job posting |
| Product Demo | CareConnect in action | **1 click** | To apply to a shift |
| Product Demo | CareConnect in action | **0** | Cost for caregivers, always |
| Product Demo | Certified caregivers and AFH owners, connected in seconds | **< 6 hrs** | Median urgent shift fill time |
| Product Demo | Certified caregivers and AFH owners, connected in seconds | **5 stages** | Tracked applicant pipeline |
| Product Demo | Certified caregivers and AFH owners, connected in seconds | **4.8★** | Average home rating |
| Product Demo | Certified caregivers and AFH owners, connected in seconds | **600+** | Verified caregivers |
| Product Demo | Your first shift filled, this week | **2 min** | Caregiver profile setup |
| Product Demo | Your first shift filled, this week | **5 min** | Home onboarding, start to first posting |
| Product Demo | Your first shift filled, this week | **Same day** | Typical first applicant on an urgent shift |
