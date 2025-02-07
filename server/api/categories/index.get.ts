import prisma from '~/lib/prisma';
import { getCategoriesTotal } from '~/server/utils/redis';

export default defineApi(async (event) => {
  const { page = 1, size = 20 } = await useQuery(event, PageQuery);
  const categories = await prisma.category.findMany({
    take: size,
    skip: (page - 1) * size,
    select: {
      id: true,
      name: true,
    },
  });
  const total = await getCategoriesTotal() ?? 0;
  const meta = usePaginationMeta({
    total,
    currentPage: page,
    pageSize: size,
  });
  return { categories, meta };
});
