<script lang="ts" setup>
import {vInfiniteScroll} from '@vueuse/components';
import {cn} from '@/lib/utils';
const props = defineProps<{
  loadMore?: ()=>Promise<void> | void,
  canLoadMore?: ()=>boolean,
  class?: string
}>()
const onLoadMore = () => {
  props.loadMore?.();
}
</script>
<template>
  <div v-infinite-scroll="[onLoadMore, {distance:10,canLoadMore}]" :class="cn('w-full overflow-auto', props.class)">
    <div class="w-full space-y-2">
      <slot />
    </div>
  </div>
</template>