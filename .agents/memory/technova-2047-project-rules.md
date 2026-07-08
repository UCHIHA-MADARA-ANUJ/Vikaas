---
name: TechNova 2047 project rules
description: Standing conventions the user set for the artifacts/technova-2047 project (a school contest site build) — continuity logging and skill-use expectations.
---

For the `artifacts/technova-2047` project specifically (a "Mission Bharat" contest website), the user has established project-local conventions that live in the repo itself, not just in agent memory:

- **`LOGBOOK.md`** (project root) is the authoritative session-by-session diary. The user wants it updated after every significant prompt/response — not just milestones — so they can switch AI models/accounts at any point without losing context. Read it in full before doing anything on this project; append, never delete.
- **`plan.md`** (project root) is the structural source of truth (site map, content, phases) — keep it in sync when the plan itself changes.
- The user explicitly wants skills looked up/used proactively (e.g. via `skillSearch`) for any relevant piece of work on this project, not skipped.

**Why:** the user is on a tight external deadline (school competition) and has been burned by context loss across environment resets before; the in-repo logbook is their deliberate mitigation.

**How to apply:** any time you resume work on `artifacts/technova-2047`, read `LOGBOOK.md` and `plan.md` fully first, and append a new LOGBOOK entry describing what happened this session before finishing.
