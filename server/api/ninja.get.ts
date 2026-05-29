export default defineEventHandler((event) => {
  const { name } = getQuery(event);
  const config = useRuntimeConfig(event);

  const cleanName = typeof name === 'string' && name.trim().length > 0 ? name.trim() : 'friend';

  return {
    message: `Hello, ${cleanName}!`,
    method: event.method,
    query: {
      name: cleanName
    },
    hasCurrencyApiKey: Boolean(config.currencyApiKey)
  };
});
