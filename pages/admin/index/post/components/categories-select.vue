<script lang="ts" setup>
import { cn } from '@/lib/utils';
import {vInfiniteScroll } from '@vueuse/components';
import {createReusableTemplate} from '@vueuse/core';
import { Check } from 'lucide-vue-next'

const {categories, addCategory, loading,loadMore,canLoadMore} = useCategories({
  page: 1,
  type: 'scroll'
})
const modelValue = defineModel<number[]>({required: true});
const [UseTemplate, categoriesList] = createReusableTemplate();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedCategory = ref<Set<string | number | true | Record<string, any>>>(new Set());
const categoryName = ref('');
const onAddCategory = () =>{
  const name = unref(categoryName);
  addCategory({name}).then(({id,name})=>{
    categories.value.push({id,name});
  });
}

watch(()=>selectedCategory, ()=>{
  modelValue.value = categories.value.filter((category) => selectedCategory.value.has(category.name)).map((category) => category.id)
},{ deep:true })

</script>

<template>
  <div>
    <use-template>
      <ui-command>
        <ui-command-input />
        <ui-command-empty>
          暂无数据
        </ui-command-empty>
        <ui-command-list v-infinite-scroll="[loadMore, { distance: 10, canLoadMore }]" >
          <ui-command-group>
            <ui-command-item 
              v-for="category in categories"
              :key="category.name"
              :value="category.name"
              @select="(ev) => {
                if (!ev.detail.value){
                  return;
                }
                if (selectedCategory.has(ev.detail.value)){
                  selectedCategory.delete(ev.detail.value);
                  return;
                }
                selectedCategory.add(ev.detail.value)
              }"
            >
              {{ category.name }}
              <check
              :class="cn(
                  'ml-auto h-4 w-4',
                  selectedCategory.has(category.name) ? 'opacity-100' : 'opacity-0',
              )" />
            </ui-command-item>
          </ui-command-group>
        </ui-command-list>
      </ui-command>
    </use-template>
    <ui-popover>
      <ui-popover-trigger>
        <div class="px-2 py-1 rounded hover:bg-muted/50 flex gap-2">
          <template v-if="selectedCategory.size">
            <div v-for="category,idx of selectedCategory" :key="idx" class="flex gap-1">
              {{ category }}
              <span v-if="idx < selectedCategory.size -1 && selectedCategory.size > 1">/</span>
            </div>
          </template>
          <p v-else>
            {{ $t('admin.post.unclassified') }}
          </p>
        </div>
      </ui-popover-trigger>
      <ui-popover-content>
        <div class="w-full">
          <div class="w-full h-60 overflow-auto">
            <categories-list />
          </div>
          <form class="w-full flex items-center justify-center gap-1.5" @submit.stop.prevent="onAddCategory">
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