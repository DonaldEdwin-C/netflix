<template>
  <div class="p-4">
    <Category :type="type" :genre="genre" :key="type + '-' + genre"/>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Category from '@/components/home/Category.vue'

const route = useRoute()
const type = route.params.type
const genre = route.params.genre
</script>
