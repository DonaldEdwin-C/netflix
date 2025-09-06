<template>
  <div>
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header class="flex h-16 shrink-0 items-center gap-2 border-b">
            <div class="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" class="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem class="hidden md:block">
                    <BreadcrumbLink href="#"> Building Your Application </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator class="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

          </header>
          <div class="flex flex-1 flex-col gap-4 p-4">
            <main class="flex-1 p-6">
              <slot />
            </main>
            
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </div>
</template>
<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>
