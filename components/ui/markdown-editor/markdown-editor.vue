<script lang="ts" setup>
import { EditorView } from '@codemirror/view';
import type { SelectionRange } from '@codemirror/state';
import { EditorState } from '@codemirror/state';
import { highlightStyle, Theme } from './theme';
import { syntaxHighlighting } from '@codemirror/language';
import { dragImageUpload } from './extensions/drag-image-upload';
import { extensions } from './extensions';

const modelValue = defineModel<string>();
const editorEl= useTemplateRef('editor');

let cursor:SelectionRange|null = null;

const state = EditorState.create({
  doc: unref(modelValue),
  extensions: [
    extensions,
    EditorView.updateListener.of((updater) => {
      const {main} = updater.state.selection
      cursor = main;
      if (!updater.docChanged){
        return;
      }
      const doc = updater.state.doc;
      if (!doc){
        return;
      }
      modelValue.value = doc.toString();
    }),
    Theme,
    syntaxHighlighting(highlightStyle),
    dragImageUpload({
      upload(id, file, name, pos) {
        const body = new FormData();
        body.set('file', file);
        return $fetch(
          '/api/upload',
          {
            method: 'post',
            body,
          }
        )
        .then((url)=>{
          return {
            status: 'success',
            url,
            name,
            id,
            pos
          }
        })
      },
    })
  ]
});

let view:EditorView | null = null;

onMounted(()=>{
  if (!editorEl.value){
    return;
  }
  view = new EditorView({
    state,
    parent: editorEl.value,
  })
})
const emits = defineEmits<{
  scroll: [Event]
}>();
const onScroll = (event:Event) => {
  emits('scroll', event);
}
defineExpose({
  getInstance: ()=>editorEl.value,
  getCursor: ()=>cursor,
  ready: ()=>{
    if(!view){
      return;
    }
    console.log(modelValue);
    view.dispatch({
      changes:{
        from: 0,
        to: view.state.doc.length,
        insert: unref(modelValue)
      }
    })
  }
})
onUnmounted(()=>{
  view?.destroy();
})
</script>
<template>
  <div ref="editor" class="w-full h-full border border-border rounded box-border outline-none overflow-auto" @scroll="onScroll"/>
  <!-- <div ref="editor" class="w-full h-full border border-border rounded p-2 box-border outline-none overflow-auto" contenteditable="plaintext-only" @scroll="onScroll" @keyup="onKeyUp" /> -->
</template>


<style>
.cm-cursor, .cm-dropCursor {
  border-left-color: theme('colors.blue.500') !important;
}
.cm-panels {
  background-color: transparent !important;
}
.cm-activeLine{
  background: theme('colors.zinc.900') !important;
}
.cm-gutters {
  background-color: transparent !important;
  color: theme('colors.zinc.500') !important;
  border: none !important;
}
.cm-activeLineGutter {
  background-color: transparent !important;
  color: theme('colors.zinc.300') !important;
}
.cm-foldPlaceholder {
  background: transparent !important;
  border: none !important;
  color: theme('colors.zinc.500') !important;
}
.cm-tooltip {
  border: 1px solid theme('colors.zinc.600') !important;
  background-color: theme('colors.zinc.900') !important;
}
</style>