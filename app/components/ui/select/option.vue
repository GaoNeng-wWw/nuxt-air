<script lang="ts" setup generic="T">
import { selectContextKey } from './index.vue';

const { selected, value, disabled } = defineProps<{
  selected?: boolean;
  value: T;
  disabled?: true | undefined;
}>();

const ctx = inject(selectContextKey)!;

const isSelected = computed(() => selected || ctx.selectedValue.value.includes(value));

onMounted(() => {
  if (selected) {
    ctx.selectedValue.value.push(value);
  }
});
</script>

<template>
  <div
    :disabled="disabled"
    :data-selected="isSelected"
    class="
    text-foreground w-full px-2 py-2 flex gap-2 hover:bg-primary-200 disabled:bg-tranparent disabled:text-foreground/50
    cursor-pointer rounded transition data-[selected=true]:bg-primary-200 dark:data-[selected=true]:bg-primary-200/60
    "
    @click="() => ctx.onSelect(value)"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </div>
</template>
