<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';
import { authClient } from '~~/shared/auth';

import LoginDialog from '../login-dialog.vue';
import MobileDrawer from './mobile-drawer.vue';

const { state } = useNav();

const router = useRouter();
const { render } = useDrawer();
const { render: renderDialog } = useDialog();
const rawSession = authClient.useSession();

const data = computed(() => rawSession.value.data);
const isPost = computed(() => state.value.postId);
</script>

<template>
  <animate-presence>
    <motion.div
      :data-type="isPost ? 'post' : 'index'"
      layout-root
      class="w-full px-5 z-10 flex items-center group"
    >
      <motion.div layout class="max-w-50% flex items-center gap-2">
        <motion.div
          v-if="isPost"
          layout="position"
          class="text-default-950 size-8 rounded-full z-10 text-sm nav-bg aspect-ratio-square flex items-center justify-center cursor-pointer"
          @click="router.back"
        >
          <motion.div layout class="i-material-symbols:chevron-left size-4" />
        </motion.div>
        <motion.div
          class="w-fit nav-bg rounded-full overflow-hidden"
        >
          <motion.div class="flex items-center">
            <motion.div
              v-if="!isPost"
              layout
              class="text-sm px-4 py-2 grow hidden sm:block"
            >
              <app-categories />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div class="size-fit rounded-full nav-bg cursor-pointer">
          <motion.div
            class="sm:hidden px-4 py-2"
            @click="() => render({ content: h(MobileDrawer) })"
          >
            <div class="i-material-symbols:menu size-4 text-default-800" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        class="ml-auto mr-0 nav-bg p-2 rounded-full z-10"
      >
        <motion.div v-if="!data" class="i-material-symbols:account-circle size-6 text-default-950" @click="() => renderDialog({ content: h(LoginDialog) })" />
        <motion.img v-else :src="data.user.image ?? ''" class="size-6 rounded-full" />
      </motion.div>
    </motion.div>
  </animate-presence>
</template>
