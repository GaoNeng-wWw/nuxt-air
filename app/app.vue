<script lang="ts" setup>
import { useDark } from '@vueuse/core';
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui';

const { locale } = useI18n();
useDark();

const {
  tags,
} = useTags();
</script>

<template>
  <div class="w-full h-full min-h-dvh bg-stone-100 dark:bg-stone-950 relative">
    <lazy-client-only>
      <nav class="w-full fixed top-4 px-4 z-10">
        <div class="max-w-4xl py-4 px-8 mx-auto rounded-full bg-default-100 bg-opacity-90 backdrop-blur border border-solid border-default-300">
          <hover-card-root>
            <hover-card-trigger>
              <nuxt-link to="/" active-class="text-default-900" class="text-default-700">
                {{ $t('posts') }}
              </nuxt-link>
            </hover-card-trigger>
            <hover-card-portal>
              <hover-card-content
                :side-offset="24"
                align="center"
                class="py-1 px-8 bg-default-100 bg-opacity-90 text-default-800 rounded-lg backdrop-blur border border-default-300"
              >
                <nuxt-link
                  v-for="tag of tags"
                  :key="tag.id"
                  class="block py-2 "
                  active-class="text-primary-500"
                  :to="`/posts/${tag.id}`"
                >
                  <div>
                    {{ tag[locale] }}
                  </div>
                </nuxt-link>
              </hover-card-content>
            </hover-card-portal>
          </hover-card-root>
        </div>
      </nav>
    </lazy-client-only>
    <nuxt-page keepalive />
  </div>
</template>