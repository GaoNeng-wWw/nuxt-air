<script lang="ts" setup>
import { vElementVisibility } from '@vueuse/components';
import { motion } from 'motion-v';

const props = defineProps<{
  tag?: string;
}>();

const {
  data,
  loadMore,
  canLoadMore,
  showLoading,
} = await usePosts(
  {
    tag: computed(() => props.tag ?? ''),
  },
);

const postList = useTemplateRef('post-list');
useSaveScrollPosition(postList);
function onLoadMore() {
  if (!canLoadMore()) {
    return;
  }
  loadMore();
}
</script>

<template>
  <div ref="post-list" class="w-full h-full mx-auto pt-4">
    <div class="w-full mx-auto px-6">
      <ul class="space-y-4 h-full">
        <motion.div
          v-for="post, idx of data" :key="post.id"
          :initial="{ opacity: 0, translateY: 20 }"
          :animate="{ opacity: 1, translateY: 0 }"
          :transition="{
            duration: 0.4,
            ease: ['easeOut', 'easeOut'],
            delay: (idx % 10) / 10,
            type: 'tween',
          }"
        >
          <nuxt-link :href="post.path" class="block">
            <ui-post-item :post="post" />
          </nuxt-link>
        </motion.div>
      </ul>
      <div v-element-visibility="onLoadMore" class="w-full h-fit py-4">
        <div v-if="showLoading" class="i-line-md:loading-twotone-loop size-8 mx-auto color-default-800" />
      </div>
    </div>
  </div>
</template>
