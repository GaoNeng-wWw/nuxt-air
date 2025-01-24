<script lang="ts" setup>
import { cn } from '@/lib/utils';
const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('cursor-pointer w-10 h-10 bg-gradient-to-tl from-default-950 to-default-700 border-border border rounded-full flex items-center justify-center', props.class)">
    <slot />
  </div>
</template>