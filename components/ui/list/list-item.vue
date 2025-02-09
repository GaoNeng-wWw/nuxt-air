<template>
  <div class="min-h- flex w-full flex-col gap-2">
    <div v-if="$slots.header" class="w-full px-2 py-1">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="w-full px-2 py-1">
      <slot />
    </div>
    <div v-if="$slots.extra" class="w-full px-2 py-1">
      <slot name="extra" />
    </div>
  </div>
</template>
