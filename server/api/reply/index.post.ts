import status from "http-status";
import { z } from "zod";
import prisma from "~/lib/prisma";

export const CreateReply = z.object({
  content: z.string().min(1)
})

export const CreateReplyQuery = z.object({
  parentId: z.number({coerce: true}),
  type: z.enum(['post', 'reply'])
})

export default defineApi(async (event) => {
  const {parentId, type} = await useQuery(event, CreateReplyQuery);
  const {content} = await useBody(event, CreateReply);
  const {user} = await getUserSession(event);
  const key = type === 'post' ? usePostReplyNamespace(parentId) : useReplyRepliesNamespace(parentId);
  const dbUser = await prisma.user.findFirst({
    where:{
      oauth: {
        openid: user!.id
      }
    },
    select:{
      id: true
    }
  });
  const t = await useTranslation(event);
  if(!dbUser){
    throw new HttpException(t('common.userNotFound'), status.UNAUTHORIZED);
  }
  const rawReply = await prisma.reply.create({
    data:{
      postId: type === 'post' ? parentId : null,
      parentId: type === 'reply' ? parentId : null,
      content,
      authorId: dbUser.id
    },
    include: {
      author: true
    }
  })
  await incr(key)
  return toRawReplyNode(rawReply,0);
})