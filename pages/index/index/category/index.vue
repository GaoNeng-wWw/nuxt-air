<script lang="ts" setup>
import {Hash} from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const router = useRouter();
const id = computed(() => Number.parseInt(router.currentRoute.value.query.id?.toString() ?? ''));
const {data:category, status, error } = await useAsyncData(`category-${id.value}`, ()=>$fetch(`/api/categories/${unref(id)}`).then((category)=>category.name));
watch(status, ()=>{
  if (status.value === 'error') {
    const {data:{message}} = error.value as {data: HttpException};
    toast.error(message, { position: 'top-center' })
    router.replace('/')
  }
}, {immediate: true});
</script>

<template>
  <section class=" max-w-lg w-full h-full mx-auto">
    <article class="py-8">
      <div class="flex items-center justify-center gap-1 text-4xl">
        <hash v-if="category" class="size-9" />
        {{ category }}
      </div>
    </article>
    <article class="overflow-visible">
      <post-list :category="id" />
    </article>
  </section>
</template>