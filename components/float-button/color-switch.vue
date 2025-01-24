<script lang="ts" setup>
import { Moon, Sun } from 'lucide-vue-next';
</script>

<template>
  <float-button-item>
    <color-scheme>
      <moon v-if="$colorMode.preference === 'dark'" @click="$colorMode.preference = 'light'" />
      <sun v-else @click="$colorMode.preference = 'dark'" />
    </color-scheme>
  </float-button-item>
</template>