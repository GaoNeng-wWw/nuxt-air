<script lang="ts" setup>
const props = defineProps<{
  type: 'info' | 'warn' | 'caution';
  title?: string;
}>();

const formatText = (val: string) => `${val[0]?.toUpperCase()}${val.slice(1)}`;
</script>

<template>
  <div
    :data-type="props.type"
    class="
    w-full h-fit border-l-4 border-l border-l-solid pl-4 py-1 space-y-2 mb-4
    data-[type=info]:border-l-blue-600 data-[type=warn]:border-l-orange-500 data-[type=caution]:border-l-red-800
    group
    "
  >
    <div class="w-full flex items-center gap-2">
      <div
        class="
        group-data-[type=caution]:i-material-symbols:info-outline group-data-[type=caution]:size-7
        group-data-[type=info]:i-material-symbols:info-outline group-data-[type=info]:size-7
        group-data-[type=warn]:i-material-symbols:warning-outline-rounded group-data-[type=warn]:size-7
        group-data-[type=info]:bg-blue-600 group-data-[type=warn]:bg-orange-600 group-data-[type=caution]:bg-red-700
        "
      />
      <p
        class="
        group-data-[type=info]text-blue-600 group-data-[type=warn]:text-orange-600 group-data-[type=caution]:text-red-700
        font-bold
      "
      >
        {{ title ? title : formatText(type) }}
      </p>
    </div>
    <div class="w-full">
      <slot />
    </div>
  </div>
</template>
