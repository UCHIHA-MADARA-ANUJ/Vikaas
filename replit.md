# TechNova 2047 — Mission Bharat

A school competition entry (Event 4 "TechNova 2047", theme "Green Technology in India / Viksit Bharat 2047") built as a full animated, coded website styled as an ISRO-style mission-control command center — the actual contest deliverable is static JPG mockups exported from this site, not a live deployment.

## Run & Operate

- `pnpm --filter @workspace/technova-2047 run dev` — run the site (artifact workflow: `artifacts/technova-2047: web`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- This artifact has no backend/DB dependency — it is a static, client-only React+Vite site.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, wouter routing, TanStack Query/Radix UI scaffold (unused for now — no backend calls)
- Animation: GSAP + `@gsap/react` (`useGSAP`) + ScrollTrigger for choreography, framer-motion available but GSAP is primary
- Charts/tables: recharts, styled to match the telemetry aesthetic (not default recharts look)
- No Three.js / 3D — deliberately ruled out given the 2-day build window and JPG-export end goal

## Where things live

- `plan.md` (repo root) — the locked creative direction, 6-page site map, real data/stats, team/crew info, and full animation/FX vocabulary (§1.5). This is the source of truth for what to build — read it before touching this artifact.
- `LOGBOOK.md` (repo root) — a session-by-session build diary. **Append an entry after every significant exchange on this project** — this is a standing project rule the user set, not optional cleanup, so any future agent/account can resume with zero lost context even across credit resets.
- `artifacts/technova-2047/src/pages/` — the 6 routes: Home, Vision, Pillars, Impact, Roadmap, Team
- `artifacts/technova-2047/src/components/Loader.tsx` — the ~20s cinematic launch-sequence loader (plays once per browser session via `sessionStorage`)
- `artifacts/technova-2047/src/components/PageTransition.tsx` — the tricolour flag-wipe transition that plays on every route change
- `artifacts/technova-2047/src/components/Motifs.tsx` — shared `RadarBackground` and `AshokaChakra` motifs reused across pages
- `artifacts/technova-2047/src/hooks/use-reduced-motion.ts` — shared reduced-motion hook; all animated components should respect it
- `artifacts/technova-2047/src/assets/crew/` — the 2 generated crew portrait illustrations used on the Team page

## Architecture decisions

- Built via a DESIGN subagent per the react-vite skill's policy for first builds of presentation-heavy apps, using `plan.md` as the user's own explicit, verbatim-stated creative direction (not agent taste).
- GSAP chosen over Framer Motion as the primary animation engine for scroll-triggered choreography and the flight-path/flag-wipe effects; Framer Motion remains a dependency but isn't the primary driver.
- All data points on every page are sourced only from `plan.md` §3 (real national targets/stats) — no invented numbers. The one exception (a "days remaining" countdown) is computed live from the current date rather than hardcoded.

## Product

A 6-page animated site: Home (mission-control hero + live telemetry), Vision (manifesto), Green Tech Pillars (6 systems), Impact & Stats (charts/tables dashboard), Roadmap (2025→2047 timeline), Team/Contact (crew profiles for the 2-person team, "Vikaas"). Deadline: July 10, 2026.

## User preferences

- Keep `LOGBOOK.md` updated after every significant step on this project — the user has been burned by context loss across resets and treats this as a hard requirement, not a nice-to-have.
- User defers most creative/scope calls to agent judgment but wants the site to be the best possible competition submission — "banger as hell", full animation ambition across all 6 pages, real charts/tables (not just stat cards).
- Checkpoint cadence requested: a screenshot check-in after the design system + loader were built (done), then a final review once the full site is complete.

## Gotchas

- The `Screenshot` tool opens a fresh browser context each call, so `sessionStorage` never persists between screenshots — the 20s loader will replay on every single screenshot. Verify page content via source reads / typecheck / console-log absence of errors, not repeated screenshots, unless you have a way to wait out the loader in a persistent session.
- `gsap` and `@gsap/react` are NOT in the shared pnpm catalog (`pnpm-workspace.yaml`) — they were added as direct dependencies in `artifacts/technova-2047/package.json` instead.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
