<template>
  <div class="bg-yellow-200">
    <button @click="emit('increase')">Add</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'increase'): void;
}>();
</script>
