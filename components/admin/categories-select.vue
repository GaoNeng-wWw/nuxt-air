<script lang="ts" setup>
import type { ComboboxItemEmits } from 'radix-vue';
import { cn } from '@/lib/utils';
import { vInfiniteScroll } from '@vueuse/components';
import { createReusableTemplate } from '@vueuse/core';
import { Check } from 'lucide-vue-next';

const { categories, addCategory, loading, loadMore, canLoadMore } = useCategories({
  page: 1,
  type: 'scroll',
});
const modelValue = defineModel<Category[]>({ required: true });
const [UseTemplate, categoriesList] = createReusableTemplate();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedCategory = ref<Set<string | number | true | Record<string, any>>>(new Set());
const categoryName = ref('');
const seletcedIds = computed(() => modelValue.value.map(category => category.id));
function onAddCategory() {
  const name = unref(categoryName);
  addCategory({ name }).then(({ id, name }) => {
    categories.value.push({ id, name });
  });
}
function onSelect(ev: ComboboxItemEmits['select'][0]) {
  const value = ev.detail.value as Category;
  if (!ev.detail.value) {
    return;
  }
  if (seletcedIds.value.includes(value.id)) {
    const idx = modelValue.value.findIndex(category => category.id === value.id);
    modelValue.value.splice(idx);
    return;
  }
  modelValue.value.push(value);
}
const selectClass = (id: number) => cn('ml-auto h-4 w-4', seletcedIds.value.includes(id) ? 'opacity-100' : 'opacity-0');
</script>

<template>
  <div>
    <UseTemplate>
      <ui-command>
        <ui-command-input />
        <ui-command-empty>
          暂无数据
        </ui-command-empty>
        <ui-command-list v-infinite-scroll="[loadMore, { distance: 10, canLoadMore }]">
          <ui-command-group>
            <ui-command-item
              v-for="category in categories"
              :key="category.name"
              :value="category"
              @select="onSelect"
            >
              {{ category.name }}
              <Check :class="selectClass(category.id)" />
            </ui-command-item>
          </ui-command-group>
        </ui-command-list>
      </ui-command>
    </UseTemplate>
    <ui-popover>
      <ui-popover-trigger>
        <div class="flex gap-2 rounded px-2 py-1 hover:bg-muted/50">
          <template v-if="modelValue.length">
            <div v-for="category, idx of modelValue" :key="idx" class="flex gap-1">
              {{ category.name }}
              <span v-if="idx < selectedCategory.size - 1 && selectedCategory.size > 1">/</span>
            </div>
          </template>
          <p v-else>
            {{ $t('admin.post.unclassified') }}
          </p>
        </div>
      </ui-popover-trigger>
      <ui-popover-content>
        <div class="w-full">
          <div class="h-60 w-full overflow-auto">
            <categories-list />
          </div>
          <form class="flex w-full items-center justify-center gap-1.5" @submit.stop.prevent="onAddCategory">
            <ui-input v-model="categoryName" />
            <ui-button :loading="loading" @click="onAddCategory">
              {{ $t('admin.post.addCategory') }}
            </ui-button>
          </form>
        </div>
      </ui-popover-content>
    </ui-popover>
  </div>
</template>
