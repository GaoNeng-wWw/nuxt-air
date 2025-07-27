<script lang="ts" setup>
import { useDark } from '@vueuse/core';

useDark();
</script>

<template>
  <div class="w-full min-h-vh bg-stone-100 dark:bg-stone-950">
    <div class="max-w-xl w-full mx-auto">
      <nuxt-page />
    </div>
  </div>
</template>

<style>
html,body,#__nuxt {
  width: 100%;
  min-height: 100dvh;
  padding: 0;
  margin: 0%;
}
</style>
