<script lang="ts" setup>
import {Bold, Italic, Strikethrough, ImageUp} from 'lucide-vue-next';
import { invoke, until } from '@vueuse/shared';
const modelValue = defineModel<string>({required: false, default: ''});

const editor = useTemplateRef('editor');
const render = useTemplateRef('render');
const uploader = useTemplateRef('uploader');
const commands = ref([]);

defineExpose({
  getContent: ()=>unref(modelValue),
})

const getEditorInstance = () => editor.value?.getInstance();
const editorScroll = () => {
  if (!editor.value || !render.value){
    return;
  }
  const editorInstance = getEditorInstance();
  if (!editorInstance){
    return;
  }
  render.value.scrollTop = editorInstance.scrollTop;
}
const renderScroll = () => {
  if (!editor.value || !render.value){
    return;
  }
  const editorInstance = getEditorInstance();
  if (!editorInstance){
    return;
  }
  if (editorInstance.scrollTop === render.value.scrollTop){
    return;
  }
  editorInstance.scrollTop = render.value.scrollTop;
}

const baseReplace = (prefix:string,suffix:string) => {
  if (!editor.value){
    return;
  }
  const view = editor.value.getView()!;
  const {main:{from,to}} = view.state.selection
  editor.value.replaceSelection(
    `${prefix}${view.state.sliceDoc(from,to)}${suffix}`
  )
}

const createImageMarkdown = ({url,name}:{url:string,name:string}) => {
  return `\n![${name}](${url})\n`;
}

const onUploadFile = (_ev:Event) => {
  if (!uploader.value){
    return;
  }
  const files = Array.from(uploader.value.files ?? []);
  const uploadHandles = files.map((file) => {
    const body = new FormData();
    body.set('file', file);
    return $fetch('/api/upload', {body, method: 'post'})
    .then((url)=>{
      return {
        name: file.name,
        url
      }
    })
  })
  Promise.allSettled(
    uploadHandles
  )
  .then((results) => results.map(res => res.status === 'fulfilled' ? res.value : {name: 'fail', url: ''}))
  .then((handles) => handles.map(createImageMarkdown))
  .then((contents) => {
    contents.forEach((content) => {
      if (!editor.value || !editor.value.getCursor()){
        return;
      }
      const cursor = editor.value.getCursor();
      if (!cursor){
        return;
      }
      editor.value.insert(cursor,content);
    })
    uploader.value!.files = null;
  })
}
const triggerUpload = () => uploader.value?.click();

invoke(async ()=>{
  await until<string>(modelValue).toMatch((value) => Boolean(value))
  if (!editor.value?.ready){
    watch(editor, ()=>{
      if (!editor.value?.ready){
        return;
      }
      editor.value.ready();
    }, {deep: true});
  }
  editor.value?.ready();
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="w-full h-fit grow-0 shrink-0 basis-0">
      <input ref="uploader" multiple class="fixed top-0 left-0 hidden" type="file" @change="onUploadFile" >
      <ui-toggle-group v-model="commands" type="multiple" class="w-fit ml-0" @update:model-value="commands=[]">
        <ui-toggle-group-item value="bold" @click="baseReplace('**','**')">
          <bold class="w-4 h-4"/>
        </ui-toggle-group-item>
        <ui-toggle-group-item value="italic" @click="baseReplace('*','*')">
          <italic class="w-4 h-4"/>
        </ui-toggle-group-item>
        <ui-toggle-group-item value="strikethrough" @click="baseReplace('~','~')">
          <strikethrough class="w-4 h-4"/>
        </ui-toggle-group-item>
        <ui-toggle-group-item value="image" @click="triggerUpload">
          <image-up class="w-4 h-4"/>
        </ui-toggle-group-item>
      </ui-toggle-group>
    </div>
    <div class="max-w-full h-full py-2 gap-2 overflow-auto grid grid-cols-2 flex-grow flex-shrink basis-0">
      <ui-markdown-editor ref="editor" v-model="modelValue" @scroll="editorScroll" />
      <div ref="render" class="w-full h-full overflow-auto border border-border rounded" @scroll="renderScroll">
        <ui-markdown-render :value="modelValue" class="p-2" tag="article" />
      </div>
    </div>
  </div>
</template>