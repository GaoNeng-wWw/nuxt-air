<script lang="ts" setup>
import {GitMerge,GitPullRequestClosed,GitPullRequestDraft,GitPullRequest} from 'lucide-vue-next';
const props = defineProps<{
  owner: string,
  repo: string,
  prNumber: number
}>();
const {data, status} = useFetch('/api/pr-card', {
  query: {
    owner: props.owner,
    repo: props.repo,
    pull_number: props.prNumber
  },
  watch: [props],
  deep: true,
  server: false
})
const loading = computed(() => status.value === 'pending');
const prInfo = computed(() => data.value?.info);

</script> 

<template>
  <div v-if="loading" class="w-full h-16 flex flex-col gap-2 mt-2">
    <div class="w-full h-full flex gap-2 items-center">
      <ui-skeleton class="w-16 h-full rounded-md shrink-0" />
      <div class="w-full h-full grid grid-rows-2 gap-2">
        <ui-skeleton class="flex-auto" />
        <ui-skeleton class="flex-auto" />
      </div>
    </div>
  </div>
  <div v-else class="w-fit mx-auto mt-2">
    <nuxt-link v-if="!loading && prInfo" :href="prInfo.link" class="mx-auto no-underline">
      <div class="w-fit max-w-full h-fit p-2 bg-default-900 rounded border border-border">
        <div class="w-full grid grid-cols-[theme('size.6')_1fr] gap-2 items-center">
          <git-merge v-if="prInfo.merged" class="size-6 text-purple-600" />
          <git-pull-request-closed v-else-if="prInfo.state === 'closed'" class="size-6 text-red-600" />
          <git-pull-request-draft v-else-if="prInfo.draft" class="size-6 text-default-600" />
          <git-pull-request v-else class="size-6 text-green-600" />
          <div class="flex gap-1.5 items-center">
            <span class="text-xl line-clamp-2 no-underline" :title="prInfo?.title">
              {{ prInfo?.title }}
            </span>
          </div>
        </div>
        <div class="w-full grid grid-cols-[theme('size.6')_1fr] gap-2">
          <div/>
          <div class="w-full line-clamp-2 break-all text-pretty text-sm text-foreground/80">
            <span>
              {{ prInfo.content }}
            </span>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>