<script lang="ts" setup>
import type { MininalCursor } from '../markdown-editor/markdown-editor.vue';
import { createReusableTemplate } from '@vueuse/core';
import { Bold, ImageUp, Italic, Strikethrough } from 'lucide-vue-next';

const modelValue = defineModel<string>({ required: false, default: '' });
const [defineToolbar, toolbar] = createReusableTemplate();
const editor = useTemplateRef('editor');
const render = useTemplateRef('render');
const uploader = useTemplateRef('uploader');
const commands = ref([]);

defineExpose({
  getContent: () => unref(modelValue),
});

const getEditorInstance = () => editor.value?.getInstance();
function editorScroll(scrollTop: number) {
  if (!editor.value || !render.value) {
    return;
  }
  render.value.scrollTop = scrollTop;
}
function renderScroll() {
  if (!editor.value || !render.value) {
    return;
  }
  const editorInstance = getEditorInstance();
  if (!editorInstance) {
    return;
  }
  if (editorInstance.scrollTop === render.value.scrollTop) {
    return;
  }
  editor.value.setScroll(render.value.scrollTop);
}
const cursor = reactive({ from: 0, to: 0 });
function onCursorUpdate({ from, to }: MininalCursor) {
  cursor.from = from;
  cursor.to = to;
}
function baseReplace(prefix: string, suffix: string) {
  if (!editor.value) {
    return;
  }
  const view = editor.value.getView()!;
  const { from, to } = cursor;
  editor.value.replace(
    { from, to },
    `${prefix}${view.state.sliceDoc(from, to)}${suffix}`,
  );
}

function createImageMarkdown({ url, name }: { url: string;name: string }) {
  return `\n![${name}](${url})\n`;
}

function onUploadFile(_ev: Event) {
  if (!uploader.value) {
    return;
  }
  const files = Array.from(uploader.value.files ?? []);
  const uploadHandles = files.map((file) => {
    const body = new FormData();
    body.set('file', file);
    return $fetch('/api/upload', { body, method: 'post' })
      .then((url) => {
        return {
          name: file.name,
          url,
        };
      });
  });
  Promise.allSettled(
    uploadHandles,
  )
    .then(results => results.map(res => res.status === 'fulfilled' ? res.value : { name: 'fail', url: '' }))
    .then(handles => handles.map(createImageMarkdown))
    .then((contents) => {
      contents.forEach((content) => {
        if (!editor.value) {
          return;
        }
        editor.value.insert(cursor, content);
      });
      uploader.value!.files = null;
    });
}
const triggerUpload = () => uploader.value?.click();
</script>

<template>
  <div class="flex size-full flex-col">
    <define-toolbar>
      <div class="h-fit w-full shrink-0 grow-0 basis-0">
        <input ref="uploader" multiple class="fixed left-0 top-0 hidden" type="file" @change="onUploadFile">
        <ui-toggle-group v-model="commands" type="multiple" class="ml-0 w-fit" @update:model-value="commands = []">
          <ui-toggle-group-item value="bold" @click="baseReplace('**', '**')">
            <bold class="size-4" />
          </ui-toggle-group-item>
          <ui-toggle-group-item value="italic" @click="baseReplace('*', '*')">
            <italic class="size-4" />
          </ui-toggle-group-item>
          <ui-toggle-group-item value="strikethrough" @click="baseReplace('~', '~')">
            <strikethrough class="size-4" />
          </ui-toggle-group-item>
          <ui-toggle-group-item value="image" @click="triggerUpload">
            <image-up class="size-4" />
          </ui-toggle-group-item>
        </ui-toggle-group>
      </div>
    </define-toolbar>
    <toolbar class="hidden sm:block" />
    <ui-tabs default-value="editor" class="flex flex-shrink flex-grow basis-0 flex-col sm:hidden">
      <ui-tabs-list class="w-fit">
        <ui-tabs-trigger value="editor">
          Editor
        </ui-tabs-trigger>
        <ui-tabs-trigger value="view">
          View
        </ui-tabs-trigger>
      </ui-tabs-list>
      <ui-tabs-content value="editor" class="flex-shrink flex-grow basis-0 flex-col overflow-auto">
        <div class="flex h-full flex-col">
          <toolbar />
          <div class="flex-shrink flex-grow basis-0 overflow-auto">
            <ui-markdown-editor ref="editor" v-model="modelValue" @cursor-update="onCursorUpdate" />
          </div>
        </div>
      </ui-tabs-content>
      <ui-tabs-content value="view" class="size-full flex-shrink flex-grow basis-0 overflow-auto rounded border border-border">
        <ui-markdown-render :value="modelValue" class="p-2" tag="article" />
      </ui-tabs-content>
    </ui-tabs>
    <div class="hidden h-full max-w-full flex-shrink flex-grow basis-0 grid-cols-2 gap-2 overflow-auto py-2 sm:grid">
      <ui-markdown-editor ref="editor" v-model="modelValue" @cursor-update="onCursorUpdate" @scroll="editorScroll" />
      <div ref="render" class="size-full overflow-auto rounded border border-border" @scroll="renderScroll">
        <ui-markdown-render :value="modelValue" class="p-2" tag="article" />
      </div>
    </div>
  </div>
</template>
