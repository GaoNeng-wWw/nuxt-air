<script lang="ts" setup>
import type { MDCParserResult } from '@nuxtjs/mdc';
import { markdown as UiMarkdown } from '@/components/ui/markdown';
import { toast } from 'vue-sonner';

definePageMeta({
  name: 'admin::post::edit',
});
const { t } = useI18n();
useHead({
  title: t('breadcrumb.items.admin::post::edit.label'),
});
const postTitle = ref('');
const postContent = ref('');
const categories = ref<Category[]>([]);
const showConfirm = ref(false);
const ast = ref<MDCParserResult | null>(null);
const route = useRoute();
const id = computed(() => route.query.id ? route.query.id.toString() : null);
const { add } = usePosts({
  type: 'page',
  page: 1,
  immediate: false,
});
const { updatePost, fetch } = usePost();
watch(postContent, () => {
  parseMarkdown(postContent.value)
    .then((res) => {
      ast.value = res;
    });
}, { immediate: true });
watch(id, () => {
  if (id.value !== null) {
    fetch(Number.parseInt(id.value))
      .then((data) => {
        postTitle.value = data.post.title;
        postContent.value = data.post.content;
        categories.value = data.post.categories;
      });
  }
}, { immediate: true });
function sendPost(force: boolean = false) {
  if (postTitle.value === '') {
    toast.error('文章标题不能为空');
    return;
  }
  if (!categories.value.length && !force) {
    showConfirm.value = true;
    return;
  }
  showConfirm.value = false;
  if (id.value === null) {
    add({
      title: postTitle.value,
      content: postContent.value,
      pin: false,
      categories: categories.value.map(category => category.id),
    })
      .catch((err) => {
        if (err.data.statusCode === 403) {
          navigateTo('/');
          toast.error(err.data.message);
        }
      })
      .then((data) => {
        if (!data) {
          return;
        }
        toast('发布成功');
      });
    return;
  }
  updatePost(Number.parseInt(id.value), {
    title: postTitle.value,
    content: postContent.value,
    categories: categories.value.map(category => category.id),
  })
    .catch((err) => {
      if (err.data.statusCode === 403) {
        navigateTo('/');
        toast.error(err.data.message);
      }
    })
    .then((data) => {
      if (!data) {
        return;
      }
      toast('修改成功');
    });
}
</script>

<template>
  <div class="flex size-full flex-col gap-2 py-2">
    <div class="flex w-full items-center gap-1.5">
      <ui-input id="post-title" v-model="postTitle" placeholder="标题" />
      <ui-popover :open="showConfirm">
        <ui-popover-trigger>
          <ui-button class="!mt-0" @click="() => sendPost(false)">
            保存
          </ui-button>
        </ui-popover-trigger>
        <ui-popover-content>
          <div class="flex w-full flex-col gap-2">
            <h1 class="text-lg">
              {{ $t('admin.post.sendConfirm.title') }}
            </h1>
            <div class="flex w-full gap-1.5">
              <ui-button variant="destructive" @click="() => sendPost(true)">
                {{ $t('common.confirm') }}
              </ui-button>
              <ui-button @click="() => showConfirm = false">
                {{ $t('common.cancel') }}
              </ui-button>
            </div>
          </div>
        </ui-popover-content>
      </ui-popover>
    </div>
    <div class="w-full">
      <admin-categories-select v-model="categories" />
    </div>
    <client-only>
      <UiMarkdown v-model="postContent" />
    </client-only>
  </div>
</template>
