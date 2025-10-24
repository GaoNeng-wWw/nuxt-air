<script lang="ts" setup>
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
import { AnimatePresence } from 'motion-v';
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '~/lib/utils';

const props = defineProps<PopoverContentProps & { class?: string }>();

const emits = defineEmits<PopoverContentEmits>();

const forwards = useForwardPropsEmits(props, emits);
</script>

<template>
  <popover-portal>
    <animate-presence>
      <popover-content
        v-bind="forwards"
        :class="
          cn(
            `relative flex flex-col bg-default-100 w-200px h-full rounded border border-default-300 light:shadow text-foreground`,
            'transform-origin-[var(--reka-popover-content-transform-origin)]',
            props.class,
          )
        "
      >
        <slot />
      </popover-content>
    </animate-presence>
  </popover-portal>
</template>
