<script lang="ts" setup>
const {
  tags,
} = useTags();
const {
  locale,
} = useI18n();
const items = useTemplateRef('items');
const width: Ref<'auto' | number> = ref('auto');

const modelValue = defineModel<string>();

function appendActiveTag(tag: string) {
  if (modelValue.value === tag) {
    modelValue.value = '';
    return;
  }
  modelValue.value = tag;
}

onMounted(() => {
  let _width = -1;
  if (items.value) {
    for (const item of items.value) {
      _width = Math.max(_width, item.offsetWidth);
    }
    width.value = _width === -1 ? 'auto' : _width;
  }
});
</script>

<template>
  <ui-scroll
    class="
      max-w-full w-fit! sticky top-4 ml-4 w-md bg-default-100  px-4 py-3 rounded-full backdrop-blur-xl
      z-10 text-sm border border-solid border-default-200 bg-opacity-20
      "
  >
    <div
      v-for="tag of tags"
      ref="items"
      :key="tag.id"
      class="shrink-0 px-2"
      :style="{ width: `${width}px` }"
    >
      <span
        :data-active="modelValue?.includes(tag.id)"
        class="text-default-500 data-[active=true]:dark:text-primary-800 data-[active=true]:text-primary-900 cursor-pointer hover:text-primary-600 transition"
        @click="appendActiveTag(tag.id)"
      >
        {{ tag[locale] }}
      </span>
    </div>
  </ui-scroll>
</template>
