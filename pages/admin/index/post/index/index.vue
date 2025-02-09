<script lang="ts" setup>
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { EllipsisVertical, Pencil, Pin } from 'lucide-vue-next';

definePageMeta({
  breadcrumb: false,
});

const { status, posts, remove, loadMore, canLoadMore } = usePosts({
  page: 1,
  type: 'scroll',
});
const format = (date: string) => new Date(date).toLocaleDateString();
</script>

<template>
  <div class="flex size-full flex-col gap-1.5">
    <div class="h-fit w-full flex-auto grow-0 basis-0">
      <nuxt-link to="/admin/post/edit">
        <ui-button>
          <Pencil class="size-4" />
          {{ $t('admin.post.newButton') }}
        </ui-button>
      </nuxt-link>
    </div>

    <ui-list :load-more="loadMore" :can-load-more="canLoadMore">
      <ui-list-item v-for="post in posts" :key="post.id">
        <template #header>
          <div class="flex w-full content-between">
            <div class="flex w-full items-center gap-2">
              <Pin v-if="post.pin" class=" size-4 rotate-45 text-rose-400" />
              <span class="text-xl font-bold">
                {{ post.title }}
              </span>
            </div>
            <client-only>
              <Popover>
                <PopoverTrigger>
                  <ui-button variant="ghost" size="icon">
                    <EllipsisVertical />
                  </ui-button>
                </PopoverTrigger>
                <PopoverContent>
                  <admin-post-menu :id="post.id" :pin="post.pin" @un-pin="post.pin = false" @pin="post.pin = true" @remove="remove" />
                </PopoverContent>
              </Popover>
            </client-only>
          </div>
        </template>
        <template #extra>
          <div class="size-full space-y-2">
            <div class="space-x-2 text-xs">
              <span>{{ $t('common.createAt') }}: {{ format(post.createAt) }}</span>
              <span>{{ $t('common.updateAt') }}: {{ format(post.updateAt) }}</span>
            </div>
          </div>
        </template>
      </ui-list-item>
      <div v-if="status !== 'idle'" class="flex w-full items-center justify-center py-2 text-sm text-foreground/80">
        {{ $t('admin.post.notMoreData') }}
      </div>
    </ui-list>
  </div>
</template>
