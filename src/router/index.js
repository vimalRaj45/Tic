import { createRouter, createWebHistory } from 'vue-router';
import Game from '../views/Game.vue';
import HowToPlay from '../views/HowToPlay.vue';

const routes = [
  { path: '/', name: 'Game', component: Game },
  { path: '/how-to-play', name: 'HowToPlay', component: HowToPlay },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
