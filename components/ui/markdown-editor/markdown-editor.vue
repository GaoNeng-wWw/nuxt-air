<script lang="ts" setup>
const modelValue = defineModel<string>();
const onKeyUp = (ev:KeyboardEvent) => {
  modelValue.value = (ev.target as HTMLElement).innerText;
}
const editor= useTemplateRef('editor');

onMounted(()=>{
  if (!editor.value){
    return;
  }
  editor.value.innerHTML = modelValue.value ?? ''
})
defineExpose({
  getInstance: ()=>editor.value
})
</script>
<template>
  <div ref="editor" class="w-full h-full border border-border rounded p-2 box-border outline-none overflow-auto" contenteditable="plaintext-only" @keyup="onKeyUp" />
</template>