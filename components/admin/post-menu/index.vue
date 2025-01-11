<script lang="ts" setup>
import {Loader2} from 'lucide-vue-next';
import {buttonVariants} from '@/components/ui/button';

const {id, pin=false} = defineProps<{
  id: number
  pin: boolean
}>()
const emits = defineEmits<{
  unPin: [],
  pin: [],
  remove: [number]
}>();

const ghostDanger = buttonVariants({
  variant: 'ghost',
  class: 'hover:bg-red-500/50 justify-start'
})
const loadingButtonId = ref('');
const {updatePost} = usePost();
const unPin = () => {
  loadingButtonId.value = 'pin'
  updatePost(id, {pin: false})
  emits('unPin');
  loadingButtonId.value = ''
}
const pinPost = () => {
  loadingButtonId.value = 'pin'
  updatePost(id, {pin: true})
  emits('pin')
  loadingButtonId.value = ''
}
const remove = () => {
  loadingButtonId.value = 'del'
  emits('remove', id)
  loadingButtonId.value = ''
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-2">
    <ui-button variant="ghost" class="justify-start">
      编辑
    </ui-button>
    <ui-button v-if="pin" variant="ghost" class="justify-start" :disabled="loadingButtonId === 'pin'" @click="unPin">
      <loader2 v-if="loadingButtonId === 'pin'"/>
      取消置顶
    </ui-button>
    <ui-button v-if="!pin" variant="ghost" class="justify-start" :disabled="loadingButtonId === 'pin'" @click="pinPost">
      <loader2 v-if="loadingButtonId === 'pin'"/>
      置顶
    </ui-button>
    <ui-button variant="ghost" :class="ghostDanger" :disabled="loadingButtonId === 'del'" @click="remove">
      <loader2 v-if="loadingButtonId === 'del'"/>
      删除
    </ui-button>
  </div>
</template>