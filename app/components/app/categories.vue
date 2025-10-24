<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core';
import { motion } from 'motion-v';

const {
  tags,
} = useTags();
const {
  locale,
} = useI18n();
const items = useTemplateRef('items');
const wrapper = useTemplateRef('wrapper');
const width: Ref<'auto' | number> = ref('auto');

function calcWidth() {
  let _width = -1;
  if (!items.value?.length || wrapper.value) {
    return;
  }
  for (const item of items.value) {
    _width = Math.max(_width, (item?.$el as HTMLLIElement).offsetWidth);
  }
  width.value = _width === -1 ? 'auto' : _width;
}

onMounted(() => {
  if (!document.body) {
    return;
  }
  useResizeObserver(document.body, calcWidth);
});
</script>

<template>
  <div ref="wrapper" class="w-full">
    <ui-scroll class="w-full text-default-800">
      <nuxt-link
        to="/"
        class="shrink-0 px-2 hover:text-primary-600 transition"
        active-class="dark:text-primary-600 text-primary-600"
      >
        首页
      </nuxt-link>
      <nuxt-link
        v-for="tag of tags"
        ref="items"
        :key="tag.id"
        class="shrink-0 px-2 hover:text-primary-600 transition"
        active-class="dark:text-primary-600 text-primary-600"
        :style="{ width: `${width}px` }"
        :to="`/posts/${tag.id}`"
      >
        {{ tag[locale] }}
      </nuxt-link>
    </ui-scroll>
  </div>
</template>
