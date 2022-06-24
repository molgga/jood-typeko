import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Core from '../views/Core.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Core',
    component: Core,
  },
  {
    path: '/typist',
    name: 'Typist',
    component: () => import('../views/Typist.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
