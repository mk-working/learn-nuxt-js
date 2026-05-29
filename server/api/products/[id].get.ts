export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParam(event, 'id'));

  if (!Number.isInteger(productId) || productId < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid product id'
    });
  }

  const product = await getProductById(productId);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    });
  }

  return product;
});
