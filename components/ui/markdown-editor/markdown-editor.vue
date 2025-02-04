<script lang="ts" setup>
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { highlightStyle, Theme } from './theme';
import { syntaxHighlighting } from '@codemirror/language';
import { dragImageUpload } from './extensions/drag-image-upload';
import { extensions } from './extensions';
import { watchPausable } from '@vueuse/core';

export type MininalCursor = {
  from: number;
  to: number;
}

const modelValue = defineModel<string>();
const editorEl = useTemplateRef('editor');
let state:EditorState | null = null;
let view:EditorView | null = null;

const emits = defineEmits<{
  scroll: [Event],
  cursorUpdate: [MininalCursor]
}>();

const createState = (doc?:MaybeRef<string>) => {
  return EditorState.create({
    doc: unref(doc),
    extensions: [
      extensions,
      EditorView.updateListener.of((updater) => {
        const {main} = updater.state.selection
        emits('cursorUpdate', {from: main.from,to: main.to})
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
}

const createView = (state:EditorState | null) => {
  return new EditorView({
    state: unref(state)!,
    parent: unref(editorEl)!
  })
}
const destory = () => view ? view.destroy() : null;
onMounted(()=>{
  state = createState(modelValue.value);
  if(!state){
    return;
  }
  view = createView(state);
})

const getDoc = () => view?.state.doc.toString();
const setDoc = (doc: string) => view?.dispatch({
  changes:{
    from: 0,
    to: view.state.doc.length,
    insert: doc
  }
})

onUnmounted(()=>destory())

const {pause, resume} = watchPausable(modelValue, ()=>{
  if (modelValue.value !== getDoc()){
    setDoc(unref(modelValue) ?? '');
  }
})

const onScroll = (event:Event) => {
  emits('scroll', event);
}
const insert = (selection: MininalCursor, content: string) => {
  view?.dispatch({
    changes:{
      from: selection.from,
      to: selection.to,
      insert: content
    }
  })
}
const replace = ({from,to}: {from: number, to: number}, content: string) => {
  if (!view?.state){
    throw new Error('view.state is undefined.')
  }
  pause();
  view.dispatch(
    {
      changes: {
        from,
        to,
        insert: content
      }
    }
  )
  resume();
}

defineExpose({
  getInstance: ()=>editorEl.value,
  getView: ()=>unref(view),
  insert,
  replace
})
</script>
<template>
  <div ref="editor" class="w-full h-full border border-border rounded box-border outline-none overflow-auto" @scroll="onScroll"/>
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
.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .ͼo .cm-selectionBackground, .ͼo .cm-content ::selection{
  background: theme('colors.blue.800/50') !important;
}
</style>