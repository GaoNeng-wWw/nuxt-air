<script setup lang="ts">
import { motion } from 'motion-v';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';

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
const popoverShow = ref(false);
const popoverDelay = ref(1000);
function copyCode() {
  navigator.clipboard.writeText(props.code);
}
let timer: NodeJS.Timeout | null = null;
function open() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  popoverShow.value = true;
  timer = setTimeout(() => {
    popoverShow.value = false;
    timer = null;
  }, popoverDelay.value);
}
</script>

<template>
  <div class="group relative h-fit w-full group p-2 rounded bg-default-200 my-8">
    <popover-root :open="popoverShow">
      <popover-trigger as-child class="absolute right-2 top-2 z-10" @click="open">
        <div
          class="
          size-4 i-material-symbols:content-copy scale-50 opacity-0 transition duration-normal ease-in-out cursor-pointer
          group-hover:opacity-100 group-hover:scale-100
        "
          @click="copyCode"
        />
      </popover-trigger>
      <popover-portal>
        <popover-content as-child side="top" :side-offset="8" class="w-fit rounded bg-default-200 text-default-800 px-2 py-1">
          <motion.div
            :initial="{ opacity: 0, scale: 0.95 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.95 }"
            :transition="{ duration: 0.3, ease: 'anticipate' }"
          >
            复制成功
          </motion.div>
        </popover-content>
      </popover-portal>
    </popover-root>
    <p class="text-default-500 text-xs">
      {{ language }}
    </p>
    <pre :class="$props.class" class="not-prose"><slot /></pre>
  </div>
</template>

<style>
pre code {
  display: block !important;
  min-width: 100% !important;
  width: fit-content !important;
}
.line::before {
  content: attr(line);
  margin-right: 24px;
  color: var(--default-500);
  font-size: .8rem;
}
code .line {
  display: block !important;
}
pre {
  padding: 8px 0 !important;
}
code .line.diff.add{
  background: var(--colors-green-500);
}
code .line.diff.remove {
  background: var(--colors-red-700);
  opacity: .7;
}
pre.has-focused:hover .line {
  filter: blur(0);
  opacity: 1;
}
pre.has-focused .line {
  transition: all 200ms ease-in;
  filter: blur(2px);
  opacity: .7;
}
pre.has-focused .focused{
  filter: blur(0);
  opacity: 1;
}
</style>
