<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-3xl">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
      </DialogHeader>

      <div v-if="videoKey">
        <iframe
          class="w-full aspect-video rounded"
          :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1`"
          frameborder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div v-else class="text-sm text-gray-500">
        No trailer available.
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ref, watch } from 'vue'
import tmdbApi from '@/api/tmdb'

const props = defineProps({
  id: { type: Number, required: true },
  type: { type: String, required: true }, // "movie" or "tv"
  title: { type: String, required: true },
  open: { type: Boolean, required: true },
})

const emit = defineEmits(['update:open'])

const isOpen = ref(props.open)
const videoKey = ref(null)

async function fetchTrailer() {
  try {
    const res = await tmdbApi.get(`/${props.type}/${props.id}/videos`)
    const videos = res.data.results

    // ✅ strict filtering: official, trailer, english
    const trailers = videos.filter(
      (v) =>
        v.site === 'YouTube' &&
        v.type === 'Trailer' &&
        v.iso_639_1 === 'en'
    )

    if (trailers.length) {
      // If any are marked official, prefer that
      const official = trailers.find((t) => t.official)
      videoKey.value = official ? official.key : trailers[0].key
    } else {
      // fallback to any YouTube video
      const youtubeVideos = videos.filter((v) => v.site === 'YouTube')
      videoKey.value = youtubeVideos.length ? youtubeVideos[0].key : null
    }
  } catch (err) {
    console.error(err)
    videoKey.value = null
  }
}

watch(
  () => [props.open, props.id],
  async ([open, id]) => {
    isOpen.value = open
    if (open && id) {
      videoKey.value = null
      await fetchTrailer()
    }
  },
  { immediate: true },
)

watch(isOpen, (val) => emit('update:open', val))
</script>
