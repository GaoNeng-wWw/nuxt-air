<script lang="ts" setup>
definePageMeta({
  title: '首页',
});
</script>

<template>
  <div class="max-w-4xl w-full h-full mx-auto pt-4 mx-auto space-y-2">
    <app-introduction class="pt-8" />
    <ui-post-list />
  </div>
</template>
