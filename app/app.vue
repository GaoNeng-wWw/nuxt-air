<script lang="ts" setup>
import { AppLoginDialog } from '#components';
import { useDark } from '@vueuse/core';
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui';
import { authClient } from '~~/shared/auth';

const { locale } = useI18n();
useDark();

const {
  tags,
} = useTags();

const { render } = useDialog();

const rawSession = authClient.useSession();
const data = computed(() => rawSession.value.data);
const user = computed(() => data.value?.user);

function showLoginDialog() {
  render({
    content: h(AppLoginDialog),
  });
}
</script>

<template>
  <div class="w-full h-full min-h-dvh bg-stone-100 dark:bg-stone-950 relative py-4">
    <lazy-client-only>
      <nav class="max-w-4xl w-full sticky top-0 px-4 z-10 top-4 grid cols-[1fr_calc(var(--spacing)_*_10)] mx-auto items-center gap-8">
        <div class="w-full py-3 px-8 mx-auto rounded-full bg-default-100 bg-opacity-90 backdrop-blur border border-solid border-default-300">
          <hover-card-root>
            <hover-card-trigger>
              <nuxt-link to="/" active-class="text-default-900" class="text-default-700 text-sm">
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
        <div class="p-1 bg-default-200 border border-solid border-default-300 size-10 aspect-ratio rounded-full">
          <app-account-button v-if="!user" class="size-full! bg-default-800!" @click="showLoginDialog" />
          <nuxt-img v-if="user?.image" :src="user?.image" class="size-full rounded-full" />
        </div>
      </nav>
    </lazy-client-only>
    <toaster theme="system" rich-colors />
    <nuxt-page keepalive />
  </div>
</template>
