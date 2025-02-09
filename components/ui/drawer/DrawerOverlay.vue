<script lang="ts" setup>
import type { DialogOverlayProps } from 'radix-vue';
import type { HtmlHTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DrawerOverlay } from 'vaul-vue';
import { computed } from 'vue';

const props = defineProps<DialogOverlayProps & { class?: HtmlHTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <drawer-overlay v-bind="delegatedProps" :class="cn('fixed inset-0 z-50 bg-black/20', props.class)" />
</template>
