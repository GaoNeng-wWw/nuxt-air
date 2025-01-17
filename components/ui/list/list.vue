<script lang="ts" setup>
import {vInfiniteScroll} from '@vueuse/components';
const props = defineProps<{
  loadMore?: ()=>Promise<void> | void,
  canLoadMore?: ()=>boolean
}>()
const onLoadMore = () => {
  props.loadMore?.();
}
</script>
<template>
  <div v-infinite-scroll="[onLoadMore, {distance:10,canLoadMore}]" class="w-full overflow-auto">
    <div class="w-full space-y-2">
      <slot />
    </div>
  </div>
</template>