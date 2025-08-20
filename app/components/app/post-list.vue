<script lang="ts" setup>
import { useInfiniteScroll } from '@vueuse/core';
import usePosts from '~/composables/use-posts';
import { cn } from '~/lib/utils';

const {
  publish = false,
  ...rest
} = defineProps<{
  publish?: boolean;
  class?: string;
}>();
const { posts, desc, canLoadMore, loadMore } = usePosts({
  immediate: true,
  publish: computed(() => publish),
});
const el = useTemplateRef('list');
useInfiniteScroll(el, () => {
  loadMore();
}, { throttle: 200, canLoadMore });
</script>

<template>
  <div
    ref="list"
    :class="cn(
      'w-full h-full min-h-200px group',
      rest.class,
    )"
  >
    <ul v-if="posts" class="space-y-4">
      <app-post-item v-for="post of posts" :key="post.id" v-bind="post" :desc="desc[post.id]" />
    </ul>
  </div>
</template>
