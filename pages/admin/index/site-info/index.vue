<script lang="ts" setup>
import UiAvatarUpload from '@/components/ui/avatar-upload/index.vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { watchOnce } from '@vueuse/core';
import { GripVertical, Plus, Trash } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { VueDraggable } from 'vue-draggable-plus';
import { z } from 'zod';
import { socialIconNames } from '~/components/icon';

const { data, status } = useFetch('/api/site-info', { method: 'get', server: false });
const siteInfo = useSiteInfo();
const { removeItem } = useExpireLocalStorage();
let counter = 0;
const useId = () => `id-${counter++}`;
const schema = z.object({
  ownerName: z.string().describe('管理员昵称').min(1), // todo: i18n
  ownerBio: z.string().describe('管理员简介').min(1), // todo: i18n
  ownerAvatar: z.string().describe('管理员头像'), // todo: i18n
  social: z.array(
    z.object({
      icon: z.enum(socialIconNames as [string, ...string[]]),
      url: z.string().url(),
      _id: z.string(),
    }).describe('社交媒体'),
  ).describe('社交媒体').optional(),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    ownerBio: data.value?.ownerBio,
    ownerName: data.value?.ownerName,
    ownerAvatar: data.value?.ownerAvatar,
    social: data.value?.social ?? [],
  },
});

watchOnce(data, () => {
  form.setValues({
    ownerBio: data.value?.ownerBio,
    ownerName: data.value?.ownerName,
    ownerAvatar: data.value?.ownerAvatar,
    social: data.value?.social ?? [],
  });
  siteInfo.value = data.value;
  removeItem('site-info');
});

const loading = ref(false);
const isBase64Image = (url: string) => /data:image\/.*;base64/.test(url);
function uploadImage(base64Url: string) {
  const avatarExtensionName = /data:image\/(?<extName>.*);/.exec(base64Url)?.groups?.extName ?? 'png';
  const file = fetch(base64Url)
    .then(resp => resp.blob())
    .then(blob => new File([blob], `avatar.${avatarExtensionName}`, { type: `image/${avatarExtensionName}` }))
    .then(file => file)
    .then((file) => {
      const body = new FormData();
      body.set('file', file);
      return body;
    })
    .then((body) => {
      return $fetch(`/api/upload`, { body, method: 'post' });
    })
    .then(() => {
      // todo: Toast
    });
  return file;
}
const onSubmit = form.handleSubmit(async (value) => {
  loading.value = true;
  const avatarUrl = isBase64Image(value.ownerAvatar) ? uploadImage(value.ownerAvatar) : Promise.resolve(value.ownerAvatar);
  avatarUrl.then((url) => {
    $fetch('/api/site-info', {
      method: 'post',
      body: {
        ...value,
        ownerAvatar: url,
        social: value.social ? value.social : [],
      },
    });
  })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <div class="size-full">
    <form @submit.stop.prevent="onSubmit">
      <ui-form-field v-slot="{ componentField }" name="ownerName">
        <ui-form-item v-auto-animate>
          <ui-form-label>
            Owner Name
          </ui-form-label>
          <ui-form-control>
            <ui-skeleton v-if="status === 'pending'" class="h-8 w-full" />
            <ui-input v-else v-bind="componentField" />
          </ui-form-control>
          <ui-form-message />
        </ui-form-item>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" name="ownerBio">
        <ui-form-item v-auto-animate>
          <ui-form-label>
            Owner Bio
          </ui-form-label>
          <ui-form-control>
            <ui-skeleton v-if="status === 'pending'" class="h-8 w-full" />
            <ui-input v-else v-bind="componentField" />
          </ui-form-control>
          <ui-form-message />
        </ui-form-item>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" name="ownerAvatar">
        <ui-form-item v-auto-animate>
          <ui-form-label>
            Owner Avatar
          </ui-form-label>
          <ui-form-control>
            <ui-avatar-upload v-model:url="componentField.modelValue" @update:url="(val) => componentField['onUpdate:modelValue']?.(val)" />
          </ui-form-control>
          <ui-form-message />
        </ui-form-item>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" v-auto-animate name="social">
        <ui-form-label>
          <div class="flex w-full items-center justify-between">
            Social
            <ui-button
              variant="ghost"
              @click="() => {
                if (!componentField.modelValue) {
                  componentField.modelValue = [{ icon: '', url: '', _id: useId() }];
                }
                else {
                  componentField.modelValue.push({ icon: '', url: '', _id: useId() })
                }
                form.setFieldValue('social', componentField.modelValue)
              }"
            >
              <plus class="size-4 !text-foreground" />
            </ui-button>
          </div>
        </ui-form-label>
        <div class="w-full space-y-2 first:mt-2">
          <vue-draggable
            v-model="componentField.modelValue"
            handle=".handle"
            :animation="200"
            @update="form.setFieldValue('social', componentField.modelValue)"
          >
            <ui-form-field v-for="(social, idx) in componentField.modelValue" :key="social._id" v-auto-animate :name="`social.${idx}`">
              <ui-form-item v-auto-animate>
                <div class="flex w-full items-center justify-center gap-1.5">
                  <grip-vertical class="handle size-4 fill-foreground" />
                  <div class="relative flex w-full">
                    <ui-input v-model="social.url" class="pl-16 ring-0 focus:ring-0" @update:model-value="() => form.setFieldValue('social', componentField.modelValue)" />
                    <div class="absolute top-0 h-fit w-16">
                      <social-select
                        v-model="social.icon"
                        :options="['github', 'x', 'discord']"
                        show-name
                        @update:model-value="() => form.setFieldValue('social', componentField.modelValue)"
                      />
                    </div>
                  </div>
                  <ui-button
                    variant="ghost" class="hover:!bg-red-500/20" size="icon" @click="() => {
                      componentField.modelValue.splice(idx, 1)
                    }"
                  >
                    <trash />
                  </ui-button>
                </div>
                <ui-form-message />
              </ui-form-item>
            </ui-form-field>
          </vue-draggable>
        </div>
      </ui-form-field>
      <ui-button type="submit" class="mt-2" :loading="loading">
        提交
      </ui-button>
    </form>
  </div>
</template>
