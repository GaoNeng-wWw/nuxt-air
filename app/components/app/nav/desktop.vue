<script lang="ts" setup>
import { AppLoginDialog } from '#components';
import { AnimatePresence, motion } from 'motion-v';
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui';
import { authClient } from '~~/shared/auth';

const { locale } = useI18n();

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
  <motion.nav
    class="max-w-4xl w-full sticky top-0 px-4 z-10 top-4 flex  mx-auto items-center gap-8 transition transition-all duration-300"
  >
    <motion.div
      layout
      :transition="{
        duration: 0.4,
        ease: ['easeOut', 'easeOut'],
        type: 'tween',
      }"
      class="
          py-3 px-8 rounded-full bg-default-100 bg-opacity-90 backdrop-blur border border-solid border-default-300
          w-full
          mx-0 sm:w-[calc(100%_-_2.5rem)] transition-all duration-300 ease-out
          "
    >
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
    </motion.div>
    <animate-presence>
      <motion.div
        layout
        :transition="{
          duration: 0.4,
          ease: ['easeOut', 'easeOut'],
          type: 'tween',
        }"
        class="
            bg-default-200 aspect-ratio rounded-full p-1 size-10 block
            absolute right-0 -translate-x-50% transition
            sm:static sm:translate-none sm:border sm:border-solid sm:border-default-300
          "
      >
        <app-account-button v-if="!user" class="size-full! bg-default-800!" @click="showLoginDialog" />
        <nuxt-img v-if="user?.image" :src="user?.image" class="size-full rounded-full" />
      </motion.div>
    </animate-presence>
  </motion.nav>
</template>
