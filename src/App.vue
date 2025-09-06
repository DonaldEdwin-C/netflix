<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from './layouts/DashboardLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'

const route = useRoute()
const layout = computed(() => {
  const name = route.meta.layout || 'DashboardLayout'
  return {
    DashboardLayout,
    AdminLayout,
    AuthLayout,
  }[name]
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
