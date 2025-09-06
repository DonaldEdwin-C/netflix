<script setup>
import { GalleryVerticalEnd } from 'lucide-vue-next'
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

// This is sample data.
const data = {
  navMain: [
    {
      title: 'Browse',
      url: '/dashboard/genre',
      items: [
        {
          title: 'Movies',
          url: '/dashboard/movies',
        },
        {
          title: 'Series',
          url: '/dashboard/series',
        },
      ],
    },
    {
      title: 'Genre',
      url: 'Genre',
      items: [
        {
          title: 'Action',
          url: '/dashboard/genre/action',
        },
        {
          title: 'Adventure',
          url: '/dashboard/genre/adventure',
          isActive: true,
        },
        {
          title: 'Animation',
          url: '/dashboard/genre/animation',
        },
        {
          title: 'Comedy',
          url: '/dashboard/genre/comedy',
        },
        {
          title: 'Crime',
          url: '/dashboard/genre/crime',
        },
        {
          title: 'Documentary',
          url: '/dashboard/genre/documentary',
        },
        {
          title: 'Drama',
          url: '/dashboard/genre/drama',
        },
        {
          title: 'Family',
          url: '/dashboard/genre/family',
        },
        {
          title: 'Fantasy',
          url: '/dashboard/genre/fantasy',
        },
        {
          title: 'History',
          url: '/dashboard/genre/history',
        },
        {
          title: 'Horror',
          url: '/dashboard/genre/horror',
        },
        {
          title: 'Music',
          url: '/dashboard/genre/music',
        },
        {
          title: 'Mystery',
          url: '/dashboard/genre/mystery',
        },
      ],
    },
    {
      title: 'My Watchlist',
      url: '/dashboard/genre',
      items: [
        {
          title: 'Mystery',
          url: '/dashboard/genre',
        },
        {
          title: 'Mystery',
          url: '/dashboard/genre',
        },
        {
          title: 'Mystery',
          url: '/dashboard/genre',
        },
        {
          title: 'Mystery',
          url: '/dashboard/genre',
        },
        {
          title: 'Mystery',
          url: '/dashboard/genre',
        },
      ],
    },

    {
      title: 'Community',
      url: '/dashboard/genre',
      items: [
        {
          title: 'Contribution Guide',
          url: '/dashboard/genre',
        },
      ],
    },
  ],
}
</script>

<template>
<Sidebar v-bind="props">
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" as-child>
          <router-link to="/dashboard">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              Netflix
            </div>
          </router-link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
          <SidebarMenuButton as-child>
            <router-link :to="item.url" class="font-medium">
              {{ item.title }}
            </router-link>
          </SidebarMenuButton>

          <SidebarMenuSub v-if="item.items.length">
            <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
              <SidebarMenuSubButton as-child :is-active="childItem.isActive">
                <router-link :to="childItem.url">{{ childItem.title }}</router-link>
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
