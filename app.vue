<script lang="ts" setup>
import { Toaster } from 'vue-sonner';

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  const html = document.body.parentElement;
  if (!html) {
    return;
  }
  html.scrollTop = 0;
})
</script>

<template>
  <Toaster theme="dark" rich-colors />
  <nuxt-page />
</template>
