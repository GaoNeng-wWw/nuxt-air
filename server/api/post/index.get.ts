import status from 'http-status';
import z from 'zod';
import { auth } from '~~/shared/auth';

export default defineEventHandler(async (event) => {
  const query = pagination.merge(
    z.object({
      publish: z.boolean().default(true),
    }),
  );
  const { page, size, publish } = await useQuery(
    event,
    query,
  );
  if (!publish) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });
    if (!session) {
      throw createError({
        status: status.UNAUTHORIZED,
        message: '未登录',
      });
    }
    const checkHandle = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permission: {
          post: ['read::daft'],
        },
      },
    });
    if (!checkHandle.success) {
      throw createError({
        status: status.FORBIDDEN,
        message: '未登录',
      });
    }
  }
  const total = await prisma.post.count();
  const post = await prisma.post.findMany({
    where: {
      daft: !publish,
    },
    skip: (page - 1) * size,
    take: size,
  });
  return {
    post,
    total,
  };
});
