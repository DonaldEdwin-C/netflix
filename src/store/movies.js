import tmdbApi from '@/api/tmdb'


export default {
  namespaced: true,
  state: () => ({
    allMovies: [],
    genres: { movies: [], series: [] },
  }),
  mutations: {
    setMovies(state, movies) {
      state.allMovies = movies
    },
    setGenres(state, genres) {
      state.genres = genres
    },
  },
  actions: {
    // Fetch default trending movies
    async fetchTrending({ commit }) {
      try {
        const res = await tmdbApi.get('/trending')
        commit('setMovies', res.data.results)
      } catch (err) {
        console.error('Error fetching trending movies:', err)
      }
    },

    // Fetch movies by genre
    async fetchMoviesByGenre({ commit }, genreId) {
      try {
        const res = await tmdbApi.get(`/genre/${genreId}/movies`)
        commit('setMovies', res.data.results)
      } catch (err) {
        console.error('Error fetching movies by genre:', err)
      }
    },

    // Fetch series by genre
    async fetchSeriesByGenre({ commit }, genreId) {
      try {
        const res = await tmdbApi.get(`/genre/${genreId}/series`)
        commit('setMovies', res.data.results)
      } catch (err) {
        console.error('Error fetching series by genre:', err)
      }
    },

    // Fetch genre lists for sidebar
    async fetchGenres({ commit }) {
      try {
        const res = await tmdbApi.get('/genres')
        commit('setGenres', res.data)
      } catch (err) {
        console.error('Error fetching genres:', err)
      }
    },
    async search({ commit }, query) {
      const res = await tmdbApi.get('/search/multi', {
        params: { query }
      })
      commit('setMovies', res.data.results)
    }
  },
  getters: {
    allMovies: (state) => state.allMovies,
    genres: (state) => state.genres,
  },
}
