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
  auth: true
})
</script>

<template>
  <SidebarProvider class="h-full">
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <admin-side-bar />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>
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
      <div class="w-full max-h-full flex-1 basis-0 overflow-hidden p-4 pt-0">
        <div class="w-full h-full flex flex-1 flex-col gap-4">
          <nuxt-page />
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
