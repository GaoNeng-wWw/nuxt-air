<script lang="ts" setup>
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Placeholder } from '@tiptap/extensions';
import { StarterKit } from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'

const editor = useEditor({
  // autofocus: true,
  content: '',
  extensions: [
    Placeholder.configure({
      placeholder: 'write something...',
      emptyNodeClass: 'text-foreground/50',
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
        <div class="i-material-symbols:chevron-left-rounded size-6 text-foreground" />
      </ui-button>
    </nuxt-link>
    <input
      type="text"
      placeholder="Unititled Post"
      class="
       w-full outline-none py-2 text-foreground placeholder-foreground/80 text-4xl wrap-anywhere whitespace-normal
       border-b border-zinc-600 dark:border-zinc-300
      "
    >
    <div class="w-full flex flex-wrap gap-2 py-2">
      <popover-root>
        <popover-trigger as-child>
          <ui-button icon variant="ghost">
            <i class="i-material-symbols:add-2 size-5" />
          </ui-button>
        </popover-trigger>
        <popover-portal>
          <popover-content :side-offset="8" class="bg-default-100 w-200px max-h-200px h-full p-3 rounded border border-default-300 light:shadow text-foreground">
            <div class="w-full h-10">
              <ui-input class="h-10" />
            </div>
          </popover-content>
        </popover-portal>
      </popover-root>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
