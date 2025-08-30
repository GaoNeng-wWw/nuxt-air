<script setup lang="ts">
import type { DialogOverlayProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogOverlay } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

</script>

<template>
  <dialog-overlay
    data-slot="dialog-overlay"
    v-bind="delegatedProps"
    :class="cn('fixed inset-0 z-50 bg-black/80', props.class)"
  >
    <slot />
  </dialog-overlay>
</template>
