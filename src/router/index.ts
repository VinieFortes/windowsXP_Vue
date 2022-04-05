import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import LoginScreen from "@/views/LoginScreen.vue";
import ShutDownScreen from "@/views/ShutDownScreen.vue";
import StartupScreen from "@/views/StartupScreen.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginScreen
  },
  {
    path: '/shutdown',
    name: 'ShutDown',
    component: ShutDownScreen
  },
  {
    path: '/startup',
    name: 'Startup',
    component: StartupScreen
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
