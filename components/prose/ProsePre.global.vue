<script setup lang="ts">
import { Copy } from 'lucide-vue-next';

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});
function copyCode() {
  navigator.clipboard.writeText(props.code);
}
</script>

<template>
  <div class="group relative h-fit w-full">
    <Copy class=" absolute right-2 top-2 size-3.5 cursor-pointer opacity-0 transition-all group-hover:opacity-100 text-muted" @click="copyCode" />
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
