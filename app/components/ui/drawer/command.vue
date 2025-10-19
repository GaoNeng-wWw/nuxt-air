<script lang="ts" setup>
import { DrawerContent, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerRoot } from 'vaul-vue';

const { onDestory, show } = defineProps<{
  onDestory?: () => void;
  show?: boolean;
}>();

const _show = ref(show);

function setShow(val: boolean) {
  _show.value = val;
}

defineExpose({
  setShow,
});

function onLeave(_el: Element, done: () => void) {
  done();
  onDestory?.();
}
</script>

<template>
  <drawer-root v-model:open="_show">
    <drawer-portal>
      <drawer-overlay class="fixed inset-0 bg-black/40 size-full z-[calc(infinity_*_1)]" />
      <transition appear @leave="onLeave">
        <drawer-content class="h-fit fixed bottom-0 left-0 right-0 outline-none bg-default-100 rounded-t-xl z-[calc(infinity_*_1)]">
          <div class="p-4">
            <drawer-handle class="bg-default-500 light:bg-default-400" />
            <slot />
          </div>
        </drawer-content>
      </transition>
    </drawer-portal>
  </drawer-root>
</template>
