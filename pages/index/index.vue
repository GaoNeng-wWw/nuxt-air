<script lang="ts" setup>
</script>

<template>
  <div class="mx-auto flex min-h-full w-full flex-col pb-2">
    <nuxt-loading-indicator />
    <client-only>
      <navbar />
    </client-only>
    <main class="h-auto" vaul-drawer-wrapper>
      <nuxt-page />
    </main>
  </div>
</template>
