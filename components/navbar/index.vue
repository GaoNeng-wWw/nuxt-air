<script setup lang="ts">
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
  <header class="max-w-lg px-2 mx-auto">
    <nav class="w-full">
      <ul class="flex items-center max-h-40 gap-2 bg-slate-900/50 backdrop-blur py-3 px-4 rounded-full border border-border">
        <navbar-item url="/">
          {{ $t('navbar.index') }}
        </navbar-item>
        <ui-popover :open="categoriesVisible">
          <ui-popover-trigger as-child @mouseenter="showCategories" @mouseleave="hideCategories">
            <navbar-item>
              {{ $t('navbar.post') }}
            </navbar-item>
          </ui-popover-trigger>
          <ui-popover-content :align-offset="16" class="bg-slate-900/80 backdrop-blur-md border border-border rounded-lg" @mouseenter="showCategories" @mouseleave="hideCategories">
            <ul>
              <navbar-item v-for="category in categories"  :key="category.id" class="w-full" :url="{path: '/posts', query:{category:category.id}}">
                {{ category.name }}
              </navbar-item>
            </ul>
          </ui-popover-content>
        </ui-popover>
      </ul>
    </nav>
  </header>
</template>