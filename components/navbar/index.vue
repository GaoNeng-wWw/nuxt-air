<script setup lang="ts">
import { createReusableTemplate, useMediaQuery } from '@vueuse/core';
import { MenuIcon } from 'lucide-vue-next';

const {categories} = useCategories({
  page: 1,
  type: 'scroll'
})
let timer:NodeJS.Timeout;
const categoriesVisible = ref(false);
const [DefCategoriesList, CategoriesList] = createReusableTemplate();
const [DefDesktopNavbar, DesktopNavbar] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 640px)');
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
  <header class="max-w-xl w-full sticky top-0 sm:top-2 sm:px-2 mx-auto bg-default-800/50 backdrop-blur rounded-md sm:rounded-none sm:bg-transparent">
    <DefCategoriesList>
      <ul>
        <navbar-item v-for="category in categories"  :key="category.id" class="w-full" :url="{path: '/posts', query:{category:category.id}}">
          {{ category.name }}
        </navbar-item>
      </ul>
    </DefCategoriesList>
    <def-desktop-navbar>
      <nav class="w-full">
        <ul class="flex items-center max-h-40 gap-2.5 bg-default-900/50 backdrop-blur py-3 px-4 rounded-full border border-border">
          <navbar-item url="/">
            {{ $t('navbar.index') }}
          </navbar-item>
          <ui-popover :open="categoriesVisible">
            <ui-popover-trigger as-child @mouseenter="showCategories" @mouseleave="hideCategories">
              <navbar-item>
                {{ $t('navbar.post') }}
              </navbar-item>
            </ui-popover-trigger>
            <ui-popover-content :side-offset="8" class="bg-default-900/50 backdrop-blur border border-border rounded-lg" @mouseenter="showCategories" @mouseleave="hideCategories">
              <categories-list />
            </ui-popover-content>
          </ui-popover>
          <li class="ml-auto"><float-button-avatar /></li>
        </ul>
      </nav>
    </def-desktop-navbar>
    <desktop-navbar v-if="isDesktop" />
    <div v-else class="w-full flex items-center justify-between py-3 px-4">
      <ui-drawer as-child class="bg-default-950">
        <ui-drawer-trigger>
          <ui-button variant="ghost" size="icon">
            <menu-icon />
          </ui-button>
        </ui-drawer-trigger>
        <ui-drawer-content>
          <div class="space-y-2 py-2 px-2 min-h-64">
            <ul class="w-full">
              <navbar-item url="/" class="w-full">
                {{ $t('navbar.index') }}
              </navbar-item>
            </ul>
            <ul class="w-full">
              <categories-list />
            </ul>
          </div>
        </ui-drawer-content>
      </ui-drawer>
      <div class="w-10 h-10">
        <float-button-avatar />
      </div>
    </div>
  </header>
</template>