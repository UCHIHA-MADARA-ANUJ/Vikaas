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

**Loading experience (OVERHAULED — see §1.5a below):** the original T-minus countdown loader has been completely reworked into a cinematic "India Awakens" sequence. New concept: the Ashoka Chakra assembles spoke-by-spoke from the dark, tricolour bands unfurl like the flag, mission stats satellite-uplink in, then a shockwave wipes into the Home page. Full detail in §1.5a.

**Page-to-page transitions (every navigation):** a fast (~0.8–1.2s) tricolour flag-wipe — a saffron→white→green band sweeps left-to-right across the viewport, briefly fully covering it like a flag unfurling, then reveals the next page underneath. This is the recurring "banger" signature of the whole site, distinct from the one-time loader.

**Visual language to carry through every page (not just the hero):**
- Deep space-navy (`#030712`-family) base, tricolour accents used with intent (status/data/CTAs), never as decoration
- Ashoka Chakra motif reused as a structural/loading element (radial dividers, spoke-based dividers, progress rings) — not just a logo
- Monospace ("mission telemetry") type for data/labels, a bold display face for headlines
- Every page must have its own choreographed GSAP entrance (scroll-triggered reveals, staggered telemetry counters, radar/scan-line accents) — no static, un-animated sections
- No emojis anywhere

---

## 1.5a LOADER OVERHAUL — "India Awakens" (replaces original T-minus concept)

The original loader was too plain (simple countdown + boot lines). Complete rework into a 20-second cinematic sequence:

**Phase 1 (0–3s) — Ignition from dark:**
- Full black screen. A single point of saffron light pulses at center.
- The Ashoka Chakra assembles spoke-by-spoke (24 spokes drawing in from center outward, staggered by ~100ms each), each spoke appearing with a sharp electric spark/glow. Deep navy fills with dim tricolour light.

**Phase 2 (3–8s) — Data uplink flood:**
- From the assembled chakra, scan-line data streams ripple outward radially — telemetry data floods the outer areas like a matrix-style rain but in saffron/green/white. Characters randomise and resolve.
- Boot status lines fade in one at a time at the bottom: `[SYS] INITIATING GREEN PROTOCOL... OK`, `[PWR] CALIBRATING RENEWABLE GRIDS... SYNCED`, `[ENV] NET ZERO VECTOR... LOCKED`, etc.

**Phase 3 (8–14s) — Flag unfurl:**
- Three massive horizontal bands (saffron → white → green) sweep in from left to right sequentially, like the tricolour flag unfurling across the screen. Each band has embedded particle/data texture.
- The Ashoka Chakra rotates and glows at center of the white band.
- The full flag covers the screen for ~1.5s.

**Phase 4 (14–18s) — Mission Bharat reveal:**
- The flag "flies off" upward (GSAP translateY + scale). Behind it: "MISSION BHARAT" assembles letter-by-letter with a glitch/decode effect (characters scramble then lock). The Ashoka Chakra is embedded in the title.
- Mission stats flash in one at a time around the title like satellite uplinks being received: `500 GW TARGET`, `NET ZERO 2070`, `≥5 MMT H₂`, `$200B EV`. Each stat lines appears with a quick data-flicker.

**Phase 5 (18–20s) — Liftoff:**
- `MISSION BHARAT: ONLINE` pulses in saffron.
- A tricolour shockwave/ripple (concentric rings) expands from center outward and flashes the screen to white.
- Hard wipe into the Home page hero.

**Implementation notes:**
- `sessionStorage` gate: plays once per browser session only (unchanged from original).
- `prefers-reduced-motion` fallback: skip to complete instantly (unchanged).
- File: `artifacts/technova-2047/src/components/Loader.tsx` — full rewrite.

---

## 1.5b ANIMATION & FX SUITE v2 — 52 enhancements (reactbits.dev-informed, GSAP-first)

All effects built natively in GSAP/SVG/CSS — nothing installed wholesale from reactbits. Every effect is assigned a specific location. Respect `prefers-reduced-motion` everywhere.

### GLOBAL / SITEWIDE (items 1–10)

1. **Custom cursor (Chakra cursor + tricolour trail)** — a small Ashoka Chakra SVG follows the cursor, rotates faster when moving fast; leaves a fading tricolour pixel trail (saffron → white → green dots that fade to transparent). Desktop only, disabled on touch. File: new `src/components/CursorEffect.tsx`, mounted in `App.tsx`.

2. **Magnetic buttons** — all nav links and CTA buttons use GSAP `quickTo` to pull toward cursor on hover (magnetic attraction ~40px radius), snap back on leave. Applied via a reusable `useMagnetic` hook. File: new `src/hooks/use-magnetic.ts`.

3. **CRT scanline overlay** — a very subtle full-page CSS pseudo-element layer: repeating 1px horizontal lines at ~3% opacity, fixed position, `pointer-events: none`. Gives every page the ISRO monitor feel without interfering with readability. Applied via global CSS in `index.css`.

4. **Ambient particle field** — 60 tiny dots in tricolour floating across every page background, drifting randomly and softly repelling from cursor proximity (GSAP QuickTo on each). File: new `src/components/ParticleField.tsx`, rendered in `App.tsx` behind page content.

5. **Nav spoke indicator** — each nav link has a small 8-spoke mini-chakra that spins and lights up on hover. Active route's chakra glows saffron. File: update `src/components/Nav.tsx` (or wherever nav lives).

6. **Scroll progress bar** — a thin tricolour gradient bar (saffron→white→green) fixed at the very top of the viewport, filling from 0% to 100% as the user scrolls the page. GSAP ScrollTrigger scrub. File: new `src/components/ScrollProgress.tsx`.

7. **Section heading scramble** — every `<h2>` section heading across all pages uses the ScrambleText decode effect on scroll-into-view (if it doesn't already). Consistent site-wide entry animation for all section titles.

8. **Ambient glow footer** — the bottom of every page has a diffuse saffron/green radial glow that pulses slowly (CSS animation, `prefers-reduced-motion` aware). Applied via page wrapper in `App.tsx` or per-page.

9. **Tilt-on-hover cards** — all cards across Pillars and Team pages use perspective tilt (GSAP + pointer events), max ~15° X/Y, with a subtle glow following the tilt direction (the "holographic" feel). Applied via new `useTilt` hook.

10. **Page transition data-stream flash** — between the tricolour wipe panels, add a very brief (0.1s) data-stream flash (randomised telemetry chars scrolling) so the transition feels like data transmission, not just a colour slide.

### HOME PAGE (items 11–18)

11. **Hero star field** — animated star field behind the hero (100+ tiny dots with GSAP stagger twinkle and slow drift), giving a deep-space command-center backdrop.

12. **Live mission clock** — IST digital clock (hh:mm:ss) displayed as a mission readout with "MISSION ELAPSED TIME" since India's independence (1947-08-15 00:00:00 IST) counting up in real time. Updated every second via `setInterval`.

13. **Telemetry panel glitch** — stat panels flash through random numbers (GSAP number scramble) for 0.5s before snapping to the real value on page load. Plus a thin internal scanline within each panel.

14. **Hero headline kinetic drop** — each word of the main headline drops in from `y: -80` with `rotateX: 90` (3D perspective fold) and lands with slight overshoot, staggered 80ms per word.

15. **Animated flag corner badge** — a small Indian flag in the top-right corner of the hero with a looping subtle wave animation (CSS clip-path polygon morph simulating fabric flutter).

16. **"ENTERING MISSION CONTROL" ticker** — a single line of telemetry text types in at the top of the hero section after the loader completes, like a mission comms callout.

17. **Hero background dot grid** — an animated dot grid (reactbits Dot Field energy) behind the hero that ripples outward from cursor position.

18. **CTA hover particle burst** — the primary "Enter Mission" CTA button emits a burst of tricolour particles (GSAP stagger) on hover, and magnetically pulls toward cursor.

### VISION PAGE (items 19–24)

19. **Full-page scramble** — every paragraph (not just the heading) uses ScrambleText decode on scroll-into-view, staggered by paragraph.

20. **"CLASSIFIED" watermark** — a very faint (5% opacity) diagonal repeating text "TOP SECRET // MISSION BHARAT // VIKSIT BHARAT 2047" watermark across the page background.

21. **Transmission scan effect** — each text block has a thin horizontal scan-line that sweeps top-to-bottom as the text materialises (CSS `clip-path` reveal + line overlay GSAP tween).

22. **Blinking monospace cursor** — a `█` block cursor blinks at the end of each text block as it finishes typing in, then fades away. Pure CSS animation.

23. **"INCOMING TRANSMISSION" side strip** — a vertical strip on the left edge with `INCOMING TRANSMISSION ▼▼▼` plus animated dots (GSAP stagger dot blink), fixed while the section is in view.

24. **Stat callout glow** — key numbers/quotes highlighted with a saffron left-border + ambient glow pulse that breathes slowly (GSAP yoyo tween on box-shadow).

### PILLARS PAGE (items 25–32)

25. **Pillar card flip (hover)** — each pillar card flips 180° on hover (CSS `rotateY` 3D transform) to reveal a "System Details" back face with technical specs and current progress stat.

26. **Icon assembly overhaul** — pillar icons assemble from individual SVG path segments (each segment draws in from `strokeDashoffset: length` to 0, staggered), replacing the current simple line-draw.

27. **"SYSTEM ONLINE" flash per card** — as each card enters the viewport, a brief `SYSTEM: ONLINE` status flash overlays the card top for 0.4s, then fades. Creates the "mission systems coming online" narrative.

28. **Per-pillar progress bar** — each card has a thin bar at the bottom animating from 0% to the current progress toward 2047 target, labeled with the target stat. Fills on scroll-into-view.

29. **Unique pillar accent glow** — each of the 6 pillars has a unique glow color: Solar = saffron, Wind = sky blue, Hydrogen = teal, EV = electric purple, Smart Grid = gold, Waste = earth green. Applied to card border and icon.

30. **Circuit connection lines** — thin SVG lines connecting adjacent pillar cards in a circuit/network pattern. Lines draw on scroll (strokeDashoffset) after the cards appear.

31. **Pillar micro-pattern backgrounds** — each card's background has a subtle domain-relevant SVG micro-pattern at very low opacity: circuit traces for Smart Grid, molecular bonds for Hydrogen, wave forms for Wind, etc.

32. **Card entrance stagger overhaul** — current rotateX entry; enhance with a slight Z-depth push (from z: -100 to z: 0) for a more dramatic 3D emerge, stagger 120ms between cards.

### IMPACT PAGE (items 33–38)

33. **Recharts HUD restyle** — chart bars styled with a neon-glow effect (CSS filter: `drop-shadow`), grid lines in tricolour at very low opacity, custom legend styled as mission readouts, axes as monospace type. No default Recharts aesthetic visible.

34. **Radar chart** — add a Recharts `RadarChart` showing India's 2047 readiness score across 6 axes (matching the 6 pillars). Animates its fill on scroll-into-view.

35. **Big KPI counters** — 3–4 oversized KPI numbers (500 GW, 5 MMT H₂, $200B, 2047) with GSAP number tween from 0 on scroll-into-view, with a "mission readout" prefix/suffix.

36. **Progress ring cluster** — 3 SVG circular progress rings (stroke-dashoffset animated) around a central spinning Ashoka Chakra, showing Solar capacity (current vs. 2030), EV adoption, H₂ production. Rings animate on scroll.

37. **Table row reveal** — the Green Hydrogen deliverables table rows animate in one by one (GSAP stagger translateX from left) on scroll, with alternating rows having a faint saffron/green tint.

38. **India outline SVG map** — a very subtle (8% opacity) SVG outline map of India as the page background, with 3–5 glowing dots at key project sites pulsing slowly.

### ROADMAP PAGE — FULL 3D REWORK (items 39–46)

39. **3D perspective viewport** — the entire roadmap section is wrapped in a `perspective: 1200px` container. The flight path plane is tilted (`rotateX: 35deg`) so it recedes into the horizon — the viewer looks "into" the timeline.

40. **Scroll-driven camera** — GSAP ScrollTrigger scrubs the container's `rotateX` from 35° (receding) toward 0° (flat) as you scroll through the section — simulates flying forward along the path.

41. **Milestone cards fly in from depth** — each checkpoint card starts at `z: -400, opacity: 0, scale: 0.6` and flies toward the viewer (`z: 0, opacity: 1, scale: 1`) as the scroll reaches its timestamp, then fades back to `z: 200, opacity: 0` as you scroll past. Cards feel like waypoints emerging from deep space.

42. **Hyperspace speed lines** — in the 3D space, 20–30 thin horizontal SVG lines animate from center outward (scale from 0 to viewport-width) as you scroll, simulating warp-speed travel. Tricolour tinted.

43. **Glowing dot on flight path** — a glowing saffron dot travels along the SVG `stroke-dashoffset`-drawn path at a speed synced to scroll position (GSAP ScrollTrigger scrub), so the dot "leads" the user through the timeline.

44. **Checkpoint flare burst** — when the scroll-scrubbed dot reaches each milestone marker, a brief starburst/particle-flare animation fires at that point (GSAP stagger scale/opacity from center).

45. **3D floating data panels** — each milestone's data card is slightly `rotateY: -15deg` so it faces the viewer at an angle in the 3D space, reinforcing depth.

46. **"NOW — 2026" pulsing marker** — a pulsing current-position indicator on the 2026 point of the timeline, colored saffron, with a ripple expand animation (GSAP yoyo scale + opacity on a ring).

### TEAM PAGE (items 47–52)

47. **Holographic shimmer overlay** — portrait cards have a CSS gradient overlay (rainbow hue-rotate) that moves based on cursor tilt position, simulating a holographic trading-card sheen.

48. **Terminal bio overlay** — hovering a card triggers a terminal overlay that types out the team member's role/mission assignment in monospace over ~0.8s. Exits on mouse-leave.

49. **"CREW MANIFEST" terminal header** — the page heading appears as a typed terminal command: `> load --crew manifest` ... pause ... `LOADING CREW DATA... DONE`, then the heading morphs to "CREW MANIFEST".

50. **Click-to-copy contact** — clicking email or phone silently copies to clipboard via `navigator.clipboard.writeText`, with a brief `COPIED TO CLIPBOARD ✓` flash overlay (0.8s, then fades). No alert.

51. **Orbital rings** — 2–3 concentric SVG ellipse rings orbit each portrait at different speeds and inclinations (3D CSS transform), like satellite orbits. Low opacity, tricolour tinted.

52. **"Team Vikaas" mission patch** — an SVG mission-patch graphic (hexagonal badge shape, "TEAM VIKAAS" text arc, school name, Ashoka Chakra center, tricolour border) placed between the two crew cards as a divider.

---

## 1.5 (original) Animation & FX suite — SUPERSEDED BY §1.5b above

See §1.5b for the current, expanded animation plan. §1.5 (original) is archived here for reference only — do not use it to make decisions.

> *(original text retained for continuity — all decisions in §1.5b take precedence)*

Reviewed reactbits.dev's component catalogue for motion vocabulary... *(original §1.5 content — superseded)*

---

## 2. Site map — 6 pages (satisfies the contest's 5-page minimum)

1. **Home / Mission Control** — the 20s loader lives here on first visit, then the hero: mission statement, headline, live-looking telemetry strip (renewable capacity, emissions trend, mission clock), primary CTA into the site.
2. **Vision — Viksit Bharat 2047** — the "why": India's Net Zero 2070 pledge, energy-independence-by-2047 goal, framed as a mission briefing / manifesto page.
3. **Green Tech Pillars** — the core content page, 6 pillar "modules" laid out like mission systems: Solar, Wind, Green Hydrogen, EV & Green Mobility, Smart Grids, Waste-to-Energy & Circular Economy. Each pillar gets a real stat (see §3) and its own icon/motif.
4. **Impact & Stats** — an infographic-style dashboard: national targets vs. current progress, presented as mission-control readouts (progress rings, bar telemetry, counters).
5. **Roadmap — 2025 → 2047** — REWORKED as a 3D CSS perspective flight-path journey (§1.5b items 39–46). Scroll-driven camera, milestone cards flying in from depth, glowing path dot, hyperspace speed lines.
6. **Team / Contact** — "Mission Crew": Anuj and Aarav as two crew profile cards with generated portfolio-character art, roles, contact info, plus a closing mission statement. Enhanced with holographic card, terminal bio, mission patch (§1.5b items 47–52).

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

Each team member has a custom-generated "mission crew portrait" — a stylized illustrated character card (not a photo), rendered in the site's tricolour/navy mission-control aesthetic. Assets already generated and saved at `artifacts/technova-2047/src/assets/crew/anuj-portrait.png` and `aarav-portrait.png`.

---

## 5. Build phases

**Phase 1 — Canvas exploration (DONE).** 6 concept directions built and reviewed; Mission Bharat selected.

**Phase 2 — Planning (this document).** Site map, content, real data, visual system, submission spec locked.

**Phase 3 — Production build (DONE — base site).** All 6 pages built, code-reviewed, passing typecheck. See LOGBOOK Entry 8.

**Phase 3v2 — Enhancement build (CURRENT PHASE).** Implementing 52 enhancements from §1.5b:
- 3a: Loader complete overhaul ("India Awakens" concept, §1.5a)
- 3b: Global FX (custom cursor + trail, magnetic buttons, CRT overlay, particle field, scroll progress, nav spoke) — items 1–10
- 3c: Page-specific enhancements (items 11–52 across all 6 pages) — dispatched via DESIGN subagent with this plan.md as spec
- 3d: Roadmap 3D rework (items 39–46) — the most complex single change, handled as its own pass

**Phase 4 — QA pass.** Click through all 6 pages, verify: loader plays once only, wipe transition on every nav, no layout breaks at common screen sizes, no console errors, all copy proofread, contact info correct.

**Phase 5 — Export for submission.**
- Screenshot each of the 6 pages at **4K, 16:9 (3840×2160)** — landscape.
- Export as JPG (contest requires JPG/JPEG), one file per page, clearly named (e.g. `01-home.jpg` … `06-team.jpg`).
- Deliver all 6 JPGs to the user as downloadable assets.

**Phase 6 — Buffer day (July 9).** Reserved for any revisions before the July 10 deadline.

---

## 6. Continuity note

Per the user's request, all planning and progress lives in committed project files (`plan.md`, `LOGBOOK.md`), not just agent memory — so the project can be handed to a different AI/account and resumed with full context at any point. Update `LOGBOOK.md` after every session; update this `plan.md` if the plan itself changes.

**GOTCHA: screenshot/sessionStorage** — the `Screenshot` tool opens a fresh browser context per call, so `sessionStorage` never persists between calls — meaning the 20s loader replays on every screenshot. Visual QA of individual pages must be done via source reads + typecheck + absence of console/runtime errors, not screenshot-per-page. (Documented in `replit.md` as well.)
