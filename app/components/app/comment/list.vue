<script lang="ts" setup>
const { postId } = defineProps<{
  postId: string;
}>();

const { comments } = useCommenList({ postId });
</script>

<template>
  <div class="w-full h-fit space-y-4 min-h-200px relative">
    <client-only>
      <app-comment-item
        v-for="comment in comments"
        :key="comment.id"
        :content="JSON.parse(comment.content)"
        :avatar="comment.user.image ?? ''"
        :create-at="comment.createdAt"
      />
      <template #fallback>
        <div class="size-full absolute inset-0 flex items-center justify-center">
          <span>Loading...</span>
        </div>
      </template>
    </client-only>
  </div>
</template>
