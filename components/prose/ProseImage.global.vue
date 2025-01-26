<template>
  <nuxt-img
    :src="refinedSrc"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :loading="'lazy'"
  >
    <template #placeholder>
      <ui-skeleton class="w-full h-64" />
    </template>
  </nuxt-img>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components';
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})

</script>