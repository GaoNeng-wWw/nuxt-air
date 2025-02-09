<script lang="ts" setup>
import { CloudUpload } from 'lucide-vue-next';

const file = defineModel<File>('file');
const modelValueUrl = defineModel<string>('url', { required: true, default: '' });
const url = ref(modelValueUrl.value);
const fileUploader = useTemplateRef('file-uploader');
function parseFileAsString(file: File | undefined): Promise<string | null> {
  return new Promise((resolve, reject) => {
    if (!file) {
      return resolve(null);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
}
function onChange(e: Event) {
  const ev = e as InputEvent;
  const readyFile = (ev.target as HTMLInputElement).files?.[0];
  if (!readyFile) {
    return;
  }
  file.value = readyFile;

  parseFileAsString(readyFile)
    .then((base64) => {
      url.value = base64 ?? '';
      modelValueUrl.value = url.value;
    });
}
watch(() => modelValueUrl, () => {
  url.value = modelValueUrl.value;
}, { immediate: true, deep: true });
</script>

<template>
  <div class="group relative w-fit cursor-pointer">
    <ui-avatar class="size-24">
      <ui-avatar-image :src="url" />
    </ui-avatar>
    <div class="pointer-events-none absolute left-0 top-0 flex size-full items-center justify-center rounded-full opacity-0 transition-all duration-300 hover:opacity-100 group-hover:pointer-events-auto group-hover:bg-black/50 group-hover:opacity-100" @click="fileUploader?.click">
      <cloud-upload />
      <input
        ref="file-uploader"
        class="hidden"
        type="file"
        @change="onChange"
      >
    </div>
  </div>
</template>
