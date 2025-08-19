export function findTagsById(id: number[]) {
  return prisma.tag.findMany({
    where: {
      id: {
        in: id,
      },
    },
  });
}
