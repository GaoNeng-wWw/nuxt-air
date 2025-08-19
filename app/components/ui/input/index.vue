<script lang="ts" setup>
import { cn } from '~/lib/utils';

const props = defineProps<{ class?: string }>();

const modelValue = defineModel();
</script>

<template>
  <input
    v-model="modelValue"
    type="text"
    :class="cn(`w-full py-1 px-2 cursor-pointer bg-default-200 rounded outline-none hover:bg-default-300`, props.class)"
  >
</template>
