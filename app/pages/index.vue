<script lang="ts" setup>
definePageMeta({
  title: '首页',
});

const activeTag:Ref<string> = ref('');

</script>

<template>
  <div class="max-w-4xl w-full mx-auto pt-4 mx-auto space-y-2 h-200vh relative">
    <app-categories v-model="activeTag" />
    <ui-post-list :tag="activeTag" />
  </div>
</template>
