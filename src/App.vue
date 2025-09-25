<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="bg-blue-600 text-white p-4 shadow-md">
      <div class="max-w-5xl mx-auto flex justify-between items-center">
        <!-- Logo / Title -->
        <div class="text-xl font-bold tracking-wider flex items-center gap-2">
  
          Tic-Tac-Toe
        </div>

        <!-- Desktop Links -->
        <div class="hidden md:flex gap-6">
          <router-link
            to="/"
            class="flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200"
            :class="{ 'text-yellow-300 font-semibold': isActive('/') }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-2 2v8m-6-6h6" />
            </svg>
            Game
          </router-link>
          <router-link
            to="/how-to-play"
            class="flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200"
            :class="{ 'text-yellow-300 font-semibold': isActive('/how-to-play') }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
            </svg>
            How to Play
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="mobileOpen = !mobileOpen" class="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileOpen" class="md:hidden mt-2 flex flex-col gap-2 px-4">
        <router-link
          to="/"
          class="flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200"
          @click="mobileOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7m-2 2v8m-6-6h6" />
          </svg>
          Game
        </router-link>
        <router-link
          to="/how-to-play"
          class="flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200"
          @click="mobileOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
          </svg>
          How to Play
        </router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mobileOpen = ref(false);

const isActive = (path) => route.path === path;
</script>

<style scoped>
/* Optional smooth hover underline */
.router-link-active {
  border-bottom: 2px solid #facc15; /* yellow-300 */
}
</style>
