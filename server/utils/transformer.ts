import type { Reply, User } from "@prisma/client";

export const toReplyNode = (reply: Reply & {author:User}):ReplyNode => {
  return {
    id: reply.id,
    content: reply.content,
    author:{
      id: reply.authorId,
      avatar: reply.author.avatar,
      name: reply.author.name
    },
    children: [],
    createAt: reply.createAt,
  }
}