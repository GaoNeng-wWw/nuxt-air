<script lang="ts" setup>
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Placeholder } from '@tiptap/extensions';
import { StarterKit } from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { useScroll } from '@vueuse/core';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';

const popoverMenuContent = useTemplateRef('popover-menu-content');
const { arrivedState } = useScroll(
  popoverMenuContent,
);

const { bottom } = toRefs(arrivedState);

const editor = useEditor({
  // autofocus: true,
  content: '',
  extensions: [
    Placeholder.configure({
      placeholder: 'write something...',
      emptyNodeClass: 'text-foreground/50',
    }),
    StarterKit,
    TaskList.configure({
      HTMLAttributes: {
        class: '[&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li_p]:my-0',
      },
    }),
    TaskItem,
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-stone outline-none',
    },
  },
});

const { tags, selectedTag, total, create, selectTag, nextPage, searchName, canShowShadowTag } = useTag({ immediate: true });
function onHandleCreate() {
  create({
    name: searchName.value,
    desc: '',
  })
    .then((tag) => {
      if (!tag) {
        return;
      }
      if (!tags.value) {
        return;
      }
      tags.value.push({ ...tag, deleteAt: tag.deleteAt?.toString() ?? null });
      total.value += 1;
      searchName.value = '';
    });
}
watch(bottom, () => {
  nextPage();
}, { immediate: true });
</script>

<template>
  <div class="w-full h-full py-4">
    <nuxt-link to="/">
      <ui-button icon variant="ghost">
        <div class="i-material-symbols:chevron-left-rounded size-6 text-foreground" />
      </ui-button>
    </nuxt-link>
    <input
      type="text"
      placeholder="Unititled Post"
      class="
       w-full outline-none py-2 text-foreground placeholder-foreground/80 text-4xl wrap-anywhere whitespace-normal
       border-b border-zinc-600 dark:border-zinc-300
      "
    >
    <div class="w-full flex flex-wrap gap-2 py-2">
      <popover-root>
        <popover-trigger as-child>
          <ui-button icon variant="ghost">
            <i v-if="!selectedTag.length" class="i-material-symbols:add-2 size-5" />
            <span v-else class="min-w-5 min-h-5">{{ selectedTag[0]?.name }}</span>
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
                :data-active="selectedTag.filter(t => t.id === tag.id).length > 0"
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
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<style>
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
