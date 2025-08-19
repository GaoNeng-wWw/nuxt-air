<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <combobox-item
    v-bind="forwarded"
    :class="cn(
      `
      mt-2 transition border-2 border-transparent cursor-auto
      relative flex cursor-default gap-2 select-none justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-none
      data-[state=checked]:bg-default-200 data-[state=checked]:border-default-300
      data-[highlighted]:bg-default-200 data-[highlighted]:border-default-300
      data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0
      `,
      props.class,
    )"
  >
    <slot />
  </combobox-item>
</template>
