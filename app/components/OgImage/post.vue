<script lang="ts" setup>
const {
  title,
  description,
  tags,
} = defineProps<{
  title: string;
  description: string;
  tags: string[];
}>();

const { tags: availableTags } = useTags();

const displayedTag = computed(() => availableTags.value?.filter(tag => toValue(tags).includes(tag.id)));
const { locale } = useI18n();
</script>

<template>
  <div class="w-100vw h-100vh bg-zinc-950 px-10 relative">
    <svg class="absolute top-0 right-0" width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g style="mix-blend-mode:overlay" opacity="0.7" filter="url(#filter0_f_448_25)">
        <circle cx="250" cy="100" r="199.5" fill="#303A46" />
        <circle cx="400" cy="200" r="199" fill="#463130" />
        <circle cx="255" cy="300" r="199" fill="#313046" />
      </g>
      <defs>
        <filter id="filter0_f_448_25" x="-240" y="-374" width="1561" height="1111" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="110" result="effect1_foregroundBlur_448_25" />
        </filter>
      </defs>
    </svg>
    <div class="p-[60px] flex flex-col gap-8">
      <h1
        class="text-[84px] text-white py-0 my-0 " :style="{
          lineHeight: 1,
        }"
      >
        {{ title }}
      </h1>
      <p
        class="max-w-50% text-zinc-200 text-sm my-0 line-height-normal" :style="{
          display: 'block',
          lineClamp: 3,
        }"
      >
        {{ description }}
      </p>
      <div class="w-full flex">
        <span
          v-for="tag in displayedTag" :key="tag.id"
          class="
          text-base px-4 py-2 rounded-full backdrop-blur-20px backdrop-brightness-100 bg-green-500/10
          dark:text-white
          text-black
          "
        >
          <span>{{ tag[locale] }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
