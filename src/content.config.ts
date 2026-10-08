import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    locale: z.enum(['en', 'es']),
    projectId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    summary: z.string(),
    featured: z.boolean().default(false),
    capabilities: z.array(z.object({ id: z.string(), label: z.string() })),
    stack: z.array(z.string()),
  }),
});

export const collections = { work };
