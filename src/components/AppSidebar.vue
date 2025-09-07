<script setup>
import { ref } from 'vue'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = defineProps({
  side: { type: String, required: false },
  variant: { type: String, required: false },
  collapsible: { type: String, required: false },
  class: { type: null, required: false },
})

const activeType = ref('movies') // default type

// Hardcoded genres
const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
]
</script>

<template>
<Sidebar v-bind="props">
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" as-child>
          <router-link to="/dashboard">
            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              N
            </div>
            <div class="flex flex-col gap-0.5 leading-none">Netflix</div>
          </router-link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu>
        <!-- Movies / Series -->
        <SidebarMenuItem>
          <SidebarMenuButton as-child>
            <router-link
              to="/dashboard/movies"
              class="font-medium"
              @click.native="activeType = 'movies'"
            >
              Movies
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton as-child>
            <router-link
              to="/dashboard/series"
              class="font-medium"
              @click.native="activeType = 'series'"
            >
              Series
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <!-- Hardcoded genres -->
        <SidebarMenuItem>
          <SidebarMenuButton>
            Genres
          </SidebarMenuButton>
          <SidebarMenuSub>
            <SidebarMenuSubItem v-for="genre in genres" :key="genre">
              <SidebarMenuSubButton as-child>
                <router-link :to="`/dashboard/${activeType}/genre/${genre.toLowerCase()}`">
                  {{ genre }}
                </router-link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>

  <SidebarRail />
</Sidebar>
</template>
