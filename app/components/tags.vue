<script lang="ts" setup>
const route = useRoute();
const { tagMap } = useTags();
const { data } = useAsyncData(route.path, async () => await queryCollection('post').path(route.path).first());

const postTag = computed(() => data.value?.tags ?? []);
const { locale } = useI18n();
</script>

<template>
  <div class="w-full h-fit flex gap-2 my-2">
    <ui-tag v-for="tag of postTag" :key="tag" class="bg-default-200">
      {{ tagMap.get(tag)?.[locale] }}
    </ui-tag>
  </div>
</template>
