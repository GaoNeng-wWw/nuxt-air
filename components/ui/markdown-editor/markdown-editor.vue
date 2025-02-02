<script lang="ts" setup>
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { highlightStyle, Theme } from './theme';
import { syntaxHighlighting } from '@codemirror/language';
import { dragImageUpload } from './extensions/drag-image-upload';
import { extensions } from './extensions';


const modelValue = defineModel<string>();
const editorEl= useTemplateRef('editor');

const state = EditorState.create({
  doc: unref(modelValue),
  extensions: [
    extensions,
    EditorView.updateListener.of((updater) => {
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

let editor:EditorView | null = null;

onMounted(()=>{
  if (!editorEl.value){
    return;
  }
  editor = new EditorView({
    state,
    parent: editorEl.value,
  })
})
const stop = watch(modelValue, () => {
  if (!unref(modelValue)){
    return;
  }
  if (!editor?.state.doc) {
    return;
  }
  editor?.dispatch({
    changes:{
      from: 0,
      to: editor.state.doc.length,
      insert: unref(modelValue)
    }
  })
},{immediate: true});
const emits = defineEmits<{
  scroll: [Event]
}>();
const onKeyUp = () => {
  stop();
}
const onScroll = (event:Event) => {
  emits('scroll', event);
}
defineExpose({
  getInstance: ()=>editorEl.value,
})
onUnmounted(()=>{
  editor?.destroy();
})
</script>
<template>
  <div ref="editor" class="w-full h-full border border-border rounded box-border outline-none overflow-auto" @scroll="onScroll" @keyup="onKeyUp"/>
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