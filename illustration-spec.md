# Illustration spec — header scene & section plants

Brief for the hand-drawn (Procreate) artwork that replaces the placeholder SVGs.
Written against the live code (2026-07-05): `SkyScene.astro`, `MeadowNav.astro`,
`header.css`, `PlantIcon.astro`. If code and this file disagree, check the code.

---

## 1. What gets drawn

| Asset | Replaces | Logical size |
|---|---|---|
| A. Sky scene (background + animated layers) | `SkyScene.astro` placeholder | 1200 × 290 |
| B. Meadow strip (band + flowers + cat) | `MeadowNav.astro` SVG | 1200 × 56 |
| C. Three section plants (tulip, daisy, blossom branch) | `PlantIcon.astro` | 38 × 48 each |

---

## 2. Canvas & crop behavior (read before composing!)

The scene is drawn on a **1200 × 290** canvas but browsers crop it:

- **Phones (~380 px wide):** only the **central ~380–420 px strip** of the canvas is
  visible (the crop is horizontally centered). Everything essential — farmhouse,
  clear sky for the title — must live inside the central **x ≈ 400–800** zone.
- **Wide screens (> 1200 px):** the image scales up anchored to the **bottom** edge;
  the **top** gets cropped first. Keep the top ~25 px free of anything important.
- Trees, extra bushes, animals etc. belong in the outer zones (x < 400, x > 800) —
  they are a bonus on desktop, invisible on phones. Nothing critical there.

**Title safe zone:** the site name + tagline are HTML text overlaid at the top center
(roughly x 400–800, y 30–120). The sky there must stay light and calm — the title is
dark green `#2c5e37` and needs to stay readable. No clouds parked in that zone
(drifting through is fine — they're a separate moving layer anyway).

**Meadow seam:** the scene's bottom edge must end in a meadow band that flows into
the sticky strip below it. The strip's base color is painted by CSS as exactly
`#4d7549` (`--louka`) — the drawn meadow must meet the bottom edge at **exactly this
color** or the seam will show.

---

## 3. Layer split (this is what makes the animation work)

The CSS animates whole layers by moving/rotating them — no frame-by-frame drawing.
Each item below = **one Procreate layer, exported separately with transparency**:

### A. Sky scene (1200 × 290)
1. `background` — sky (flat `#cfe6f0`), sun, hills, farmhouse, trees, meadow onset.
   Everything static in ONE layer.
2. `cloud-a` — one cloud group (drawn near the LEFT edge; CSS drifts it rightward
   across the whole scene on a loop).
3. `cloud-b` — a second, slightly different cloud group. Same idea.
4. `bird-1`, `bird-2` — small flying-bird silhouettes (dark green `#2c5e37`).
   Drawn once; CSS flies them across. Keep each ~25–30 px wide.

### B. Meadow strip (1200 × 56)
5. `meadow` — the grass band. Base `#4d7549`, darker sweep `#456b42` along the
   bottom. Must **tile or extend gracefully** at the sides (screens wider than
   1200 px stretch the crop) — keep the side edges plain grass, no features.
6. `flowers` — ~10 small flowers, ONLY sun-yellow `#f0c04c` and white, with the
   center dot in the other color. Each flower ≈ 25 px tall (stem + head).
   ⚠ Each flower sways by rotating around **the base of its own stem** — if easier,
   export flowers as individual small images; otherwise we slice them.
7. `cat-body` — walking cat silhouette (`#3a3530`), side view, ~45 × 30 px,
   WITHOUT tail. ⚠ The cat walks right, then **flips horizontally** and walks back
   — it must look right mirrored (no asymmetric details like a name tag).
8. `cat-tail` — the tail alone, with an obvious pivot point where it meets the
   body (CSS wags it by rotating around that point).

### C. Section plants (38 × 48 each, three files)
- Shared: terracotta pot (soil brown `#85603c`) at the bottom, same pot all three,
  same baseline. Stems emerald `#1f9d55`.
- `plant-tulip` — tulip, poppy-red `#d9432f` bloom (section: Aktuality)
- `plant-daisy` — daisy, red petals + sun-yellow `#f0c04c` center (Otevírací doba)
- `plant-blossom` — branch with 3 red blossoms, yellow center dots (Kontakt)
- Style: same visual language as the big scene — these should feel like they grew
  out of the same drawing. More plants in this style may be needed for the
  Sortiment page later, so keep the recipe repeatable.

---

## 4. Palette

Illustration tints (drawn artwork — tone freedom OK **except the two ⚠ rows**):

| Use | Hex |
|---|---|
| Sky | `#cfe6f0` |
| Sun | `#f0c04c` |
| Clouds | `#ffffff` |
| Back hill | `#8cc07f` |
| Front hill | `#63a25e` |
| Farmhouse wall | `#fff6e6` |
| Roof + door | `#d9432f` |
| Tree crowns, conifer, birds | `#2c5e37` |
| Trunks, pots | `#85603c` |
| ⚠ Meadow base (must match CSS exactly) | `#4d7549` |
| ⚠ Meadow dark sweep | `#456b42` |
| Cat | `#3a3530` |
| Flowers | `#f0c04c` + white |

Note: the meadow greens are deliberately darker than the rest of the artwork —
white nav text sits on them and needs the contrast. Don't lighten them.

---

## 5. Procreate & export settings

- **Canvas:** work at 2× — sky scene **2400 × 580 px**, strip **2400 × 112 px**,
  plants **304 × 384 px** (8×; they're tiny, draw big). RGB.
- **Color profile: sRGB** (Procreate defaults to Display P3 — change it, or the
  exported hexes won't match the CSS colors and the meadow seam will show).
- **Export:** PNG per layer, transparency on, full canvas size (don't crop to
  content — layer positions must line up when stacked).
- **Names:** `scene-background.png`, `scene-cloud-a.png`, `scene-cloud-b.png`,
  `scene-bird-1.png`, `scene-bird-2.png`, `strip-meadow.png`, `strip-flowers.png`,
  `strip-cat-body.png`, `strip-cat-tail.png`, `plant-tulip.png`, `plant-daisy.png`,
  `plant-blossom.png`.
- Delivery: drop everything into `src/assets/illustrations/` — wiring them in is a
  coding session (we keep all existing animation CSS; only the shapes change).

## 6. Don'ts

- No text baked into the artwork — title and tagline stay HTML (spec 6a §5).
- No gradients in UI-adjacent parts; flat fills read best at these sizes.
- Nothing story-critical outside the central phone-visible zone (§2).
- Don't merge the animated layers into the background "because it looks finished" —
  flattened art can't move.
