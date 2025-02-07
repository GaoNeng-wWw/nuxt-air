<script lang="ts" setup>
import UiAvatarUpload from '@/components/ui/avatar-upload/index.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { ChevronsUpDown, Plus, Trash } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import Github from '~/components/icon/github.vue';

const schema = z.object({
  ownerName: z.string().describe('管理员昵称'),
  ownerBio: z.string().describe('管理员简介'),
  ownerAvatar: z.string().describe('管理员头像').default('https://avatars.githubusercontent.com/u/31283122?v=4'),
  social: z.array(
    z.object({
      icon: z.enum(['github', 'google']),
      url: z.string(),
    }).describe('社交媒体').optional(),
  ).describe('社交媒体'),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    ownerBio: '123',
    ownerName: '123',
    ownerAvatar: 'https://avatars.githubusercontent.com/u/31283122?v=4',
    social: [],
  },
});
const icons = {
  Github,
};
const onSubmit = form.handleSubmit(() => {});
</script>

<template>
  <div class="size-full">
    <form @submit="() => onSubmit">
      <ui-form-field v-slot="{ componentField }" name="ownerBio">
        <ui-form-label>
          Owner Bio
        </ui-form-label>
        <ui-form-control>
          <ui-input v-bind="componentField" />
        </ui-form-control>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" name="ownerName">
        <ui-form-label>
          Owner Name
        </ui-form-label>
        <ui-form-control>
          <ui-input v-bind="componentField" />
        </ui-form-control>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" name="ownerAvatar">
        <ui-form-label>
          Owner Avatar
        </ui-form-label>
        <ui-form-control>
          <ui-avatar-upload v-model:url="componentField.modelValue" @update:url="(val) => componentField['onUpdate:modelValue']?.(val)" />
        </ui-form-control>
      </ui-form-field>

      <ui-form-field v-slot="{ componentField }" name="social">
        <ui-collapsible>
          <ui-form-label>
            <div class="flex w-full justify-between">
              <span>
                Social
              </span>
              <div>
                <ui-collapsible-trigger as-child>
                  <ui-button size="sm" variant="ghost" class="w-9 p-0">
                    <chevrons-up-down />
                  </ui-button>
                </ui-collapsible-trigger>
                <ui-button size="icon" variant="ghost" type="button" @click="componentField.modelValue.push({})">
                  <plus class="size-4" />
                </ui-button>
              </div>
            </div>
          </ui-form-label>
          <ui-collapsible-content class="pl-2">
            <ui-form-control>
              <ui-collapsible v-for="socialItem, idx in componentField.modelValue" :key="idx">
                <div class="flex w-full justify-between font-mono text-sm">
                  <span>Social</span>
                  <div class="flex gap-1.5">
                    <ui-collapsible-trigger as-child>
                      <ui-button size="sm" variant="ghost" class="w-9 p-0">
                        <chevrons-up-down />
                      </ui-button>
                    </ui-collapsible-trigger>
                    <ui-button size="sm" variant="ghost" class="w-9 p-0 hover:bg-rose-500/20" @click="() => (componentField.modelValue as any[]).splice(idx, 1)">
                      <trash class="text-red-500" />
                    </ui-button>
                  </div>
                </div>
                <ui-collapsible-content class="roudned flex flex-col gap-3 px-3 py-4 font-mono">
                  <ui-form-label>
                    Icon
                  </ui-form-label>
                  <ui-select>
                    <ui-select-trigger>
                      <ui-select-value class="w-full" />
                    </ui-select-trigger>
                    <ui-select-content>
                      <ui-select-group>
                        <ui-select-item value="github" class="flex items-center">
                          <component :is="icons.Github" class="inline-block size-4 fill-foreground" />
                          Github
                        </ui-select-item>
                      </ui-select-group>
                    </ui-select-content>
                  </ui-select>
                  <ui-form-label>
                    Url
                  </ui-form-label>
                  <ui-input v-model="socialItem.url" />
                </ui-collapsible-content>
              </ui-collapsible>
            </ui-form-control>
          </ui-collapsible-content>
        </ui-collapsible>
      </ui-form-field>
    </form>
  </div>
</template>
