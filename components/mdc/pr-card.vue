<script lang="ts" setup>
import {GitMerge,GitPullRequestClosed,GitPullRequestDraft,GitPullRequest} from 'lucide-vue-next';
import {Octokit} from '@octokit/core';
const props = defineProps<{
  owner: string,
  repo: string,
  prNumber: number
}>();
export type PrAuthor = {
  name: string;
  avatar: string;
}
export type PrInfo = {
  title: string;
  content: string;
  prNumber: number;
  link: string;
  merged: boolean;
  draft?:boolean;
  locked: boolean;
  state: 'open' | 'closed'
}
const prInfo = ref<PrInfo | null>(null);
const author = ref<PrAuthor | null>(null);
const octokit = new Octokit();
const loading = ref(true);

watch(()=>props, ()=>{
  octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}',{
    owner: props.owner,
    repo: props.repo,
    pull_number: props.prNumber,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  .then((payload) => {
    author.value = {
      name:payload.data.user.login,
      avatar: payload.data.user.avatar_url
    }
    prInfo.value = {
      title: payload.data.title,
      content: payload.data.body?.slice(0,200) ?? '',
      prNumber: props.prNumber,
      link: payload.data.html_url,
      state: payload.data.state,
      locked: payload.data.locked,
      merged: payload.data.merged,
      draft: payload.data.draft,
    }
  })
  .finally(()=>{
    loading.value = false;
  })
}, {immediate: true, deep: true})

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