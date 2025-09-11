<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints, useDark } from '@vueuse/core';

const { greater } = useBreakpoints(breakpointsTailwind);
const desktop = greater('sm');

useDark();
</script>

<template>
  <div class="w-full h-full min-h-dvh bg-stone-100 dark:bg-stone-950 relative">
    <lazy-client-only>
      <app-nav-desktop v-if="desktop" />
      <app-nav-mobile v-else />
    </lazy-client-only>
    <toaster theme="system" rich-colors />
    <nuxt-page keepalive />
  </div>
</template>
