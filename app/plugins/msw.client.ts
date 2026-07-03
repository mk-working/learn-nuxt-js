export default defineNuxtPlugin(async () => {
  // Only start MSW in client-side development mode
  if (import.meta.dev) {
    const { worker } = await import('~/mocks/browser');
    
    await worker.start({
      onUnhandledRequest: 'bypass', // Ignore real requests or Nuxt asset requests
    });
    
    console.log('[MSW] Mock Service Worker started successfully! Intercepting API calls...');
  }
});
