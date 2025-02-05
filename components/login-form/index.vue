<script lang="ts" setup>
const profile = useProfile();
const { fetch } = useUserSession();
const emits = defineEmits<{
  success: [],
  fail: [string]
}>()
const openFloatWindow = (method: 'google' | 'github') => {
  const proxy = window.open(`/auth/${method}`, '', 'toolbar=no,menubar=no');
  if (!proxy){
    return;
  }
  proxy.addEventListener('load', () => {
    if (proxy.location.href.endsWith('/oauth/redirect?type=success')){
      fetch()
      .then(()=>{
        return $fetch('/api/profile')
      })
      .then((realProfile) => profile.value = realProfile)
      .then(() => proxy.close())
      .then(()=>{
        emits('success');
      })
    } else {
      const failReason= /\?type=fail&reason=(.*)/.exec(proxy.location.href);
      emits('fail', failReason?.[0] ?? '');
    };
  })

}
</script>

<template>
  <div class="w-full h-32 flex flex-col gap-4 justify-center">
    <ui-button variant="secondary" size="icon" class="w-full px-2" @click="()=>openFloatWindow('github')">
      <icon-github class="size-6 text-foreground fill-foreground" />
      GitHub
    </ui-button>
    <ui-button variant="secondary" size="icon" class="w-full px-2" @click="()=>openFloatWindow('google')">
      <icon-google class="size-6 text-foreground fill-foreground" />
      Google
    </ui-button>
  </div>
</template>