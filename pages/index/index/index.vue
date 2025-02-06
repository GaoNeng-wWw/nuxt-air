<script lang="ts" setup>
import Github from '@/components/icon/github.vue';

const icons:Record<string, Component> = {
  github: Github
}

const siteInfo:PublicSiteInfo = {
  ownerName: 'GaoNeng-wWw',
  ownerAvatar: 'https://avatars.githubusercontent.com/u/31283122?v=4',
  ownerBio: '日复一日, 必有精进',
  social: [
    {
      url: 'https://github.com/GaoNeng-wWw',
      icon: 'github'
    },
  ]
}
</script>

<template>
  <section class="max-w-xl w-full h-full px-2 sm:px-0 py-4 mx-auto overflow-auto">
    <div class="w-full py-2">
      <div class="grid grid-cols-[theme('size.24')_1fr] gap-2.5">
        <div class="w-24">
          <ui-avatar class="size-24">
            <ui-avatar-fallback>
              {{ siteInfo.ownerName }}
            </ui-avatar-fallback>
            <ui-avatar-image :src="siteInfo.ownerAvatar" />
          </ui-avatar>
        </div>
        <div class="w-full flex flex-col justify-center gap-1">
          <p class="text-2xl">{{ siteInfo.ownerName }}</p>
          <p class="text-base">{{ siteInfo.ownerBio }}</p>
          <div class="w-full flex flex-wrap gap-2">
            <nuxt-link v-for="(icon,idx) in siteInfo.social" :key="idx" :href="icon.url">
              <component :is="icons[icon.icon]" class="size-6 fill-foreground" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <post-list show-categories />
  </section>
</template>