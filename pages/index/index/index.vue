<script lang="ts" setup>
import {vIntersectionObserver} from '@vueuse/components';
import {Pin, Hash,CalendarDays} from 'lucide-vue-next';
const {posts, status, canLoadMore, loadMore} = usePosts({
  page: 1,
  type: 'scroll'
});
const onLoadMore = () => {
  if (!canLoadMore() || status.value !== 'success'){
    return;
  }
  loadMore();
}
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: '2-digit',
    year: 'numeric',
    day: 'numeric'
  })
}
</script>

<template>
  <section class="max-w-lg w-full h-auto px-0 py-4 mx-auto">
    <ui-list>
      <ui-list-item v-for="post in posts" :key="post.id">
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
            <div class="w-fit flex flex-wrap">
              <div v-for="category of post.categories" :key="category.id" class="flex gap-0.5 items-center hover:text-primary cursor-pointer">
                <hash class="size-4" />
                <span class="text-sm">{{ category.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </ui-list-item>
    </ui-list>
    <div v-intersection-observer="[onLoadMore, {threshold: 0.9}]" />
  </section>
</template>