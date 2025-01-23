<script lang="ts" setup>
const openFloatWindow = (method: 'google' | 'github') => {
  const proxy = window.open(`/oauth/${method}`, '', 'toolbar=no,menubar=no');
  if (!proxy){
    return;
  }
  const abort = new AbortController();
  proxy.addEventListener('load', () => {
    if (proxy.location.href.endsWith('/oauth/redirect')){
      proxy.close();
    };
    abort.abort();
  }, {signal: abort.signal})

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