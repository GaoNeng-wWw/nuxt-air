<script lang="ts" setup>
import type { PostCollectionItem } from '@nuxt/content';
import { formatDate } from '@vueuse/core';

const { post } = defineProps<{
  post: PostCollectionItem;
}>();
const { tagMap } = useTags();
const { locale } = useI18n();
</script>

<template>
  <li class="text-default-900 p-2 rounded hover:bg-default-200">
    <h1 class="text-xl">
      {{ post.title }}
    </h1>
    <div v-if="post.tags && post.tags.length" class="w-full flex flex-wrap gap-2 my-2">
      <nuxt-link v-for="tag of post.tags" :key="tag" :to="`/posts/${tag}`">
        <ui-tag :key="tag" class="px-0 text-white text-sm flex items-center space-x-1">
          <div class="i-lucide:hash size-3.5" />
          <span>{{ tagMap.get(tag)?.[locale] }}</span>
        </ui-tag>
      </nuxt-link>
    </div>
    <p v-if="post.description" class="my-2 line-clamp-2 text-default-700">
      {{ post.description }}
    </p>
    <span v-if="post.date" class="text-sm text-default-600">{{ formatDate(new Date(post.date), 'YYYY/MM/DD') }}</span>
  </li>
</template>