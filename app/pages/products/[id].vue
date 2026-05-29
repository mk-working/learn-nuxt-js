<template>
  <ProductDetails v-if="product" :product="product" />
</template>

<script setup lang="ts">
import type { Product } from '~/types/products-type';

const route = useRoute();
const productId = Number(route.params.id);

if (!Number.isInteger(productId) || productId < 1) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Invalid product id',
    fatal: true
  });
}

definePageMeta({
  layout: 'product'
});

const { data: product, error } = await useFetch<Product | null>(`/api/products/${productId}`, {
  key: `product-${productId}`
});

if (error.value || !product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
    fatal: true
  });
}

useHead({
  title: `${product.value.title} | Nuxt Dojo`
});
</script>
