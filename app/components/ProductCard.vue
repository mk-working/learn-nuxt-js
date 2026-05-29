<template>
  <article class="card flex flex-col text-center">
    <img
      :src="product.image"
      :alt="product.title"
      class="mx-auto h-36 w-full object-contain"
      loading="lazy"
    />

    <h2 class="mt-4 line-clamp-2 min-h-12 font-semibold text-gray-700">
      {{ product.title }}
    </h2>

    <p class="mt-2 text-lg font-bold text-emerald-700">${{ product.price.toFixed(2) }}</p>

    <NuxtLink :to="`/products/${product.id}`" class="btn mt-auto"> View details </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/products-type';

defineProps<{
  product: Product;
}>();
</script>
