<script lang="ts" setup>
import { MarkdownRender } from '@/components/ui/markdown-render';
import { ChevronLeft } from 'lucide-vue-next';

const route = useRoute();
const id = ref<string>(route.params.id.toString() ?? '');

const { data } = await useAsyncData(`post-${id.value}`, () => $fetch(`/api/post/${id.value}`));
const ID_LIMIT = 20;
function onBeforeEnter(el: Element) {
  const article = Array.from(el.children).filter(node => node.tagName.toLowerCase() === 'article')[0];
  if (!article) {
    return;
  }
  const children = Array.from(article.children);
  for (let i = 0; i < Math.min(ID_LIMIT, children.length); i++) {
    const child = children[i] as HTMLElement;
    child.style.setProperty('--index', i.toString());
    child.classList.add('slide-animation');
  }
}

const title = ref();
useHead({
  title,
});

watch(data, () => {
  if (!data.value) {
    return;
  }
  title.value = data.value.post.title;
}, { immediate: true });
</script>

<template>
  <transition appear @before-enter="onBeforeEnter">
    <div class="mx-auto mt-4 h-auto w-full max-w-xl px-2 py-4 sm:px-0">
      <MarkdownRender
        :value="data?.post.content ?? ''"
        tag="article"
      />
      <nuxt-link to="/">
        <ChevronLeft class="mt-4 size-6 cursor-pointer underline" />
      </nuxt-link>
      <comment :id="Number.parseInt(id)" class="mt-4" />
    </div>
  </transition>
</template>
