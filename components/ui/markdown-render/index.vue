<script lang="ts" setup>
import {cn} from '@/lib/utils';
const props = defineProps<{
  value: string,
  tag: string,
  class?: string
}>();
</script>

<template>
  <m-d-c 
    :value="props.value" :tag="props.tag"
    :class="cn(
      `
        prose prose-stone dark:prose-invert
        hover:prose-h1:before:content-['#']
        hover:prose-h2:before:content-['##']
        hover:prose-h3:before:content-['###']
        hover:prose-h4:before:content-['####']
        prose-p:before:content-none
        prose-p:after:content-none
        prose-blockquote:not-italic
        prose-headings:before:content-none
        prose-headings:before:text-default-600
        prose-headings:before:mr-2
      `,
      props.class
    )"
  />
</template>