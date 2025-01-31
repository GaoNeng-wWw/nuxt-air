<script lang="ts" setup>
import {Send} from 'lucide-vue-next';
const {id, type = 'post'} = defineProps<{
  id: number;
  type: 'post' | 'reply'
}>()
const reply = ref('');
const {setLoading} = useLoading();
const onClickSend = () => {
  setLoading(true);
  $fetch(
    `/api/reply`,
    {
      method: 'post',
      query: {
        parentId: unref(id),
        type: unref(type)
      },
      body: {
        content: unref(reply)
      }
    }
  )
  .finally(()=>{
    setLoading(false);
  })
}
</script>

<template>
  <auth-state>
    <template #default="{loggedIn}">
      <div class="w-full p-3 bg-default-900 space-y-2.5 rounded border border-default-700">
        <div v-if="!loggedIn" class="w-full">
          <p class="text-center">请先登录</p>
          <login-form />
        </div>
        <div v-else>
          <textarea
            ref="reply-editor"
            v-model="reply"
            placeholder="说些什么吧..."
            class="w-full h-40 bg-default-800 p-2 rounded overflow-auto outline-none text-sm resize-none"
          />
          <div class="w-full flex flex-wrap gap-1.5 items-center justify-between px-2">
            <span class="text-sm text-default-400">支持Markdown & GFM</span>

            <span class="cursor-pointer text-sm" @click="onClickSend">
              <send class="size-3 inline-block mr-1.5" />
              发送
            </span>
          </div>
        </div>
      </div>
    </template>
  </auth-state>
</template>