import { auth } from '#shared/auth';
import status from 'http-status';
import z from 'zod';

export const createPostBody = z.object({
  title: z.string(),
  content: z.string(),
  tagId: z.coerce.number().array(),
  publish: z.boolean().default(false),
});

export default defineEventHandler(async (ctx) => {
  // const sesssion = await auth.api.getSession({
  //   headers: ctx.headers,
  // });
  // if (!sesssion) {
  //   throw createError({
  //     status: status.UNAUTHORIZED,
  //     message: '未登录',
  //   });
  // }
  // const userId = sesssion.user.id;
  // const data = await auth.api.userHasPermission({
  //   body: {
  //     userId,
  //     role: 'admin',
  //     permission: {
  //       post: ['create'],
  //     },
  //   },
  // });
  // if (!data.success) {
  //   throw createError({
  //     status: status.FORBIDDEN,
  //     message: '权限不足',
  //   });
  // }
  const { title, content, tagId, publish } = await useBody(ctx, createPostBody);
  const post = await prisma.post.create({
    data: {
      title,
      content,
      draft: !publish,
      tag: {
        connect: tagId.map(id => ({ id })),
      },
    },
  });
  return post;
});
