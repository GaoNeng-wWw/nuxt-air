import status from 'http-status';
import { z } from 'zod';
import prisma from '~/lib/prisma';
import { CreatePost } from './index.post';

export const PatchPostParam = z.object({
  id: z.number({ coerce: true }),
});
export const PatchPostBody = CreatePost.partial().merge(
  z.object({
    publish: z.boolean().optional(),
  }),
);
export default defineApi(async (event) => {
  const { id } = await useParam(event, PatchPostParam);
  const body = await useBody(event, PatchPostBody);
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });
  const t = await useTranslation(event);

  if (!post) {
    throw new HttpException(t('common.notFound'), status.NOT_FOUND);
  }
  const categories = await prisma.category.findMany({
    where: {
      id: {
        in: body.categories,
      },
    },
  });
  const newPost = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      pin: body.pin,
      categories: {
        set: categories.map(category => ({ id: category.id })),
      },
      content: body.content,
      publish: body.publish,
    },
  });
  if (!post.publish && newPost.publish) {
    const key = useDraftTotalNameSpace();
    await decr(key);
  }
  return newPost;
}, { guards: [AuthGuard] });
