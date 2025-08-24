<script lang="ts" setup>
import { vInfiniteScroll } from '@vueuse/components';

const route = useRoute();
const tag = computed(() => route.params.tag as string ?? '');
const {
  data,
  loadMore,
  canLoadMore,
} = await usePosts({ tag });

const postList = useTemplateRef('post-list');
useSaveScrollPosition(postList);
</script>

<template>
  <div ref="post-list" v-infinite-scroll="[loadMore, { canLoadMore, throttle: 200 }]" class="w-full h-dvh pt-24 mx-auto overflow-auto">
    <div class="max-w-4xl w-full mx-auto px-8">
      <ul class="space-y-4 h-full">
        <nuxt-link v-for="post of data" :key="post.id" :href="post.path" class="block">
          <li class=" text-default-900">
            {{ post.title }}
          </li>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>
