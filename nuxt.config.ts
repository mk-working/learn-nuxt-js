import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

    vite: {
      optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    },
    plugins: [
      tailwindcss(),
    ],
  },

  app: {
    head: {
      title: "Nuxt Dojo",
      meta: [{name: "description", content: "Everything about Nuxt 3"}],
      link: [{rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}]
    }
  },

  runtimeConfig :{
  currencyKey : process.env.CURRENCY_API_KEY,
  },
})
