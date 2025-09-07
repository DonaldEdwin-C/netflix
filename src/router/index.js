import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/dashboard/IndexView.vue'
import MoviesView from '@/views/dashboard/GenreView.vue'
import SeriesView from '@/views/dashboard/SeriesView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import GenreView from '@/views/dashboard/GenreView.vue'
import WatchlistView from '@/views/dashboard/WatchlistView.vue'
import Category from '@/components/home/Category.vue'

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
      meta: { layout: 'DashboardLayout' },
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
      meta: { layout: 'DashboardLayout' },
    },

    //admin
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { layout: 'AdminLayout' },
    },
  ],
})

export default router
