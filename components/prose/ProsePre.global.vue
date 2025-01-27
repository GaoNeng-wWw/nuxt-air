<template>
  <div class="w-full h-fit group relative">
    <copy class=" opacity-0 group-hover:opacity-100 absolute transition-all size-3.5 right-2 top-2 cursor-pointer" @click="copyCode" />
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import {Copy} from 'lucide-vue-next';
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})
const copyCode = () => {
  navigator.clipboard.writeText(props.code);
}
</script>

<style>
pre code .line {
  display: block;
}
</style>