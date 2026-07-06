# Zahradnictví Úsilné — Visual Design Spec (final direction "6a")

Build spec for zahradnictvi-usilne.cz homepage rebuild. Site content is Czech (charset UTF-8, all fonts loaded with `latin-ext`). Mobile-first; reference mockup width 380 px. Layout/structure is fixed as described; this spec defines the visual skin.

---

## 1. Design tokens

### 1.1 Colors

```css
:root {
  /* Core greens */
  --deep:   #2c5e37;  /* forest — H1 site title, footer bg, dark tree shapes */
  --nv:     #1f9d55;  /* emerald — "Novinka" accent, links, icons, plant stems, handwritten sub-headings */
  --vy:     #d9432f;  /* poppy red — "Výprodej" accent, blossoms, roof in illustration */
  --sz:     #85603c;  /* soil brown — "Sezónní" accent, flower pots */
  --meadow: #4a9e57;  /* nav strip band */

  /* Surfaces */
  --bg:     #eef5ec;  /* page background (light mint tint) */
  --card:   #ffffff;  /* card surface */

  /* Text */
  --ink:    #24382a;  /* primary text */
  --mut:    #64796a;  /* secondary text, dates, table "zavřeno" */

  /* Illustration palette (header scene) */
  --sky:    #cfe6f0;
  --sun:    #f0c04c;
  --cloud:  #ffffff;
  --hillA:  #8cc07f;  /* back hill */
  --hillB:  #63a25e;  /* front hill */
  --house:  #fff6e6;  /* farmhouse wall */
  --roof:   #d9432f;  /* farmhouse roof = --vy */
}
```

Category accent mapping (exactly three, used on news cards):
- **Novinka** → `--nv` #1f9d55
- **Výprodej** → `--vy` #d9432f
- **Sezónní** → `--sz` #85603c

Pill background for a category = its accent at ~13% over card white (e.g. `color-mix(in oklab, var(--acc) 13%, #fff)`).

### 1.2 Typography

Google Fonts, always with `&subset=latin-ext` support (Czech diacritics: á č ď é ě í ň ó ř š ť ú ů ý ž).

- **Headings:** `Sora`, weights 600/700
- **Handwritten sub-headings:** `Caveat`, weight 500 (connected script, readable)
- **Body:** `Manrope`, weights 400/600/700

Scale (mobile 380 px reference):
- Site title in illustration (H1): Sora 700, 25px, color `--deep`
- Tagline under title: Manrope 400, 12px, color `--deep` at 78% opacity
- Section heading (H2): Sora 700, 19px, **UPPERCASE**, letter-spacing 1.8px, color `--deep`, margin 0
- Handwritten sub-heading: Caveat 500, 21px, color `--nv`, indented **22px left of heading start**, sits directly UNDER the heading, always prefixed with an ellipsis + space: `… co je u nás nového`
- Card title (H3): Sora 700, 16.5px, color `--ink`
- Body text: Manrope 400, 13px, line-height 1.55, color `--mut`
- Category pill: Manrope 700, 9px, uppercase, letter-spacing 0.8px
- Date: Manrope 400, 11px, color `--mut`
- Nav items: Manrope 600, ~10px (mobile), white 95% opacity

Section headings have NO eyebrow label above them. The former eyebrow text moved into the handwritten sub-heading below:
- Aktuality → `… co je u nás nového`
- Otevírací doba → `… kdy k nám`
- Kontakt → `… kde nás najdete`

### 1.3 Surface & depth

- Cards: white, **no border**, border-radius **16px**, shadow `0 6px 18px rgba(45,60,50,.10)`
- Inner card padding: 14–16px
- Small nested surfaces (photo thumbs, map placeholder): radius 8px (half of card radius)
- Page background `--bg` everywhere behind cards
- Section vertical rhythm: ~32px gap between sections; ~14px between cards

---

## 2. Page anatomy (top → bottom)

### 2.1 Header illustration (~290 px tall)

Flat vector landscape (placeholder — will be replaced by a hand-drawn Procreate illustration; keep it swappable as a single image/SVG asset):
sky `--sky` fills the area; sun (r≈24, `--sun`) top-right; 2 cloud groups (`--cloud` ellipses); two overlapping rolling hills (`--hillA` behind, `--hillB` front) as large ellipses rising from bottom; farmhouse center (wall `--house`, triangular roof + door `--roof`, two windows `--sky`); a dark conifer (`--deep` triangle) left, a round-crown tree (`--deep` crown, `--sz` trunk) right; meadow band `--meadow` sweeping along the bottom edge, dotted with small flowers (2.2–2.5px circles, `--sun` yellow and white).

Centered in the sky, ~36px from top: site title "Zahradnictví Úsilné" + tagline "Kde se cítíte jako doma" (see type scale).

### 2.2 Meadow nav strip (56 px, sticky)

Visually continuous with the illustration's meadow. Background `--meadow` with a repeating pattern of tiny scattered flowers (radial-gradient dots: `--sun` yellow 2px + white 1.7px on a 132×56 tile). Pinned on scroll (`position: sticky; top: 0`).

Items in one row, `display:flex; justify-content:space-between`, no wrapping (`white-space:nowrap`):
`Aktuality · Otevírací doba · Kontakt · O nás · Sortiment`
- Inactive: white text (95% opacity), weight 600
- Active: white pill (`--card` bg, radius 999px, padding 5px 11px), text `--deep`, weight 700

### 2.3 Section heading block (repeated pattern)

```
[plant SVG]  AKTUALITY            ← Sora caps
             … co je u nás nového ← Caveat, green, indented
```

`display:flex; align-items:center; gap:12px; margin-bottom:14px`. The plant illustration is 38×48px, height ≈ heading + sub-heading combined. Each section gets a different plant in the same style (see §3.4).

### 2.4 Aktuality section

Stacked cards. Each card:
- Top accent stripe: **6px tall, full card width** (edge to edge, respects top corner radius via `overflow:hidden` on card), color = category accent
- Header row (space-between): category pill left, date right
- Title (H3), then 1–2 lines body text
- Optional row of 3 photo thumbnails: equal-width flex row, gap 8px, height 58px, radius 8px

Sample content:
1. Výprodej | 1. 7. 2026 | "Letní výprodej sadby" — "Rajčata 5 Kč/kus, feferonky 20 Kč, muškáty a voděnky po 10 Kč/kus. Přijďte, dokud zásoby stačí!" (3 thumbnails)
2. Novinka | 28. 6. 2026 | "Letní otevírací doba od 7. 7." — "Po–pá 8:00–16:30, sobota 8:00–12:00. Neděle a svátky zavřeno."

### 2.5 Otevírací doba section

One card with a 3-row table; rows separated by 1px hairline (`--mut` at 20% alpha), no border on the last row:
- pondělí–pátek | **8:00–16:30**
- sobota | **8:00–12:00**
- neděle a svátky | zavřeno (muted, weight 600)

Times right-aligned, weight 700, `font-variant-numeric: tabular-nums`.

### 2.6 Kontakt section

One card: contact lines + map. Each line is a flex row (`gap:10px; align-items:center`) with a 16×16 stroke icon (stroke `--nv`, stroke-width 1.8, round caps/joins, no fill):
1. map-pin icon — **Úsilné 9, 370 10 Úsilné** (weight 700)
2. phone handset icon — 732 264 647
3. envelope icon — marie.sulcova@volny.cz
4. Facebook: filled circle (17px, `--nv` bg) with white lowercase "f" (Sora 700, 11px) — link text "Facebook", green, underlined (underline-offset 2px)
5. Instagram: outline icon (rounded square rx≈4.5 + circle lens r≈3.8 + small filled dot top-right) — link text "Instagram", same link style

To the right from the lines: map embed, radius 8px, ~110px tall on mobile.

### 2.7 Footer

Full-width band, background `--deep`, centered white text at 85% opacity, Manrope 11px, padding 18px:
`© 2026 Zahradnictví Úsilné`

---

## 3. SVG assets

### 3.1 Contact icons (24×24 viewBox, stroke `--nv`, stroke-width 1.8, round caps/joins, fill none)

- Pin: `M12 21c-4-4.5-7-7.8-7-11a7 7 0 0 1 14 0c0 3.2-3 6.5-7 11z` + `circle cx=12 cy=10 r=2.6`
- Phone: `M5 4h4l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z`
- Envelope: `rect x=3 y=5.5 w=18 h=13 rx=2` + `M3.5 7l8.5 6 8.5-6`
- Instagram: `rect x=3.5 y=3.5 w=17 h=17 rx=4.5` + `circle cx=12 cy=12 r=3.8` + filled dot `cx=17 cy=7 r=1.1`

### 3.2 Facebook badge

17px circle, `--nv` background, white "f" (Sora 700, 11px), centered.

### 3.3 Header scene

Placeholder only — build as one inline SVG component so the final hand-drawn PNG/SVG can replace it 1:1. Keep title + tagline as HTML overlaid on top (absolute positioning), NOT baked into the image.

### 3.4 Section plants (38×48 viewBox, one per section)

Shared base: terracotta pot = trapezoid `M12 34h14l-2 11H14z` + rim `rect x=10.5 y=31.5 w=17 h=4 rx=2`, both fill `--sz`. Stem stroke `--nv` width 2, round caps.

- **Aktuality — tulip:** stem M19 31V15; two leaves (mirrored petal paths, fill `--nv`, right one at 75% opacity); tulip bloom with three pointed petals, fill `--vy`
- **Otevírací doba — daisy:** stem M19 31V16 + one leaf; 6 petals = circles r 3.1 arranged around center (20,12) hexagonally, fill `--vy`; center circle r 3.4 fill `--sun`
- **Kontakt — blossom branch:** main stem M19 31V12 with two curved side branches; 3 blossoms (circles r 3.4/2.7/2.7, fill `--vy`) each with tiny `--sun` center dot

---

## 4. Behavior notes

- Nav strip: `position: sticky`, stays pinned below viewport top while scrolling; active item switches by section (scroll-spy or per-page).
- Nav must never wrap on 380 px; if space is tight reduce font-size before wrapping.
- Cards and sections stack single-column on mobile; on desktop the same layout may center at a comfortable max-width (~640–720px content column) — do not introduce multi-column layouts, layout is locked.
- Kontakt lines are tappable links (`tel:`, `mailto:`, external FB/IG); minimum touch target 44px row height on mobile.
- All hover/focus states: darken accent ~8% or underline; keep it quiet.

## 5. Don'ts

- No borders on cards (shadow only). No gradients. No emoji in UI.
- Never restyle the three-accent category system; new categories are not allowed without a token.
- Don't bake heading text into the illustration.
- Handwritten font (Caveat) is ONLY for section sub-headings — never for body copy, buttons, or nav.
