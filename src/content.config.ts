import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    role: z.string(),
    summary: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    credits: z.array(z.string()).default([]),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    video: z.string().optional(),
    videoTitle: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    link: z.string().default('/writing'),
  }),
});

export const collections = { projects, writing };
