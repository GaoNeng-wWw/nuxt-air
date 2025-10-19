<script lang="ts" setup>
import { vElementVisibility } from '@vueuse/components';

const {
  data,
  onLoadMore,
  showLoading,
  hiddenLoadMore
} = usePosts({});
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <nuxt-link
        v-for="item of data" :key="item.id"
        class="px-2 py-3 text-default-500 text-sm cursor-pointer hover:text-primary-600 transition font-bold"
        active-class="text-primary-600"
        :to="item.path"
        :aria-label="item.title"
      >
        {{ item.title }}
      </nuxt-link>
    </div>
    <div v-if="!hiddenLoadMore" v-element-visibility="onLoadMore" class="w-full h-fit py-4">
      <div v-if="showLoading" class="i-line-md:loading-twotone-loop size-8 mx-auto color-default-800" />
    </div>
  </div>
</template>
