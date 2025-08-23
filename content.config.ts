import { defineCollection, defineContentConfig, z } from '@nuxt/content';

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
  },
});
