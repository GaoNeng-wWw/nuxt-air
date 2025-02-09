export {};

declare global {
  interface ReplyAuthor {
    id: number;
    name: string;
    avatar: string | null;
  }
  interface RawReplyNode {
    id: number;
    content: string;
    author: ReplyAuthor;
    parentId: number | null;
    createAt: string;
    childrenCount: number;
  }
  interface IReplyNode {
    id: number;
    content: string;
    author: ReplyAuthor;
    expand: boolean;
    children: IReplyNode[];
    childrenTotal: number;
    createAt: string;
  }
  type LinearReplyNode = Exclude<IReplyNode, 'children'> & { depth: number };

  // RawReplyNode -> ReplyNode(store state) -transform-> LinearReplyNode (used to render)
}
