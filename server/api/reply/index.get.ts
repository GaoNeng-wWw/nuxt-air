import { z } from "zod";
import prisma from "~/lib/prisma";

export const GetReplies = z.object({
  parentId: z.number({coerce: true}),
  type: z.enum(['post', 'reply'])
}).merge(
  PageQuery
)

export default defineApi(async (event) => {
  const {parentId, type, page=1, size=20} = await useQuery(event, GetReplies);
  const skip = (page - 1) * size;
  const take = size;
  const redis = useRedis();
  const key = type === 'post' ? usePostReplyNamespace(parentId) : useReplyRepliesNamespace(parentId);
  const total = await redis.getItem<number>(key) ?? 0;
  const meta = usePaginationMeta({
    currentPage: page,
    pageSize: size,
    total
  })
  if (type === 'post') {
    const replies = (await prisma.reply.findMany({
      take,
      skip,
      where:{
        postId: parentId
      },
      orderBy: {
        createAt: 'desc'
      },
      include: {
        author: true
      }
    }))
    .map((child) => toReplyNode(child))
    const children = await Promise.all(
      replies.map(async (reply) => {
        const replies = await prisma.reply.findMany({
          where: {
            id: reply.id
          },
          take,
          skip,
          orderBy: {
            createAt: 'desc'
          },
          include: {
            author: true
          }
        });
        return replies.map((rawReply) => toReplyNode(rawReply));
      })
    );
    children.forEach((nodes,idx) => {
      replies[idx].children = nodes;
    })
    return {
      data: replies,
      meta
    }
  }
  const rawReplies = await prisma.reply.findMany({
    where:{
      parentId,
    },
    skip,
    take,
    include: {
      author: true
    }
  });
  const replies = rawReplies.map((rawReply) => toReplyNode(rawReply));
  const childrenHandles = Promise.all(
    replies.map(async (node) => {
      const rawChildrenReplies = await prisma.reply.findMany({
        where: {
          parentId: node.id
        },
        take,
        skip,
        include: {
          author: true
        }
      });
      return rawChildrenReplies.map(toReplyNode);
    })
  );
  const nestChildrenNodes = (await childrenHandles);
  nestChildrenNodes.forEach((children,idx) => replies[idx].children = children);
  return {data: replies,meta};
})