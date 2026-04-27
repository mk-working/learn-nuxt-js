<template>
  <div>
    <h1>
      {{ data }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/ninja")
console.log(data.value)
</script>

<style scoped></style>
