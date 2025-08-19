<script lang="ts" setup>
import { useInfiniteScroll } from '@vueuse/core';
import usePosts from '~/composables/use-posts';

const {
  publish = false,
  showCreateAt = false,
  showUpdateAt = false,
} = defineProps<{
  publish?: boolean;
  showCreateAt?: boolean;
  showUpdateAt?: boolean;
}>();
const { posts, desc, canLoadMore, loadMore } = usePosts({
  immediate: true,
  publish: computed(() => publish),
});
const el = useTemplateRef('list');
useInfiniteScroll(el, () => {
  loadMore();
}, { throttle: 200, canLoadMore });
function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
</script>

<template>
  <div ref="list" class="w-full h-full min-h-200px overflow-auto">
    <ul v-if="posts" class="space-y-4">
      <nuxt-link v-for="post in posts" :key="post.id" :to="`/post/editor?id=${post.id}`" class="p-2 rounded-md cursor-pointer transition border border-transparent hover:border-default-300 hover:bg-default-200 block">
        <li>
          <p class="text-lg text-default-900">
            {{ post.title ? post.title : 'Untitled Post' }}
          </p>
          <slot name="tag" :tags="post.tag" />
          <slot name="desc" :desc="desc[post.id]" />
          <p v-if="showCreateAt" class="text-sm text-default-600 font-800">
            创建于: {{ formatDate(post.createAt) }}
          </p>
          <p v-if="post.updateAt && showUpdateAt" class="text-sm text-default-600 font-800">
            最后一次修改 {{ formatDate(post.updateAt) }}
          </p>
        </li>
      </nuxt-link>
    </ul>
  </div>
</template>
