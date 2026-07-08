<template>
  <div class="bg-red-200">
    <p>{{ count }}</p>

    <Child @increase="increase" />
  </div>
</template>

<script setup lang="ts">
import Child from './Child.vue';

const count = ref(0);

// When the child emits an event called increase, call this function
function increase() {
  count.value++;
}
</script>
