<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ComboboxInput, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<ComboboxInputProps & {
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<ComboboxInputEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <combobox-input
    v-bind="forwarded"
    :class="
      cn(
        `
        flex h-9 w-full rounded-md border border-default-300 bg-transparent px-3 py-1 text-sm
        shadow-sm transition-colors
          file:border-0 file:bg-transparent file:text-sm file:font-medium
          placeholder:text-foreground focus-visible:outline-none
          disabled:cursor-not-allowed disabled:opacity-50
        `,
        props.class,
      )
    "
  >
    <slot />
  </combobox-input>
</template>
