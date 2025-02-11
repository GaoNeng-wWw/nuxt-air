<script setup lang="ts">
import { cn } from '@/lib/utils';
import { vAutoAnimate } from '@formkit/auto-animate';
import { CheckIcon, CircleIcon, DotIcon } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const { t } = useI18n();
const router = useRouter();
const stepIndex = ref(1);
const stepper = [
  {
    step: 1,
    title: 'Owner Login',
  },
  {
    step: 2,
    title: 'Site Info',
  },
];
function submitSuccess(info: PublicSiteInfo) {
  $fetch('/api/setup', { method: 'post', body: info })
    .then((status) => {
      if (!status) {
        toast.error(t('common.unknownError'), { position: 'top-center' });
        return;
      }
      router.replace('/');
    });
}
function onLoginSuccess() {
  stepIndex.value += 1;
}
function onLoginFail(reason: string) {
  toast.error(reason, { position: 'top-center' });
}
</script>

<template>
  <div class="flex h-svh w-full flex-col items-center justify-center">
    <div class="max-h-full w-full max-w-md rounded border border-border p-2" :class="[stepIndex === 1 ? cn('h-fit') : ' h-2/3']">
      <ui-stepper v-model="stepIndex" class="flex size-full flex-col items-center">
        <div class="flex h-fit w-full">
          <ui-stepper-item
            v-for="item in stepper" :key="item.step" v-slot="{ state }" :step="item.step"
            class="relative flex size-full flex-col items-center justify-center"
          >
            <ui-stepper-separator v-if="item.step !== stepper[stepper.length - 1].step" class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-4 block h-0.5 shrink-0 translate-y-1/2 rounded-full bg-muted group-data-[state=completed]:bg-primary" />
            <ui-stepper-trigger as-child>
              <ui-button
                :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'" size="icon"
                class="z-10 shrink-0 rounded-full"
                :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                disabled
              >
                <check-icon v-if="state === 'completed'" class="size-5" />
                <circle-icon v-if="state === 'active'" />
                <dot-icon v-if="state === 'inactive'" />
              </ui-button>
              <ui-stepper-title>{{ item.title }}</ui-stepper-title>
            </ui-stepper-trigger>
          </ui-stepper-item>
        </div>
        <div class="w-full flex-1 overflow-auto">
          <login-form v-if="stepIndex === 1" @success="onLoginSuccess" @fail="onLoginFail" />
          <admin-site-setting v-if="stepIndex === 2" prevent @submit-success="submitSuccess" />
        </div>
      </ui-stepper>
    </div>
  </div>
</template>
