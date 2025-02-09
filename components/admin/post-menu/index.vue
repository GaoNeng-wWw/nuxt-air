<script lang="ts" setup>
import { buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next';

const { id, pin = false } = defineProps<{
  id: number;
  pin: boolean;
}>();
const emits = defineEmits<{
  unPin: [];
  pin: [];
  remove: [number];
}>();

const ghostDanger = buttonVariants({
  variant: 'ghost',
  class: 'hover:bg-red-500/50 justify-start',
});
const loadingButtonId = ref('');
const { updatePost } = usePost();
function unPin() {
  loadingButtonId.value = 'pin';
  updatePost(id, { pin: false });
  emits('unPin');
  loadingButtonId.value = '';
}
function pinPost() {
  loadingButtonId.value = 'pin';
  updatePost(id, { pin: true })
    .then((data) => {
      if (!data) {
        return;
      }
      emits('pin');
    });
  loadingButtonId.value = '';
}
function remove() {
  loadingButtonId.value = 'del';
  emits('remove', id);
  loadingButtonId.value = '';
}
</script>

<template>
  <div class="flex size-full flex-col gap-2">
    <nuxt-link :to="`/admin/post/edit?id=${id}`" class="w-full">
      <ui-button variant="ghost" class="w-full justify-start">
        {{ $t('admin.post.edit') }}
      </ui-button>
    </nuxt-link>
    <ui-button v-if="pin" variant="ghost" class="justify-start" :disabled="loadingButtonId === 'pin'" @click="unPin">
      <Loader2 v-if="loadingButtonId === 'pin'" />
      {{ $t('admin.post.unpin') }}
    </ui-button>
    <ui-button v-if="!pin" variant="ghost" class="justify-start" :disabled="loadingButtonId === 'pin'" @click="pinPost">
      <Loader2 v-if="loadingButtonId === 'pin'" />
      {{ $t('admin.post.pin') }}
    </ui-button>
    <ui-button variant="ghost" :class="ghostDanger" :disabled="loadingButtonId === 'del'" @click="remove">
      <Loader2 v-if="loadingButtonId === 'del'" />
      {{ $t('admin.post.del') }}
    </ui-button>
  </div>
</template>
