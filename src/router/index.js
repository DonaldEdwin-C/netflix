import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/dashboard/IndexView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import GenreView from '@/views/dashboard/GenreView.vue'
import WatchlistView from '@/views/dashboard/WatchlistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //auth
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: 'AuthLayout' },
    },
    //dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { layout: 'DashboardLayout', requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard.index',
          component: IndexView,
        },
        {
          path: '/dashboard/:type/genre/:genre',
          name: 'Genre',
          component: GenreView,
          props: true,
        },
      ],
    },

    {
      path: '/home/watchlist',
      name: 'watchlist',
      component: WatchlistView,
      meta: { layout: 'DashboardLayout', requiresAuth: true },
    },

    {
      path: '/dashboard/search',
      name: 'search',
      component: GenreView,
      props: (route) => ({ searchQuery: route.query.q }),
    },

    // //admin
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: AdminView,
    //   meta: { layout: 'AdminLayout' },
    // },
  ],
})

import store from '@/main'

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
    next({ name: 'dashboard.index' })
  } else {
    next()
  }
})
export default router
