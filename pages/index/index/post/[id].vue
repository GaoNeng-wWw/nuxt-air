<script lang="ts" setup>
import {MarkdownRender} from '@/components/ui/markdown-render';
import { ChevronLeft } from 'lucide-vue-next';
const route = useRoute();
const router = useRouter();
const id = ref<string>(route.params.id.toString() ?? '');

const {data} = await useAsyncData(`post-${id.value}`, ()=>$fetch(`/api/post/${id.value}`));
const ID_LIMIT = 20;
const onBeforeEnter = (el:Element) => {
  const article = Array.from(el.children).filter(node=>node.tagName.toLowerCase() === 'article')[0]
  if(!article){
    return;
  }
  const children = Array.from(article.children);
  for (let i=0;i<Math.min(ID_LIMIT,children.length);i++){
    const child = children[i] as HTMLElement;
    child.style.setProperty('--index', i.toString());
    child.classList.add('slide-animation');
  }
}
</script>

<template>
  <transition appear @before-enter="onBeforeEnter">
    <div class="max-w-xl w-full h-auto px-2 sm:px-0 py-4 mx-auto mt-4">
      <markdown-render
        :value="data?.post.content ?? ''"
        :tag="'article'"
      />
      <chevron-left class="w-6 h-6 cursor-pointer underline mt-4" @click="router.back()" />
    </div>
</transition>
</template>

