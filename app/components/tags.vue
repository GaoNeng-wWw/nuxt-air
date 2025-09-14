<script lang="ts" setup>
const route = useRoute();
const { tags } = useTags();
const { data } = useAsyncData(async () => await queryCollection('post').path(route.path).first());

const postTag = computed(() => data.value?.tags ?? []);
const displayedTag = computed(() => tags.value?.filter(tag => postTag.value.includes(tag.id)));
const { locale } = useI18n();
</script>

<template>
  <div class="w-full h-fit flex gap-2 my-2">
    <ui-tag v-for="tag, idx of displayedTag" :key="idx" class="bg-default-200">
      {{ tag[locale] }}
    </ui-tag>
  </div>
</template>
