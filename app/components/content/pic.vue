<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';

const { src, title } = defineProps<{
  src: string;
  title?: string;
}>();

const showDialog = ref(false);

const originState = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});

const overflowMode = ref('');

function onClickOriginImage(ev: MouseEvent) {
  const el = ev.currentTarget as HTMLElement;
  showDialog.value = true;
  const { top, left, width, height } = el.getBoundingClientRect();
  originState.top = top;
  originState.left = left;
  originState.width = width;
  originState.height = height;
  if (overflowMode.value === '') {
    overflowMode.value = document.documentElement.style.overflow;
  }
  document.documentElement.style.overflow = 'hidden';
}
function onClose() {
  document.documentElement.style.overflow = overflowMode.value;
  showDialog.value = false;
}
</script>

<template>
  <motion.div class="w-full h-fit relative">
    <motion.div class="max-h-[500px] overflow-auto">
      <motion.img
        :src="src"
        class="w-full"
        @click="onClickOriginImage"
      />
    </motion.div>
    <motion.p class="text-center my-8">
      {{ title }}
    </motion.p>
    <teleport to="body">
      <animate-presence>
        <motion.img
          v-if="showDialog"
          class="[--w:80vw] lg:[--w:50vw] h-unset fixed z-200"
          :src="src"
          layout
          :initial="{
            top: `${originState.top}px`,
            left: `${originState.left}px`,
            transform: 'translate(0%, 0%)',
          }"
          :animate="{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }"
          :exit="{
            top: `${originState.top}px`,
            left: `${originState.left}px`,
            transform: 'translate(0%, 0%)',
          }"
          :style="{
            maxWidth: 'var(--w)',
            width: '100%',

          }"
          @click.stop="onClose"
        />
        <motion.div v-if="showDialog" class="fixed w-dvw h-dvh bg-black/80 inset-0 z-100" @click="onClose" />
      </animate-presence>
    </teleport>
  </motion.div>
</template>
