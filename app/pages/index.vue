<script lang="ts" setup>

</script>

<template>
  <div class="w-full">
    <div class="w-full flex gap-2">
      <nuxt-link to="/post/editor">
        <ui-button variant="ghost" class="gap-2">
          <div class="i-material-symbols:contract-edit size-6" /><span>Write</span>
        </ui-button>
      </nuxt-link>
      <ui-dialog>
        <ui-dialog-trigger>
          <ui-button class="flex gap-2">
            <i class="i-material-symbols:inbox-rounded size-6" />
            <span>
              draft
            </span>
          </ui-button>
        </ui-dialog-trigger>
        <ui-dialog-content>
          <ui-dialog-title>
            draft Box
          </ui-dialog-title>
          <ui-dialog-description>
            You can select draft post.
          </ui-dialog-description>
          <div class="w-full h-full max-h-400px overflow-auto">
            <app-post-list :publish="false" />
          </div>
        </ui-dialog-content>
      </ui-dialog>
    </div>
  </div>
</template>
