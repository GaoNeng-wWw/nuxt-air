<script lang="ts" setup>
const { data } = useAsyncData('introduction', async () => await queryCollection('introduct').first());
const profile = computed(() => data.value?.profile);
const social = computed(() => data.value?.social ?? []);
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
        <div class="w-full text-default-800 text-xs">
          <p v-for="summary, idx of summaries" :key="idx"> {{ summary }} </p>
        </div>
      </div>
    </div>
    <div v-if="projects.length" class="w-full flex gap-4 mt-2">
      <div class="w-16" />
      <div class="w-fll flex flex-col flex-wrap">
        <nuxt-link v-for="item of social" :key="item.link" :to="item.link">
          <div :class="`i-air:${item.icon} size-5 bg-default-800`" />
        </nuxt-link>
      </div>
    </div>
    <div class="w-full text-default-700 mt-2">
      <p v-if="profile.description" v-for="desc,idx in profile.description" :key="idx">
        {{ desc }}
      </p>
    </div>
  </div>
</template>
