<template>
  <div>
    <ProductDetails :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { TProduct } from '~/types/products-type'

const route = useRoute()
const id = route.params.id as string
const uri = "https://fakestoreapi.com/products/" + id

const { data: product } = useFetch<TProduct>(uri, { key: id })

if (product.value) {
  throw createError({ statusCode: 404, statusMessage: "Product Not Found", fatal: true })
}

definePageMeta({
  layout: "product"
})
</script>

<style scoped></style>
