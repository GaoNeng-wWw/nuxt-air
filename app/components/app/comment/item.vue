<script lang="ts" setup>
import type { User } from 'better-auth';
import type { H3Error } from 'h3';
import { toast } from 'vue-sonner';
import { authClient } from '~~/shared/auth';

const {
  avatar,
  name,
  content,
  createAt,
  id,
  pin,
} = defineProps<{
  id: number;
  avatar: string;
  createAt: string;
  content: Record<string, any>;
  name: string;
  pin: boolean;
}>();

const emits = defineEmits<{
  removeSuccess: [number];
  togglePin: [number];
}>();

const rawSession = authClient.useSession();
const data = computed(() => rawSession.value.data);
const user = computed(() => data.value?.user as User & { role: string });
const role = computed(() => user.value?.role);
const formatedDate = computed(() => new Date(createAt).toLocaleDateString());
const loading = ref(false);
function removeComment() {
  loading.value = true;
  $fetch(`/api/comment/${id}`, {
    method: 'delete',
  })
    .then((comment) => {
      emits('removeSuccess', comment.id);
    })
    .catch((error: H3Error<H3Error>) => {
      if (error.data) {
        toast.error(error.data?.message);
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
function togglePin() {
  emits('togglePin', id);
}
</script>

<template>
  <div class="w-full h-fit flex gap-2">
    <div class="size-5 sm:size-10 sticky top-18 shrink-0 transition-all duration-500 ease-out">
      <nuxt-img :src="avatar" class="rounded-full" />
    </div>
    <div class="w-fit max-w-full h-fit rounded flex-1">
      <p class="text-default-900 mb-2 text-sm font-bold">
        {{ name }}
      </p>
      <div class="py-2 bg-default-200 rounded-lg">
        <ui-tiptap :content="content" readonly />
      </div>
      <div class="mt-2 text-xs flex justify-between items-center">
        <span class="text-default-900">发布于: {{ formatedDate }}</span>
        <ui-popover v-if="role === 'admin'">
          <ui-popover-trigger>
            <ui-button icon variant="ghost">
              <div class="i-material-symbols:more-vert" />
            </ui-button>
          </ui-popover-trigger>
          <ui-popover-content>
            <div class="w-full px-2 py-2 space-y-2">
              <ui-button full variant="ghost" class="hover:bg-red-500/20!" :loading="loading" @click="removeComment">
                删除
              </ui-button>
              <ui-button full variant="ghost" @click="togglePin">
                {{ !pin ? '置顶' : '取消置顶' }}
              </ui-button>
            </div>
          </ui-popover-content>
        </ui-popover>
      </div>
    </div>
  </div>
</template>
