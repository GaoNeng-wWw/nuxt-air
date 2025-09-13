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
  <div class="w-full p-4 rounded flex gap-2">
    <div
      class="size-fit p-1.75 rounded-full border border-solid border-default-400 cursor-pointer hover:scale-110 transition duration-300 ease-in-out active:scale-95"
      @click="() => signIn('github')"
    >
      <div class="i-air:github size-5 text-default-900" />
    </div>
  </div>
</template>
