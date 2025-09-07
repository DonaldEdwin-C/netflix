import api from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state) {
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {
    async register(_, credentials) {
      await api.post('/users', credentials)
    },

    async login({ commit }, credentials) {
      const res = await api.post('/users/login', credentials)
      commit('setToken', res.data.accessToken)
    },
    logout({ commit }) {
      commit('clearToken')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
}
