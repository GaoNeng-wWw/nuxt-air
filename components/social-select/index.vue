<script lang="ts" setup>
import Discord from '../icon/discord.vue';
import Github from '../icon/github.vue';
import Twitter from '../icon/twitter.vue';

const props = defineProps<{
  options: string[];
  showName?: boolean;
  className?: string;
}>();
const selected = defineModel<string>({ required: false, default: '' });
const icons: Record<string, Component> = {
  github: Github,
  twitter: Twitter,
  x: Twitter,
  discord: h(Discord, { class: '!fill-[#5865F2]' }),
};
</script>

<template>
  <ui-select v-model="selected">
    <ui-select-trigger class="ring-0 focus:ring-0">
      <div class="w-full">
        <component :is="icons[selected]" class="size-4 fill-foreground" />
      </div>
    </ui-select-trigger>
    <ui-select-content avoid-collisions>
      <ui-select-item v-for="(item, idx) in props.options" :key="idx" :value="item">
        <div class="flex w-fit items-center justify-center gap-1.5">
          <component :is="icons[item]" class="size-4 fill-foreground" />
          <span v-if="showName">{{ item }}</span>
        </div>
      </ui-select-item>
    </ui-select-content>
  </ui-select>
</template>
