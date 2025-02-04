<script lang="ts" setup>
import {cn} from '@/lib/utils';
import { watchThrottled } from '@vueuse/core';
const props = defineProps<{
  value: string,
  tag?: string,
  class?: string
}>();

const value = ref(props.value);

watchThrottled(()=>props, ()=>{
  value.value = props.value;
}, {throttle: 300});

</script>

<template>
  <m-d-c
    :value="value"
    :tag="props.tag"
    :class="cn(
      `
        prose prose-stone dark:prose-invert
        prose-headings:no-underline
        hover:prose-h1:before:content-['#']
        hover:prose-h2:before:content-['##']
        hover:prose-h3:before:content-['###']
        hover:prose-h4:before:content-['####']
        prose-p:before:content-none
        prose-p:after:content-none
        prose-p:my-0
        prose-blockquote:not-italic
        prose-headings:before:content-none
        prose-headings:before:text-default-600
        prose-headings:before:mr-2
      `,
      props.class
    )"
  />
</template>