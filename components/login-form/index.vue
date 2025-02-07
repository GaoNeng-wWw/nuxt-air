<script lang="ts" setup>
const emits = defineEmits<{
  success: [];
  fail: [string];
}>();
const profile = useProfile();
const { fetch } = useUserSession();
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
</script>

<template>
  <div class="flex h-32 w-full flex-col justify-center gap-4">
    <ui-button variant="secondary" size="icon" class="w-full px-2" @click="() => openFloatWindow('github')">
      <icon-github class="size-6 fill-foreground text-foreground" />
      GitHub
    </ui-button>
    <ui-button variant="secondary" size="icon" class="w-full px-2" @click="() => openFloatWindow('google')">
      <icon-google class="size-6 fill-foreground text-foreground" />
      Google
    </ui-button>
  </div>
</template>
