<script setup lang="ts">
import { UiDialog, UiDialogContent, UiDialogTrigger } from '#components';
import { computed, useDialog, useRuntimeConfig } from '#imports';

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
  <ui-dialog transform-origin>
    <ui-dialog-trigger as="div" class="w-full flex items-center justify-center text-center">
      <div class="w-fit h-fit relative my-4">
        <img
          :src="refinedSrc"
          :alt="props.alt"
          class="rounded-lg w-full"
        >
        <div class="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 hidden dark:block pointer-events-none" />
        <div v-if="props.title" class="w-fit mx-auto mt-2">
          <span class="text-default-600">{{ props.title }}</span>
        </div>
      </div>
    </ui-dialog-trigger>
    <ui-dialog-content pure>
      <img
        :src="refinedSrc"
        :alt="props.alt"
        :width="props.width"
        :height="props.height"
        class="rounded-lg max-w-full w-50vw"
      >
    </ui-dialog-content>
  </ui-dialog>
</template>
