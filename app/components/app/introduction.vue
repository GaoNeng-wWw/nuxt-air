<script lang="ts" setup>
const { data } = useAsyncData('introduction', async () => await queryCollection('introduct').first());
const profile = computed(() => data.value?.profile);
const projects = computed(() => data.value?.projects ?? []);
const orgs = computed(() => data.value?.organization ?? []);
const randomChoice = <T>(arr: T[]): T | undefined => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const summaries = computed(() => {
  if (!profile) { return '' }
  if (!profile.value?.summary) {
    return '';
  }
  return profile.value?.summary?.type === 'static' ? profile.value.summary.content : [randomChoice(profile.value?.summary?.choices) ?? ''];
})

</script>

<template>
  <div v-if="profile" class="w-full px-6">
    <div class="w-full flex gap-4">
      <nuxt-img :src="profile.avatar" class="size-16 rounded-full" />
      <div class="w-fit flex flex-col justify-around">
        <h1 class="text-default-900 font-bold text-xl">{{ profile.name }}</h1>
        <div class="w-full text-default-800">
          <p v-for="summary, idx of summaries" :key="idx"> {{ summary }} </p>
        </div>
      </div>
    </div>
    <div class="w-full space-y-4 mt-4">
      <div class="w-full" v-if="projects.length">
        <div class="w-full gap-4 list">
          <h2 class="text-sm text-default-800">Contribute & Project:</h2>
          <ul class="flex gap-2 flex-wrap">
            <nuxt-link v-for="proj, idx of projects" :key="idx" :href="proj.link">
              <li class="w-fit px-2 py-1 rounded-full bg-default-500/20 flex items-center gap-2">
                <nuxt-img :src="proj.icon" class="size-6 rounded-full " />
                <span class="text-default-800">{{ proj.name }}</span>
              </li>
            </nuxt-link>
          </ul>
        </div>
      </div>
      <div class="w-full gap-4 list  grid-items-center" v-if="orgs.length">
        <h2 class="text-sm text-default-800 shrink-0">Member Of:</h2>
        <div class="w-full flex gap-2 flex-wrap">
          <ul class="flex gap-2 flex-wrap">
            <nuxt-link v-for="org, idx of orgs" :key="idx" :href="org.link">
              <li class="w-fit px-2 py-1 rounded-full bg-default-500/20 flex items-center gap-2">
                <nuxt-img :src="org.icon" class="size-6 rounded-full " />
                <span class="text-default-800">{{ org.name }}</span>
              </li>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
}
</style>