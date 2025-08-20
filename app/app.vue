<script lang="ts" setup>
import { useDark } from '@vueuse/core';

useDark();
</script>

<template>
  <div class="w-full min-h-dvh bg-stone-100 dark:bg-stone-950">
    <div class="w-full h-full">
      <nuxt-page keepalive />
    </div>
  </div>
</template>

<style>
html, body, #__nuxt{
  width: 100%;
}
body {
  min-height: 100dvh;
  height: 100%;
}
html {overflow: auto;}
</style>
