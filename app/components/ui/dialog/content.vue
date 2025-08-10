<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  DialogClose,
  DialogContent,

  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@/lib/utils';
import DialogOverlay from './overlay.vue';

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <dialog-portal>
    <dialog-overlay />
    <dialog-content
      data-slot="dialog-content"
      v-bind="forwarded"
      :class="
        cn(
          'data-[state=closed]:animate-zoom-out data-[state=open]:animate-zoom-in text-default-800 border-none bg-default-100 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )"
    >
      <slot />

      <dialog-close
        class="w-fit h-fit text-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
      >
        <span class="i-material-symbols:close-rounded size-6 block cursor-pointer" />
        <span class="sr-only">Close</span>
      </dialog-close>
    </dialog-content>
  </dialog-portal>
</template>
