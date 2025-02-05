<script setup lang="ts">
import { toast } from 'vue-sonner';
const {t} = useI18n();
const router = useRouter();
const onLoginSuccess = () => {
  $fetch('/api/setup',{method: 'post'})
  .then((status)=>{
    if (!status){
      toast.error(t('common.unknownError'), {position: 'top-center'});
      return
    }
    router.replace('/');
  })
}
const onLoginFail = (reason: string) => {
  toast.error(reason, {position: 'top-center'});
}
</script>

<template>
  <div class="w-full h-svh flex flex-col items-center justify-center">
    <div class="max-w-md w-full border border-border p-2 rounded">
      <h1 class="text-center text-3xl">Setup</h1>
      <login-form @success="onLoginSuccess" @fail="onLoginFail" />
    </div>
  </div>
</template>
