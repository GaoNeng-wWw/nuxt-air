import { useRoute } from 'vue-router';
import { z } from 'zod';
import prisma from '~/lib/prisma';

export const GetPostList = z.object({
  content: z.boolean().default(false),
  category: z.number({ coerce: true }).optional(),
  publish: BooleanStringZod,
});

export default defineEventHandler(async (event) => {
  const { page = 1, size = 20, content, category, publish } = await useQuery(event, PageQuery.merge(GetPostList));
  const { user } = await getUserSession(event);
  // debug
  console.log(user, publish);
  const isPublish = user?.owner ? publish : true;
  const posts = await prisma.post.findMany({
    take: size,
    skip: (page - 1) * size,
    select: {
      content,
      id: true,
      title: true,
      createAt: true,
      updateAt: true,
      pin: true,
      categories: true,
      publish: true,
    },
    orderBy: [
      {
        pin: 'desc',
      },
      {
        id: 'desc',
      },
    ],
    where: {
      categories: isPublish
        ? {
            some: {
              id: category,
            },
          }
        : undefined,
      publish: isPublish,
    },
  });
  const totalPage = isPublish ? await getPostTotal() ?? 0 : await getDraftTotal() ?? 0;
  const meta = usePaginationMeta({
    currentPage: page,
    pageSize: size,
    total: totalPage,
  });
  return {
    data: posts,
    meta,
  };
});
