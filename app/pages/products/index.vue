<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="p in products">
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TProduct } from '~/types/products-type';

definePageMeta({
  layout: 'default'
})

const { data: products } = await useFetch<TProduct[]>("https://fakestoreapi.com/products")
</script>

<style scoped>
.router-link-exact-active {
  color: #FFFFFF;
}
</style>
