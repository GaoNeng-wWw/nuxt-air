<script lang="ts" setup>
import {MarkdownRender} from '@/components/ui/markdown-render';
const route = useRoute();
const id = ref<string>(route.params.id.toString() ?? '');

const {data, status, error} = await useAsyncData(`post-${id.value}`, ()=>$fetch(`/api/post/${id.value}`));
</script>

<template>
    <div class="max-w-xl w-full h-auto px-2 sm:px-0 py-4 mx-auto mt-4">
      <markdown-render v-if="data?.post" :value="data.post.content" :tag="'article'" />
    </div>
</template>

