<script setup lang="ts">
import type {RouteLocationAsRelativeGeneric, RouteLocationAsPathGeneric } from '#vue-router';
import { cn } from '@/lib/utils';
const props = defineProps<{
  url?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  class?: string;
}>();
</script>

<template>
  <nuxt-link
    :to="props.url"
    :class="
      cn('block w-fit shrink-0 cursor-pointer border border-transparent hover:border-border hover:bg-slate-800/50 px-4 py-2 transition duration-300 rounded-full', props.class)
    "
    exact-active-class="border-border bg-slate-800/50"
  >
    <li> <slot /> </li>
  </nuxt-link>
</template>