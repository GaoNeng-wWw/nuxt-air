<script lang="ts" setup>
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Placeholder } from '@tiptap/extensions';
import { StarterKit } from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';

const route = useRoute();
const draftRaw: Ref<boolean[]> = ref([]);
const draft = computed(() => draftRaw.value[0]);
const postId = ref(-1);
const postTitle = ref('');
const syncTitle = ref(true);
const { tags, total, create, nextPage, selectTag, canShowShadowTag, selectedTag, unSelect, searchName } = useTag({ immediate: true });
const editor = useEditor({
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
  onUpdate(props) {
    if (!syncTitle.value) {
      return;
    }
    postTitle.value = props.editor.$doc.querySelector('heading')?.textContent ?? '';
  },
});
function createTag(tagName: string) {
  create({
    name: tagName,
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
onMounted(() => {
  if (route.query.id) {
    $fetch(`/api/post/:id`, {
      query: {
        id: route.query.id,
      },
    })
      .then((post) => {
        if (!post) {
          return;
        }
        postId.value = post.id;
        postTitle.value = post.title;
        syncTitle.value = false;
        draftRaw.value = [post.draft];
        if (!editor.value) {
          return;
        }
        editor.value.commands.setContent(post.content);
      });
    return;
  }
  $fetch('/api/post', {
    method: 'put',
    body: {
      title: postTitle.value,
      content: '',
      tagId: [],
    },
  })
    .then((post) => {
      postId.value = post.id;
    });
});
</script>

<template>
  <div class="w-full h-full py-4">
    <div class="w-full flex justify-between">
      <nuxt-link to="/">
        <ui-button icon variant="ghost">
          <div class="i-material-symbols:chevron-left-rounded size-6 text-foreground" />
        </ui-button>
      </nuxt-link>
    </div>
    <input
      v-model="postTitle"
      type="text"
      placeholder="Unititled Post"
      class="
       w-full outline-none py-2 text-foreground placeholder-foreground/80 text-4xl wrap-anywhere whitespace-normal
       border-b border-zinc-600 dark:border-zinc-300
      "
      @keydown="() => syncTitle = false"
    >
    <div class="w-full flex flex-wrap gap-2 py-2">
      <div class="w-fit flex text-foreground gap-2">
        <transition-group
          enter-active-class="transition"
          leave-active-class="transition"
          enter-from-class="scale-0"
          leave-to-class="scale-0"
        >
          <span
            v-for="tag of selectedTag"
            :key="tag.id"
            class="
            min-w-5 min-h-5 px-2 py-1 rounded bg-default-200  inline-flex gap-2 items-center justify-center group
            w-fit transition-all relative
          "
          >
            <span class="flex-1 group-hover:pr-5 transition-all">
              {{ tag?.name }}
            </span>
            <i
              class="i-material-symbols:close-rounded group-hover:size-4 cursor-pointer group-hover:scale-100 group-hover:rotate-[0deg] absolute right-1 -rotate-45 size-0 transition-all"
              @click="() => unSelect(tag)"
            />
          </span>
        </transition-group>
      </div>
      <app-tag-select
        v-model="selectedTag"
        v-model:search-name="searchName"
        :tags="tags"
        :next-page="nextPage"
        :select-tag="selectTag"
        :can-show-shadow-tag="canShowShadowTag"
        @create="createTag"
      />
      <client-only>
        <ui-select v-model="draftRaw">
          <ui-select-trigger>
            <ui-button variant="ghost">
              {{draft ? '草稿中' : '已发布'}}
            </ui-button>
          </ui-select-trigger>
          <ui-select-content>
            <ui-select-option :value="true">
              草稿中
            </ui-select-option>
            <ui-select-option :value="false">
              已发布
            </ui-select-option>
          </ui-select-content>
        </ui-select>
      </client-only>
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
