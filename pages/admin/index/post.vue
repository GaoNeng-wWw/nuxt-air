<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table';

const data = ref([
  {
    name: 'a',
  },
  {
    name: 'b',
  },
  {
    name: 'c',
  },
  {
    name: 'd',
  },
]);

const column: ColumnDef<{ name: string }>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h('div', row.getValue('name')),
  },
];
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex-auto">
      <ui-data-table
        :data="data"
        :columns="column"
        sort
      />
    </div>
  </div>
</template>
