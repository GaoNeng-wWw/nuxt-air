<script setup lang="ts">
import type { PrimitiveProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '.';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-vue-next';
import { Primitive } from 'radix-vue';
import { buttonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
  disabled: false,
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="props.disabled || props.loading"
  >
    <slot v-if="props.loading" name="loading">
      <Loader2 class="mr-2 size-4 animate-spin" />
    </slot>
    <slot />
  </Primitive>
</template>
