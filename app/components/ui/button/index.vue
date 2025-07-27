<script lang="ts" setup>
import type { ButtonProps, ButtonVariant } from './button.props';

const props = withDefaults(
  defineProps<ButtonProps>(),
  {
    variant: 'primary',
  },
);
const clazz: Record<ButtonVariant | 'default', string> = {
  default: 'inline-flex px-2 py-1 min-size-32px rounded dark:text-zinc-900 text-zinc-100 transition duration-300 active:scale-95 cursor-pointer',
  primary: 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-200 dark:hover:bg-zinc-100',
  ghost: 'bg-transparent border-none outline-none dark:hover:bg-zinc-500/40 hover:bg-zinc-200 dark:text-zinc-100! text-zinc-900!',
};
</script>

<template>
  <button
    :data-icon="props.icon"
    :class="[
      clazz.default,
      clazz[props.variant],
    ]"
    class="data-[icon=true]:size-fit data-[icon=true]:p-2!"
  >
    <slot />
  </button>
</template>
