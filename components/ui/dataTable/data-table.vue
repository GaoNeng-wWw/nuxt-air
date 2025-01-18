<script lang="ts" setup generic="Data, Value">
import type { ColumnDef, SortingState } from '@tanstack/vue-table';
import { getCoreRowModel, useVueTable, FlexRender, getSortedRowModel } from '@tanstack/vue-table';

const props = defineProps<{
  columns: ColumnDef<Data, Value>[];
  data: Data[];
  sort?: boolean;
}>();

const sorting = ref<SortingState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.sort ? getSortedRowModel() : getCoreRowModel(),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});
</script>

<template>
  <ui-table>
    <ui-table-header>
      <ui-table-row
        v-for="header in table.getHeaderGroups()"
        :key="header.id"
      >
        <ui-table-head
          v-for="head in header.headers"
          :key="head.id"
        >
          <flex-render
            v-if="!head.placeholderId"
            :render="head.column.columnDef.header"
            :props="head.getContext()"
          />
        </ui-table-head>
      </ui-table-row>
    </ui-table-header>
    <ui-table-body>
      <template v-if="table.getRowModel().rows.length">
        <ui-table-row
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <ui-table-cell
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
            <flex-render
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </ui-table-cell>
        </ui-table-row>
      </template>
      <template v-else>
        <ui-table-row>
          <ui-table-cell
            :colspan="columns.length"
            class="h-24 text-center"
          >
            <slot name="empty" />
          </ui-table-cell>
        </ui-table-row>
      </template>
    </ui-table-body>
  </ui-table>
</template>
