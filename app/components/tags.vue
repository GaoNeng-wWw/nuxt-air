<script lang="ts" setup>
const route = useRoute();
const { tagMap } = useTags();
const { data } = useAsyncData(route.path, async () => await queryCollection('post').path(route.path).first());

const postTag = computed(() => data.value?.tags ?? []);
const { locale } = useI18n();
</script>

<template>
  <div class="w-full h-fit flex gap-2 my-2">
    <span v-for="tag of postTag" :key="tag" class="px-2 py-px bg-default-200 text-sm rounded-full">
      {{ tagMap.get(tag)?.[locale] }}
    </span>
  </div>
</template>
