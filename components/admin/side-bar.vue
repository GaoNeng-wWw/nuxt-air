<script lang="ts" setup>
import type { Component } from 'vue';
import { Hash, Pencil } from 'lucide-vue-next';

interface MenuItem {
  label: string;
  link: string;
  active: boolean;
  icon: Component;
}
const { t } = useI18n();
const router = useRouter();
const items: Ref<MenuItem[]> = ref(
  [
    {
      label: t('menu.post'),
      link: '/admin/post',
      active: computed(() => router.currentRoute.value.path === '/admin/post'),
      icon: Pencil,
    },
    {
      label: t('menu.categories'),
      link: '/admin/categories',
      active: computed(() => router.currentRoute.value.path === '/admin/categories'),
      icon: Hash,
    },
    {
      label: t('menu.setting'),
      link: '/admin/setting',
      active: computed(() => router.currentRoute.value.path === '/admin/setting'),
      icon: Hash,
    },
  ],
);

function jumpTo(link: string) {
  router.replace(link);
}
</script>

<template>
  <ui-collapsible
    v-for="item in items"
    :key="item.link"
    :default-open="item.active"
  >
    <ui-sidebar-menu-item>
      <ui-sidebar-menu-button :data-active="item.active" class="hover:bg-muted data-[active=true]:bg-muted" @click="() => jumpTo(item.link)">
        <component :is="item.icon" />
        <span>{{ item.label }}</span>
      </ui-sidebar-menu-button>
    </ui-sidebar-menu-item>
  </ui-collapsible>
</template>
