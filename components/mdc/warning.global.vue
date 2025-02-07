<script lang="ts" setup>
import { TriangleAlert } from 'lucide-vue-next';
</script>

<template>
  <div class="warning-alert flex w-full flex-col rounded-md px-2 py-1">
    <div class="flex w-full items-center gap-2 text-xl">
      <TriangleAlert class="alert-icon size-8 shrink-0" />
      <span class="warning-alert__title break-all">
        <slot name="title" />
      </span>
    </div>
    <span class="break-all">
      <slot>
        <slot name="content" />
      </slot>
    </span>
  </div>
</template>

<style scoped>
.warning-alert {
  background: theme('colors.orange.400/0.3');
}
.alert-icon {
  color: theme('colors.orange.500');
}
.warning-alert__title{
  color: theme('colors.orange.500');
}
</style>
