<template>
  <div>
    <h2 class="text-2xl font-bold py-4">
      {{ title }}
    </h2>

    <div v-if="loading" class="loading">
      Loading movies...
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="movie in movies" :key="movie.id">
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
          :alt="movie.title || movie.name"
        />
        <div class="py-2">
          <h3>{{ movie.title || movie.name }}</h3>
          <p class="text-sm">
            {{ movie.release_date || movie.first_air_date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'

const genreIdMap = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
}

// props are optional now
const props = defineProps({
  type: { type: String, required: false },
  genre: { type: String, required: false },
})

const store = useStore()
const movies = ref([])
const loading = ref(false)

// dynamic page title
const title = computed(() => {
  if (!props.type || !props.genre) return 'Trending Today'
  return `${props.genre.charAt(0).toUpperCase() + props.genre.slice(1)} ${
    props.type.charAt(0).toUpperCase() + props.type.slice(1)
  }`
})

watchEffect(async () => {
  loading.value = true
  try {
    if (!props.type || !props.genre) {
      // Trending
      await store.dispatch('movies/fetchTrending')
      movies.value = store.getters['movies/allMovies']
    } else if (props.type === 'movies') {
      await store.dispatch('movies/fetchMoviesByGenre', genreIdMap[props.genre])
      movies.value = store.getters['movies/allMovies']
    } else if (props.type === 'series') {
      await store.dispatch('movies/fetchSeriesByGenre', genreIdMap[props.genre])
      movies.value = store.getters['movies/allMovies']
    }
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
