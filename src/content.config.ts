// Content collections — the structured content the site is built from.
// Each "aktualita" (news item) is one markdown file in src/content/aktuality/.
// The schema below declares which frontmatter fields every entry must have;
// the build fails with a clear error if an entry doesn't conform. In
// Milestone 4 the /admin CMS will create these same files through a form.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const aktuality = defineCollection({
  // glob loader: "every .md file in this folder is one entry"
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuality' }),
  // `schema` is now a function: Astro hands it the image() helper, which
  // turns a frontmatter path like `./fotky/rajcata.jpg` into an optimized,
  // build-time-verified image (broken paths fail the build with a clear error).
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // coerce: YAML may hand us a string or a Date — accept both.
      date: z.coerce.date(),
      // The only appearance choice the editor gets (The Three Styles Rule).
      style: z.enum(['novinka', 'vyprodej', 'sezonni']),
      // Optional photos, shown in the card; entries without photos stay text-only.
      photos: z.array(image()).default([]),
      // Entries default to visible; the editor can hide one without deleting it.
      published: z.boolean().default(true),
    }),
});

// Editable standalone pages ("stranky") — currently just O nás. Same idea as
// aktuality: one markdown file per page, edited through the CMS from M4 on.
const stranky = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stranky' }),
  schema: ({ image }) =>
    z.object({
      // Optional gallery (courtyard, greenhouses, cats…) — renders only when present.
      photos: z.array(image()).default([]),
    }),
});

export const collections = { aktuality, stranky };
