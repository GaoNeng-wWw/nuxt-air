<script lang="ts" setup>
const {
  id,
  title,
  desc,
  tag,
  createAt,
  updateAt,
} = defineProps<{
  id: number;
  title: string;
  desc?: string;
  tag: { name: string }[];
  createAt: string | null;
  updateAt: string | null;
}>();

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
</script>

<template>
  <div class="w-full h-full">
    <nuxt-link
      :key="id"
      :to="`/post/${id}?edit=true`"
      class="
      p-2 rounded-md cursor-pointer transition border border-transparent
      group-data-[disabled-hover=true]:hover:bg-transparent!
      group-data-[disabled-hover=true]:hover:border-transparent!
      hover:border-default-300 hover:bg-default-200 block"
    >
      <li>
        <slot name="title" :title="title">
          <p class="text-lg text-default-900">
            {{ title ? title : 'Untitled Post' }}
          </p>
        </slot>
        <p v-if="desc" class="text-default-700 line-clamp-2" :title="desc">
          <slot name="desc" :desc="desc" />
        </p>
        <slot name="meta" v-bind="{ createAt, formatDate, tags: tag }">
          <p v-if="createAt" class="text-sm text-default-600 font-800">
            创建于: {{ formatDate(createAt) }}
          </p>
          <p v-if="updateAt" class="text-sm text-default-600 font-800">
            最后一次修改 {{ formatDate(updateAt) }}
          </p>
        </slot>
      </li>
    </nuxt-link>
  </div>
</template>
