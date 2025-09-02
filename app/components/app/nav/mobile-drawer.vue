<script lang="ts" setup>
const { tags } = useTags();

const { locale } = useI18n();
</script>

<template>
  <div class="w-full h-300px overflow-auto">
    <div class="h-200px">
      <div class="w-full">
        <nuxt-link active-class="text-primary-500" class="text-lg text-bold text-default-900" to="/">
          {{ $t('posts') }}
        </nuxt-link>
        <div class="px-4 mt-2 space-y-2 text-default-700">
          <nuxt-link v-for="tag of tags" :key="tag.id" class="block" active-class="text-primary-500" :to="`/posts/${tag.id}`">
            {{ tag[locale] }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
