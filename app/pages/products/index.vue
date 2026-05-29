<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-gray-950">Products</h1>
        <p class="text-gray-600">Products are loaded through a local Nitro API route.</p>
      </div>

      <button type="button" class="btn" :disabled="pending" @click="refreshProducts">
        Refresh
      </button>
    </div>

    <p v-if="pending" class="text-gray-600">Loading products...</p>

    <div v-else-if="error" class="card border border-red-200 bg-red-50 text-red-700">
      Could not load products. Please try again.
    </div>

    <div v-else-if="products?.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <p v-else class="text-gray-600">No products found.</p>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types/products-type';

definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Products | Nuxt Dojo'
});

const {
  data: products,
  pending,
  error,
  refresh
} = await useFetch<Product[]>('/api/products', {
  key: 'products'
});

const refreshProducts = () => {
  void refresh();
};
</script>
