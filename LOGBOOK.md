# Project Logbook

**Purpose:** This file is the persistent, human-and-agent-readable record of this project's planning and build history. It exists so that if the user switches AI models / re-imports this repo into a new Replit ID (via GitHub sync), a brand-new agent can read this file top to bottom and continue exactly where the previous agent left off, with zero lost context.

**Rule for any agent working on this project:** Before doing anything else, read this entire file. After every significant exchange with the user (plan changes, decisions made, phases completed, assets created), append a new dated entry below. Never delete prior entries — only append. Keep entries comprehensive: what the user asked, what was decided, what was built, and what remains open.

---

## Entry 1 — 2026-07-08 — Project kickoff & planning

**User's request (verbatim intent):**
- Wants to build a "banger website" — something far more advanced than the reference site `soch-wake-up.vercel.app`.
- Baseline requirement: extreme GSAP animations, top-tier FX/transitions, animated loading screen, and animated page-to-page transitions. Explicitly: "the base level set is extreme animations gsap and best fx effects ever made... ours must be over the top."
- Wants to use Figma-derived designs and the Replit canvas/mockup feature to explore designs before building the real site, in phases.
- Wants a full plan with multiple clarifying questions before any building starts (explicitly asked to brainstorm/plan/ask questions first).
- Wants this logbook maintained after every prompt so that if credits run out and the user re-imports the project into a new Replit account/ID via GitHub sync, a new agent can pick up seamlessly by reading this file. Logbook must be kept complete "at any cost."

**Attached assets provided by user:**
1. `attached_assets/image_1783486430158.png` — a photographed paper brief for a school competition: **"Event 4 — TechNova 2047"**, topic "Green Technology in India", grades IX & X, teams of 2, submissions due **July 10, 2026 (Friday)**. Rules: entrants may use Canva/Photoshop/Figma/PowerPoint/Slides; submission is **static webpage-layout mockups only, JPG/JPEG format, min. 5 images zipped**, NOT a functional website. Judged on creativity, originality, clarity, relevance to topic.
   - **Open question / flagged conflict:** this brief describes a *static image mockup* deliverable for a school contest about Green Tech in India, due in 2 days from today (project "today" = July 8, 2026). This seems to conflict with the main ask ("banger animated website" with GSAP, loading screens, page transitions — i.e. a real coded, animated site). Need to clarify with the user whether:
     (a) this image is unrelated background noise / an old photo that got attached by accident, or
     (b) the "banger website" is actually meant to produce the screens for this contest (in which case the deliverable must ultimately be exported as static JPGs, and the deadline is in 2 days — very tight), or
     (c) this is a separate, unrelated personal/portfolio project and the contest brief has nothing to do with it.
2. `attached_assets/Video-228_1783486439702.mp4` + `attached_assets/Video-228_frames_1783486501546.zip` (33 extracted frames) — the reference "banger loading screen" sample. Reviewed frames show a monitor (in a dark room, red mechanical-keyboard backlight) going through a **boot/login cinematic sequence**:
   - Frame ~1: black/dark screen, monitor waking up.
   - Frame ~10: terminal boot log text scrolling (system init, driver loading, network config — classic "booting OS" console output).
   - Frame ~20: a minimal login screen, "Welcome back, user" centered in a thin-bordered box, small on-screen keyboard hint below it.
   - Frame ~30: a full sci-fi/cyberpunk HUD desktop — top-left clock/uptime/CPU/power panel, top-right network status + a radar/globe widget, center a terminal/PowerShell window, bottom a HUD-style app dock with folder/settings icons.
   - **Read as:** the desired "banger" loading experience is a *cinematic OS-boot sequence* — dark, terminal/hacker aesthetic, boot logs → login → HUD reveal — not a simple spinner or progress bar. This sets the visual bar: the real site's loader should feel like booting into a piece of interactive hardware/OS, not a generic web preloader.

**Environment state at kickoff:**
- Workspace currently has only scaffolding: `api-server` (Express API, unused so far) and `mockup-sandbox` (canvas design-mockup Vite sandbox, empty) artifacts. No product-specific code exists yet.
- No integrations connected. No DB schema written yet. No `react-vite` (real website) artifact created yet.

**Skills consulted this turn:** `artifacts`, `design`, `video-js`, `mockup-sandbox`, `pnpm-workspace` (per the standing rule to always consult the skill suite before acting/replying).

**Plan proposed to user (pending confirmation):**
1. **Phase 0 — Clarify scope** (current phase): resolve the Event-4 contest conflict above, pin down subject/domain of the site, page count/structure, and whether this is single-page scroll or multi-page.
2. **Phase 1 — Concept & mood exploration on Canvas:** use the mockup-sandbox (canvas) to explore 2-3 divergent visual directions (palette, type, motion language) as small interactive iframe previews before committing, referencing the boot-sequence video as the loader benchmark.
3. **Phase 2 — Approve a direction**, then scaffold a real `react-vite` artifact for the production site (GSAP + Framer Motion + Three.js as needed), wire up the OpenAPI/backend only if the site needs dynamic data.
4. **Phase 3 — Build the cinematic loader** (boot-sequence-inspired intro) + core pages/sections with GSAP scroll-triggered choreography, page transitions, and micro-interactions, in the "motion graphics, not slideshow" style (per `video-js`/`design` skill principles on layered, staggered, non-generic motion).
5. **Phase 4 — Polish pass:** performance check (animation cost, load time), responsive check, then publish.

**Questions asked to the user (see chat):** relationship of the Event-4 image to this build; the real subject/brand/purpose of the "banger website"; single-page vs multi-page; content sections wanted; whether they want Canvas exploration of multiple directions before full build, or to move straight to build.

**Status:** Awaiting user answers. No code/artifacts created yet beyond this logbook.
