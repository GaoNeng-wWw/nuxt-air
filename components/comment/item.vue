<script lang="ts" setup>
defineOptions({inheritAttrs: true})
const {
  id,
  content,
  createAt,
  author,
  childrenCount,
  expand,
  childrenExpand
} = defineProps<{
  id: number,
  content: string,
  createAt: string,
  author: ReplyNode['author'],
  childrenCount: number | null,
  expand: (id: number)=>void,
  childrenExpand: boolean
}>();
const formatDate = (date:string|Date) => new Date(date).toLocaleDateString();
const getFallbackName = (name:string) => name.slice(0,2)

</script>
<template>
  <div ref="wrapper" class="w-full">
    <div class="flex flex-col gap-1.5">
      <div class="w-full flex gap-1.5 items-center">
        <ui-avatar class="size-8">
          <ui-avatar-fallback>
            {{ getFallbackName(author.name) }}
          </ui-avatar-fallback>
          <ui-avatar-image :src="author.avatar ?? ''" />
        </ui-avatar>
        <div class="flex w-full grow flex-wrap gap-1 items-end">
          <span>{{ author.name }}</span>
          <span class="text-sm">{{ formatDate(createAt) }}</span>
        </div>
      </div>
      <div class="ml-10">
        {{ content }}
        <slot name="toolbar" />
        <div class="-ml-3">
          <ui-button v-if="childrenCount && !childrenExpand" variant="ghost" class="w-fit" @click="()=>expand(id)">
            剩余{{ childrenCount }}条评论
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>