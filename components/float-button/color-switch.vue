<script lang="ts" setup>
import { Moon, Sun } from 'lucide-vue-next';
</script>

<template>
  <float-button-item>
    <color-scheme>
      <Moon v-if="$colorMode.preference === 'dark'" @click="$colorMode.preference = 'light'" />
      <Sun v-else @click="$colorMode.preference = 'dark'" />
    </color-scheme>
  </float-button-item>
</template>
