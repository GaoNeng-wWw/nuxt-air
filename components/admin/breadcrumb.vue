<script lang="ts" setup>
import type { RouteLocationMatched } from 'vue-router';

const route = useRoute();
const router = useRouter();
const currentRoute = router.currentRoute;
const {t} = useI18n();
const matched:Ref<RouteLocationMatched[]> = ref([]);
const breadcrumb = computed(() => {
  return matched.value.filter((route) => route.meta.breadcrumb !== false).map((route) => {
    const isCurrent = currentRoute.value.path === route.path
    return {
      label: t(`breadcrumb.items.${route.name?.toString()}.label`),
      current: isCurrent,
      to: !isCurrent ? route.path : '#',
    }
  })
})
watch(()=>route.matched, ()=>{
  matched.value = route.matched;
}, {deep: true, immediate: true});
</script>

<template>
  <ui-breadcrumb>
    <ui-breadcrumb-list>
      <ui-breadcrumb-item v-for="(item,idx) in breadcrumb" :key="item.to">
        <nuxt-link :to="item.to">
          {{ item.label }}
        </nuxt-link>
        <client-only>
          <ui-breadcrumb-separator v-if="idx < breadcrumb.length - 1" />
        </client-only>
      </ui-breadcrumb-item>
    </ui-breadcrumb-list>
  </ui-breadcrumb>
</template>