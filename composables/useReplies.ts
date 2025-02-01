export type Event = {
  'add:before': (rawNode: RawReplyNode)=>void,
  'add:after': (parent: number, node: ReplyNode) => void,
  'modify': ()=>void;
}
export class ReplyNode implements IReplyNode {
  public bus: Map<keyof Event, Event[keyof Event][]>;
  constructor(
    public id: number = -1,
    public content: string = '',
    public author:ReplyAuthor = {id: -1, name: '', avatar: null} ,
    public expand: boolean=false,
    public children: ReplyNode[]=[],
    public childrenTotal: number=0,
    public createAt: string = new Date().toLocaleDateString(),
    public finish:boolean=false,
    public parent: ReplyNode | null = null,
    public prevId: number | null = null
  ){
    this.bus = new Map();
    this.bus.set('add:after', []);
    this.bus.set('add:before', []);
    this.bus.set('modify', []);
  }
  dfs(
    cb: (node: ReplyNode)=>void
  ){
    const queue = [...this.children];
    while (queue.length){
      const node = queue.shift()!;
      cb(node);
      queue.unshift(...node.children)
    }
  }
  bfs(
    cb: (node: ReplyNode)=>void
  ){
    const queue = [...this.children];
    while (queue.length){
      const node = queue.shift()!;
      cb(node);
      queue.push(...node.children)
    }
  }
  find(id:number): ReplyNode | null{
    if (this.id === id){
      return this;
    }
    for (const child of this.children) {
      const node = child.find(id);
      if(node){
        return node;
      }
    }
    return null;
  }
  findAndReturnParent(id: number): ReplyNode | null {
    if (
      this.children.some((child) => child.id === id)
    ) {
      return this;
    }
    for (const child of this.children){
      const node = child.findAndReturnParent(id);
      if (node){
        return node;
      }
    }
    return null;
  }
  setFinish(finished: boolean){
    this.finish = finished;
  }
  add(parentId: number | null, rawNode:RawReplyNode){
    const _replyNode = toReplyNode(rawNode);
    const replyNode = new ReplyNode(
      _replyNode.id,
      _replyNode.content,
      _replyNode.author,
      false,
      [],
      rawNode.childrenCount,
      rawNode.createAt,
      false,
      this
    );
    this.trigger('add:before',rawNode)
    if (parentId === null){
      this.children.push(
        replyNode
      )
      return replyNode;
    }
    const target = this.find(parentId);
    if(!target){
      throw new Error(`${parentId} not found`);
    }
    if (target.children.some(child => child.id === replyNode.id)){
      return replyNode;
    }
    target.children.push(
      replyNode
    )
    this.trigger('add:after', parentId, replyNode);
    return replyNode;
  }
  toLinear(){
    const {expand} = useExpand()
    return expand(this).filter((node) => {
      return node.id !== -1;
    });
  }
  on<K extends keyof Event>(event: K,callback:Event[K]) {
    this.bus.get(event)?.push(callback);
  }
  trigger<K extends keyof Event>(
    event: K,
    ...params: Parameters<Event[K]>
  ){
    const cbs = this.bus.get(event);
    if (!cbs){
      return;
    }
    cbs.forEach(
      (cb) => {
        (cb as (...args: unknown[])=>void).call(
          this,
          params
        )
      }
    )
  }
}


export const useReplies = () => {
  const root = reactive(new ReplyNode());
  const fetch = (
    parentId: MaybeRef<number>,
    type: MaybeRef<'post'|'reply'>,
    prevId?: MaybeRef<number|null>,
    size?: MaybeRef<number>,
  ) => {
    const handle = $fetch(
      `/api/reply`,
      {
        method: 'GET',
        query: {
          parentId:unref(parentId),
          type:unref(type),
          prevId:unref(prevId),
          size:unref(size),
        }
      }
    );
    handle.then((payload) => {
      if (unref(type) === 'post'){
        payload.replies.forEach((reply) => {
          root.add(null,reply);
        })
        root.children
        .forEach((child) => {
          child.expand = true
          child.prevId = payload.meta.prevId
        })
        return;
      }
      const parent = root.find(unref(parentId));
      if (!parent) {
        throw new Error(`${parentId} not found`);
      }
      payload.replies.forEach((reply) => {
        const node = parent.add(unref(parentId), reply);
        node.prevId = payload.meta.prevId;
        node.expand = reply.childrenCount ? false : true
      });
      return payload;
    })
    return handle;
  }
  const add = (
    parentId: MaybeRef<number>,
    content: MaybeRef<string>,
    type: MaybeRef<'post' | 'content'>
  ) => {
    return $fetch(
      '/api/reply',
      {
        query: reactive({parentId,type}),
        body: reactive({content})
      }
    )
  }
  watch(root, ()=>{
    root.trigger('modify');
  }, {deep: true})
  return {root, fetch, add};
}