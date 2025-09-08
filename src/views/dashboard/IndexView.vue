<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const movies = computed(() => store.getters['movies/allMovies'])

// Load default trending movies and genres
onMounted(async () => {
  try {
    await store.dispatch('movies/fetchGenres')
    await store.dispatch('movies/fetchTrending')
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold py-4">Trending Today</h2>

    <div v-if="movies === 0" class="loading">
      Loading movies...
    </div>

   <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <div v-for="movie in movies" :key="movie.id">
    <img
      v-if="movie.poster_path"
      :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
      :alt="movie.title || movie.name"
    />
    <div class="py-2"><h3>{{ movie.title || movie.name }}</h3>
    <p class="text-sm">{{ movie.release_date || movie.first_air_date }}</p></div>

  </div>
</div>
  </div>
</template>
