# TechNova 2047 — "Mission Bharat" Site Build Plan

Persistent planning document for the TechNova 2047 competition entry (theme: Green Technology powering India's journey to Viksit Bharat 2047). Read alongside `LOGBOOK.md` (session-by-session narrative log — this file is the structural plan; LOGBOOK is the diary).

**Deadline: July 10, 2026. Today: July 8, 2026.** Two days — build fast, export early, leave review slack.

**Team (for the Team/Contact page):**
- Team name: **Vikaas**
- Anuj Phulera — Team Lead, Coder & Builder — 9891011165 — madara.coding.projects@gmail.com
- Aarav Choudhary — Innovator & Designer — 9250083692 — aaravgurmeet@gmail.com
- Both Grade 10, Colonels Central Academy

---

## 1. Locked creative direction: Mission Bharat

Winning concept from the canvas exploration (6 directions tested — see `LOGBOOK.md` Entries 2-3): **Mission Bharat** — ISRO-grade mission-control / rocket-launch aesthetic, deep space-navy base, tricolour (saffron/white/green) as ignition plume + accent system, Ashoka Chakra as a recurring motion motif, monospace telemetry type paired with a bold display face.

**Loading experience (first visit only):** a full ~20-second cinematic "launch sequence" —
1. T-minus countdown ticker + mission-control status lines booting up ("INITIATING GREEN PROTOCOL...", "CALIBRATING RENEWABLE GRIDS...", etc.)
2. Systems-online telemetry flickering in (power grid sync, chakra spin-up, emission calibration)
3. Ignition: a tricolour plume/light sweep rises and fills the screen
4. Hard cut / camera-push into the Home hero — "liftoff" into the site

This plays once per session (stored in `sessionStorage`), not on every navigation — a 20s wait on every click would frustrate judges clicking through 6 pages.

**Page-to-page transitions (every navigation):** a fast (~0.8–1.2s) tricolour flag-wipe — a saffron→white→green band sweeps left-to-right across the viewport, briefly fully covering it like a flag unfurling, then reveals the next page underneath. This is the recurring "banger" signature of the whole site, distinct from the one-time loader.

**Visual language to carry through every page (not just the hero):**
- Deep space-navy (`#030712`-family) base, tricolour accents used with intent (status/data/CTAs), never as decoration
- Ashoka Chakra motif reused as a structural/loading element (radial dividers, spoke-based dividers, progress rings) — not just a logo
- Monospace ("mission telemetry") type for data/labels, a bold display face for headlines
- Every page must have its own choreographed GSAP entrance (scroll-triggered reveals, staggered telemetry counters, radar/scan-line accents) — no static, un-animated sections
- No emojis anywhere

---

## 1.5 Animation & FX suite ("banger" vocabulary, GSAP-first, reactbits.dev-informed)

Reviewed reactbits.dev's component catalogue for motion vocabulary (it's a reference for effect *categories*, not something installed wholesale — every effect below gets rebuilt natively in GSAP/Framer Motion/Canvas so it matches the Mission Bharat palette exactly and stays lightweight). Effects are assigned deliberately per page/purpose, not scattered — see `frontend-design` skill's rule: one orchestrated moment lands harder than decoration everywhere.

**Ambient background layer (pick 1–2, used consistently site-wide, low-opacity so content stays legible):**
- **Radar sweep** (reactbits `Radar`) — a slow rotating scan-line + concentric rings, tricolour-tinted, anchored behind hero/stat sections. Reads as "mission telemetry," not decoration.
- **Dot Field / Line Waves** (reactbits `Dot Field`, `Line Waves`) — a subtle grid of dots or scanlines that ripple on cursor proximity — used behind the Vision and Roadmap pages as a "flight-path grid."
- **Soft Aurora / Beams** (reactbits `Soft Aurora`, `Beams`) — tricolour light beams/aurora wash used ONLY at the ignition moment of the loader and section dividers — reserved for high-impact transitions so it doesn't get diluted into wallpaper.

**Signature per-page motion (each page's one memorable moment, per `frontend-design`'s "spend your boldness in one place"):**
- **Home:** the 20s launch-sequence loader (T-minus ticker → telemetry flicker-in → tricolour ignition plume → hard-cut liftoff into hero). Hero telemetry strip counts up with GSAP `ScrollTrigger`-free number-tweening on mount (it's above the fold).
- **Vision:** manifesto text revealed line-by-line with a typewriter/telemetry-decode effect (monospace characters scrambling into place, à la reactbits `Metallic Paint`/decode-text energy) as the user scrolls — pairs a "briefing being transmitted" feel with the content.
- **Green Tech Pillars:** 6 pillar modules on a hex/orbit layout; each pillar's icon assembles from scattered line fragments (spoke motif) on scroll-into-view, staggered by ~80ms — echoes reactbits `Magnet Lines`/`Orbit Images` energy natively in GSAP.
- **Impact & Stats:** progress rings and bar telemetry animate their fill on scroll-trigger (real percentages from §3), with a radar-sweep backdrop; counters tick up from 0 with eased easing, not linear.
- **Roadmap:** a horizontal flight-path line draws itself (`stroke-dashoffset` GSAP tween) left-to-right as the user scrolls, with checkpoint markers (2025/2030/2047/2070) popping in with a small ignition-flare burst as the path reaches them.
- **Team/Contact:** crew portrait cards enter with a staggered "docking" animation (slide + fade + slight 3D tilt settle), chakra-spoke divider between the two cards.

**Recurring signature (site-wide, ties every page together):**
- **Chakra spoke dividers** — the 24-spoke Ashoka Chakra line art used as section dividers/progress rings, not just a logo (per `plan.md` §1's existing rule) — this is the one motif repeated everywhere, which is what makes the site feel designed rather than assembled from a component kit.
- **Tricolour flag-wipe page transition** — unchanged from §1, the connective tissue between all 6 pages.

**Micro-interactions (small, everywhere, cheap to build — the "best FX ever made" baseline the user asked for):**
- Buttons/CTAs: magnetic hover pull (cursor-attraction, reactbits `Magnet Lines`-style) + a thin tricolour underline sweep on hover.
- Cards/pillars: subtle tilt-on-hover (perspective transform) + glow-border pulse.
- Cursor: a small tricolour trail/glow following the pointer on desktop only (reactbits `Splash Cursor`/`Pixel Trail` energy), disabled on touch devices.
- Respect `prefers-reduced-motion`: every GSAP timeline gets a reduced-motion fallback (instant/opacity-only), per `frontend-design`'s quality floor.

**Stack for implementation:** GSAP + `@gsap/react` + ScrollTrigger for choreography, Framer Motion (already a listed dependency) for simpler component-level transitions, native SVG/canvas for the chakra and radar motifs (no heavy 3D library needed — Three.js would be overkill for this contest's static-JPG-export endpoint and adds real risk to the 2-day timeline).

---

## 2. Site map — 6 pages (satisfies the contest's 5-page minimum)

1. **Home / Mission Control** — the 20s loader lives here on first visit, then the hero: mission statement, headline, live-looking telemetry strip (renewable capacity, emissions trend, mission clock), primary CTA into the site.
2. **Vision — Viksit Bharat 2047** — the "why": India's Net Zero 2070 pledge, energy-independence-by-2047 goal, framed as a mission briefing / manifesto page.
3. **Green Tech Pillars** — the core content page, 6 pillar "modules" laid out like mission systems: Solar, Wind, Green Hydrogen, EV & Green Mobility, Smart Grids, Waste-to-Energy & Circular Economy. Each pillar gets a real stat (see §3) and its own icon/motif.
4. **Impact & Stats** — an infographic-style dashboard: national targets vs. current progress, presented as mission-control readouts (progress rings, bar telemetry, counters).
5. **Roadmap — 2025 → 2047** — a horizontal/vertical mission timeline with checkpoint markers (2025 baseline → 2030 milestones → 2047 Viksit Bharat → 2070 Net Zero), animated as a flight path.
6. **Team / Contact** — "Mission Crew": Anuj and Aarav as two crew profile cards with generated portfolio-character art, roles, contact info, plus a closing mission statement.

---

## 3. Real data to ground the content (sourced this session, cite loosely as "Government of India" targets — no need for inline footnotes on a design mockup, but numbers must be accurate)

- **500 GW** of non-fossil (renewable) electricity capacity target by **2030**, adding **~50 GW/year** — Ministry of New & Renewable Energy / PIB.
- Goal: **energy-independent nation by 2047**, **Net Zero by 2070** — National Green Hydrogen Mission / NITI Aayog framing.
- **National Green Hydrogen Mission** 2030 deliverables: **≥5 MMT** annual green hydrogen production, **60–100 GW** electrolyser capacity, **125 GW** RE capacity dedicated to green hydrogen, **50 MMT CO2** emissions averted annually.
- **EV sector**: framed by NITI Aayog as a **$200 billion opportunity** (Aug 2025 report) — used for the EV/Mobility pillar.
- **Waste-to-Energy**: India's installed WTE capacity is roughly **856 MW** as of 2025 — used for the Waste-to-Energy pillar, framed as a growth-trajectory stat toward 2047.
- NITI Aayog's Feb 2026 study *"Scenarios Towards Viksit Bharat and Net Zero"* is the authoritative macro framing for the Vision and Roadmap pages.

These anchor the Impact & Stats and Green Tech Pillars pages in real numbers rather than invented ones, per the user's request.

---

## 4. Team/crew visuals

Each team member gets a custom-generated "mission crew portrait" — a stylized illustrated character card (not a photo), rendered in the site's tricolour/navy mission-control aesthetic, generated as image assets and placed on the Team page with the same GSAP entrance choreography as the rest of the site (not a static bio box).

---

## 5. Build phases

**Phase 1 — Canvas exploration (DONE).** 6 concept directions built and reviewed; Mission Bharat selected.

**Phase 2 — Planning (this document).** Site map, content, real data, visual system, submission spec locked.

**Phase 3 — Production build.**
- Scaffold a new `react-vite` artifact for the real multi-page site (separate from the mockup-sandbox canvas).
- Build the shared design system (colors, type, chakra/telemetry components, GSAP transition wrapper) once, then the 6 pages.
- Implement the one-time 20s loader and the per-page tricolour-wipe transition.
- Generate the 2 crew portrait illustrations.
- Populate every page with the real stats from §3.

**Phase 4 — QA pass.** Click through all 6 pages, verify: loader plays once only, wipe transition on every nav, no layout breaks at common screen sizes, no console errors, all copy proofread, contact info correct.

**Phase 5 — Export for submission.**
- Screenshot each of the 6 pages at **4K, 16:9 (3840×2160)** — landscape, matching the site's native format and giving judges a crisp, presentation-quality image (the brief sets no exact spec, so this is the strongest safe default).
- Export as JPG (contest requires JPG/JPEG), one file per page, clearly named (e.g. `01-home.jpg` … `06-team.jpg`).
- Deliver all 6 JPGs to the user as downloadable assets, ready to submit as-is — satisfies the "minimum 5 static mockup screens" contest rule with one page to spare.

**Phase 6 — Buffer day (July 9).** Reserved for any revisions the user wants after seeing the built site, before the July 10 deadline.

---

## 6. Continuity note

Per the user's request, all planning and progress lives in committed project files (`plan.md`, `LOGBOOK.md`), not just agent memory — so the project can be handed to a different AI/account and resumed with full context at any point. Update `LOGBOOK.md` after every session; update this `plan.md` if the plan itself changes (new pages, new direction, new deadline).
