import { getProduct, getAllProducts } from '$utils/shopify';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
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

    error(404);
  } else {
    let status = resOne.status !== 200 ? resOne.status : resTwo.status
    error(status);
  }
}
