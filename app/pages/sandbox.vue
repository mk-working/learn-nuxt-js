<template>
  <div 
    @mouseenter="() => console.log('Enter')"
    @mouseover="() => console.log('Over')"
    :style="{ padding: '20px', border: '1px solid black' }"
  > 
    Parent
    <button>Child</button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'sandbox'
});
</script>
