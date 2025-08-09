export function findPostById(id: number) {
  return prisma.post.findFirst({
    where: { id },
  });
}
