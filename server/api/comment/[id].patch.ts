import z from 'zod';
import prisma from '~~/shared/prisma';

export const PatchComment = z.object({
  pin: z.boolean(),
});

export default defineProductApi(async (event) => {
  const { id } = await useParam(event, z.object({ id: z.coerce.number() }));
  const { pin } = await useBody(event, PatchComment);
  return prisma.comment.update({
    where: { id },
    data: {
      pin,
    },
    include: { user: true },
  });
}, { comment: ['patch'] });
