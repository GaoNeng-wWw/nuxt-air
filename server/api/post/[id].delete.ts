import status from 'http-status';
import { z } from 'zod';
import prisma from '~/lib/prisma';

export const RemovePost = z.object({
  id: z.number({ coerce: true }),
});
export default defineApi(async (event) => {
  const { id } = await useParam(event, RemovePost);
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });
  const t = await useTranslation(event);

  if (!post) {
    throw new HttpException(t('common.notFound'), status.NOT_FOUND);
  }

  const removedPost = await prisma.post.delete({
    where: {
      id: post.id,
    },
  });
  const postTotalNs = usePostTotalNameSpace();
  await decr(postTotalNs);
  return removedPost;
});
