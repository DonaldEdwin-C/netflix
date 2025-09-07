<template>
  <div>
    <p>Watchss now</p>
    <p class="text-sm">Top picks for you. Updated Daily</p>

    <div class="mt-3" v-if="genre">
      <!-- Genre-specific movies -->
      <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 min-h-[30rem] gap-x-4 gap-y-8">
        <div v-for="movie in movies" :key="movie.id" class="bg-white rounded shadow">
          <img :src="movie.poster" alt="" class="h-full object-cover" />
          <h2 class="font-semibold">{{ movie.title }}</h2>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="min-h-[50vh] bg-[url/img/movie1.jpg')] flex-1 rounded-xl bg-muted/50" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const genre = ref(null)
const movies = ref([])

watchEffect(async () => {
  genre.value = route.params.genre || null

  if (genre.value) {
    // Mock fetch (replace with API call)
    movies.value = [
      { id: 1, title: 'Fast & Furious', poster: '/img/movie1.jpg' },
      { id: 2, title: 'Die Hard', poster: '/img/movie1.jpg' },
      { id: 2, title: 'Die Hard', poster: '/img/movie1.jpg' },
      { id: 2, title: 'Die Hard', poster: '/img/movie1.jpg' },
      { id: 2, title: 'Die Hard', poster: '/img/movie1.jpg' },
      { id: 2, title: 'Die Hard', poster: '/img/movie1.jpg' },
    ]
  } else {
    movies.value = []
  }
})
</script>
