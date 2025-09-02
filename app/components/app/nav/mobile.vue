<script lang="ts" setup>
import { AppLoginDialog } from '#components';
import { AnimatePresence, motion } from 'motion-v';
import { authClient } from '~~/shared/auth';
import MobileDrawer from './mobile-drawer.vue';

const rawSession = authClient.useSession();
const data = computed(() => rawSession.value.data);
const user = computed(() => data.value?.user);
const { render } = useDialog();

const { render: renderDrawer } = useDrawer();

const router = useRouter();
const postTitle: Ref<string | null> = ref(null);

function showMenu() {
  renderDrawer({
    content: h(MobileDrawer),
  });
}

function showLoginDialog() {
  render({
    content: h(AppLoginDialog),
  });
}

watch(router.currentRoute, () => {
  queryCollection('post')
    .path(router.currentRoute.value.path)
    .first()
    .then((post) => {
      if (!post) {
        postTitle.value = null;
        return;
      }
      postTitle.value = post.title;
    });
}, { immediate: true, deep: true });
</script>

<template>
  <div class="w-full h-16 sticky top-0 flex items-center justify-between px-4 bg-default-50/10 backdrop-blur-2xl z-100">
    <motion.button class="cursor-pointer flex items-center gap-2" @click="showMenu">
      <div class="i-material-symbols:menu-rounded size-8 text-default-800" />
    </motion.button>
    <animate-presence>
      <motion.p
        v-if="postTitle"
        class="text-xl text-default-800 line-height-none"
        :initial="{ opacity: 0, translateY: -20 }"
        :animate="{ opacity: 1, translateY: 0 }"
        :exit="{ opacity: 0, translateY: -20 }"
        layout="size"
        :transition="{ ease: ['easeOut', 'easeOut'], duration: 0.4, type: 'spring' }"
      >
        <p :key="postTitle ?? 'null'">
          {{ postTitle }}
        </p>
      </motion.p>
    </animate-presence>
    <motion.div
      layout
      :transition="{
        duration: 0.4,
        ease: ['easeOut', 'easeOut'],
        type: 'tween',
      }"
      class="
      bg-default-200 aspect-ratio rounded-full p-1
      size-10 block border border-solid border-default-300
      "
    >
      <app-account-button v-if="!user" class="size-full! bg-default-800!" @click="showLoginDialog" />
      <nuxt-img v-if="user?.image" :src="user?.image" class="size-full rounded-full" />
    </motion.div>
  </div>
</template>
