<script setup lang="ts">
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { MenuIcon } from 'lucide-vue-next';

const { categories } = useCategories({
  page: 1,
  type: 'scroll',
});
let timer: NodeJS.Timeout;
const categoriesVisible = ref(false);
const [DefCategoriesList, CategoriesList] = createReusableTemplate();
const [DefDesktopNavbar, DesktopNavbar] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 576px)');
function showCategories() {
  if (timer) {
    clearTimeout(timer);
  }
  categoriesVisible.value = true;
}
function hideCategories() {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    categoriesVisible.value = false;
  }, 300);
}
</script>

<template>
  <header class="sticky top-2 z-50 mx-auto w-full max-w-xl max-[576px]:top-0 max-[576px]:rounded-none max-[576px]:bg-transparent">
    <DefCategoriesList>
      <ul>
        <navbar-item v-for="category in categories" :key="category.id" class="w-full" :url="{ path: '/category', query: { id: category.id } }">
          {{ category.name }}
        </navbar-item>
      </ul>
    </DefCategoriesList>
    <DefDesktopNavbar>
      <nav class="w-full">
        <ul class="flex max-h-40 items-center gap-2.5 rounded-full border border-border bg-default-900/50 px-4 py-3 backdrop-blur">
          <navbar-item url="/">
            {{ $t('navbar.index') }}
          </navbar-item>
          <ui-popover :open="categoriesVisible">
            <ui-popover-trigger as-child @mouseenter="showCategories" @mouseleave="hideCategories">
              <navbar-item>
                {{ $t('navbar.post') }}
              </navbar-item>
            </ui-popover-trigger>
            <ui-popover-content :side-offset="8" class="rounded-lg border border-border bg-default-900/50 backdrop-blur" @mouseenter="showCategories" @mouseleave="hideCategories">
              <CategoriesList />
            </ui-popover-content>
          </ui-popover>
          <li class="ml-auto">
            <float-button-avatar />
          </li>
        </ul>
      </nav>
    </DefDesktopNavbar>
    <DesktopNavbar v-if="isDesktop" />
    <div v-else class="flex w-full items-center justify-between bg-default-900 px-4 py-3">
      <ui-drawer as-child class="bg-default-950">
        <ui-drawer-trigger>
          <ui-button variant="ghost" size="icon">
            <MenuIcon />
          </ui-button>
        </ui-drawer-trigger>
        <ui-drawer-content>
          <div class="min-h-64 space-y-2 p-2">
            <ul class="w-full">
              <navbar-item url="/" class="w-full">
                {{ $t('navbar.index') }}
              </navbar-item>
            </ul>
            <ul class="w-full">
              <CategoriesList />
            </ul>
          </div>
        </ui-drawer-content>
      </ui-drawer>
      <div class="size-10">
        <float-button-avatar />
      </div>
    </div>
  </header>
</template>
