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
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontWeight: 700
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontWeight: 600
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontWeight: 600
rounded:
  karta: "16px"
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

<!-- SEED: core tokens are finalized in PROJECT-BRIEF.md; supporting tokens (ink, muted,
     hover, meadow green, link color) are derived during Milestone 1. Re-run
     /impeccable document once real CSS tokens exist to capture them and generate the
     component sidecar. -->

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

Supporting tokens (body ink, muted text, hover states, meadow-strip green, link color)
are **[to be derived during Milestone 1]** from this core palette, kept centralized,
and confirmed with the owner.

### Named Rules
**The Three Styles Rule.** Novinka, výprodej, sezónní — nothing else. The editor picks
one of three styles per news entry; no other color customization exists anywhere.
This is deliberate: the site cannot drift off-brand.

**The One Loud Place Rule.** Saturated color appears only in aktuality pills and accent
bars. The rest of the page stays in les + neutrals.

## 3. Typography

**Display Font:** Bricolage Grotesque (weights 600/700, with system-ui fallback)
**Body Font:** Figtree (weights 400/600, with system-ui fallback)

**Character:** A friendly, slightly characterful grotesque for headings over a clean,
warm, highly legible body face — hand-lettered postcard warmth without losing clarity.

### Hierarchy
- **Display** (700): the site name in the header sky and page titles.
- **Headline** (600): section headings (Aktuality, Otevírací doba, Kontakt) and card titles, in les green.
- **Body** (400, comfortable line-height): news text, about text; max line length 65–75ch.
- **Label** (600): style pills, dates, nav items.

Exact sizes **[to be fixed during Milestone 1]** — mobile-first, generous enough for
older local customers.

### Named Rules
**The Diacritics Rule.** Fonts load with the `latin-ext` subset and ěščřžýáíéůú must
render correctly in both faces — verified before any other work proceeds. A garden
center site that can't spell „sezónní" has failed.

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
- **Structure:** thin accent bar across the top (style color), style pill + date row,
  headline in les, short body text, optional photo strip.
- **Corner Style:** 16px radius, soft shadow, no border.
- **The style (novinka/výprodej/sezónní) controls pill color and accent bar** — exactly
  as in the prototype, driven by one CMS select field.

### Navigation (signature component)
- **Style:** text embedded in the meadow strip at the bottom of the header
  illustration — no bar, no background color. Light text (`#f2f7ee`) with a subtle
  dark text-shadow, directly on the meadow.
- **Active state:** a light pill (`#f2f7ee` background) with les-green text.
- **Behavior:** the meadow strip detaches from the sky scene and stays **sticky at
  the top** (soft shadow while pinned); the sky scene scrolls away. Clicking the
  header illustration returns home; there is no "Domů" item.
- **Items:** Aktuality, Otevírací doba, Kontakt (home anchors) · O nás, Sortiment (pages).

### Cards / Containers (hours, contact, sortiment categories)
- **Background:** karta white on pozadí green.
- **Corner Style:** 16px radius; **Shadow Strategy:** soft shadow per Elevation; no borders.
- **Hours table:** day-range rows with right-aligned times; "zavřeno" in a warm red tone.
- **Sortiment category card:** emoji/icon, category name in les, short muted description.

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
