<script lang="ts" setup>
import type { ViewProps } from './view';

const { items, command } = defineProps<ViewProps>();

const activeIndex = ref(0);

function onArrowDown() {
  activeIndex.value = activeIndex.value + 1 > items.length - 1 ? 0 : activeIndex.value + 1;
  return true;
}
function onArrowUp() {
  activeIndex.value = (activeIndex.value - 1) < 0 ? items.length - 1 : activeIndex.value - 1;
  return true;
}
function onSelect() {
  const item = items[activeIndex.value];
  if (item) {
    return command(item);
  }
  return true;
}
function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'PageDown') {
    activeIndex.value = items.length - 1;
    return true;
  }
  if (event.key === 'ArrowDown') {
    return onArrowDown();
  }
  if (event.key === 'ArrowUp') {
    return onArrowUp();
  }
  if (event.key === 'Enter') {
    return onSelect();
  }
  return false;
}
function onClick(index: number) {
  activeIndex.value = index;
  onSelect();
}
const ul = useTemplateRef('list');
watch(activeIndex, () => {
  const el = ul.value;
  if (!el) {
    return;
  }
  const [activeItem] = Array.from(el.children)
    .filter(child => (child as HTMLElement).dataset.active === 'true');

  if (!activeItem) {
    return;
  }
  const itemEl = activeItem as HTMLElement;
  el.scroll({
    top: itemEl.offsetTop - (itemEl.offsetHeight),
    behavior: 'smooth'
  });
  // activeItem.scrollIntoView({ behavior: 'smooth' });
}, { immediate: true });
defineExpose({ onKeyDown });
</script>

<template>
  <ul ref="list" class="w-max  h-200px overflow-auto p-2 rounded bg-default-100 text-default-900 border border-solid border-default-300">
    <li
      v-for="item, idx in items" :key="idx"
      :data-active="activeIndex === idx"
      class="px-2 py-1 rounded hover:bg-default-200 cursor-pointer flex data-[active=true]:bg-default-200"
      @click="() => onClick(idx)"
    >
      <div class=" size-8 ">
        {{ item.emoji }}
      </div>
      <span class=" text-default-500">
        :{{ item.name }}:
      </span>
    </li>
  </ul>
</template>
