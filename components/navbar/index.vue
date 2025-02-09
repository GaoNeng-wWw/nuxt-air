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
const { clear } = useUserSession();
const profile = useProfile();
function onLogout() {
  clear()
    .then(() => {
      profile.value = null;
    });
}
</script>

<template>
  <header class="sticky top-2 z-50 mx-auto w-full max-w-xl max-[576px]:top-0 max-[576px]:rounded-none max-[576px]:bg-transparent">
    <def-categories-list>
      <ul>
        <navbar-item v-for="category in categories" :key="category.id" class="w-full" :url="{ path: '/category', query: { id: category.id } }">
          {{ category.name }}
        </navbar-item>
      </ul>
    </def-categories-list>
    <def-desktop-navbar>
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
              <categories-list />
            </ui-popover-content>
          </ui-popover>
          <li class="ml-auto">
            <ui-hover-card>
              <ui-hover-card-trigger>
                <float-button-avatar />
              </ui-hover-card-trigger>
              <ui-hover-card-content class="w-fit border-none bg-transparent py-2 shadow-none" :side-offset="16">
                <div class="flex flex-col space-y-2">
                  <float-button-color-switch />
                  <auth-state>
                    <template #default="{ loggedIn }">
                      <float-button-logout v-if="loggedIn" @click="onLogout" />
                    </template>
                  </auth-state>
                </div>
              </ui-hover-card-content>
            </ui-hover-card>
          </li>
        </ul>
      </nav>
    </def-desktop-navbar>
    <desktop-navbar v-if="isDesktop" />
    <div v-else class="flex w-full items-center justify-between bg-default-900 px-4 py-3">
      <ui-drawer as-child class="bg-default-950">
        <ui-drawer-trigger>
          <ui-button variant="ghost" size="icon">
            <menu-icon />
          </ui-button>
        </ui-drawer-trigger>
        <ui-drawer-content>
          <div class="min-h-64 space-y-2 p-2">
            <div class="ml-auto mr-0 flex w-fit items-center space-x-2">
              <float-button-color-switch />
              <auth-state>
                <template #default="{ loggedIn }">
                  <float-button-logout v-if="loggedIn" @click="onLogout" />
                </template>
              </auth-state>
            </div>
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
      <div class="size-10">
        <float-button-avatar />
      </div>
    </div>
  </header>
</template>
