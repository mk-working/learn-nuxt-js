<template>
  <article class="card">
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="flex min-h-80 items-center justify-center rounded-md bg-gray-50 p-6">
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-96 w-full max-w-sm object-contain"
        />
      </div>

      <div class="space-y-5">
        <p class="text-sm font-medium text-emerald-700">{{ product.category }}</p>
        <h1 class="text-3xl font-bold text-gray-950">{{ product.title }}</h1>
        <p class="text-2xl font-bold text-emerald-700">${{ product.price.toFixed(2) }}</p>

        <div>
          <h2 class="border-b pb-2 font-semibold text-gray-950">Product description</h2>
          <p class="mt-3 text-gray-600">{{ product.description }}</p>
        </div>

        <p class="text-sm text-gray-500">
          Rating: {{ product.rating.rate }} / 5 from {{ product.rating.count }} reviews
        </p>

        <button type="button" class="btn">
          <i class="material-icons text-base" aria-hidden="true">add_shopping_cart</i>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/products-type';

defineProps<{
  product: Product;
}>();
</script>
