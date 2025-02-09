<script lang="ts" setup>
import UiAvatarUpload from '@/components/ui/avatar-upload/index.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { watchOnce } from '@vueuse/core';
import { GripVertical, Plus, Trash } from 'lucide-vue-next';
import { v4 } from 'uuid';
import { useForm } from 'vee-validate';
import Draggable from 'vuedraggable';
import { z } from 'zod';
import { socialIconNames } from '~/components/icon';

const { data, status } = useFetch('/api/site-info', { method: 'get', server: false });
const siteInfo = useSiteInfo();
const { removeItem } = useExpireLocalStorage();
definePageMeta({
  name: 'admin::site-setting',
});
const useId = () => v4();
const schema = z.object({
  ownerName: z.string().describe('管理员昵称').min(1), // todo: i18n
  ownerBio: z.string().describe('管理员简介').min(1), // todo: i18n
  ownerAvatar: z.string().describe('管理员头像'), // todo: i18n
  social: z.array(
    z.object({
      icon: z.enum(socialIconNames as [string, ...string[]]),
      url: z.string().url(),
      _id: z.string().optional(),
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
        <ui-form-item>
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
        <ui-form-item>
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
        <ui-form-item>
          <ui-form-label>
            Owner Avatar
          </ui-form-label>
          <ui-form-control>
            <ui-avatar-upload v-model:url="componentField.modelValue" @update:url="(val) => componentField['onUpdate:modelValue']?.(val)" />
          </ui-form-control>
          <ui-form-message />
        </ui-form-item>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" name="social">
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
          <draggable
            :list="componentField.modelValue"
            handle=".handle"
            item-key="_id"
            :disabled="false"
            :animation="120"
          >
            <template #item="{ element, index }">
              <div>
                <ui-form-field :key="element._id" :name="`social.${index}`">
                  <ui-form-item>
                    <div class="flex w-full items-center justify-center gap-1.5">
                      <grip-vertical class="handle size-4 fill-foreground" />
                      <div class="relative flex w-full">
                        <ui-input v-model="element.url" class="pl-16 ring-0 focus:ring-0" @update:model-value="() => form.setFieldValue('social', componentField.modelValue)" />
                        <div class="absolute top-0 h-fit w-16">
                          <social-select
                            v-model="element.icon"
                            :options="['github', 'x', 'discord']"
                            show-name
                            @update:model-value="() => form.setFieldValue('social', componentField.modelValue)"
                          />
                        </div>
                      </div>
                      <ui-button
                        variant="ghost" class="hover:!bg-red-500/20" size="icon"
                        @click.prevent.stop="() => {
                          componentField.modelValue = componentField.modelValue.filter((item: any) => item._id !== element._id);
                          form.setFieldValue('social', componentField.modelValue ?? [])
                          console.log(componentField.modelValue);
                        }"
                      >
                        <trash />
                      </ui-button>
                    </div>
                    <ui-form-message />
                  </ui-form-item>
                </ui-form-field>
              </div>
            </template>
          </draggable>
        </div>
      </ui-form-field>
      <ui-button type="submit" class="mt-2" :loading="loading">
        提交
      </ui-button>
    </form>
  </div>
</template>
