import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/Dashboard.vue'
import Timers from '@/views/Timers.vue'

const routes: Array<RouteRecordRaw> = [
  { 
    path: '', component: Home
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/register', component: Register
  },
  {
    path: '/profile', component: Profile
  },
  {
    path: '/dashboard', component: Dashboard
  },
  {
    path: '/dashboard/timers', component: Timers
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
