<template>
  <section class="space-y-6">
    <div class="space-y-3">
      <p class="text-sm font-semibold text-emerald-700">Nuxt learning project</p>
      <h1 class="text-3xl font-bold text-gray-950">Build clean product pages with Nuxt</h1>
      <p class="max-w-2xl text-gray-600">
        This project demonstrates pages, layouts, auto-imported components, typed data fetching,
        server API routes, and shared styling with Tailwind CSS.
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <NuxtLink to="/products" class="btn">Browse products</NuxtLink>
      <NuxtLink to="/about" class="text-link inline-flex items-center px-1 py-2">
        View API example
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'Home | Nuxt Dojo'
});
</script>
