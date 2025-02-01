import type { Reply, User } from "@prisma/client";
export const toRawReplyNode = (
  r:Reply & {author: User},
  childrenCount: number=0
):RawReplyNode => {
  return {
    id: r.id,
    author: {
      id: r.authorId,
      avatar: r.author.avatar,
      name: r.author.name,
    },
    parentId: r.parentId,
    createAt: r.createAt.toString(),
    content: r.content,
    childrenCount
  }
}
export const toReplyNode = (
  rawNode: RawReplyNode
):IReplyNode => {
  return {
    id: rawNode.id,
    content: rawNode.content,
    author: rawNode.author,
    children: [],
    expand: false,
    childrenTotal: rawNode.childrenCount,
    createAt: rawNode.createAt
  }
}