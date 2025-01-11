<template>
  <ui-scroll-area :id="useId()" class="h-full w-full" as-child>
    <div class="w-full h-full space-y-2">
      <slot />
    </div>
  </ui-scroll-area>
</template>