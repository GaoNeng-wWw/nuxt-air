<script lang="ts" setup>
const route = useRoute();
const tag = computed(() => route.params.tag as string ?? '');

const { tags } = useTags();
const { locale } = useI18n();
const targetTag = computed(() => tags.value?.filter(t => t.id === tag.value) ?? []);
useHead({
  title: computed(() => targetTag.value[0]?.[locale.value]),
});
</script>

<template>
  <div class="max-w-4xl w-full mx-auto pt-4 px-6">
    <ui-post-list :tag="tag" class="pt-8" />
  </div>
</template>
