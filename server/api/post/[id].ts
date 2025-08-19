import z from 'zod';

export const queryPost = z.object({
  id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
  const { id } = await useQuery(
    event,
    queryPost,
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
  return prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      tag: true,
    },
  });
});
