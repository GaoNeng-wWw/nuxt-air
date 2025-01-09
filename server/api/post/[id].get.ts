import status from 'http-status';
import { z } from 'zod';
import prisma from '~/lib/prisma';

export const GetPostParam = z.object({
  id: z.number({ coerce: true }),
});
export default defineApi(async (event) => {
  const { id } = await useParam(event, GetPostParam);
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
  });
  if (!post) {
    const t = await useTranslation(event);
    throw new HttpException(t('common.notFound'), status.NOT_FOUND);
  }
  return post;
});
