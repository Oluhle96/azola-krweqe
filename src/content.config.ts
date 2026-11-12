import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const galleryField = z.array(
  z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  }),
);

const creditsField = z.array(
  z.object({
    credit: z.string(),
  }),
);

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
    credits: creditsField.default([]),
    gallery: galleryField.default([]),
    video: z.string().optional(),
    videoTitle: z.string().optional(),
  }),
});

const exhibitions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exhibitions' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    year: z.string(),
    dates: z.string(),
    venue: z.string(),
    status: z.enum(['Current', 'Upcoming', 'Past']).default('Upcoming'),
    summary: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    access: z.string().default('By appointment'),
    admission: z.string().default('Free'),
    curator: z.string().default('Azola Krweqe'),
    programme: z
      .array(
        z.object({
          date: z.string(),
          label: z.string(),
          description: z.string().optional(),
        }),
      )
      .default([]),
    artists: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
        }),
      )
      .default([]),
    supporters: creditsField.default([]),
    gallery: galleryField.default([]),
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

export const collections = { projects, exhibitions, writing };
