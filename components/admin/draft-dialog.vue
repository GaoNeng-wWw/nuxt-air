<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { EllipsisVertical, Mailbox } from 'lucide-vue-next';
import { buttonVariants } from '../ui/button';

const currentPage = ref(1);
const ghostDanger = buttonVariants({
  variant: 'ghost',
  class: 'hover:bg-red-500/50 justify-start w-full',
});
const { posts, meta, remove } = usePosts({
  type: 'page',
  page: currentPage,
  draftOnly: true,
  immediate: true,
  size: 10,
});
const formatDate = (date: string) => localeDate(date);
</script>

<template>
  <div class="flex flex-col overflow-auto px-6 py-4">
    <div class="flex size-full flex-col justify-between overflow-auto break-words">
      <ul class="space-y-2">
        <li v-for="post in posts" :key="post.id">
          <div class="flex w-full flex-col">
            <div class="flex w-full justify-between">
              <nuxt-link :to="`/admin/post/edit?id=${post.id}`">
                {{ post.title }}
              </nuxt-link>
              <ui-popover>
                <ui-popover-trigger>
                  <ui-button variant="ghost" size="icon">
                    <ellipsis-vertical />
                  </ui-button>
                </ui-popover-trigger>
                <ui-popover-content class="space-y-2">
                  <nuxt-link :to="`/admin/post/edit?id=${post.id}`">
                    <ui-button class="w-full justify-start">
                      编辑
                    </ui-button>
                  </nuxt-link>
                  <ui-button variant="ghost" :class="ghostDanger" @click="remove(post.id)">
                    {{ $t('admin.post.del') }}
                  </ui-button>
                </ui-popover-content>
              </ui-popover>
            </div>
            <div class="flex gap-1.5 text-sm">
              <mailbox class="size-4" />
              {{ $t('common.createAt') }}: {{ formatDate(post.createAt) }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="h-fit flex-1 flex-shrink-0">
      <pagination v-slot="{ page }" v-model:page="currentPage" :total="meta?.totalItems" :items-per-page="10" show-edges>
        <pagination-list v-slot="{ items }" class="flex items-center gap-1">
          <pagination-first />
          <pagination-prev />

          <template v-for="(item, index) in items">
            <pagination-list-item v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
              <button class="size-9 p-0" :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </button>
            </pagination-list-item>
            <pagination-ellipsis v-else :key="item.type" :index="index" />
          </template>

          <pagination-next />
          <pagination-last />
        </pagination-list>
      </pagination>
    </div>
  </div>
</template>
