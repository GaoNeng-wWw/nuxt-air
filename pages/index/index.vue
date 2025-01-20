<script lang="ts" setup>
const {categories} = useCategories({
  page: 1,
  type: 'scroll'
})
</script>

<template>
  <div class="w-full h-full mx-auto py-8 px-2">
    <header class="max-w-lg px-2 mx-auto">
      <nav class="w-full">
        <ul class="flex flex-col overflow-auto sm:flex-row max-h-40 gap-2 w-full sm:overflow-x-auto sm:overflow-y-hidden">
          <nuxt-link to="/" class="text-3xl shrink-0 hover:text-slate-50 transition duration-300 cursor-pointer">
            <li>
              {{ $t('navbar.index') }}
            </li>
          </nuxt-link> 
          <nuxt-link 
            v-for="category in categories"
            :key="category.id"
            exact-active-class="text-red-500"
            class="text-3xl shrink-0 text-muted-foreground/80 hover:text-slate-50 transition duration-300 cursor-pointer"
            :to="{path: '/posts', query:{category:category.id}}"
          >
            <li>
              {{ category.name }}
            </li>
          </nuxt-link>
        </ul>
      </nav>
    </header>
    <main class="h-auto">
      <nuxt-page />
    </main>
  </div>
</template>