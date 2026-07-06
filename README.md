# Zahradnictví Úsilné

Website for a small family garden center in Úsilné u Českých Budějovic —
a complete rebuild of [zahradnictvi-usilne.cz](https://zahradnictvi-usilne.cz),
replacing a WordPress site with a fast static site that a non-technical family
member edits entirely through a browser.

**Live preview:** https://zahradnictvi.cocciron.workers.dev
**Content admin:** https://zahradnictvi.cocciron.workers.dev/admin/

Built as a learning project — the owner is learning web development by
building it (see `CLAUDE.md` for the teaching workflow).

## Stack

- [Astro](https://astro.build) — static site generator; content lives in
  markdown/JSON files (`src/content/`, `src/data/`), zero JS by default
  (the few client scripts: photo carousel, scroll-spy nav, map lightbox)
- [Sveltia CMS](https://sveltiacms.app) — git-based CMS at `/admin`; every
  edit is a git commit, no database (config in `public/admin/config.yml`)
- [Cloudflare Workers](https://workers.cloudflare.com) — static hosting;
  every push to `main` auto-builds and deploys (`wrangler.jsonc`); a second
  small Worker ([sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth))
  brokers the CMS's GitHub login
- Running cost: domain only

## Development

```sh
npm install
npm run dev     # local preview at http://localhost:4321, live-reloads
npm run build   # production build into dist/
```

Deployment is automatic: push to `main` and Cloudflare builds & deploys.
Manual fallback: `npx wrangler deploy` (uploads the local `dist/`).

## Where things live

| Path | What |
|---|---|
| `src/content/aktuality/` | News entries (one markdown file each) + photos |
| `src/content/stranky/` | O nás page + home sections (Parkování, Poukazy) |
| `src/data/` | Opening hours, contact details, sortiment categories |
| `src/components/` | UI components (cards, carousel, plant icons…) |
| `src/styles/tokens.css` | All design tokens — colors, fonts, shadows |
| `public/admin/` | The CMS app + its collections config |

## Project docs

- `PROJECT-BRIEF.md` — the authoritative spec and milestone plan
- `PRODUCT.md` / `DESIGN.md` — brand strategy and the visual design system
- `design-update.md` — the final visual direction ("6a")
- `illustration-spec.md` — brief for the upcoming hand-drawn header artwork

## Status

Milestones 1–4 complete: full content site + CMS with verified editor
workflow. Remaining: hand-drawn illustration (in progress), optimization &
docs pass (M5), DNS switchover to the real domain (M6).
