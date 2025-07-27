<script lang="ts" setup>
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Placeholder } from '@tiptap/extensions';
import { StarterKit } from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';

const editor = useEditor({
  // autofocus: true,
  content: '<h1>Hello world</h1>',
  extensions: [
    Placeholder.configure({
      placeholder: 'write something...',
      emptyNodeClass: 'text-zinc-500',
    }),
    StarterKit,
    TaskList.configure({
      HTMLAttributes: {
        class: '[&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li_p]:my-0',
      },
    }),
    TaskItem,
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-stone outline-none',
    },
  },
});
</script>

<template>
  <div class="w-full h-full py-4">
    <nuxt-link to="/">
      <ui-button icon variant="ghost">
        <div class="i-material-symbols:chevron-left-rounded size-6 text-zinc-800 dark:text-zinc-200" />
      </ui-button>
    </nuxt-link>
    <input
      type="text"
      placeholder="Unititled Post"
      class="
       w-full outline-none py-2 text-zinc-800 dark:text-zinc-200 placeholder-zinc-600 dark:placeholder-zinc-400 text-4xl wrap-anywhere whitespace-normal
       border-b border-zinc-600 dark:border-zinc-300
      "
    >
    <editor-content :editor="editor" />
  </div>
</template>

<style>
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
