<script lang="ts" setup>
import { GitMerge, GitPullRequest, GitPullRequestClosed, GitPullRequestDraft } from 'lucide-vue-next';

const props = defineProps<{
  owner: string;
  repo: string;
  prNumber: number;
}>();
const { data, status } = useFetch('/api/pr-card', {
  query: {
    owner: props.owner,
    repo: props.repo,
    pull_number: props.prNumber,
  },
  watch: [props],
  deep: true,
  server: false,
});
const loading = computed(() => status.value === 'pending');
const prInfo = computed(() => data.value?.info);
</script>

<template>
  <div v-if="loading" class="mt-2 flex h-16 w-full flex-col gap-2">
    <div class="flex size-full items-center gap-2">
      <ui-skeleton class="h-full w-16 shrink-0 rounded-md" />
      <div class="grid size-full grid-rows-2 gap-2">
        <ui-skeleton class="flex-auto" />
        <ui-skeleton class="flex-auto" />
      </div>
    </div>
  </div>
  <div v-else class="mx-auto mt-2 w-fit">
    <nuxt-link v-if="!loading && prInfo" :href="prInfo.link" class="mx-auto no-underline">
      <div class="size-fit max-w-full rounded border border-border bg-default-900 p-2">
        <div class="grid w-full grid-cols-[theme('size.6')_1fr] items-center gap-2">
          <GitMerge v-if="prInfo.merged" class="size-6 text-purple-600" />
          <GitPullRequestClosed v-else-if="prInfo.state === 'closed'" class="size-6 text-red-600" />
          <GitPullRequestDraft v-else-if="prInfo.draft" class="size-6 text-default-600" />
          <GitPullRequest v-else class="size-6 text-green-600" />
          <div class="flex items-center gap-1.5">
            <span class="line-clamp-2 text-xl no-underline" :title="prInfo?.title">
              {{ prInfo?.title }}
            </span>
          </div>
        </div>
        <div class="grid w-full grid-cols-[theme('size.6')_1fr] gap-2">
          <div />
          <div class="line-clamp-2 w-full text-pretty break-all text-sm text-foreground/80">
            <span>
              {{ prInfo.content }}
            </span>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
