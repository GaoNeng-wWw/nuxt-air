<script lang="ts" setup>
import { cn } from '@/lib/utils';
import { vElementVisibility } from '@vueuse/components';
import { ReplyIcon } from 'lucide-vue-next';

defineOptions({ inheritAttrs: true });

const { datas, ...props } = defineProps<{
  datas: LinearNode<ReplyNode>[];
  class?: string;
}>();

const emits = defineEmits<{
  expand: [number];
  visible: [OnCommentItemVisibleParams];
}>();

export interface OnCommentItemVisibleParams {
  id: number;
  wrapper: HTMLDivElement | null;
  cur: Element;
  last: Element | null;
  next: Element | null;
  prev: Element | null;
}

const wrapperRef = useTemplateRef('wrapper');

function onExpand(id: number) {
  emits('expand', id);
}
function onVisible(state: boolean, id: number) {
  if (!state) {
    return;
  }
  const wrapper = unref(wrapperRef);
  const cur = Array.from(wrapper?.children ?? []).filter(element => element.getAttribute('data-current-id') === String(id))[0];
  const next = cur.nextElementSibling ?? null;
  const prev = cur.previousElementSibling ?? null;
  emits('visible', {
    id,
    wrapper,
    cur,
    last: wrapper?.lastElementChild ?? null,
    next,
    prev,
  });
}
</script>

<template>
  <div ref="wrapper" :class="cn('w-full', props.class)">
    <template v-for="(item, idx) in datas" :key="item.id">
      <ui-collapsible
        v-element-visibility="(state) => onVisible(state, item.id)"
        :data-depth="item.depth - 1"
        :data-current-id="item.id"
        :style="{
          '--index': idx,
        }"
      >
        <comment-item
          v-if="item.expand"
          :id="item.id"
          :content="item.content"
          :author="item.author"
          :children-count="item.childrenTotal"
          :create-at="item.createAt"
          :expand="onExpand"
          :children-expand="item.children?.some?.(child => child.expand)"
          :data-depth="item.depth - 1"
          :style="{
            '--depth': item.depth - 1,
          }"
          class="ml-[calc(var(--depth)_*_theme('margin.[10]'))] w-[calc(100%_-_calc(var(--depth)_*_theme('margin.[10]')))]"
        >
          <template #toolbar>
            <div>
              <ui-collapsible-trigger as-chld>
                <ui-button size="icon" variant="ghost">
                  <ReplyIcon />
                </ui-button>
              </ui-collapsible-trigger>
            </div>
          </template>
        </comment-item>
        <ui-collapsible-content>
          <comment-editor :id="item.id" type="reply" />
        </ui-collapsible-content>
      </ui-collapsible>
    </template>
  </div>
</template>
