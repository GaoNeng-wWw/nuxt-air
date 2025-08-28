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
import { useDialogContext } from '~/composables/use-dialog';
import DialogOverlay from './overlay.vue';

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const { show, transformOrigin, onHiddenFinish } = useDialogContext();
function onLeave(_: Element) {
  onHiddenFinish();
}
</script>

<template>
  <dialog-portal>
    <transition enter-active-class="transition duration-200 ease-in-out" leave-active-class="transition duration-200 ease-in-out" enter-to-class="opacity-100" leave-to-class="opacity-0">
      <dialog-overlay v-if="show" />
    </transition>
    <transition name="zoom" appear @before-leave="onLeave">
      <dialog-content
        data-slot="dialog-content"
        v-bind="forwarded"
        :style="{ '--x': transformOrigin.x, '--y': transformOrigin.y }"
        :class="
          cn(
            `
              text-default-800 border-none bg-default-100
              absolute left-[50%] top-[50%]
              z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]
              gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg
            `,
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
    </transition>
  </dialog-portal>
</template>

<style scoped>
.zoom-enter-active,
.zoom-leave-active{
  transition: all ease-in-out 300ms;
}

.zoom-enter-from,
.zoom-leave-to {
  top: var(--y);
  left: var(--x);
  opacity: 0;
  transform: scale(0);
}

.zoom-leave-from,
.zoom-enter-to {
  top: 50%;
  left: 50%;
  opacity: 1;
  transform: scale(1);
}
</style>
