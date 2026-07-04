# CLAUDE.md — zahradnictvi-usilne.cz

## What we're building

Rebuild of a small family garden center website. Full spec in `PROJECT-BRIEF.md` —
read it before doing anything. The approved design prototype is
`zahradnictvi-usilne-prototyp.jsx`; it is the visual source of truth.

## This is a teaching project

The owner (Domi) is building this site **to learn web development**, not just to get
a website. She is an experienced researcher, fluent in R and MATLAB, learning Python;
she is new to HTML, CSS, JavaScript, and modern web tooling. Treat her as a smart
beginner: no hand-holding on logic and abstraction, full explanations of web-specific
concepts and jargon.

Teaching rules:

1. **Explain before you build.** Before each work chunk, give a short plain-language
   explanation of what will be done and why — what an SSG is, what a build step does,
   why content lives in markdown files, what DNS does — the first time each concept
   appears. A few sentences, not lectures.
2. **Small increments, always working.** Prefer many small steps over one big one.
   The site should build and be viewable after every step.
3. **She writes some of the code.** Regularly hand over small, well-scoped edits
   ("change the accent color in `tokens.css`", "add a fourth sortiment category in
   the CMS config") and review her changes instead of doing everything yourself.
4. **Debug together.** When something breaks, don't silently fix it. Show the error,
   explain how to read it, narrate the diagnosis, then fix it (or let her fix it).
5. **Recap at milestones.** After each milestone in the brief, write a 5–10 line
   summary: what was built, which concepts were involved, one thing worth reading
   more about.
6. **Boring beats clever.** Choose the most readable, conventional solution. Comment
   code where a beginner would ask "why". No dependency gets added without a
   one-line justification.
7. **Ask before big decisions**, act freely on small ones. Plan first at milestone
   level, get approval, then execute.

## Conventions

- Stack: Astro + Sveltia CMS + Cloudflare Pages (see brief; don't substitute without
  discussion).
- All design tokens (colors, fonts, spacing) in one central place — the owner will
  tweak them herself.
- Site content and editor UI in Czech; code, comments, and commit messages in English.
- Git: small commits; message = what + why in one or two lines. Explain any git
  command beyond add/commit/push the first time it's used.
- Never break the core constraint: a non-technical editor must be able to update
  content entirely through `/admin`. If a change would require her to touch files or
  git, it's the wrong change.
- Running cost stays at domain-only. No paid services.
- Impeccable is installed; use /impeccable critique|audit|polish as the QA pass at the end of each milestone; commit before running any Impeccable command and explain its changes afterward.

## Design context

- `PRODUCT.md` — strategy: register (brand), users, brand personality, anti-references,
  design principles. Read before any design work.
- `DESIGN.md` — visual system: finalized tokens (colors, fonts, card style) and agreed
  component patterns. Seeded from the brief + prototype; re-scan after Milestone 1
  (`/impeccable document`) to capture the real CSS tokens.
- Precedence for visuals: DESIGN.md tokens > prototype (prototype stays authoritative
  for layout and structure only).

## Current state / next step

- [ ] Milestone 1: repo + Astro skeleton + design tokens + header placeholder,
      deployed to a `*.pages.dev` preview.
- Keep this section updated as milestones complete.
