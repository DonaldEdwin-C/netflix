<!-- components/SearchBar.vue -->
<template>
  <div class="flex gap-2 p-4">
    <input
      v-model="query"
      type="text"
      placeholder="Search movies, series..."
      class="flex-1 border rounded px-3 py-2"
      @keyup.enter="onSearch"
    />
    <Button
      @click="onSearch"

    >
      Search
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Button from '../ui/button/Button.vue'

const query = ref('')
const store = useStore()
const router = useRouter()

async function onSearch() {
  if (!query.value.trim()) return
  await store.dispatch('movies/search', query.value)
  router.push({ name: 'search', query: { q: query.value } })
}
</script>
