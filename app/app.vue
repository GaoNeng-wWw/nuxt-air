<script lang="ts" setup>
import { useDark } from '@vueuse/core';

const cfg = useRuntimeConfig();

useDark();

useHead({
  titleTemplate: `%s - ${cfg.public.SITE_NAME}`,
});
</script>

<template>
  <div class="w-full min-h-dvh bg-stone-100 dark:bg-stone-950 relative">
    <div class="max-w-4xl mx-auto sticky top-4 z-10 h-fit min-h-0 w-full">
      <client-only>
        <app-nav-desktop />
      </client-only>
    </div>
    <toaster theme="system" rich-colors />
    <nuxt-page keepalive />
    <footer class="shrink-0 min-h-0 h-fit py-2">
      <p class="text-xs text-center text-default-400">
        © 2025 GaoNeng-wWw. All rights reserved.
      </p>
    </footer>
  </div>
</template>
