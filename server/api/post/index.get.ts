import { unref } from 'node:process';
import status from 'http-status';
import z from 'zod';
import { auth } from '~~/shared/auth';

export default defineEventHandler(async (event) => {
  const query = pagination.extend({
    publish: z.transform(input => typeof input === 'string' && input.toLowerCase() === 'true'),
  });
  const { page, size, publish } = await useQuery(
    event,
    query,
  );
  // if (!publish) {
  //   // const session = await auth.api.getSession({
  //   //   headers: event.headers,
  //   // });
  //   // if (!session) {
  //   //   throw createError({
  //   //     status: status.UNAUTHORIZED,
  //   //     message: '未登录',
  //   //   });
  //   // }
  //   // const checkHandle = await auth.api.userHasPermission({
  //   //   body: {
  //   //     userId: session.user.id,
  //   //     permission: {
  //   //       post: ['read::draft'],
  //   //     },
  //   //   },
  //   // });
  //   // if (!checkHandle.success) {
  //   //   throw createError({
  //   //     status: status.FORBIDDEN,
  //   //     message: '未登录',
  //   //   });
  //   // }
  // }
  const total = await prisma.post.count({
    where: {
      draft: !publish,
    },
  });
  const post = await prisma.post.findMany({
    where: {
      draft: !publish,
    },
    orderBy: {
      createAt: 'desc'
    },
    skip: (page - 1) * size,
    take: size,
  });
  return {
    post,
    total,
  };
});
