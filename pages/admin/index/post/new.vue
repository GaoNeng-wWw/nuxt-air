<script lang="ts" setup>
const postTitle = ref('');
const postContent = ref('');
</script>

<template>
  <div class="w-full h-full py-2 flex flex-col gap-2">
    <div class="w-full space-y-2 flex items-center gap-1.5">
      <ui-input id="post-title" v-model="postTitle" placeholder="标题" />
      <ui-button class="!mt-0">
        保存
      </ui-button>
    </div>
    <div class="max-w-full h-full p-2 grid grid-cols-2 overflow-auto">
      <ui-textarea v-model="postContent" class="w-full min-h-full outline-none prose dark:prose-invert" />
      <ui-scroll-area class="h-full w-full">
        <m-d-c :value="postContent" class="w-full h-full py-2 px-3 overflow-auto break-words prose dark:prose-invert" />
        <ui-scroll-bar forceMount />
      </ui-scroll-area>
    </div>
  </div>
</template>