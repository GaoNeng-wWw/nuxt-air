import { z } from 'zod';
import prisma from '~/lib/prisma';

const ReplyQuery = z.object({
  parentId: z.number({ coerce: true }).int().gt(0),
  prevId: z.number({ coerce: true }).optional(),
  size: z.number().default(20),
  type: z.enum(['post', 'reply']),
});

export default defineApi(async (event) => {
  const { parentId, prevId, size, type } = await useQuery(event, ReplyQuery);
  const key = type === 'post' ? usePostReplyNamespace(parentId) : useReplyRepliesNamespace(parentId);
  const redis = useRedis();
  const total = await redis.getItem<number>(key);
  const replies = await prisma.reply.findMany({
    where: {
      parentId: type === 'reply' ? parentId : undefined,
      postId: type === 'post' ? parentId : undefined,
      id: prevId
        ? {
            lt: prevId,
          }
        : undefined,
    },
    take: size,
    skip: 0,
    include: {
      author: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  const ret = [];
  for (const reply of replies) {
    const replyKey = useReplyRepliesNamespace(reply.id);
    ret.push(
      toRawReplyNode(reply, await redis.getItem<number>(replyKey) ?? 0),
    );
  }
  const retPrevId = ret.at(-1)?.id ?? null;
  return {
    replies: ret,
    meta: {
      prevId: ret.length > 1 ? retPrevId : null,
      total,
    },
  };
});
