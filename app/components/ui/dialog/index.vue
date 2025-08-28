<script lang="ts" setup>
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { DialogRoot, useForwardPropsEmits } from 'reka-ui';
import { createDialogContext } from '~/composables/use-dialog';

const props = defineProps<DialogRootProps & {
  show?: boolean;
  transformOrigin?: boolean;
}>();
const emits = defineEmits<DialogRootEmits & {
  destory: [];
}>();

const transformOrigin = reactive<{ x: string; y: string }>({ x: '', y: '' });

const forward = useForwardPropsEmits(props, emits);
const _show = ref(props.show ?? false);

function onHiddenFinish() {
  emits('destory');
}

function onTriggerClick(ev: MouseEvent) {
  const el = ev.target as HTMLElement;
  const rect = el.getBoundingClientRect();
  transformOrigin.x = `${rect.x}px`;
  transformOrigin.y = `${rect.y}px`;
  _show.value = true;
}

createDialogContext({
  show: _show,
  onHiddenFinish,
  onTriggerClick,
  transformOrigin,
});

watch(props, () => {
  _show.value = props.show;
}, { deep: true });
</script>

<template>
  <dialog-root v-bind="forward" data-slot="dialog">
    <lazy-client-only>
      <slot />
    </lazy-client-only>
  </dialog-root>
</template>
