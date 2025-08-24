<script lang="ts" setup>
import { vInfiniteScroll } from '@vueuse/components';

const {
  data,
  loadMore,
  canLoadMore,
  showLoading,
} = await usePosts();

const postList = useTemplateRef('post-list');
useSaveScrollPosition(postList);
</script>

<template>
  <div ref="post-list" v-infinite-scroll="[loadMore, { canLoadMore, throttle: 200 }]" class="w-full h-dvh pt-24 mx-auto overflow-auto">
    <div class="max-w-4xl w-full mx-auto px-8">
      <ul class="space-y-4 h-full">
        <nuxt-link v-for="post of data" :key="post.id" :href="post.path" class="block">
          <ui-post :post="post" />
        </nuxt-link>
      </ul>
      <div class="w-full h-fit py-4">
        <div v-if="showLoading" class="i-line-md:loading-twotone-loop size-8 mx-auto color-default-800" />
      </div>
    </div>
  </div>
</template>
