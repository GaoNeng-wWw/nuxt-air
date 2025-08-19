import { auth } from '#shared/auth';
import { Prisma } from '@prisma/client';
import status from 'http-status';
import z from 'zod';
import { findTagsById } from '~~/server/utils/find-tags';
import { useParam } from '~~/server/utils/use-param';

export const patchPostBody = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tagId: z.coerce.number().array().optional(),
  publish: z.boolean(),
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
  const { title, content, tagId, publish } = await useBody(ctx, patchPostBody);
  const { id } = await useParam(ctx, z.object({ id: z.coerce.number() }));
  const tags = tagId ? await findTagsById(tagId) : undefined;
  return prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      tag: !tags
        ? Prisma.skip
        : {
            set: tags,
          },
      draft: publish !== undefined ? !publish : Prisma.skip,
    },
  });
});
