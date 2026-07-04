# Project brief: zahradnictvi-usilne.cz — rebuild

## What this is

A complete rebuild of https://zahradnictvi-usilne.cz — the website of a small family
garden center (Zahradnictví Úsilné, Úsilné 9, 370 10 Úsilné, near České Budějovice,
Czech Republic). The current site is WordPress + Elementor and will be fully replaced.

The site is in **Czech**. All visitor-facing text, labels, and the content-editing
interface (as far as possible) must be in Czech.

An approved interactive design prototype exists: `zahradnictvi-usilne-prototyp.jsx`
(single-file React mockup). It is the **authoritative reference for layout, structure,
palette, typography, and copy**. Reuse its content and visual decisions; propose
redesign if necessary but do not change anything without confirmation from the owner.

## The two users

1. **Visitors** — local customers checking current sales, opening hours, and directions.
   Mostly mobile. The site must be fast, legible, and obvious.
2. **The editor** — a non-technical family member. She must be able to, without any
   help: add a news entry (aktualita) with photos, pick its style, edit opening hours,
   contact details, the "O nás" text, and sortiment categories. This requirement drives
   the whole architecture. If a workflow needs git, a terminal, or file paths, it is
   wrong.

## Stack (agreed)

- **Static site generator:** Astro (content collections for aktuality; zero-JS pages
  except where needed).
- **CMS:** Sveltia CMS (git-based, `/admin` route), GitHub backend. Configure the
  editor UI in Czech where supported. If during setup Sveltia proves impractical for
  the auth flow, Decap CMS is the fallback — same architecture.
- **Hosting:** Cloudflare Pages (free tier), auto-deploy on push to `main`.
  Auth for the CMS via a small OAuth proxy (e.g., Cloudflare Worker) — set this up
  and document it.
- **Repository:** GitHub, private.
- **No database, no server, no paid services.** Total running cost must remain
  domain-only.

Rationale (already decided with the owner — do not relitigate): zero maintenance,
zero cost, effectively unhackable, and the editor gets a simple form-based admin UI.

## Site structure (agreed, final)

Single navigation bar with five items:

| Nav item        | Behavior                                  |
|-----------------|-------------------------------------------|
| Aktuality       | home page, scrolls to `#aktuality`        |
| Otevírací doba  | home page, scrolls to `#doba`             |
| Kontakt         | home page, scrolls to `#kontakt`          |
| O nás           | separate page `/o-nas`                    |
| Sortiment       | separate page `/sortiment`                |

- The nav is **embedded in the header illustration, along its lower edge**: no bar,
  no background color — just light text (`#f2f7ee` with a subtle dark text-shadow for
  legibility) sitting directly on the meadow/hills at the bottom of the scene. The
  active item is a light pill with dark text. The nav scrolls away with the header
  (it is not sticky); if usability testing shows the nav is missed on long pages, a
  "gains a background when scrolled" sticky variant can be discussed later. See the
  prototype for the exact treatment.
- Clicking the header illustration always returns to the home page (there is no
  "Domů" nav item).
- Home page section order: Aktuality → Otevírací doba → Kontakt (contact card + embedded
  Google Map side by side on desktop).
- Footer: exactly `© {current year} Zahradnictví Úsilné` — nothing else.
- Header tagline under the site name: `Kde se cítíte jako doma` — nothing else.

## Header illustration (important)

The header is a full-width illustrated scene: horizon with hills, a farmhouse in the
middle, trees, flowers, sky with the site name in it.

- **Phase 1 (now):** use the animated SVG placeholder from the prototype
  (drifting clouds, flying birds, swaying flowers, a walking cat). Port it as-is.
- **Phase 2 (later):** the owner will draw the final scene in Procreate and export it
  as **separate layers** (background sky, hills, house, trees, individual animatable
  elements: clouds, birds, cat(s)). Architect the header so layers are drop-in
  replacements: one component, one folder of assets, animations defined in CSS and
  reusable for the new layers. Write a short `docs/header-illustration.md` specifying
  exactly what layer files to export (names, transparent PNG or SVG, suggested
  resolutions) so the drawing can be made to fit.
- Respect `prefers-reduced-motion` everywhere.

## Content model (CMS collections)

**Aktuality** (folder collection, one entry per news item):
- `title` (string, required)
- `date` (date, required; list sorted newest first)
- `style` (select, required): `novinka` | `vyprodej` | `sezonni` — controls the card's
  accent color and label, exactly as in the prototype. This is the only appearance
  customization the editor gets — deliberately, to keep the site coherent.
- `body` (markdown, short text)
- `photos` (list of images, optional) — must be automatically resized/optimized at
  build time; source photos will often be large WhatsApp images.
- `published` (boolean, default true)
- Home page shows all published entries; if the list grows long, show the newest 5–6
  with a "starší aktuality" expansion — implement when needed, note it in the backlog.

**Singletons (file collections)** — each editable as a simple form:
- Otevírací doba: rows of day-range + hours, plus a free-text note (e.g. summer hours,
  "mimo otevírací dobu po telefonické domluvě").
- Kontakt: address, phone, e-mail, Facebook URL, Google Maps embed.
- O nás: markdown text + photo gallery.
- Sortiment: list of categories (icon/emoji, name, short description).

## Design tokens (finalized after a Claude Design exploration — keep in one file, e.g. CSS custom properties)

- Core colors: les (primary) `#2c5e37` — headings, footer, nav active-pill text;
  pozadí (page background) `#eef5ec`; karta (card surface) `#ffffff`.
- Aktuality style accents: novinka → `#1f9d55`, výprodej → `#d9432f`,
  sezónní → `#85603c`.
- Surfaces: cards with **soft shadows, no borders, 16 px radius**.
- Type: **Bricolage Grotesque** (headings, weights 600/700), **Figtree**
  (body, weights 400/600). Load with the `latin-ext` subset — Czech diacritics are
  mandatory; verify they render before proceeding.
- Supporting tokens (body ink, muted text, hover states, the meadow-strip green,
  link color) are not yet fixed: derive them from the core palette during
  Milestone 1, keep them centralized, and confirm with the owner.
- The prototype file still carries the previous palette/typography — for anything
  visual, tokens above override the prototype; the prototype remains authoritative
  for layout and structure only.
- Overall feel: fresh, clean, airy; restrained color.

## Quality floor

- Fully responsive (mobile-first — most visitors are on phones).
- Lighthouse: 90+ on performance, accessibility, SEO.
- Czech metadata: title `Zahradnictví Úsilné`, sensible description, OG image
  (can be a crop of the header scene).
- Basic SEO: sitemap, correct lang="cs", structured data for LocalBusiness
  (address, opening hours, phone) — nice bonus, low effort in Astro.
- Visible keyboard focus; semantic HTML.

## Deliverables beyond the site

1. `docs/navod-pro-redaktora.md` — a one-page illustrated guide **in Czech, for a
   non-technical person**: how to log in to `/admin`, add an aktualita with photos,
   edit opening hours. Screenshots or step lists; no jargon.
2. `docs/header-illustration.md` — the Procreate export spec (see above).
3. `docs/deployment.md` — how hosting, DNS, and the CMS auth are wired, and what to
   do when the domain is switched over from the current WordPress hosting (DNS access
   will be obtained from the family; until then, deploy on a `*.pages.dev` preview URL).

## Working mode

Read `CLAUDE.md` first — this project doubles as a learning project for the owner,
and it defines how to work and explain. Build in small, reviewable increments;
after each milestone, the site must be in a deployable state.

Suggested milestone order:
1. Repo + Astro skeleton + design tokens + header placeholder → deployed preview.
2. Home page (aktuality from content collection, doba, kontakt) with real content
   from the prototype.
3. O nás + Sortiment pages.
4. Sveltia CMS + auth; verify the full editor workflow end-to-end on the preview URL.
5. Image optimization, SEO, accessibility pass, docs.
6. DNS switchover checklist (executed once domain access is available).
