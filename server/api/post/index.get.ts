import { z } from 'zod';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { page = 1, size = 20, content } = await useQuery(event, PageQuery.merge(z.object({content: z.boolean().default(false)})));
  const posts = await prisma.post.findMany({
    take: size,
    skip: page - 1,
    select:{
      content,
      id: true,
      title: true,
      createAt: true,
      updateAt: true,
      pin: true,
      categories: true
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
