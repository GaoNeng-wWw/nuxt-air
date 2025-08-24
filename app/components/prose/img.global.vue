<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports';

import { joinURL, withLeadingSlash, withTrailingSlash } from 'ufo';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL));
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src);
    }
  }
  return props.src;
});
</script>

<template>
  <client-only>
    <div class="w-fit mx-auto text-center space-y-2 max-size-200px">
      <div class="w-fit h-fit relative max-size-200px">
        <img
          :src="refinedSrc"
          :alt="props.alt"
          :width="props.width"
          :height="props.height"
          class="rounded-lg "
        >
        <div class="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 hidden dark:block" />
      </div>
      <span v-if="props.title" class="text-default-500">{{ props.title }}</span>
    </div>
  </client-only>
</template>
