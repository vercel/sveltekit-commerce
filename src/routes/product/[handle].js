import { getProduct, getAllProducts } from '$utils/shopify';

export async function get({ params }) {
  const [resOne, resTwo] = await Promise.all([getProduct(params.handle), getAllProducts()]);

  if (resOne.status === 200 && resTwo.status === 200) {
    const product = resOne.body?.data?.productByHandle;
    const featuredProducts = resTwo.body?.data?.products.edges.slice(0, 4);

    if (product) {
      return {
        body: {
          product,
          featuredProducts
        }
      };
    }

    return {
      status: 404
    };
  }
}
