import { z } from 'zod';
import prisma from '~/lib/prisma';

export const RemoveCategory = z.object({
  id: z.number({ coerce: true }),
});

export default defineApi(async (event) => {
  const { id } = await useParam(event, RemoveCategory);
  return prisma.category.delete({
    where: { id },
  });
}, { guards: [AuthGuard] });
