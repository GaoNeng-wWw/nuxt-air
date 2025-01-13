<script lang="ts" setup>
import type { MDCParserResult } from '@nuxtjs/mdc';
import {MarkdownEditor} from '@/components/ui/markdown-editor';

const postTitle = ref('');
const postContent = ref('');
const ast = ref<MDCParserResult | null>(null)
watch(postContent, ()=>{
  parseMarkdown(postContent.value)
  .then((res) => {
ast.value = res;
})
})

</script>

<template>
  <div class="w-full h-full py-2 flex flex-col gap-2">
    <div class="w-full space-y-2 flex items-center gap-1.5">
      <ui-input id="post-title" v-model="postTitle" placeholder="标题" />
      <ui-button class="!mt-0">
        保存
      </ui-button>
    </div>
    <div class="max-w-full h-full py-2 gap-2 overflow-auto">
      <client-only>
        <MarkdownEditor />
      </client-only>
    </div>
  </div>
</template>