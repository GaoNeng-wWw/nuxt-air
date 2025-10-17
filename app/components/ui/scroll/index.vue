<script lang="ts" setup>
const { offsetX, onWheel } = useUnscrollbarScroll({ axis: 'x' });
</script>

<template>
  <div class="w-full overflow-auto scrollbar-none">
    <div class="flex w-auto">
      <div
        class="flex transition-all duration-500 ease-in-out gap-1.5"
        :style="`transform: translateX(${offsetX}px)`"
        @wheel.prevent.stop="onWheel"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
