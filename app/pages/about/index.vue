<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-gray-950">About Nuxt Dojo</h1>
      <p class="max-w-2xl text-gray-600">
        This page calls a local server API route with
        <code class="rounded bg-gray-100 px-1">useFetch</code>.
      </p>
    </div>

    <div class="card max-w-2xl">
      <h2 class="font-semibold text-gray-950">Server response</h2>

      <p v-if="pending" class="mt-3 text-gray-600">Loading API example...</p>

      <p v-else-if="error" class="mt-3 text-red-700">The API example could not be loaded.</p>

      <dl v-else-if="data" class="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt class="text-sm font-medium text-gray-500">Message</dt>
          <dd class="text-gray-950">{{ data.message }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Method</dt>
          <dd class="text-gray-950">{{ data.method }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Name query</dt>
          <dd class="text-gray-950">{{ data.query.name }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Private key configured</dt>
          <dd class="text-gray-950">{{ data.hasCurrencyApiKey ? 'Yes' : 'No' }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'About | Nuxt Dojo'
});

interface NinjaResponse {
  message: string;
  method: string;
  query: {
    name: string;
  };
  hasCurrencyApiKey: boolean;
}

const { data, pending, error } = await useFetch<NinjaResponse>('/api/ninja', {
  query: {
    name: 'Mario'
  }
});
</script>
