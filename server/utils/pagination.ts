import z from 'zod';

export const pagination = z.object({
  page: z.coerce.number().default(1),
  size: z.coerce.number().default(10),
});
