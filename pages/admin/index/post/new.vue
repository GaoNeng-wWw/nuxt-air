<script lang="ts" setup>
import type { MDCParserResult } from '@nuxtjs/mdc';
import {MarkdownEditor} from '@/components/ui/markdown-editor';

const editor = useTemplateRef('editor')
const render = useTemplateRef('render')
const postTitle = ref('');
const postContent = ref(`
# hello world

hello
`);
const ast = ref<MDCParserResult | null>(null)
watch(postContent, ()=>{
  parseMarkdown(postContent.value)
  .then((res) => {
    ast.value = res;
    if (!postTitle.value){
      postTitle.value = ast.value.data.title;
    }
  })
}, {immediate: true})
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

</script>

<template>
  <div class="w-full h-full py-2 flex flex-col gap-2">
    <div class="w-full space-y-2 flex items-center gap-1.5">
      <ui-input id="post-title" v-model="postTitle" placeholder="标题" />
      <ui-button class="!mt-0">
        保存
      </ui-button>
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