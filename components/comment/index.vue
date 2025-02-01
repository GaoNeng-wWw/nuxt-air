<script lang="ts" setup>
import type { OnCommentItemVisibleParams } from './list.vue';

const {id} = defineProps<{
  id: number
}>();

const prevId = ref<number | null>(null);
const {root,fetch} = useReplies();
const linearTree = ref<LinearNode<ReplyNode>[]>([]);
const onExpand = (id: number) => {
  const target = root.find(id);
  if (!target){
    return;
  }
  if (!target.children.some(child => child.expand)){
    fetch(id, 'reply')
    .then(({meta})=>{
      target.children.forEach((child) => child.expand = true)
      prevId.value = meta.prevId;
      if (meta.prevId) {
        target.setFinish(true);
      }
    })
    return;
  }
  target.dfs((node) => {
    node.expand = false;
  })
}
const getNumberAttr = (ele:Element, key: string) => {
  const val = ele.getAttribute(key);
  if (!val){
    return null;
  }
  return Number(val)
};
const getDepth = (ele: Element) => getNumberAttr(ele, 'data-depth');
const getId = (ele: Element) => getNumberAttr(ele, 'data-current-id');
const onVisible = (param:OnCommentItemVisibleParams) => {
  const {cur,next} = param;
  const curDepth = getDepth(cur)!;
  const curId = getId(cur)!;
  const currentParentNode = root.findAndReturnParent(curId);
  const curNode = root.find(curId);
  if (!currentParentNode || curNode?.finish) {
    return;
  }
  if (!next && !currentParentNode.finish) {
    fetch(id, 'post', prevId.value)
    .then(({meta}) => {
      if (meta.prevId === null){
        currentParentNode.setFinish(true);
        curNode?.setFinish(true);
      }
      prevId.value = meta.prevId;
      return;
    })
  }
  if (cur && next) {
    const nextDepth = getDepth(next);
    if (nextDepth !== curDepth) {
      const parent = root.findAndReturnParent(curId);
      if (!parent || parent.id === -1){
        return;
      }
      if (curNode?.finish){
        return;
      }
      fetch(parent.id, 'reply', curId)
      .then(({meta}) => {
        if (meta.prevId === null){
          curNode?.setFinish(true);
        }
        prevId.value = meta.prevId
      })
    } else {
      const cur = root.find(curId);
      if (!cur){
        prevId.value = null;
        return;
      }
      prevId.value = cur.prevId;
    }
  }
}

root.on('modify', () => {
  linearTree.value = root.toLinear();
})

onMounted(()=>{
  fetch(
    id,
    'post',
  )
  .then(({meta}) => prevId.value = meta.prevId)
})

</script>
<template>
  <div class="w-full space-y-2">
    <comment-editor :id="id" type="post" />
    <comment-list :datas="linearTree" @expand="onExpand" @visible="onVisible" />
  </div>
</template>