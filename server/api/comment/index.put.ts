import status from 'http-status';
import z from 'zod';

export const CreateComment = z.object({
  postId: z.string(),
  content: z.string(),
});

export default defineProductApi(async (event) => {
  const { postId, content } = await useBody(event, CreateComment);
  const session = await auth.api.getSession({
    headers: event.headers,
  })!;
  if (!session) {
    throw createError({
      status: status.UNAUTHORIZED,
      message: '未登录',
      stack: undefined,
      fatal: true,
    });
  }
  return prisma.comment.create({
    data: {
      content,
      postId,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
    include: {
      user: true,
    },
  })
    .then((comment) => {
      return incrBy(`COMMENT::${postId}::TOTAL`, 1)
        .then(() => comment);
    });
}, { comment: ['create'] });
