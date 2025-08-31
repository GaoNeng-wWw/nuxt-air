<script lang="ts" setup>
import type { H3Error } from 'h3';
import type { IComment } from '~/composables/use-comment-list';
import { toast } from 'vue-sonner';

import { authClient } from '~~/shared/auth';

const { id } = defineProps<{ id: string }>();

const emits = defineEmits<{
  sendSuccess: [IComment];
}>();

const rawSession = authClient.useSession();

const data = computed(() => rawSession.value.data);
const session = computed(() => data.value?.session);

const character = ref(0);
const maxCharacter = ref(200);
const tiptap = useTemplateRef('tiptap');

function onCharacterUpdate(count: number) {
  character.value = count;
}

function sendComment() {
  const content = tiptap.value?.getJSONContent();
  if (!content) {
    return;
  }
  $fetch(`/api/comment`, {
    method: 'PUT',
    body: {
      postId: id,
      content: JSON.stringify(content),
    },
  })
    .then((comment: IComment) => {
      emits('sendSuccess', comment);
      tiptap.value?.clearContent();
    })
    .catch((err: H3Error<H3Error>) => {
      if (!err.data) {
        return;
      }
      toast.error(err.data.message);
    });
}
</script>

<template>
  <div class="w-full h-fit relative mt-8">
    <div v-if="!session" class="w-full min-h-100px bg-default-200 relative rounded-lg py-4">
      <div class="w-full h-full flex flex-col items-center justify-center gap-3">
        <span class="text-sm text-default-800">登录</span>
        <app-comment-login-mask class="size-fit! mx-auto py-0" />
      </div>
    </div>
    <div v-else class="w-full h-fit bg-default-100 rounded-xl ring ring-default-200 hover:ring-default-400 transition duration-200 focus:ring-default-400">
      <div class="h-100px">
        <ui-tiptap ref="tiptap" @character-update="onCharacterUpdate" />
      </div>
      <div class="w-full h-px bg-default-200" />
      <div class="w-full py-2 px-2 flex items-center text-default-950">
        <div class="w-fit flex-1">
          <span class="text-default-950 text-xs">支持Markdown语法</span>
        </div>
        <div class="flex items-center gap-2 text-xs transition duration-200">
          <div class="w-fit">
            {{ character }} / {{ maxCharacter }}
          </div>
          <ui-button v-if="character" variant="ghost" @click="sendComment">
            发送
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>
