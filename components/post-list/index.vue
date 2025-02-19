<script lang="ts" setup>
import { vIntersectionObserver } from '@vueuse/components';
import { CalendarDays, Hash, Pin } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{
    category?: number | null;
    defaultPage?: number;
    type?: 'scroll' | 'page';
    showCategories?: boolean;
    showDraft?: boolean;
    includeUnPublish?: boolean;
  }>(),
  {
    defaultPage: 1,
    type: 'scroll',
    category: null,
    showCategories: false,
    showDraft: false,
    includeUnPublish: false,
  },
);
const { defaultPage, type, category, showCategories, showDraft, includeUnPublish } = toRefs(props);
const page = ref(props.defaultPage);
const {
  posts,
  status,
  loadMore,
  canLoadMore,
} = usePosts({
  page,
  type,
  category: category.value ?? null,
  publish: !showDraft.value,
  includeUnPublish: includeUnPublish.value,
});
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    month: '2-digit',
    year: 'numeric',
    day: 'numeric',
  });
}
function onLoadMore() {
  if (!canLoadMore() || status.value !== 'success') {
    return;
  }
  loadMore();
}
watch(defaultPage, () => {
  page.value = defaultPage.value;
});
</script>

<template>
  <div class="size-full">
    <ui-list class="overflow-visible">
      <nuxt-link
        v-for="post, idx in posts" :key="post.id" :to="{ path: `/post/${post.id}` }"
      >
        <ui-list-item
          class="slide-animation cursor-pointer rounded-md py-2 hover:bg-default-800"
          :style="{
            '--index': idx,
          }"
        >
          <div class="5 flex w-full flex-col gap-1">
            <div class="flex w-full items-center gap-1.5">
              <pin v-if="post.pin" class="mt-1 size-5 text-rose-500" />
              <div class="flex flex-auto items-center justify-between">
                <nuxt-link :to="{ path: `/post/${post.id}` }">
                  <span class="text-2xl transition duration-300 hover:text-primary">
                    {{ post.title }}
                  </span>
                </nuxt-link>
              </div>
            </div>
            <div class="flex w-full gap-2">
              <div class="flex items-center gap-0.5">
                <calendar-days class="size-4" />
                <span class="text-sm"> {{ formatDate(post.updateAt) }} </span>
              </div>
              <div v-if="showCategories" class="flex w-fit flex-wrap">
                <div v-for="categoryItem of post.categories" :key="categoryItem.id" class="flex cursor-pointer items-center gap-0.5 hover:text-primary">
                  <hash class="size-4" />
                  <span class="text-sm">{{ categoryItem.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </ui-list-item>
      </nuxt-link>
    </ui-list>
    <div v-intersection-observer="[onLoadMore, { threshold: 1 }]" />
  </div>
</template>
