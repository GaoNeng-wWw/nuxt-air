<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'radix-vue';
import { PopoverRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<PopoverRootProps>();
const emits = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <popover-root v-bind="forwarded">
    <slot />
  </popover-root>
</template>
