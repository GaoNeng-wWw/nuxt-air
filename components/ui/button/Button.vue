<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type ButtonVariants, buttonVariants } from '.';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-vue-next'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  loading?: boolean,
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
  disabled:false,
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="props.disabled ||  props.loading"
  >
    <slot name="loading" v-if="props.loading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" />
    </slot>
    <slot />
  </Primitive>
</template>
