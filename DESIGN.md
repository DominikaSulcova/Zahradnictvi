---
name: Zahradnictví Úsilné
description: Illustrated, homey web presence for a small family garden center — fresh, clean, airy, restrained color.
colors:
  les: "#2c5e37"
  pozadi: "#eef5ec"
  karta: "#ffffff"
  novinka: "#1f9d55"
  vyprodej: "#d9432f"
  sezonni: "#85603c"
  nav-svetla: "#f2f7ee"
  inkoust: "#24382a"
  tlumena: "#64796a"
  odkaz: "#17854a"
  slunce: "#f0c04c"
  louka: "#4d7549"
  louka-tmava: "#456b42"
  nebe: "#cfe6f0"
  kopec-zadni: "#8cc07f"
  kopec-predni: "#63a25e"
  stavení: "#fff6e6"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontWeight: 700
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontWeight: 600
  handwritten:
    fontFamily: "Caveat, cursive"
    fontWeight: 500
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontWeight: 600
rounded:
  karta: "16px"
  vnoreny: "8px"
  pill: "999px"
components:
  news-card:
    backgroundColor: "{colors.karta}"
    rounded: "{rounded.karta}"
  nav-active-pill:
    backgroundColor: "{colors.nav-svetla}"
    textColor: "{colors.les}"
    rounded: "{rounded.pill}"
---

<!-- Updated 2026-07-05 to the owner's final visual direction "6a" (design-update.md).
     That spec is authoritative for the visual skin; this file records the tokens and
     patterns as implemented. Deviations from the spec (all contrast-driven, owner-
     approved): meadow green #4d7549 instead of #4a9e57; link/handwritten emerald
     #17854a instead of #1f9d55 for text uses (icons and stems keep #1f9d55). -->

# Design System: Zahradnictví Úsilné

## 1. Overview

**Creative North Star: "Živá pohlednice" (The Living Postcard)**

The site is a hand-drawn postcard from the family garden that gently comes to life:
drifting clouds, passing birds, swaying flowers, a cat walking across the meadow.
All personality and motion are concentrated in the illustrated header scene; everything
below it is calm, airy, and legible — white cards floating on a pale green field.
A visitor on a phone reads the latest sale, the opening hours, and the address without
a single flourish getting in the way.

The system explicitly rejects the generic WordPress/Elementor template look it replaces,
any corporate e-shop pattern (product grids, carts, price-driven layout), and dark or
moody "premium" styling. It is light and homey, always — *„Kde se cítíte jako doma."*

**Key Characteristics:**
- One illustrated, animated brand moment (the header); restrained everywhere else
- Mobile-first, fast, zero-JS by default (Astro static pages)
- Czech language throughout, correct diacritics guaranteed
- Editor-proof: only three approved accent styles, no other visual knobs

## 2. Colors

A restrained, garden-fresh palette: one deep green voice on a pale green field, with
three functional accents reserved for news labels.

### Primary
- **Les** (`#2c5e37`): the deep forest green that is the brand's voice — headings,
  footer background, and the text inside the nav's active pill. Never used as a
  large background except the footer.

### Secondary
The three aktuality style accents — the only saturated colors on the site, and the
only appearance choice the editor gets:
- **Novinka** (`#1f9d55`): fresh green — news entries.
- **Výprodej** (`#d9432f`): warm red — sale entries.
- **Sezónní** (`#85603c`): earthy brown — seasonal entries.

### Neutral
- **Pozadí** (`#eef5ec`): the pale green page background — the "field" the cards sit on.
- **Karta** (`#ffffff`): card surface for all content blocks.
- **Nav světlá** (`#f2f7ee`): light nav text sitting directly on the meadow
  illustration, with a subtle dark text-shadow for legibility.

### Supporting (confirmed via design-update.md, 2026-07-05)
- **Inkoust** (`#24382a`): primary text, card titles.
- **Tlumená** (`#64796a`): muted text — dates, card body copy, captions, "zavřeno".
- **Odkaz** (`#17854a`): links and handwritten sub-headings — the spec's emerald
  darkened to pass 4.5:1 on white; graphics (icon strokes, plant stems) keep novinka.
- **Slunce** (`#f0c04c`): flower centers and the illustration sun.
- **Louka** (`#4d7549`) / **Louka tmavá** (`#456b42`): meadow strip greens, darkened
  from the spec's `#4a9e57` for WCAG nav contrast (owner-approved).
- Illustration-only tints (not UI): nebe `#cfe6f0`, hills `#8cc07f`/`#63a25e`,
  farmhouse wall `#fff6e6`.

### Named Rules
**The Three Styles Rule.** Novinka, výprodej, sezónní — nothing else. The editor picks
one of three styles per news entry; no other color customization exists anywhere.
This is deliberate: the site cannot drift off-brand.

**The One Loud Place Rule.** Saturated color appears only in aktuality pills and accent
bars. The rest of the page stays in les + neutrals.

## 3. Typography

**Display Font:** Sora (weights 600/700, with system-ui fallback)
**Handwritten Font:** Caveat (weight 500) — section sub-headings ONLY
**Body Font:** Manrope (weights 400/600/700, with system-ui fallback)

**Character:** A sturdy geometric sans for headings, a warm legible body face, and one
handwritten voice that carries the postcard feeling — direction "6a" (design-update.md).

### Hierarchy
- **Display** (Sora 700): the site name in the header sky and page titles.
- **Headline** (Sora 700, UPPERCASE, letter-spacing ≈0.095em): section headings, in les green.
- **Handwritten** (Caveat 500, odkaz green): the "… co je u nás nového" sub-heading
  under each section heading, pulled 22px left toward the plant icon.
- **Card title** (Sora 700): in inkoust, not green.
- **Body** (Manrope 400, line-height ≈1.55): card copy in tlumená; max line length 65–75ch.
- **Label** (Manrope 600–700): style pills (700), dates (400).
- **Nav items** (Sora 600): owner preference (2026-07-05) over the spec's Manrope.

### Named Rules
**The Diacritics Rule.** Fonts load with the `latin-ext` subset and ěščřžýáíéůú must
render correctly in all three faces — verified before any other work proceeds. A garden
center site that can't spell „sezónní" has failed.

**The Handwriting Rule.** Caveat appears only in section sub-headings — never in body
copy, buttons, cards, or the nav (design-update.md §5).

## 4. Elevation

Depth comes from soft shadows only: white cards with **soft shadows, no borders,
16 px radius** floating on the pale green background. No border lines, no tonal
layering, no heavy drop shadows. The one exception: the sticky meadow-strip nav
carries a soft shadow so it reads as floating above the content once the sky scene
has scrolled away.

### Named Rules
**The No-Border Rule.** Cards are separated from the background by surface color and
a soft shadow — never by a stroke. (The prototype's 1px borders and 12px radius are
superseded by this rule.)

## 5. Components

The prototype (`zahradnictvi-usilne-prototyp.jsx`) is authoritative for structure;
the tokens above override its colors and fonts. Components below are the agreed set.

### Aktualita Card (signature component)
- **Structure:** thin accent bar across the top (style color), then text column
  (pill, headline in inkoust, short body text) with an optional photo column on the
  right (≈45% of the card). With photos, the date moves to the photo column's top
  right corner; without photos it stays next to the pill.
- **Photos (owner's design, 2026-07-05 — supersedes the spec §2.4 thumbnail row):**
  a scroll-snap strip showing one photo at a time, framed as a **polaroid** — white
  border, thick bottom lip, soft shadow, square corners. *Provisional:* the owner may
  still revisit the polaroid treatment; the 8px nested-surface radius remains the
  fallback style for card photos if she does.
- **Corner Style (card):** 16px radius, soft shadow, no border.
- **The style (novinka/výprodej/sezónní) controls pill color and accent bar** — exactly
  as in the prototype, driven by one CMS select field.

### Navigation (signature component)
- **Style:** text embedded in the meadow strip at the bottom of the header
  illustration — no bar, no background color. Light text (`#f2f7ee`) with a subtle
  dark text-shadow, directly on the meadow.
- **Active state:** a light pill (`#f2f7ee` background) with les-green text.
- **Behavior:** the meadow strip detaches from the sky scene and stays **sticky at
  the top** (soft shadow while pinned); the sky scene scrolls away. Clicking the
  header illustration returns home; there is no "Domů" item. On narrow screens the
  links **wrap into two centered rows** (owner decision 2026-07-05, supersedes the
  6a spec's no-wrap rule; anchor offsets compensate for the taller strip).
- **Items:** Aktuality, Otevírací doba, Kontakt (home anchors) · O nás, Sortiment (pages).

### Cards / Containers (hours, contact, sortiment categories)
- **Background:** karta white on pozadí green.
- **Corner Style:** 16px radius; **Shadow Strategy:** soft shadow per Elevation; no borders.
- **Hours table:** day-range rows separated by 20%-tlumená hairlines; times right-aligned,
  bold, tabular-nums; "zavřeno" quiet muted (tlumená 600) — the red variant is superseded.
- **Kontakt card:** one card — contact lines with thin emerald stroke icons (novinka,
  1.8 stroke, round caps), FB badge + IG outline icon, odkaz-green underlined links,
  44px touch rows; map embed as a nested 8px-radius surface.
- **Section heading block:** potted-plant icon (38×48; tulip / daisy / blossom /
  sunflower / sprout, one per section or page) + uppercase heading + handwritten
  sub-heading; renders as h1 on standalone pages via the `level` prop.
- **Sortiment list (owner decision 2026-07-06, supersedes the prototype's card
  grid):** ONE card with hairline-separated category rows — emoji, name in les,
  short muted description. The emoji is editor-picked content per category, not UI
  chrome (spec §5's "no emoji in UI" refers to interface elements).

### Footer
- Les-green background, light text, exactly `© {current year} Zahradnictví Úsilné` — nothing else.

### Header Illustration (signature component)
- Full-width illustrated scene (sky, hills, farmhouse, trees, site name in the sky).
- Phase 1: animated SVG placeholder from the prototype (clouds, birds, swaying
  flowers, walking cat), ported as-is. Phase 2: owner's Procreate layers as drop-in
  replacements — one component, one asset folder, animations in reusable CSS.
- All animations disabled under `prefers-reduced-motion`.

## 6. Do's and Don'ts

### Do:
- **Do** keep all design tokens in one central file (CSS custom properties) — the owner tweaks them herself.
- **Do** concentrate charm in the header illustration and keep content sections calm.
- **Do** verify Czech diacritics render in both fonts (latin-ext) before shipping anything.
- **Do** keep body text contrast ≥ 4.5:1 against `#eef5ec`; mobile-first sizing.
- **Do** respect `prefers-reduced-motion` for every animation, including the header scene.

### Don't:
- **Don't** recreate the "generic WordPress/Elementor template look" — busy widgets, stock photos, inconsistent styling (PRODUCT.md anti-reference).
- **Don't** drift toward a "corporate e-shop" — no product grids, carts, or price-driven layout.
- **Don't** introduce dark or moody "premium" styling — no dark theme, ever.
- **Don't** use the prototype's superseded palette or fonts (`#2e4632` spruce, Outfit/Inter, 12px radius, 1px card borders) — the tokens in this file win.
- **Don't** add appearance options for the editor beyond the three aktuality styles.
- **Don't** give the nav a plain bar background — even when pinned, its background is the meadow strip of the illustration, never a solid UI bar.
- **Don't** put anything in the footer beyond the copyright line.
