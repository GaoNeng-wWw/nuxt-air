<script lang="ts" setup>
const {bid,p, autoPlay} =defineProps<{
  bid: string,
  p?:number,
  autoPlay?: boolean
}>();

// const url = computed(() => `//player.bilibili.com/player.html?isOutside=true&bvid=${unref(bid)}&p=${unref(p)}`)
const url = computed(()=>{
  const base = `https://player.bilibili.com/player.html`;
  const url = new URL(base);
  url.searchParams.append('isOutside','true');
  url.searchParams.append('bvid',unref(bid));
  url.searchParams.append('p',unref(p)?.toString() ?? '1');
  url.searchParams.append('autoPlay',unref(autoPlay) ? '1' : '0');
  return url.toString()
})

</script>

<template>
  <div class="w-full">
    <iframe
    :src="url"
    frameborder="0"
    scrolling="no"
    border="0"
    framespacing="0"
    allowfullscreen="true"
    class="w-full h-full"
    loading="lazy"
    />
  </div>
</template>

<style scoped>
iframe {
  aspect-ratio: 16 / 9;
}
</style>