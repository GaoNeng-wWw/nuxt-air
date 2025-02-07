<script lang="ts" setup>
definePageMeta({
  name: 'admin::post',
});
const { t } = useI18n();
useHead({
  title: t('breadcrumb.items.admin::post.label'),
});
</script>

<template>
  <div class="size-full">
    <nuxt-page />
  </div>
</template>
