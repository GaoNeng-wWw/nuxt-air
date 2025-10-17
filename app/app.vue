<script lang="ts" setup>
import { useDark } from '@vueuse/core';

useDark();
</script>

<template>
  <div class="w-full h-full min-h-dvh bg-stone-100 dark:bg-stone-950 relative">
    <toaster theme="system" rich-colors />
    <nuxt-page keepalive />
  </div>
</template>
