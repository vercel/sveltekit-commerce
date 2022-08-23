import { getAllCollections } from '$utils/shopify';

export async function get() {
  const res = await getAllCollections();

  if (res.status === 200) {
    const products = res.body?.data?.collections?.edges;

    if (products) {
      return {
        body: { products }
      };
    }

    return {
      status: 404
    };
  }
}
