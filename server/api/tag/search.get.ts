import { defineEventHandler, prisma, searchTag, useQuery } from '#imports';

export default defineEventHandler(async (event) => {
  const { name, page, size } = await useQuery(event, searchTag);
  const total = prisma.tag.count({ where: { name: { contains: name } } });
  const data = await prisma.tag.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    take: size,
    skip: (page - 1) * size,
  });
  return {
    data,
    total: await total,
  };
});
