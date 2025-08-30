<script lang="ts" setup>
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { ColorHighlighter } from './extension/color-display';
import suggestion from './extension/emoji/suggestion';

const { maxWord = 200 } = defineProps<{
  maxWord?: number;
}>();

const emits = defineEmits<{
  characterUpdate: [number];
}>();

const curCharacterCount = ref(0);

const editor = useEditor({
  content: '',
  extensions: [
    CharacterCount.configure({
      limit: maxWord,
    }),
    Placeholder.configure({
      placeholder: '说点什么吧',
    }),
    StarterKit.configure({
      codeBlock: false,
      heading: {
        levels: [
          1,
          2,
          3,
        ],
      },
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
      class: 'prose prose-stone dark:prose-invert bg-transparent! text-xs focus:outline-none max-w-full max-h-full bg-default-100 py-4 px-3 prose-p:my-0 prose-p:line-height-relaxed overflow-auto prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h1:mt-0 prose-h2:mt-0 prose-h3:mt-0',
    },
  },
  onTransaction(props) {
    curCharacterCount.value = props.editor.storage.characterCount.characters();
  },
});

function getJSONContent() {
  if (!editor.value) {
    return {};
  }
  return editor.value.getJSON();
}

defineExpose({ getJSONContent });

const scope = effectScope();

scope.run(() => {
  watch(curCharacterCount, () => {
    emits('characterUpdate', curCharacterCount.value);
  });
});

onUnmounted(() => {
  editor.value?.destroy();
  scope.stop();
});
</script>

<template>
  <editor-content :editor="editor" class="w-full h-full" />
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
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  font-size: calc(calc(12 / 16) * 1rem);
}
</style>
