import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Games from '@/views/Games.vue';
import Search from '@/views/Search.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Games,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
