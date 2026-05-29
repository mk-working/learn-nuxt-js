export default defineEventHandler(() => {
  return {
    message: 'MK endpoint is working.',
    data: {
      a: 1
    }
  };
});
