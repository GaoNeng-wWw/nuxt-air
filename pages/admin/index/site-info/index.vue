<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';

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
    </form>
  </div>
</template>
