<script lang="ts" setup>
import { LoginForm } from '#components';
import {User} from 'lucide-vue-next';
const profile = useProfile();
const {render} = useDialog({
  content: h(LoginForm)
})
const router = useRouter();
const onClickAvatar = () => {
  if (!profile.value || !profile.value.owner){
    return;
  }
  router.push({
    name: 'admin'
  })
}
</script>
<template>
  <float-button-item>
    <ui-avatar>
      <ui-avatar-image :src="profile?.avatar ?? ''" class="" @click="onClickAvatar" />
      <ui-avatar-fallback @click="render">
        <user />
      </ui-avatar-fallback>
    </ui-avatar>
  </float-button-item>
</template>