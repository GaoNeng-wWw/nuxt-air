<script lang="ts" setup>
import { Send } from 'lucide-vue-next';

const { id, type = 'post' } = defineProps<{
  id: number;
  type: 'post' | 'reply';
}>();
const reply = ref('');
const { setLoading } = useLoading();
function onClickSend() {
  setLoading(true);
  $fetch(
    `/api/reply`,
    {
      method: 'post',
      query: {
        parentId: unref(id),
        type: unref(type),
      },
      body: {
        content: unref(reply),
      },
    },
  )
    .finally(() => {
      setLoading(false);
    });
}
</script>

<template>
  <auth-state>
    <template #default="{ loggedIn }">
      <div class="w-full space-y-2.5 rounded border border-default-700 bg-default-900 p-3">
        <div v-if="!loggedIn" class="w-full">
          <p class="text-center">
            请先登录
          </p>
          <login-form />
        </div>
        <div v-else>
          <textarea
            v-model="reply"
            placeholder="说些什么吧..."
            class="h-40 w-full resize-none overflow-auto rounded bg-default-800 p-2 text-sm outline-none"
          />
          <div class="flex w-full flex-wrap items-center justify-between gap-1.5 px-2">
            <span class="text-sm text-default-400">支持Markdown & GFM</span>

            <span class="cursor-pointer text-sm" @click="onClickSend">
              <Send class="mr-1.5 inline-block size-3" />
              发送
            </span>
          </div>
        </div>
      </div>
    </template>
  </auth-state>
</template>
