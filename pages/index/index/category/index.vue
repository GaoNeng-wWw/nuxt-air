<script lang="ts" setup>
import { Hash } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const router = useRouter();
const id = computed(() => Number.parseInt(router.currentRoute.value.query.id?.toString() ?? ''));
const { data: category, status, error } = await useAsyncData(`category-${id.value}`, () => $fetch(`/api/categories/${unref(id)}`).then(category => category.name));

useHead({
  title: category,
});

watch(status, () => {
  if (status.value === 'error') {
    const { data: { message } } = error.value as { data: HttpException };
    toast.error(message, { position: 'top-center' });
    router.replace('/');
  }
}, { immediate: true });
</script>

<template>
  <section class=" mx-auto size-full max-w-lg">
    <article class="py-8">
      <div class="flex items-center justify-center gap-1 text-4xl">
        <Hash v-if="category" class="size-9" />
        {{ category }}
      </div>
    </article>
    <article class="overflow-visible">
      <post-list :category="id" />
    </article>
  </section>
</template>
