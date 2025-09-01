<script lang="ts" setup>
import type { IComment } from '~/composables/use-comment-list';
import { motion } from 'motion-v';

const { postId } = defineProps<{
  postId: string;
}>();

const { comments, addExtract, extractComment } = useCommenList({ postId });

function onReloadComments(comment: IComment) {
  addExtract(comment);
}

defineExpose({ onReloadComments });
</script>

<template>
  <div class="w-full h-fit space-y-4 min-h-200px relative">
    <client-only>
      <motion.div
        v-for="comment, idx of extractComment"
        :key="comment.id"
        :initial="{ opacity: 0, translateY: 20 }"
        :animate="{ opacity: 1, translateY: 0 }"
        :transition="{
          duration: 0.4,
          ease: ['easeOut', 'easeOut'],
          delay: (idx % 20) / 10,
          type: 'tween',
        }"
      >
        <app-comment-item
          :name="comment.user.name"
          :content="JSON.parse(comment.content)"
          :avatar="comment.user.image ?? ''"
          :create-at="comment.createdAt"
        />
      </motion.div>
      <motion.div
        v-for="comment, idx in comments" :key="comment.id"
        :initial="{ opacity: 0, translateY: 20 }"
        :animate="{ opacity: 1, translateY: 0 }"
        :transition="{
          duration: 0.4,
          ease: ['easeOut', 'easeOut'],
          delay: (idx % 20) / 10,
          type: 'tween',
        }"
      >
        <app-comment-item
          :name="comment.user.name"
          :content="JSON.parse(comment.content)"
          :avatar="comment.user.image ?? ''"
          :create-at="comment.createdAt"
        />
        <template #fallback>
          <motion.div
            :initial="{ opacity: 0, translateY: -20 }"
            :animate="{ opacity: 1, translateY: 0 }"
            :transition="{
              duration: 0.4,
              ease: ['easeOut', 'easeOut'],
              type: 'tween',
            }"
            class="size-full absolute inset-0 flex items-center justify-center"
          >
            <span>Loading...</span>
          </motion.div>
        </template>
      </motion.div>
    </client-only>
  </div>
</template>
