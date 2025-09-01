<script lang="ts" setup>
const {
  avatar,
  name,
  content,
  createAt,
} = defineProps<{
  avatar: string;
  createAt: string;
  content: Record<string, any>;
  name: string;
}>();

const formatedDate = computed(() => new Date(createAt).toLocaleDateString());
</script>

<template>
  <div class="w-full h-fit flex gap-2">
    <div class="size-5 sm:size-10 sticky top-18 shrink-0 transition-all duration-500 ease-out">
      <nuxt-img :src="avatar" class="rounded-full" />
    </div>
    <div class="w-fit max-w-full h-fit rounded flex-1">
      <p class="text-default-900 mb-2 text-sm font-bold">{{ name }}</p>
      <div class="py-2 bg-default-200 rounded-lg">
        <ui-tiptap :content="content" readonly />
      </div>
      <div class="mt-2 text-xs flex">
        <span class="text-default-900">发布于: {{ formatedDate }}</span>
      </div>
    </div>
  </div>
</template>
