import { createError, defineEventHandler, prisma, useBody } from '#imports';
import status from 'http-status';
import z from 'zod';

const createTag = z.object({
  name: z.string(),
  desc: z.string(),
});

export default defineEventHandler(async (event) => {
  const { name, desc } = await useBody(event, createTag);
  const dbTag = await prisma.tag.findFirst({
    where: { name },
  });
  if (dbTag) {
    throw createError({
      status: status.BAD_REQUEST,
      message: '标签存在',
    });
  }
  return prisma.tag.create({
    data: {
      name,
      desc,
    },
  });
});
