import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/tmdb',
  params: {
    api_key: import.meta.env.TMDB_API_KEY
  }
})

export default api
