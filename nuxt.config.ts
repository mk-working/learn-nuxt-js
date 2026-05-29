import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  app: {
    head: {
      title: 'Nuxt Dojo',
      meta: [
        {
          name: 'description',
          content: 'A Nuxt learning project with product pages and server API routes.'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  },

  runtimeConfig: {
    currencyApiKey: process.env.CURRENCY_API_KEY
  }
});
