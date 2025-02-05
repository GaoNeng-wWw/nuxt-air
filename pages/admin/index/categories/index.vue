<script lang="ts" setup>
import {toast} from 'vue-sonner';
import {Trash2} from 'lucide-vue-next';
import {vOnClickOutside} from '@vueuse/components';
definePageMeta({
  name: 'admin::category'
})
const {t} = useI18n();
useHead({
  title: t('breadcrumb.items.admin::category.label')
})
const openId = ref<number | null>(null);
const showAdd = ref(false);
const { categories, canLoadMore, loadMore, patch, remove, addCategory:add,loading } = useCategories({
  page: 1,
  type: 'scroll'
})
const categoryName = ref('');
const loadingId = ref<number[]>([]);
const onPatchCategory = (ev:FocusEvent, id: number) => {
  const target =ev.target;
  const name = (target as HTMLElement).innerText
  patch(id, name)?.then(()=>{
    toast.success(
      t('admin.category.update.success')
    );
  })
}
const openPopover = (id: number) => {
  if (openId.value !== null){
    openId.value = null;
    return;
  }
  openId.value = id;
}
const removeCategory = (id: number) => {
  if (loadingId.value.includes(id)){
    return;
  }
  loadingId.value.push(id);
  remove(id)
  .finally(()=>{
    loadingId.value = loadingId.value.filter((_id) => id !== _id)
  })
}
const addCategory = () => {
  add({name: categoryName.value})
  .then(()=>{
    categoryName.value = '';
    toast.success(t('admin.category.new.success'));
  })
  .catch((err) => {
    toast.error(err.data.message)
  })
}
</script>
<template>
  <div class="w-full h-full flex flex-col gap-1.5">
    <div class="w-fit px-2">
      <ui-popover :open="showAdd">
        <ui-popover-trigger @click="showAdd = true">
          <ui-button>
            {{$t('admin.category.new.btn')}}
          </ui-button>
        </ui-popover-trigger>
        <ui-popover-content>
          <div class="w-full flex flex-col gap-2">
            <div class="w-full">
              <ui-label for="new-category">
                {{ $t('admin.category.new.nameInputLabel') }}
              </ui-label>
              <ui-input id="new-category" v-model="categoryName" class="outline-none focus:outline-none focus:ring-0 focus-visible:ring-0" />
            </div>
            <div class="w-fit flex gap-1.5">
              <ui-button :loading="loading" @click="addCategory">
                {{ $t('common.confirm') }}
              </ui-button>
              <ui-button variant="secondary" @click="showAdd=false">
                {{ $t('common.cancel') }}
              </ui-button>
            </div>
          </div>
        </ui-popover-content>
      </ui-popover>
    </div>
    <ui-list :can-load-more="canLoadMore" :load-more="loadMore">
      <ui-list-item v-for="category in categories" :key="category.id">
        <template #header>
          <div class="w-full flex gap-1.5 content-between">
            <div class="max-w-full w-full overflow-hidden flex-items-ceneger gap-2">
              <p 
                class="text-xl break-all font-bold cursor-pointer rounded-md focus:bg-muted hover:bg-muted p-2 transition outline-none"
                contenteditable="plaintext-only"
                @blur="(ev) => onPatchCategory(ev, category.id)"
              >
                {{ category.name }}
              </p>
            </div>
            <ui-popover :open="openId === category.id">
              <ui-popover-trigger>
                <ui-button variant="ghost" size="icon" @click="()=>openPopover(category.id)">
                  <trash2 class="text-red-500" />
                </ui-button>
              </ui-popover-trigger>
              <ui-popover-content>
                <div v-on-click-outside="()=>openId = null" class="w-full h-full flex flex-col gap-0.5">
                  <div class="w-full">
                    <p>
                      {{ $t('admin.category.deleteConfirm') }}
                    </p>
                  </div>
                  <div class="w-full flex gap-1">
                    <ui-button :variant="'destructive'" :loading="loadingId.includes(category.id)" @click="()=>removeCategory(category.id)">
                      {{$t('common.confirm')}}
                    </ui-button>
                    <ui-button :loading="loadingId.includes(category.id)" @click="openId=null">
                      {{$t('common.cancel')}}
                    </ui-button>
                  </div>
                </div>
              </ui-popover-content>
            </ui-popover>
          </div>
        </template>
      </ui-list-item>
    </ui-list>
  </div>
</template>