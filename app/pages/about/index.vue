<template>
  <div>
    <h1>
      {{ data }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const { data } = useFetch("/api/ninja?name=mario")
</script>

<style scoped></style>
