<template>
  <div>
    <h2 class="text-2xl font-bold py-4">
      {{ pageTitle }}
    </h2>

    <div v-if="loading" class="loading">Loading movies...</div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="cursor-pointer"
        @click="openTrailer(movie)"
      >
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

    <Trailer
      v-if="selectedMovie"
      :id="selectedMovie.id"
      :title="selectedMovie.title || selectedMovie.name"
      :type="route.params.type === 'series' ? 'tv' : 'movie'"
      v-model:open="isModalOpen"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Trailer from './Trailer.vue'

const route = useRoute()
const store = useStore()

const props = defineProps({
  searchQuery: { type: String, required: false },
})

const movies = ref([])
const loading = ref(false)
const selectedMovie = ref(null)
const isModalOpen = ref(false)

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

// Computed page title
const pageTitle = computed(() => {
  if (props.searchQuery) return `Search: "${props.searchQuery}"`
  const { type, genre } = route.params
  if (!type || !genre) return 'Trending Today'
  return `${genre.charAt(0).toUpperCase() + genre.slice(1)} ${
    type.charAt(0).toUpperCase() + type.slice(1)
  }`
})

// Fetch movies based on route params or search query
async function fetchData() {
  loading.value = true
  try {
    if (props.searchQuery) {
      await store.dispatch('movies/search', props.searchQuery)
    } else {
      const { type, genre } = route.params
      if (!type || !genre) {
        await store.dispatch('movies/fetchTrending')
      } else if (type === 'movies') {
        await store.dispatch('movies/fetchMoviesByGenre', genreIdMap[genre])
      } else if (type === 'series') {
        await store.dispatch('movies/fetchSeriesByGenre', genreIdMap[genre])
      }
    }
    movies.value = store.getters['movies/allMovies']
  } finally {
    loading.value = false
  }
}

// Open trailer modal
function openTrailer(movie) {
  selectedMovie.value = movie
  isModalOpen.value = true
}

// Watch for route or search query changes
watch([() => route.fullPath, () => props.searchQuery], fetchData, {
  immediate: true,
})
</script>
