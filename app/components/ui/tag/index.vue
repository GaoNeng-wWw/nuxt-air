<script lang="ts" setup>
import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <span :class="cn('px-2 py-px text-sm rounded-full', props.class)">
    <slot />
  </span>
</template>
