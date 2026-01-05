<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';
import { ref } from 'vue';

defineProps<{
  src: string;
  title?: string;
}>();

const showDialog = ref(false);
</script>

<template>
  <motion.div layout class="relative w-full">
    <motion.img
      layout
      :layout-id="`img-${src}`"
      :src="src"
      :style="{
        opacity: showDialog ? 0 : 1,
      }"
      :transition="{
        type: 'spring',
        stiffness: 449,
        damping: 86,
        mass: 5,
      }"
      alt="thumbnail"
      class="block object-contain rounded-2xl cursor-zoom-in w-full"
      @click="showDialog = true"
    />
    <p class="text-center my-4">
      {{ title }}
    </p>
    <animate-presence>
      <motion.div v-if="showDialog" class="fixed w-full h-full inset-0 flex items-center justify-center z-100 px-4">
        <motion.img
          v-if="showDialog"
          :layout-id="`img-${src}`"
          :src="src"
          layout
          alt="thumbnail"
          :transition="{
            type: 'spring',
            stiffness: 449,
            damping: 86,
            mass: 5,
          }"
          class="h-75vh md:h-75vh object-contain cursor-zoom-out rounded-xl z-200"
          @click="showDialog = false"
        />
        <motion.div
          v-if="showDialog"
          layout
          class="w-full h-full fixed inset-0 z-50 bg-black/50"
          :initial="{ backdropFilter: 'blur(16px)' }"
          :animate="{ backdropFilter: 'blur(16px)' }"
          :exit="{ backdropFilter: 'blur(16px)' }"
          @click="showDialog = false"
        />
      </motion.div>
    </animate-presence>
  </motion.div>
</template>
