<script lang="ts">
import type { ReadonlyRefOrGetter } from '@vueuse/core';
import type { InjectionKey } from 'vue';

export interface SelectContext<U> {
  selectedValue: Ref<U[]>;
  defaultSelect: ReadonlyRefOrGetter<U[]>;
  multiple: boolean;
  onSelect: (val: any) => void;
}
export const selectContextKey: InjectionKey<SelectContext<unknown>> = Symbol('select');
</script>

<script lang="ts" setup generic="T">
const { multiple, defaultSelect } = withDefaults(
  defineProps<{
    multiple?: boolean;
    defaultSelect?: T[];
  }>(),
  {
    multiple: false,
    defaultSelect: () => [],
  },
);
const modelValue = defineModel<T[]>({ default: [] });
function onSelect(value: T) {
  if (!multiple) {
    if (modelValue.value.includes(value)) {
      modelValue.value = [];
    } else {
      modelValue.value = [value];
    }
    return;
  }
  modelValue.value = modelValue.value.filter(v => v !== value);
  modelValue.value.push(value);
}
provide(selectContextKey, {
  multiple,
  selectedValue: modelValue,
  defaultSelect: computed(() => defaultSelect),
  onSelect,
});
watch(defaultSelect, () => {
  modelValue.value = defaultSelect;
}, { immediate: true, deep: true });
</script>

<template>
  <ui-popover>
    <slot />
  </ui-popover>
</template>
