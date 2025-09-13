<script lang="ts" setup>
const { rounded } = defineProps<{
  rounded?: boolean;
}>();

const wrapper = useTemplateRef('wrapper');
const play = ref(true);

onMounted(() => {
  if (wrapper.value) {
    play.value = false;
  }
});
</script>

<template>
  <div
    ref="wrapper"
    :data-play="play"
    :data-rounded="rounded"
    class="size-full rounded data-[play=true]:animate-pulse data-[play=false]:animate-fade-out data-[play=true]:bg-default-300 data-[rounded=true]:rounded-full"
  >
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>
