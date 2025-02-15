<script lang="ts" setup>
import { UiButton } from '#components';
import type { Component, VNode } from 'vue';
import Github from '../icon/github.vue';
import Google from '../icon/google.vue';

const emits = defineEmits<{
  success: [];
  fail: [string];
}>();
const profile = useProfile();
const { fetch } = useUserSession();
const createIcon = (comp:Component) => h(comp, {class: 'size-6 fill-foreground text-foreground'});
const createText = (content: string) => h('span', ()=>content);
const createItem = (
  icon: VNode,
  text: string,
  onClick: ()=>void
) => h(
  UiButton,
  {variant: 'secondary',size: 'icon',class:'w-full px-2', onClick: ()=>onClick()},
  {
    default: ()=>[icon, text]
  }
)
const createOAuthButtons = ()=> {
  const comps = [];
  if (ENABLE_GITHUB_OAUTH) {
    const githubIcon = createIcon(Github);
    comps.push(createItem(githubIcon, 'GitHub', ()=>openFloatWindow('github')))
  }
  if (ENABLE_GOOGLE_OAUTH){
    const googleIcon = createIcon(Google);
    comps.push(createItem(googleIcon, 'Google', ()=>openFloatWindow('google')))
  }
  return comps;
}
function openFloatWindow(method: 'google' | 'github') {
  const proxy = window.open(`/auth/${method}`, '', 'toolbar=no,menubar=no');
  if (!proxy) {
    return;
  }
  proxy.addEventListener('load', () => {
    if (proxy.location.href.endsWith('/oauth/redirect?type=success')) {
      fetch()
        .then(() => {
          return $fetch('/api/profile');
        })
        .then(realProfile => profile.value = realProfile)
        .then(() => proxy.close())
        .then(() => {
          emits('success');
        });
    } else {
      const failReason = /\?type=fail&reason=(?<reason>:.*)/.exec(proxy.location.href);
      emits('fail', failReason?.groups?.reason ?? '');
    };
  });
}
const OAuthButtons = createOAuthButtons();
</script>

<template>
  <div class="flex h-32 w-full flex-col justify-center gap-4">
    <component v-for="(btn,idx) in OAuthButtons" :key="idx" :is="btn" />
  </div>
</template>
