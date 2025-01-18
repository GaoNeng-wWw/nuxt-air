<script lang="ts" setup>
import { Pencil } from 'lucide-vue-next';
import type { Component } from 'vue';

interface MenuItem {
  label: string;
  link: string;
  active: boolean;
  icon: Component;
}
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const items: Ref<MenuItem[]> = ref(
  [
    {
      label: t('menu.post'),
      link: '/admin/post',
      active: route.path === '/admin/post',
      icon: Pencil,
    },
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
      <ui-collapsible-trigger as-child>
        <ui-sidebar-menu-button @click="() => jumpTo(item.link)">
          <component :is="item.icon" />
          <span>{{ item.label }}</span>
        </ui-sidebar-menu-button>
      </ui-collapsible-trigger>
    </ui-sidebar-menu-item>
  </ui-collapsible>
</template>
