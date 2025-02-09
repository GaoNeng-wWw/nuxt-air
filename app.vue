<script lang="ts" setup>
import { Toaster } from 'vue-sonner';

const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  document.querySelector('#__nuxt')?.scrollTo(0,0)
})
</script>

<template>
  <Toaster theme="dark" rich-colors />
  <nuxt-page />
</template>
