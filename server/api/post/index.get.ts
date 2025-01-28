import { z } from 'zod';
import prisma from '~/lib/prisma';

export const GetPostList = z.object({
  content: z.boolean().default(false),
  category: z.number({coerce: true}).optional()
})

export default defineEventHandler(async (event) => {
  const { page = 1, size = 20, content,category } = await useQuery(event, PageQuery.merge(GetPostList));
  const posts = await prisma.post.findMany({
    take: size,
    skip: (page - 1) * size,
    select:{
      content,
      id: true,
      title: true,
      createAt: true,
      updateAt: true,
      pin: true,
      categories: true
    },
    orderBy: [
      {
        pin: 'desc'
      },
      {
        id: 'desc'
      }
    ],
    where:{
      categories:{
        some:{
          id: category
        }
      }
    }
  });
  const totalPage = await getPostTotal() ?? 0;
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
