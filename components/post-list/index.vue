<script lang="ts" setup>
import {Pin,Hash,CalendarDays} from 'lucide-vue-next';
import {vIntersectionObserver} from '@vueuse/components';
const props = withDefaults(
  defineProps<{
    category?: number | null,
    defaultPage?: number,
    type?: 'scroll' | 'page',
    showCategories?: boolean
  }>(),
  {
    defaultPage: 1,
    type: 'scroll',
    category: null,
    showCategories: false
  }
);
const {defaultPage,type,category,showCategories} = toRefs(props);
const page = ref(props.defaultPage);
const {
  posts,
  status,
  loadMore,
  canLoadMore
} = usePosts({
  page,
  type,
  category: category.value ?? null
})
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: '2-digit',
    year: 'numeric',
    day: 'numeric'
  })
}
const onLoadMore = () => {
  if (!canLoadMore() || status.value !== 'success'){
    return;
  }
  loadMore();
}
watch(defaultPage, ()=>{
  page.value = defaultPage.value;
})
</script>
<template>
  <div class="w-full h-full">
  <ui-list class="overflow-visible">
      <nuxt-link
        v-for="post,idx in posts" :key="post.id" :to="{path: `/post/${post.id}`}"
      >
        <ui-list-item
        class="slide-animation hover:bg-default-800 py-2 rounded-md cursor-pointer"
        :style="{
          '--index': idx
        }">
          <div class="w-full flex flex-col gap-1 5">
            <div class="w-full flex items-center gap-1.5">
              <pin v-if="post.pin" class="size-5 mt-1 text-rose-500" />
              <div class="flex flex-auto items-center justify-between">
                <nuxt-link :to="{path: `/post/${post.id}`}">
                  <span class="text-2xl transition duration-300 hover:text-primary">
                    {{post.title}}
                  </span>
                </nuxt-link>
              </div>
            </div>
            <div class="w-full flex gap-2">
              <div class="flex gap-0.5 items-center">
                <calendar-days class="size-4" />
                <span class="text-sm"> {{ formatDate(post.updateAt) }} </span>
              </div>
              <div v-if="showCategories" class="w-fit flex flex-wrap">
                <div v-for="categoryItem of post.categories" :key="categoryItem.id" class="flex gap-0.5 items-center hover:text-primary cursor-pointer">
                  <hash class="size-4" />
                  <span class="text-sm">{{ categoryItem.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </ui-list-item>
      </nuxt-link>
    </ui-list>
    <div v-intersection-observer="[onLoadMore, {threshold: 1}]" />
  </div>
</template>