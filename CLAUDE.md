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

- [x] Milestone 1: Astro skeleton, design tokens (`src/styles/tokens.css`), header
      placeholder (SkyScene + sticky MeadowNav), placeholder pages. Deployed via
      Cloudflare Workers static assets (wrangler.jsonc → dist/), auto-build on push.
      Preview: https://zahradnictvi-usilne.cocciron.workers.dev
- [x] Milestone 2: home page with real content — aktuality content collection
      (3 seed entries), otevírací doba card, kontakt + Google Maps embed;
      SectionTitle + AktualitaCard components, shared `.karta` surface.
- [x] Design update "6a" (design-update.md, 2026-07-05): fonts Sora/Caveat/Manrope;
      uppercase section headings + handwritten sub-headings + PlantIcon; spec
      illustration palette; kontakt card with icons + Facebook/Instagram links
      (former FB TODO resolved); no-wrap nav. Deviations (contrast, owner-approved):
      `--louka` stays #4d7549; text-emerald darkened to `--odkaz` #17854a.
- [x] Photo feature (owner design): photos right/stacked responsive column in
      aktualita cards, polaroid frame (provisional), wrap-around scroll-snap
      carousel with the site's first client-side JS. Audit 17/20, P2s fixed.
- [x] Milestone 3: O nás (stranky content collection + optional gallery) +
      Sortiment (category rows in one card from src/data/sortiment.json —
      owner choice over the prototype grid); SectionTitle `level` prop,
      sunflower + sprout PlantIcons. Open: Domi writes the real O nás text
      (TODO in src/content/stranky/o-nas.md).
- Supporting tokens all confirmed via design-update.md (`--inkoust` #24382a,
  `--tlumena` #64796a, new `--odkaz`, `--slunce`); `--zavreno` removed (spec:
  "zavřeno" is muted, not red); `--les-tlumeny` kept for the header tagline.
- Keep this section updated as milestones complete.
