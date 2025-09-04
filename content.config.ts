import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const introductSchema = z.object({
  profile: z.object({
    name: z.string(),
    avatar: z.string(),
    summary: z.object({
      type: z.literal('random'),
      choices: z.array(z.string()),
    }).or(z.object({
      type: z.literal('static'),
      content: z.array(z.string()),
    })).optional(),
    description: z.array(z.string()).optional(),
  }),
  social: z.array(
    z.object({
      icon: z.string(),
      link: z.string(),
    }),
  ).optional(),
  projects: z.array(
    z.object({
      icon: z.string(),
      link: z.string().optional(),
      name: z.string().optional(),
    }),
  ).optional(),
  organization: z.array(
    z.object({
      icon: z.string(),
      link: z.string().optional(),
      name: z.string().optional(),
    }),
  ).optional(),
});

export default defineContentConfig({
  collections: {
    post: defineCollection({
      type: 'page',
      source: 'post/*',
      schema: z.object({
        tags: z.array(z.string()),
        image: z.string().optional(),
        date: z.date(),
      }),
    }),
    tags: defineCollection({
      type: 'data',
      source: 'tags.yaml',
      schema: z.object({
        tags: z.array(
          z.object({
            id: z.string(),
            zh: z.string(),
            en: z.string(),
          }),
        ),
      }),
    }),
    introduct: defineCollection({
      type: 'data',
      source: 'introduction.json',
      schema: introductSchema,
    }),
  },
});
