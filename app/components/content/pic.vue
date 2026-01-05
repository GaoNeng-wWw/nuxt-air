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
  <motion.div layout class="relative w-full h-fit">
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
      class="block w-full object-contain transition-opacity duration-300 rounded-2xl cursor-zoom-in"
      @click="showDialog = true"
    />
    <p class="text-center my-4">
      {{ title }}
    </p>
    <animate-presence>
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
        class="h-[75vh] object-contain cursor-zoom-out transition-opacity duration-300 fixed inset-50% z-10 -transform-translate-x-1/2 -transform-translate-y-1/2 object-contain rounded-xl z-100"
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
    </animate-presence>
  </motion.div>
</template>
