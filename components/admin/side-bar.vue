<script lang="ts" setup>
import { Pencil,Hash } from 'lucide-vue-next';
import type { Component } from 'vue';

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
      active: computed(()=>router.currentRoute.value.path === '/admin/categories'),
      icon: Hash
    }
  ],
);

const jumpTo = (link: string) => {
  router.replace(link);
};
</script>

<template>
  <ui-collapsible
    v-for="item in items"
    :key="item.link"
    :default-open="item.active"
  >
    <ui-sidebar-menu-item>
      <ui-sidebar-menu-button :data-active="item.active" class="data-[active=true]:bg-muted hover:bg-muted" @click="() => jumpTo(item.link)">
        <component :is="item.icon" />
        <span>{{ item.label }}</span>
      </ui-sidebar-menu-button>
    </ui-sidebar-menu-item>
  </ui-collapsible>
</template>
