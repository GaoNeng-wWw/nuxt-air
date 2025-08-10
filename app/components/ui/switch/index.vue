<script lang="ts" setup>
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import { cn } from '~/lib/utils';

const props = defineProps<SwitchRootProps & { class?: string }>();
const emits = defineEmits<SwitchRootEmits>();

const forward = useForwardPropsEmits(props, emits);
const modelValue = defineModel<boolean>();
</script>

<template>
  <switch-root
    v-bind="forward"
    v-model="modelValue"
    :class="
      cn(
        'relative cursor-pointer',
        'px-1 py-1 w-64px min-h-20px rounded-full transition border border-default-300 bg-default-300',
        'data-[state=checked]:bg-blue-500 light:data-[state-checked]:light:bg-blue-400',
        'dark:hover:bg-default-200 dark:bg-default-100 [&:active_div]:scale-x-125',
        props.class,
      )
    "
  >
    <switch-thumb
      as="div"
      class="
      transition-all ease-in-out transform-origin-cl
      flex w-20px h-20px rounded-full bg-white
      data-[state=checked]:translate-x-32px data-[state=checked]:transform-origin-cr
      active:scale-x-125
      "
    />
  </switch-root>
</template>
