<script lang="ts" setup>
import { authClient } from '~~/shared/auth';

const client = authClient;
function signIn(provider: string) {
  client.signIn.social({
    provider,
  });
}
</script>

<template>
  <div class="w-full flex flex-col gap-2 pt-5">
    <ui-button full class="py-2 flex items-center justify-center gap-1" @click="() => signIn('github')">
      <div class="i-air:github size-4" />
      <span class="text-sm">Github</span>
    </ui-button>
  </div>
</template>
