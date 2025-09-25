<template>
  <div class="flex flex-col items-center mt-10">
    <!-- Heading -->
    <h2 class="text-3xl font-bold mb-6 text-blue-600 flex items-center">
      Tic Tac Toe
    </h2>

    <!-- Game Board -->
    <div class="grid grid-cols-3 gap-4">
      <div 
        v-for="(cell, index) in board" 
        :key="index"
        class="w-24 h-24 flex items-center justify-center border-2 border-gray-700 text-4xl cursor-pointer rounded-lg transition-all duration-200 hover:bg-blue-100"
        @click="makeMove(index)"
      >
        <template v-if="cell === 'X'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </template>
        <template v-else-if="cell === 'O'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="9" stroke-width="2" stroke="currentColor"/>
          </svg>
        </template>
      </div>
    </div>

    <!-- Current Turn -->
    <p class="mt-4 text-lg font-semibold">
      <span v-if="!winner">
        Turn: 
        <span :class="currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500'">{{ currentPlayer }}</span>
      </span>
    </p>

    <!-- Status -->
    <p class="mt-2 text-xl font-semibold">
      <span v-if="winner">
        🎉 {{ winner === 'Draw' ? "It's a Draw!" : winner + ' wins!' }}
      </span>
    </p>

    <!-- Reset Button -->
    <button 
      class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center"
      @click="resetGame"
    >
      Reset Game
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import Toast, { POSITION, useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const board = ref(Array(9).fill(''));
const currentPlayer = ref('X');
const winner = ref(null);

const toast = useToast();

function makeMove(index) {
  if (board.value[index] || winner.value) return;

  board.value[index] = currentPlayer.value;

  // Check winner
  if (checkWinner()) {
    winner.value = currentPlayer.value;
    showWinnerAlert();
  } else if (!board.value.includes('')) {
    winner.value = 'Draw';
    showWinnerAlert();
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
    showTurnToast();
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(([a,b,c]) => board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]);
}

function showWinnerAlert() {
  Swal.fire({
    title: winner.value === 'Draw' ? "It's a Draw!" : `${winner.value} Wins!`,
    icon: winner.value === 'Draw' ? 'info' : 'success',
    confirmButtonText: 'Play Again'
  }).then(() => resetGame());
}

function showTurnToast() {
  const position = currentPlayer.value === 'X' ? POSITION.TOP_RIGHT : POSITION.TOP_LEFT;
  const toastClass = currentPlayer.value === 'X' ? 'toast-x' : 'toast-o';

  toast.info(`Turn: ${currentPlayer.value}`, {
    position,
    timeout: 1500,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: true,
    toastClassName: `rounded-md px-3 py-1 text-sm ${toastClass}`,
  });
}

function resetGame() {
  board.value = Array(9).fill('');
  currentPlayer.value = 'X';
  winner.value = null;
  showTurnToast();
}
</script>

<style>
.cell svg {
  transition: transform 0.2s;
}
.cell:hover svg {
  transform: scale(1.2);
}

/* X player toast (red) */
.toast-x {
  background-color: #ef4444; 
}

/* O player toast (blue) */
.toast-o {
  background-color: #3b82f6; /* blue-500 */
}
</style>
