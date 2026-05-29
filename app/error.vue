<template>
  <main class="card mx-auto mt-10 max-w-sm text-center">
    <p class="text-6xl font-bold text-gray-950">{{ error.statusCode }}</p>
    <h1 class="mt-4 text-2xl font-bold text-gray-950">
      {{ error.statusMessage || 'Something went wrong' }}
    </h1>
    <p class="mt-3 text-gray-600">{{ error.message }}</p>
    <button type="button" class="btn mt-6" @click="handleClearError">Go home</button>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError;
}>();

const handleClearError = () => {
  clearError({
    redirect: '/'
  });
};
</script>
