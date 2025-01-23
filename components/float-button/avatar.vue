<script lang="ts" setup>
import { LoginForm } from '#components';
import {User} from 'lucide-vue-next';
const {render} = useDialog({
  content: h(LoginForm)
})

</script>
<template>
  <div>
    <ui-avatar class="bg-gradient-to-tl from-slate-950 to-slate-800 border-border border">
      <ui-avatar-fallback @click="render">
        <user />
      </ui-avatar-fallback>
    </ui-avatar>
  </div>
</template>