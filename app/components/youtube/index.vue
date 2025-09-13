<script lang="ts" setup>
defineProps<{ id: string }>();
</script>

<template>
  <div class="w-full aspect-ratio-video">
    <ui-skeleton>
      <iframe
        :src="`https://www.youtube.com/embed/${id}`"
        title="YouTube video player"
        frameborder="0"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
        class="w-full h-full rounded-lg"
      />
    </ui-skeleton>
  </div>
</template>
