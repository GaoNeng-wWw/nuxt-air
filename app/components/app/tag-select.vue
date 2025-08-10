<script lang="ts" setup>
import type { Tag } from '@prisma/client';
import type { SerializeObject } from 'nitropack';
import { useScroll } from '@vueuse/core';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';

const { tags, nextPage, selectTag, canShowShadowTag } = defineProps<{
  tags: SerializeObject<Tag>[];
  nextPage: () => Promise<void> | void;
  selectTag: (tag: SerializeObject<Tag>) => void;
  canShowShadowTag: boolean;
}>();
const emits = defineEmits<{
  create: [string];
}>();
const modelValue = defineModel<SerializeObject<Tag>[]>({ default: [] });
const searchName = defineModel<string>('search-name', { default: '' });

const popoverMenuContent = useTemplateRef('popover-menu-content');
const { arrivedState } = useScroll(
  popoverMenuContent,
);
const { bottom } = toRefs(arrivedState);
function onHandleCreate() {
  emits('create', searchName.value);
}
watch(bottom, () => {
  nextPage();
}, { immediate: true });
</script>

<template>
  <popover-root>
    <popover-trigger as-child>
      <ui-button icon variant="ghost">
        <i class="i-material-symbols:add-2 size-5" />
      </ui-button>
    </popover-trigger>
    <popover-portal>
      <popover-content :side-offset="8" class="relative flex flex-col bg-default-100 w-200px max-h-200px h-full rounded border border-default-300 light:shadow text-foreground">
        <div class="w-full sticky top-0 bg-default-100 p-3 border-b border-default-300">
          <ui-input v-model="searchName" class="h-10" @keydown.enter="onHandleCreate" />
        </div>
        <div v-if="tags" ref="popover-menu-content" class="w-full h-full my-2 p-3 pt-0 space-y-2 overflow-auto">
          <div
            v-for="tag in searchName ? tags.filter(t => t.name.includes(searchName)) : tags"
            :key="tag.id"
            :data-active="modelValue.filter(t => t.id === tag.id).length > 0"
            class="
                w-full p-2 hover:bg-default-200 rounded
                transition ease-in-out cursor-pointer border border-transparent hover:border-default-300
                data-[active=true]:bg-default-200 data-[active=true]:border-default-200
                "
            @click="() => selectTag(tag)"
          >
            {{ tag.name }}
          </div>
        </div>
        <div v-if="canShowShadowTag" class="w-full p-2">
          {{ searchName }}
        </div>
      </popover-content>
    </popover-portal>
  </popover-root>
</template>
