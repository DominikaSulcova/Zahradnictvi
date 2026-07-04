# Product

## Register

brand

## Users

1. **Visitors** — local customers of Zahradnictví Úsilné (Úsilné u Českých Budějovic),
   mostly on mobile, often mid-errand. Job to be done: check current sales (aktuality),
   opening hours, and how to get there — in seconds, without hunting.
2. **The editor** — a non-technical family member maintaining all content through the
   `/admin` CMS form UI (in Czech). She is a first-class user: any feature she cannot
   maintain herself through `/admin` is the wrong feature.

## Product Purpose

Complete rebuild of https://zahradnictvi-usilne.cz, replacing a WordPress + Elementor
site with a static Astro site + git-based CMS (Sveltia) on Cloudflare Pages.
Success looks like: visitors find sales/hours/directions instantly on a phone; the
editor adds an aktualita with photos unaided; running cost stays domain-only;
Lighthouse 90+ across performance, accessibility, SEO. The site is entirely in Czech.

This is also a teaching project: the owner is learning web development by building it
(see CLAUDE.md — explain concepts, small increments, she writes some of the code).

## Brand Personality

Homey, fresh, family-warm. The tagline is the brand: *„Kde se cítíte jako doma"*
(where you feel at home). Personality in 3 words: **welcoming, unhurried, charming**.
The identity is carried by the illustrated header scene (hills, farmhouse, drifting
clouds, a walking cat — eventually hand-drawn by the owner in Procreate). Everything
below the header stays clean, airy, and restrained so the illustration can be the
one place with personality.

## Anti-references

- **Generic WordPress/Elementor template look** — the current site being replaced:
  busy widgets, stock photos, inconsistent styling.
- **Corporate e-shop** — no product grids, carts, or price-driven layout; this is a
  "come visit us" site, not a store.
- **Dark or moody "premium" design** — no dark theme, no dramatic luxury styling;
  light and homey, always.

## Design Principles

1. **The illustration is the brand.** Charm and motion live in the header scene;
   the rest of the page stays quiet so it never competes.
2. **Obvious over impressive.** A visitor on a phone gets sales, hours, and
   directions within seconds. Fast, legible, no cleverness in the way.
3. **The editor is a first-class user.** Every content surface maps to a simple
   Czech-language CMS form. If a workflow needs git, a terminal, or file paths,
   it is wrong.
4. **One coherent look, deliberately limited knobs.** The editor picks from three
   aktuality styles (novinka / výprodej / sezónní) — nothing else is customizable,
   so the site cannot drift off-brand.
5. **Boring beats clever.** Conventional, readable solutions; every dependency
   justified; the site builds and deploys after every increment.

## Accessibility & Inclusion

- Lighthouse accessibility 90+ (quality floor from the brief).
- `prefers-reduced-motion` respected everywhere — all header animations get a
  static alternative.
- Visible keyboard focus, semantic HTML, `lang="cs"`, correct Czech diacritics
  (latin-ext font subsets — verify rendering).
- Body text contrast ≥ 4.5:1 on the light green background; mobile-first sizing
  for an audience that includes older local customers.
