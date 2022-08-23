import { getAllCollections } from '$utils/shopify';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const res = await getAllCollections();

  // okay this part is confusing
  console.log(res);

  if (res.status === 200) {
    const products = res.body?.data?.collections?.edges;

    if (products) {
      console.log(products);

      return { products };
    }

    return {
      status: 404
    };
  }
}
