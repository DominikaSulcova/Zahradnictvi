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
  schema: z.object({
    title: z.string(),
    // coerce: YAML may hand us a string or a Date — accept both.
    date: z.coerce.date(),
    // The only appearance choice the editor gets (The Three Styles Rule).
    style: z.enum(['novinka', 'vyprodej', 'sezonni']),
    // Entries default to visible; the editor can hide one without deleting it.
    published: z.boolean().default(true),
    // Backlog: `photos` (list of images, build-time optimized) arrives with
    // the CMS + image pipeline milestone.
  }),
});

export const collections = { aktuality };
