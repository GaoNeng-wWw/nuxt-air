<script lang="ts" setup>
const { repo } = defineProps<{
  repo: string;
}>();

const getRepoInfoQuery = computed(() => repo.split('/'));

const { data, status, error } = useFetch('/api/misc/repo', {
  query: { owner: getRepoInfoQuery.value[0], repo: getRepoInfoQuery.value[1] },
});
</script>

<template>
  <div class="w-full">
    <div v-if="status !== 'error'" class="w-full space-y-4 no-prose p-4 rounded-lg bg-default-100 hover:bg-default-200 cursor-pointer my-2 transition transition-ease-in-out">
      <div class="w-full flex items-start">
        <div class="flex items-center gap-2">
          <nuxt-img :src="data?.avatar" class="size-6 rounded-full" />
          <!-- <div class="size-6 bg-red-500 aspect-square rounded-full" /> -->
          <span class="my-0! no-prose font-bold">
            {{ repo }}
          </span>
        </div>
        <div class="i-octicon:repo size-8 ml-auto mr-0" />
      </div>
      <div class="grow space-y-4">
        <p class="line-clamp-2">
          {{ data?.desc }}
        </p>
        <div class="w-full flex gap-3">
          <div class="flex items-center gap-1">
            <div class="i-material-symbols:star-outline-rounded size-5" />
            <span class="text-xs">{{ data?.star }}</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="i-octicon:repo-forked-24 size-4" />
            <span class="text-xs">{{ data?.fork }}</span>
          </div>
          <div v-if="data?.license" class="flex items-center gap-1">
            <div class="i-octicon:law size-4" />
            <span class="text-xs">{{ data?.license }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full aspect-ratio-video">
      <p>Oops...</p>
      <p>{{ error?.message }}</p>
    </div>
  </div>
</template>
