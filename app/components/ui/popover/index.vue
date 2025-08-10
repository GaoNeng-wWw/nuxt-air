<script lang="ts" setup>
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui';
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<PopoverRootProps>();
const emits = defineEmits<PopoverRootEmits>();
const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <popover-root v-bind="forward">
    <slot />
  </popover-root>
</template>
