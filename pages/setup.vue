<script setup lang="ts">
import { toast } from 'vue-sonner';

const { t } = useI18n();
const router = useRouter();
function onLoginSuccess() {
  $fetch('/api/setup', { method: 'post' })
    .then((status) => {
      if (!status) {
        toast.error(t('common.unknownError'), { position: 'top-center' });
        return;
      }
      router.replace('/');
    });
}
function onLoginFail(reason: string) {
  toast.error(reason, { position: 'top-center' });
}
</script>

<template>
  <div class="flex h-svh w-full flex-col items-center justify-center">
    <div class="w-full max-w-md rounded border border-border p-2">
      <h1 class="text-center text-3xl">
        Setup
      </h1>
      <login-form @success="onLoginSuccess" @fail="onLoginFail" />
    </div>
  </div>
</template>
