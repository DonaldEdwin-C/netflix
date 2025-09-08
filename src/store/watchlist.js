export default {
  namespaced: true,
  state: () => ({
    items: [], // stores movie objects
  }),
  mutations: {
    addToWatchlist(state, movie) {
      // Prevent duplicates
      if (!state.items.find((m) => m.id === movie.id)) {
        state.items.push(movie)
      }
    },
    removeFromWatchlist(state, movieId) {
      state.items = state.items.filter((m) => m.id !== movieId)
    },
    clearWatchlist(state) {
      state.items = []
    },
  },
  actions: {
    add({ commit }, movie) {
      commit('addToWatchlist', movie)
    },
    remove({ commit }, movieId) {
      commit('removeFromWatchlist', movieId)
    },
  },
  getters: {
    allItems: (state) => state.items,
    isInWatchlist: (state) => (id) => state.items.some((m) => m.id === id),
  },
}
