<script lang="ts" setup>
// definePageMeta({
//   title: '首页',
// });

useHead({
  title: '首页'
})

const nav = useNav();
</script>

<template>
  <div class="max-w-4xl w-full mx-auto pt-6 mx-auto space-y-2 relative px-6">
    <ui-post-list :tag="nav.state.value.activeTag" />
  </div>
</template>
