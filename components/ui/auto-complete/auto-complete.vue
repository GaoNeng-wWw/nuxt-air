<script lang="ts" setup generic="T extends string | number | Record<string, any>">
import type { AutoCompleteProps, Option } from './auto-complete';
import { Search } from 'lucide-vue-next';

const { options } = withDefaults(
  defineProps<AutoCompleteProps<T>>(),
  {
    open: false,
    options: () => [],
  },
);
const modelValue = defineModel<Option<T>>({ required: true });
function onSelect(option: Option<T>) {
  modelValue.value = option;
}
</script>

<template>
  <ui-popover>
    <ui-popover-trigger>
      <slot name="trigger" />
    </ui-popover-trigger>
    <ui-popover-content>
      <slot>
        <div class="w-full">
          <div class="flex w-full items-center border-none" cmdk-input-wrapper>
            <Search class="mr-2 size-4 shrink-0 opacity-50" />
            <ui-input
              class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <ui-command>
            <ui-command-list>
              <ui-command-item
                v-for="(option, idx) in options" :key="idx" :value="option.value"
                @select="() => onSelect(option)"
              >
                {{ option.label }}
              </ui-command-item>
            </ui-command-list>
          </ui-command>
        </div>
      </slot>
    </ui-popover-content>
  </ui-popover>
</template>
