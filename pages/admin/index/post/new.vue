<script lang="ts" setup>
import type { MDCParserResult } from '@nuxtjs/mdc';

const postTitle = ref('');
const postContent = ref('');
const parser= await useMarkdownParser();
const ast = ref<MDCParserResult | null>(null)
const popoverInfo = reactive({
  left: '',
  top: '',
  show: false
})
const onKeyDown = (ev:KeyboardEvent) => {
  postContent.value = (ev.target as HTMLElement).innerText;
  // Slash ->  /
  if (ev.code === 'Slash') {
    const selection = getSelection();
    const range = selection?.getRangeAt(0)!;
    const {x,y} = range.getBoundingClientRect();
    popoverInfo.left = `${x}px`;
    popoverInfo.top = `${y}px`;
    popoverInfo.show = true;
    return;
  }
  popoverInfo.show = false;
}
watch(postContent, ()=>{
  parseMarkdown(postContent.value)
  .then((res) => {ast.value = res;})
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
    <div class="max-w-full h-full p-2 grid grid-cols-2 gap-2 overflow-auto">
      <div class="w-full max-h-full overflow-auto outline-none prose dark:prose-invert border border-input rounded px-3 py-2" contentEditable @keyup="onKeyDown" />
      <div class="fixed translate-y-full" :style="{top: popoverInfo.top, left: popoverInfo.left}">
        <ui-popover :open="popoverInfo.show">
          <ui-popover-trigger as-child>
            <div class="w-8 h-3"></div>
          </ui-popover-trigger>
          <ui-popover-content>
            Content
          </ui-popover-content>
        </ui-popover>
      </div>
      <suspense>
        <ui-scroll-area class="h-full w-full border border-input rounded">
          <MDCRenderer v-if="ast?.body" :body="ast.body" :data="ast.data" class="w-full h-full py-2 px-3 overflow-auto break-words prose dark:prose-invert"/>
          <ui-scroll-bar forceMount />
        </ui-scroll-area>
      </suspense>
    </div>
  </div>
</template>