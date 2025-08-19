import { createError, defineEventHandler, prisma, useBody } from '#imports';
import status from 'http-status';
import z from 'zod';

const removeTag = z.object({
  id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
  const { id } = await useBody(event, removeTag);
  const dbTag = await prisma.tag.findFirst({
    where: { id },
  });
  if (!dbTag) {
    throw createError({
      status: status.NOT_FOUND,
      message: '标签不存在',
    });
  }
  return prisma.tag.update({
    data: {
      deleteAt: new Date().toLocaleString(),
    },
    where: {
      id,
    },
  });
});
