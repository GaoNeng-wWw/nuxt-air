<script lang="ts" setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StartKit from '@tiptap/starter-kit';
import ShikiCodeBlock from 'tiptap-extension-code-block-shiki';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Math from '@aarkue/tiptap-math-extension';
import featureSelect from './extensions/feature-select';
import Commands from './extensions/command';


const editor = new Editor({
  content: '<p>A Vue.js wrapper component for Tiptap to use <code>v-model</code>.</p>',
  extensions: [
    StartKit.configure({
      codeBlock: false,
    }),
    TaskList,
    TaskItem.configure({nested: true}),
    ShikiCodeBlock.configure({
      defaultTheme: 'material-theme-palenight'
    }),
    Math,
    Commands.configure({
      suggestion: featureSelect
    })
  ]
})
onBeforeUnmount(()=>{
  editor.destroy();
})
</script>
<template>
  <client-only>
    <editor-content :editor="editor" class="prose dark:prose-invert h-full first:prose-p:mt-0 outline-none border border-border rounded p-2 overflow-auto" />
  </client-only>
</template>

<style>
.tiptap {
  height: 100%;
}
.ProseMirror-focused{
  border: none;
  outline: none;
}
ul[data-type="taskList"] {
	list-style: none;
	margin-left: 0;
	padding: 0;
}
ul[data-type="taskList"] li {
	align-items: flex-start;
	display: flex;
  margin: 0;
}
ul[data-type="taskList"] li > label {
	flex: 0 0 auto;
	margin-right: 0.5rem;
	user-select: none;
}
ul[data-type="taskList"] li > div > p{
  height: fit-content;
  margin: 0;
}
ul[data-type="taskList"] li > div {
	flex: 1 1 auto;
}
ul[data-type="taskList"] input[type="checkbox"] {
	cursor: pointer;
}
ul[data-type="taskList"] ul[data-type="taskList"] {
	margin: 0;
}
</style>