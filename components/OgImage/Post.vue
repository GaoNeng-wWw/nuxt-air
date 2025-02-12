<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string;
    categories?: string[];
  }>(),
  {
    title: '',
    categories: () => [],
  },
);
</script>

<template>
  <div class="flex size-full flex-col px-10 py-20 bg-zinc-950">
    <h1 class="mt-0 text-8xl leading-none text-white">
      {{ title }}
    </h1>
    <div class="flex w-full flex-row text-4xl text-white">
      <div v-for="(category, idx) of categories" :key="idx" class="flex flex-row items-center gap-2">
        <div> {{ category }} </div>
        <div v-if="idx !== categories.length - 1" class="mr-2 text-white/50">
          /
        </div>
      </div>
    </div>
  </div>
</template>
