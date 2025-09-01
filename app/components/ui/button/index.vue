<script lang="ts" setup>
import type { ButtonProps, ButtonVariant } from './button.props';
import { AnimatePresence, motion } from 'motion-v';
import { cn } from '~/lib/utils';

const props = withDefaults(
  defineProps<ButtonProps>(),
  {
    variant: 'primary',
  },
);
const clazz: Record<ButtonVariant | 'default', string> = {
  default: 'inline-flex px-2 py-1 min-size-32px rounded dark:text-zinc-900 text-zinc-100 transition duration-300 active:scale-95 cursor-pointer data-[loading=true]:text-opacity-50',
  primary: 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-100 data-[loading=true]:hover:bg-zinc-900!',
  ghost: 'bg-transparent border-none outline-none dark:hover:bg-zinc-500/40 hover:bg-zinc-200 dark:text-zinc-100 text-zinc-900 data-[loading=true]:hover:bg-transparent!',
};
</script>

<template>
  <button
    :data-icon="props.icon"
    :data-full="props.full"
    :data-loading="props.loading"
    :class="[
      cn(
        clazz.default,
        clazz[props.variant],
        props.class,
        'data-[icon=true]:size-fit data-[icon=true]:p-1',
        'data-[full=true]:w-full',
      ),
    ]"
  >
    <slot name="prefix">
      <animate-presence>
        <motion.div
          v-if="loading"
          key="loading"
          class="i-line-md:loading-twotone-loop size-4 color-default-800 my-auto mr-2"
          :initial="{
            width: '0',
          }"
          :animate="{
            width: '1rem',
          }"
          :exit="{
            width: '0',
            opacity: 0
          }"
          :transition="{
            ease: ['circOut', 'circOut'],
            duration: 0.4,
            type: 'tween',
          }"
        />
      </animate-presence>
    </slot>
    <slot />
  </button>
</template>
