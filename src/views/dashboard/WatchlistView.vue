<template>
  <div>
    <h2 class="text-2xl font-bold py-4">My Watchlist</h2>

    <div v-if="!watchlist.length" class="text-gray-500">
      Your watchlist is empty.
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="movie in watchlist" :key="movie.id">
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
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const watchlist = computed(() => store.getters['watchlist/allItems'])
</script>
