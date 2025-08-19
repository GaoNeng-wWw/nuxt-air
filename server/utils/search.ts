import { pagination } from '#imports';
import z from 'zod';

export const searchTag = z.object({
  name: z.string(),
}).and(pagination);
