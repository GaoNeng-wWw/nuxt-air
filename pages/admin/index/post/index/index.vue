<script lang="ts" setup>
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import {Pin,EllipsisVertical,Pencil} from 'lucide-vue-next';

definePageMeta({
  breadcrumb: false
})

const {status, posts, remove, loadMore, canLoadMore } = usePosts({
  page: 1,
  type: 'scroll'
});
const format = (date: string) => new Date(date).toLocaleDateString()
</script>

<template>
  <div class="w-full h-full flex flex-col gap-1.5">
    <div class="w-full h-fit flex-auto">
      <nuxt-link to="/admin/post/edit">
        <ui-button>
          <pencil class="size-4" />
          {{ $t('admin.post.newButton') }}
        </ui-button>
      </nuxt-link>
    </div>

    <!-- <ui-skeleton v-if="status === 'idle' || status==='pending'" class="h-full w-full" /> -->
    <ui-list :load-more="loadMore" :can-load-more="canLoadMore">
      <ui-list-item v-for="post in posts" :key="post.id">
      <template #header>
        <div class="w-full flex content-between">
          <div class="w-full flex items-center gap-2">
            <Pin v-if="post.pin" class=" text-rose-400 w-4 h-4 rotate-45" />
            <span class="text-xl font-bold">
                {{ post.title }}
              </span>
            </div>
            <client-only>
              <popover>
                <popover-trigger>
                  <ui-button variant="ghost" size="icon">
                    <ellipsis-vertical />
                  </ui-button>
                </popover-trigger>
                <popover-content>
                  <admin-post-menu :id="post.id" :pin="post.pin" @un-pin="post.pin=false" @pin="post.pin=true" @remove="remove" />
                </popover-content>
              </popover>
          </client-only>
          </div>
        </template> 
        <template #extra>
          <div class="w-full h-full space-y-2">
            <div class="space-x-2 text-xs">
              <span>{{ $t('common.createAt') }}: {{ format(post.createAt) }}</span>
              <span>{{ $t('common.updateAt') }}: {{ format(post.updateAt) }}</span>
            </div>
          </div>
        </template>
      </ui-list-item>
      <div v-if="status !== 'idle'" class="w-full flex items-center justify-center text-sm py-2 text-foreground/80">
        {{ $t('admin.post.notMoreData') }}
      </div>
    </ui-list>
  </div>
</template>
