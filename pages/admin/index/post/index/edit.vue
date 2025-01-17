<script lang="ts" setup>
import type { MDCParserResult } from '@nuxtjs/mdc';
import {MarkdownEditor} from '@/components/ui/markdown-editor';
import categoriesSelect from './components/categories-select.vue';
import { toast } from 'vue-sonner';

definePageMeta({
  name: 'admin::post::edit'
})

const editor = useTemplateRef('editor')
const render = useTemplateRef('render')
const postTitle = ref('');
const postContent = ref('');
const categories = ref<Category[]>([]);
const showConfirm = ref(false);
const ast = ref<MDCParserResult | null>(null)
const route = useRoute();
const id = computed(() => route.query.id ? route.query.id.toString() : null);
const { add } = usePosts({
  type: 'page',
  page: 1,
  immediate: false
});
const { updatePost, fetch } = usePost();
watch(postContent, ()=>{
  parseMarkdown(postContent.value)
  .then((res) => {
    ast.value = res;
  })
}, {immediate: true})
watch(id, ()=>{
  if (id.value !== null){
    fetch(Number.parseInt(id.value))
    .then((data) => {
      postTitle.value = data.post.title;
      postContent.value = data.post.content;
      categories.value = data.post.categories
    })
  }
}, {immediate: true});
const getEditorInstance = () => editor.value?.getInstance();
const editorScroll = () => {
  if (!editor.value || !render.value){
    return;
  }
  const editorInstance = getEditorInstance();
  if (!editorInstance){
    return;
  }
  render.value.scrollTop = editorInstance.scrollTop;
}
const renderScroll = () => {
  if (!editor.value || !render.value){
    return;
  }
  const editorInstance = getEditorInstance();
  if (!editorInstance){
    return;
  }
  if (editorInstance.scrollTop === render.value.scrollTop){
    return;
  }
  editorInstance.scrollTop = render.value.scrollTop;
}
const sendPost = (force:boolean=false) => {
  if (postTitle.value === ''){
    toast.error('文章标题不能为空')
    return;
  }
  if (!categories.value.length && !force){
    showConfirm.value = true;
    return;
  }
  showConfirm.value = false;
  if (id.value === null){
    add({
      title: postTitle.value,
      content: postContent.value,
      pin: false,
      categories: categories.value.map((category) => category.id)
    })
    .then(()=>{
      toast('发布成功')
    })
    return;
  }
  updatePost(Number.parseInt(id.value), {
    title: postTitle.value,
    content: postContent.value,
    categories: categories.value.map((category) => category.id)
  })
  .then(()=>{
    toast('修改成功')
  })
}
</script>

<template>
  <div class="w-full h-full py-2 flex flex-col gap-2">
    <div class="w-full flex items-center gap-1.5">
      <ui-input id="post-title" v-model="postTitle" placeholder="标题" />
      <ui-popover :open="showConfirm">
        <ui-popover-trigger>
          <ui-button class="!mt-0" @click="()=>sendPost(false)">
            保存
          </ui-button>
        </ui-popover-trigger>
        <ui-popover-content>
          <div class="w-full flex flex-col gap-2">
            <h1 class="text-lg">{{ $t('admin.post.sendConfirm.title') }}</h1>
            <div class="w-full flex gap-1.5">
              <ui-button variant="destructive" @click="()=>sendPost(true)">{{ $t('common.confirm') }}</ui-button>
              <ui-button @click="()=>showConfirm=false">{{ $t('common.cancel') }}</ui-button>
            </div>
          </div>
        </ui-popover-content>
      </ui-popover>
    </div>
    <div class="w-full">
      <categories-select v-model="categories" />
    </div>
    <div class="max-w-full h-full py-2 gap-2 overflow-auto grid grid-cols-2">
      <client-only>
        <MarkdownEditor ref="editor" v-model="postContent" @scroll="editorScroll" />
      </client-only>
      <div ref="render" class="w-full h-full overflow-auto border border-border rounded" @scroll="renderScroll">
        <m-d-c-renderer v-if="ast" class="p-2 prose dark:prose-invert" :data="ast.data" :body="ast.body" />
      </div>
    </div>
  </div>
</template>