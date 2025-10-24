<script lang="ts" setup>
import { m } from 'motion-v';

const { tags } = useTags();

const { locale } = useI18n();
const colorMode = useColorMode();
function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
}
</script>

<template>
  <div class="w-full h-300px overflow-auto">
    <div class="h-200px">
      <div class="w-full">
        <div class="w-full flex items-center justify-between">
          <nuxt-link active-class="text-primary-500" class="text-lg text-bold text-default-900" to="/">
            {{ $t('posts') }}
          </nuxt-link>
          <color-scheme>
            <m.div
              layout
              class="size-fit p-2 rounded-full nav-bg cursor-pointer transition"
              @click="toggleColorMode"
            >
              <m.div
                v-if="$colorMode.preference === 'light'"
                layout
                class="size-4 i-material-symbols:clear-day-rounded text-default-800 cursor-pointer"
              />
              <m.div
                v-else
                class="size-4 i-material-symbols:mode-night text-default-800 cursor-pointer"
              />
            </m.div>
          </color-scheme>
        </div>
        <div class="px-4 mt-2 space-y-2 text-default-700">
          <nuxt-link v-for="tag of tags" :key="tag.id" class="block" active-class="text-primary-500" :to="`/posts/${tag.id}`">
            {{ tag[locale] }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
