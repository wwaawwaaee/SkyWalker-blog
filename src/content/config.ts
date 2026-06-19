import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    labels: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const publication = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    authors: z.array(z.string()).default([]),
    affiliation: z.string().optional(),
    venue: z.string().optional(),
    venueDetail: z.string().optional(),
    officialLink: z.string().url().optional(),
    blogLink: z.string().optional(),
    cover: z.string().optional(),
    abstract: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog,
  publication,
  about,
};
