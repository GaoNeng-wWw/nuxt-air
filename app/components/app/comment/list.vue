<script lang="ts" setup>
import type { Comment } from '@prisma/client';
import type { H3Error } from 'h3';
import type { IComment } from '~/composables/use-comment-list';
import { motion } from 'motion-v';
import { toast } from 'vue-sonner';

const { postId } = defineProps<{
  postId: string;
}>();

const { comments, addExtract, extractComment, remove } = useCommenList({ postId });

function onReloadComments(comment: IComment) {
  addExtract(comment);
}
function patchComment(id: number, comment: Partial<Comment>) {
  return $fetch(`/api/comment/${id}`, {
    method: 'patch',
    body: { ...comment },
  })
    .then(comment => comment)
    .catch((error: H3Error<H3Error>) => {
      if (error.data) {
        toast.error(error.data.message);
      }
      throw error;
    });
}

function togglePin(id: number) {
  const comment = comments.value.filter(comment => comment.id === id)[0];
  if (!comment) {
    return;
  }
  patchComment(comment.id, { pin: !comment.pin })
    .then((newComment) => {
      comments.value = comments.value.filter(comment => comment.id !== id);
      if (newComment.pin) {
        comments.value.unshift(newComment);
      } else {
        comments.value.push(newComment);
      }
    });
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
          :id="comment.id"
          :name="comment.user.name"
          :content="JSON.parse(comment.content)"
          :avatar="comment.user.image ?? ''"
          :create-at="comment.createdAt"
          :pin="comment.pin"
          @remove-success="remove"
          @toggle-pin="() => togglePin(comment.id)"
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
          :id="comment.id"
          :name="comment.user.name"
          :content="JSON.parse(comment.content)"
          :avatar="comment.user.image ?? ''"
          :create-at="comment.createdAt"
          :pin="comment.pin"
          @remove-success="remove"
          @toggle-pin="() => togglePin(comment.id)"
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
