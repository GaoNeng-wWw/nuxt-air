<script lang="ts" setup>
import { watchOnce } from '@vueuse/core';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { EditorState, Text } from '@codemirror/state';
import { defaultKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';

const modelValue = defineModel<string>();
const editorEl= useTemplateRef('editor');
const state = EditorState.create({
  doc: unref(modelValue),
  extensions: [
    keymap.of(defaultKeymap),
    EditorView.lineWrapping,
    markdown({
      addKeymap: false
    }),
    EditorView.updateListener.of((updater) => {
      if (!updater.docChanged){
        return;
      }
      const doc = updater.state.doc;
      if (!doc){
        return;
      }
      modelValue.value = doc.toString();
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
    extensions: [
      basicSetup,
    ],
  })
})
const stop = watch(modelValue, () => {
  if (!unref(modelValue)){
    return;
  }
  editor?.dispatch({
    changes:{
      from: 0,
      to: editor.state.doc.length,
      insert: unref(modelValue)
    }
  })
},{immediate: true, deep: true, flush: 'pre'});
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
  console.log('destory')
  editor?.destroy();
})
</script>
<template>
  <div ref="editor" class="w-full h-full border border-border rounded p-2 box-border outline-none overflow-auto" @scroll="onScroll" @keyup="onKeyUp"/>
  <!-- <div ref="editor" class="w-full h-full border border-border rounded p-2 box-border outline-none overflow-auto" contenteditable="plaintext-only" @scroll="onScroll" @keyup="onKeyUp" /> -->
</template>