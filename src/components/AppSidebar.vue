<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
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
import { Button } from '@/components/ui/button'

const store = useStore()
const router = useRouter()

const props = defineProps({
  side: { type: String, required: false },
  variant: { type: String, required: false },
  collapsible: { type: String, required: false },
  class: { type: null, required: false },
})

const activeType = ref('movies')

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

function logout() {
  store.dispatch('auth/logout')
  router.push({ name: 'login' })
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
            <SidebarMenuButton> Genres </SidebarMenuButton>
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
          <router-link to="/home/watchlist" class="font-medium"> My Watchlist </router-link>
          <Button class="mt-35" variant="secondary" @click="logout"> Logout </Button>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarRail />
  </Sidebar>
</template>
