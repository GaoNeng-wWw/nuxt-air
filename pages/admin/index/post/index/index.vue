<script lang="ts" setup>
import DraftDialog from '@/components/admin/draft-dialog.vue';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { EllipsisVertical, Mailbox as MailBox, Pencil, Pin } from 'lucide-vue-next';

definePageMeta({
  breadcrumb: false,
});

const { status, posts, remove, loadMore, canLoadMore } = usePosts({
  page: 1,
  type: 'scroll',
  publish: true,
});
const format = (date: string) => new Date(date).toLocaleDateString();
const { render } = useDialog({ content: h(DraftDialog), contentClass: cn('sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]') });
</script>

<template>
  <div class="flex size-full flex-col gap-1.5">
    <div class="flex h-fit w-full flex-auto grow-0 basis-0 gap-2">
      <nuxt-link to="/admin/post/edit">
        <ui-button>
          <pencil class="size-4" />
          {{ $t('admin.post.newButton') }}
        </ui-button>
      </nuxt-link>
      <ui-button @click="render">
        <mail-box class="size-4" />
        {{ $t('admin.post.draft-btn') }}
      </ui-button>
    </div>

    <ui-list :load-more="loadMore" :can-load-more="canLoadMore">
      <ui-list-item v-for="post in posts" :key="post.id">
        <template #header>
          <div class="flex w-full content-between">
            <div class="flex w-full items-center gap-2">
              <pin v-if="post.pin" class=" size-4 rotate-45 text-rose-400" />
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
                  <admin-post-menu :id="post.id" :pin="post.pin" @un-pin="post.pin = false" @pin="post.pin = true" @remove="remove" />
                </popover-content>
              </popover>
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
