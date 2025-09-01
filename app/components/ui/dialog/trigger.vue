<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui';
import { DialogTrigger } from 'reka-ui';
import { useDialogContext } from '~/composables/use-dialog';

const props = defineProps<DialogTriggerProps>();

const { onTriggerClick } = useDialogContext();
</script>

<template>
  <dialog-trigger
    data-slot="dialog-trigger"
    v-bind="props"
    @click="onTriggerClick"
  >
    <slot />
  </dialog-trigger>
</template>
