import z from 'zod';

export default defineProductApi(async (event) => {
  const { page, size } = await useQuery(event, pagination);
  const { id } = await useParam(event, z.object({ id: z.string() }));
  const redis = useRedis();
  const total = Number.parseInt(await redis.get<string>(`COMMENT::${id}::TOTAL`) ?? '0');
  const comments = await prisma.comment.findMany({
    where: {
      postId: id,
      deleteAt: null,
    },
    skip: (page - 1) * size,
    take: size,
    orderBy: [
      { pin: 'desc' },
      { createdAt: 'desc' },
    ],
    include: {
      user: true,
    },
  });
  return { comments, total };
}, { comment: ['read']}, false);
