<script setup lang=ts>
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

definePageMeta({
  auth: true,
  redirect: '/admin/post',
});
</script>

<template>
  <SidebarProvider class="h-full">
    <Sidebar collapsible="icon">
      <SidebarContent class="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            <admin-side-bar />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset class="w-[calc(100%_-_var(--sidebar-width-icon))] overflow-auto peer-data-[collapsible]:w-[calc(100%_-_var(--sidebar-width))]">
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 h-4"
          />
          <admin-breadcrumb />
        </div>
      </header>
      <div class="h-[calc(100%_-_theme('size.16'))] max-h-full flex-1 basis-0 p-4 pt-0 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100%_-_theme('size.12'))]">
        <div class="flex size-full flex-1 flex-col gap-4">
          <nuxt-page />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
