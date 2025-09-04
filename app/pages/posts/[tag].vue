<script lang="ts" setup>
import { vInfiniteScroll } from '@vueuse/components';

const route = useRoute();
const tag = computed(() => route.params.tag as string ?? '');
</script>

<template>
  <div class="max-w-4xl w-full mx-auto pt-4">
    <ui-post-list :tag="tag" class="pt-8" />
  </div>
</template>
