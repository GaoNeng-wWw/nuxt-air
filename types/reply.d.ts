export default {}

declare global {
  interface ReplyNode {
    id: number;
    content: string;
    author:{
      id: number;
      name: string;
      avatar: string | null;
    };
    createAt: Date;
    children: ReplyNode[];
  }
}