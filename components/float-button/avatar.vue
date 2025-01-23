<script lang="ts" setup>
import {User} from 'lucide-vue-next';
const {render: r2, removeAll} = useDialog({
  content: h('span',{onClick: onClickSpan},'hello world')
})
const {render} = useDialog({
  content: h('span', {onClick: r2}, 'hello')
})
function onClickSpan(){
  removeAll();
}
</script>
<template>
  <div>
    <ui-avatar class="bg-gradient-to-tl from-slate-950 to-slate-800 border-border border">
      <ui-avatar-fallback>
        <user @click="render" />
      </ui-avatar-fallback>
    </ui-avatar>
  </div>
</template>