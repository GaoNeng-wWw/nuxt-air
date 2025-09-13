<script lang="ts" setup>
const route = useRoute();
const { data } = useAsyncData(async () => await queryCollection('post').path(route.path).first());
const references = computed(() => data.value?.references ?? []);
</script>

<template>
  <div class="w-full">
    <h2 id="references">References</h2>
    <ol>
      <nuxt-link v-for="referce of references" :key="referce.id" :to="referce.doi">
        <li>
          {{ referce.title }}
        </li>
      </nuxt-link>
    </ol>
  </div>
</template>
