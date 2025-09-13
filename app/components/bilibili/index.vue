<script lang="ts" setup>
const { autoPlay = false, p = 1, bvid } = defineProps<{
  autoPlay?: boolean;
  p?: number | string;
  bvid: string;
}>();
const base = new URL('https://player.bilibili.com/player.html');
const url = computed(() => {
  base.searchParams.append('bvid', bvid);
  base.searchParams.append('p', p.toString());
  base.searchParams.append('autoplay', autoPlay ? '1' : '0');
  return base.toString();
});
</script>

<template>
  <div class="w-full aspect-ratio-video rounded">
    <ui-skeleton>
      <iframe :src="url" border="0" frameborder="no" framespacing="0" allowfullscreen scrolling="no" class="w-full h-full rounded-lg" />
    </ui-skeleton>
  </div>
</template>
