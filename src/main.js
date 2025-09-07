import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import auth from './store/auth'
import movies from './store/movies'

import App from './App.vue'
import router from './router'

const store = createStore({
  modules: {
    auth,
    movies

  }
})
const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
