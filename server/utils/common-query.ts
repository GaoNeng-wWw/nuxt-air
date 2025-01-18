import { z } from 'zod';

export const PageQuery = z.object({
  page: z.number({ coerce: true }).gt(0).default(1),
  size: z.number({ coerce: true }).default(20),
});
