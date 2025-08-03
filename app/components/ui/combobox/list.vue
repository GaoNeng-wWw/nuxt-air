<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
});
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <combobox-portal>
    <combobox-content
      v-bind="forwarded"
      :class="cn(`z-50 max-w-[200px] rounded-md border border-default-300 bg-default-100 text-foreground shadow-md outline-none p-2`, props.class)"
    >
      <combobox-viewport>
        <slot />
      </combobox-viewport>
    </combobox-content>
  </combobox-portal>
</template>
