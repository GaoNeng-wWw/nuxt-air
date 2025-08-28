<script lang="ts" setup>
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { ColorHighlighter } from './extension/color-display';
import suggestion from './extension/emoji/suggestion';

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit.configure({
      codeBlock: false,
    }),
    ColorHighlighter,
    Emoji.configure({
      emojis: gitHubEmojis,
      enableEmoticons: true,
      suggestion,
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-stone dark:prose-invert focus:outline-none max-w-full w-full bg-default-100 p-4 rounded-lg prose-p:my-0 prose-p:line-height-relaxed',
    },
  },
});

function getJSONContent() {
  if (!editor.value) {
    return {};
  }
  return editor.value.getJSON();
}

defineExpose({ getJSONContent });

onUnmounted(() => {
  editor.value?.destroy();
});
</script>

<template>
  <editor-content :editor="editor" class="w-full h-full overflow-auto" />
</template>

<style lang="scss">
.color {
  white-space: nowrap;
  &::before {
    background-color: var(--color);
    border: 1px solid rgba(128, 128, 128, 0.3);
    border-radius: 2px;
    content: ' ';
    display: inline-block;
    height: 1em;
    margin-bottom: 0.15em;
    margin-right: 0.1em;
    vertical-align: middle;
    width: 1em;
  }
}
</style>
