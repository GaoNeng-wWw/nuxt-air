<script lang="ts" setup>
import { cn } from '@/lib/utils';
const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('cursor-pointer w-10 h-10 border-border border rounded-full flex items-center justify-center', props.class)">
    <slot />
  </div>
</template>