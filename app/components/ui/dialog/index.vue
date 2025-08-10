<script lang="ts" setup>
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { DialogRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forward = useForwardPropsEmits(props, emits);
</script>

<template>
  <dialog-root v-bind="forward" data-slot="dialog">
    <lazy-client-only>
      <slot />
    </lazy-client-only>
  </dialog-root>
</template>
