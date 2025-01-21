<script lang="ts" setup>
const {categories} = useCategories({
  page: 1,
  type: 'scroll'
})
let timer:NodeJS.Timeout;
const categoriesVisible = ref(false);
const showCategories = () => {
  if (timer) {
    clearTimeout(timer);
  }
  categoriesVisible.value = true;
}
const hideCategories = () => {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    categoriesVisible.value = false;
  }, 300);
}
</script>

<template>
  <div class="w-full h-full mx-auto py-8 px-2">
    <navbar />
    <main class="h-auto">
      <nuxt-page />
    </main>
  </div>
</template>