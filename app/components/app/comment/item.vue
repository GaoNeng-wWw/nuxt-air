<script lang="ts" setup>
const {avatar, content} = defineProps<{
  avatar: string;
  createAt: string;
  content: Record<string, any>;
}>()
</script>

<template>
  <div class="w-full flex gap-2">
    <div class="size-10 sticky top-18">
      <nuxt-img :src="avatar" class="rounded-full" />
    </div>
    <div class="w-fit py-2 rounded bg-default-200 flex-1">
      <ui-tiptap :content="content" readonly />
    </div>
  </div>
</template>
