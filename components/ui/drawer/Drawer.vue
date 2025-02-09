<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import { useForwardPropsEmits } from 'radix-vue';
import { DrawerRoot } from 'vaul-vue';

const props = withDefaults(defineProps<DrawerRootProps>(), {
});

const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <drawer-root v-bind="forwarded" class="bg-default-900">
    <slot />
  </drawer-root>
</template>
