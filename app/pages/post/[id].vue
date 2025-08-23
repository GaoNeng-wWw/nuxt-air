<script lang="ts" setup>
const route = useRoute();
const { data } = useAsyncData(route.path, async () => await queryCollection('post').path(route.path).first());
</script>

<template>
  <div class="w-full h-full px-8 pt-24 pb-12 max-w-4xl mx-auto">
    <content-renderer
      v-if="data" :data="data" :value="data"
      class="
        prose
        prose-stone
        max-w-full
        dark:prose-invert
        prose-headings:my-4
        prose-headings:no-underline
        prose-headings:before:mr-2
        prose-headings:before:text-default-600
        prose-headings:before:content-none
        prose-h1:mb-0
        prose-p:my-0
        prose-p:before:content-none
        prose-p:after:content-none
        prose-a:no-underline
        prose-blockquote:not-italic
        prose-pre:block
        prose-pre:prose-code:*:block
        prose-ul:prose-li:my-0
        prose-table:table prose-table:w-full
        prose-table:max-w-full prose-table:mx-auto prose-table:w-fit
        prose-td:b-none prose-tr:bg-transparent! prose-th:b-none
        prose-th:b-t-2 prose-th:b-t-solid prose-th:b-t-default-500
        prose-th:b-b-1 prose-th:b-b-solid prose-th:b-b-default-500
        [&_tbody_tr:last-child]:b-b-2 [&_tbody_tr:last-child]:b-b-solid [&_tbody_tr:last-child]:b-b-default-500
      "
    />
  </div>
</template>

<style>
.prose :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *))::before,
.prose :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *))::after{
  display: none;
}
.prose :where(ul > li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
  margin: 0;
  padding: 0;
}
.prose :where(ol > li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
  margin: 0;
}
</style>