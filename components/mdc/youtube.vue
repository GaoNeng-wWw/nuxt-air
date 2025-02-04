<script lang="ts" setup>
const {id} = defineProps<{
  id: string
}>();
const url = computed(() => `//www.youtube.com/embed/${unref(id)}`)
</script>
<template>
  <iframe :src="url" frameborder="0" class="w-full aspect-video"/>
</template>

<style scoped>
iframe {
  aspect-ratio: 16 / 9;
}
</style>