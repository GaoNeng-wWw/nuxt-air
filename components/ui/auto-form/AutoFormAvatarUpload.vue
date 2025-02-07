<script lang="ts" setup>
import type { FieldProps } from './interface';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { CloudUpload } from 'lucide-vue-next';
import { beautifyObjectName } from './utils';

defineProps<FieldProps>();
const fileUploader = useTemplateRef('file-uploader');
const readyFile = ref<File | null>();
const avatarUrl = ref('');
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
</script>

<template>
  <form-field v-slot="slotProps" :name="fieldName">
    <form-item v-bind="$attrs">
      <form-label v-if="!config?.hideLabel" :require="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </form-label>
    </form-item>
    <form-control>
      <slot v-bind="slotProps">
        <div class="group relative w-fit cursor-pointer" @click="fileUploader?.click">
          <ui-avatar class="size-24">
            <ui-avatar-image :src="avatarUrl || slotProps.componentField.modelValue" />
          </ui-avatar>
          <div class="pointer-events-none absolute left-0 top-0 flex size-full items-center justify-center rounded-full opacity-0 transition-all duration-300 hover:opacity-100 group-hover:pointer-events-auto group-hover:bg-black/50 group-hover:opacity-100">
            <cloud-upload />
            <input
              ref="file-uploader"
              class="hidden"
              type="file"
              @change="(e: Event) => {
                const ev = e as InputEvent;
                const file = (ev.target as HTMLInputElement).files?.[0];
                readyFile = file;
                parseFileAsString(file)
                  .then((url) => {
                    slotProps.componentField.onInput(url);
                  })
              }"
            >
          </div>
        </div>
      </slot>
    </form-control>
  </form-field>
</template>
