<script lang="ts" setup>
import { socialIcons } from '../icon';

const siteInfo = useSiteInfo();
const icons = socialIcons;
</script>

<template>
  <div v-if="siteInfo" class="w-full py-2">
    <div class="grid grid-cols-[theme('size.24')_1fr] gap-2.5">
      <div class="w-24">
        <ui-avatar class="size-24">
          <ui-avatar-fallback>
            {{ siteInfo.ownerName }}
          </ui-avatar-fallback>
          <ui-avatar-image :src="siteInfo.ownerAvatar" />
        </ui-avatar>
      </div>
      <div class="flex w-full flex-col justify-center gap-1">
        <p class="text-2xl">
          {{ siteInfo.ownerName }}
        </p>
        <p class="text-base">
          {{ siteInfo.ownerBio }}
        </p>
        <div class="flex w-full flex-wrap gap-2">
          <nuxt-link v-for="(icon, idx) in siteInfo.social" :key="idx" :href="icon.url">
            <component :is="icons[icon.icon]" class="size-6 fill-foreground" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
