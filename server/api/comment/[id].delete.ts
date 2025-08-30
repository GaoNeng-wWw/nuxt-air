import status from 'http-status';
import z from 'zod';
import prisma from '~~/shared/prisma';

export const RemoveComment = z.object({
  id: z.coerce.number(),
});

export default defineProductApi(async (event) => {
  const { id } = await useParam(event, RemoveComment);
  const session = await auth.api.getSession({
    headers: event.headers,
  })!;
  if (!session) {
    throw createError({
      status: status.UNAUTHORIZED,
      message: '未登录',
    });
  }
  const comment = await prisma.comment.findFirst({
    where: { id },
  });
  if (!comment) {
    throw createError({
      status: status.NOT_FOUND,
      message: '推文不存在',
    });
  }
  return prisma.comment.update({
    where: {
      id,
    },
    data: {
      deleteAt: new Date(),
    },
  })
    .then((comment) => {
      return incrBy(`COMMENT::${id}::TOTAL`, -1)
        .then(() => comment);
    });
}, { comment: ['hidden'] });
