<script lang="ts" setup>
import { useInfiniteScroll } from '@vueuse/core';

const { posts, desc, canLoadMore, loadMore } = usePosts({
  immediate: true,
  publish: () => true,
});
const el = useTemplateRef('list-wrapper');
useInfiniteScroll(el, () => {
  loadMore();
}, { throttle: 200, canLoadMore });
useScrollPosition(el);
definePageMeta({
  keepalive: false,
});
</script>

<template>
  <div ref="list-wrapper" class="w-full h-full max-h-dvh space-y-2 flex flex-col overflow-auto">
    <div class="max-w-md mx-auto  w-full flex gap-2 h-fit">
      <nuxt-link to="/post/editor">
        <ui-button variant="ghost" class="gap-2">
          <div class="i-material-symbols:contract-edit size-6" /><span>Write</span>
        </ui-button>
      </nuxt-link>
      <ui-dialog>
        <ui-dialog-trigger>
          <ui-button class="flex gap-2">
            <i class="i-material-symbols:inbox-rounded size-6" />
            <span>draft</span>
          </ui-button>
        </ui-dialog-trigger>
        <ui-dialog-content>
          <ui-dialog-title>
            draft Box
          </ui-dialog-title>
          <ui-dialog-description>
            You can select draft post.
          </ui-dialog-description>
          <div class="w-full h-full max-h-400px overflow-auto">
            <app-post-list :publish="false" class="overflow-auto" />
          </div>
        </ui-dialog-content>
      </ui-dialog>
    </div>
    <div class="max-w-md mx-auto w-full h-auto grow-1">
      <ul class="space-y-4">
        <app-post-item v-for="post of posts" :key="post.id" v-bind="post" :desc="desc[post.id]">
          <template #desc>
            <span class="text-default-600 text-sm line-clamp-3 mt-2">{{ desc[post.id] }}</span>
          </template>
          <template #meta="{ createAt, formatDate, tags }">
            <div class="w-full flex gap-4">
              <p v-if="createAt" class="text-default-600 text-sm">
                {{ formatDate(createAt) }}
              </p>
              <div class="w-fit flex flex-wrap gap-2">
                <div v-for="tag of tags" :key="tag.name" class="text-sm flex items-center">
                  <div class="i-majesticons:hashtag-line size-4 color-default-600" />
                  <span class="color-default-600">{{ tag.name }}</span>
                </div>
              </div>
            </div>
          </template>
        </app-post-item>
      </ul>
    </div>
  </div>
</template>
