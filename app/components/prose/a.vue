<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false,
  },
});
</script>

<template>
  <NuxtLink
    :href="props.href"
    :target="props.target"
    class="
    relative px-2 py-0.5 before:size-full before:absolute before:inset-0 hover:before:bg-primary-500/10 before:rounded
    before:block before:content-[''] before:transition
    "
  >
    <slot />
  </NuxtLink>
</template>
