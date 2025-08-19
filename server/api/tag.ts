export default defineEventHandler(async (event) => {
  const { page, size } = await useQuery(event, pagination);
  const counts = await prisma.tag.count();
  return prisma.tag.findMany({
    skip: (page - 1) * size,
    take: size,
  })
    .then((resp) => {
      return {
        tags: resp,
        total: counts,
      };
    });
});
