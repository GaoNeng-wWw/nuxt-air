import status from "http-status";
import { z } from "zod"
import prisma from "~/lib/prisma";

export const CreateReply = z.object({
  parentId: z.number({coerce: true}),
  type: z.enum(['post', 'reply']),
  content: z.string().min(1)
})
export default defineApi(async (event)=>{
  const {parentId, type, content} = await useQuery(event, CreateReply);
  const {user} = await getUserSession(event);
  const dbUser = await prisma.user.findFirst({
    where:{
      oauth:{
        openid: user?.id
      }
    }
  })
  const t = await useTranslation(event);
  let reply:ReplyNode|null=null;
  if (!dbUser){
    await clearUserSession(event);
    throw new HttpException(t('common.userNotFound'), status.NOT_FOUND);
  }
  if (type === 'post'){
    const post = await prisma.post.findFirst({
      where:{
        id:parentId
      },
      select:{
        id: true
      }
    })
    if(!post){
      throw new HttpException(t('common.notFound'), status.NOT_FOUND);
    }
    reply = toReplyNode(
      await prisma.reply.create({
        data:{
          content,
          postId: post.id,
          authorId: dbUser.id
        },
        include: {
          author: true
        }
      })
    )
  }
  if (type === 'reply') {
    const parentReply = await prisma.reply.findFirst({
      where:{
        id: parentId
      },
      select:{
        id: true
      }
    });
    if (!parentReply){
      throw new HttpException(t('common.notFound'), status.NOT_FOUND);
    }
    reply = toReplyNode(
      await prisma.reply.create({
        data:{
          content,
          parentId: parentReply.id,
          authorId: dbUser.id
        },
        include: {
          author: true
        }
      })
    )
  }
  if (!reply){
    throw new HttpException(t('common.unknownError'), status.INTERNAL_SERVER_ERROR);
  }
  const key = type === 'post' ? usePostReplyNamespace(parentId) : useReplyRepliesNamespace(parentId);
  await incr(key)
  return reply;
})