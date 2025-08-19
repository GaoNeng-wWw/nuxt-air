import status from 'http-status';
import z from 'zod';
import { auth } from '~~/shared/auth';

export const removePostQuery = z.object({
  id: z.coerce.number(),
});
export default defineEventHandler(async (ctx) => {
  const sesssion = await auth.api.getSession({
    headers: ctx.headers,
  });
  if (!sesssion) {
    throw createError({
      status: status.UNAUTHORIZED,
      message: '未登录',
    });
  }
  const userId = sesssion.user.id;
  const data = await auth.api.userHasPermission({
    body: {
      userId,
      role: 'admin',
      permission: {
        post: ['create'],
      },
    },
  });
  if (!data.success) {
    throw createError({
      status: status.FORBIDDEN,
      message: '权限不足',
    });
  }
  const { id } = await useQuery(ctx, removePostQuery);
  const post = await prisma.post.findFirst({
    where: { id },
  });
  if (!post) {
    throw createError({
      status: status.NOT_FOUND,
      message: '文章不存在',
    });
  }
  return prisma.post.update({
    where: { id },
    data: {
      deleteAt: new Date(),
    },
  });
});
