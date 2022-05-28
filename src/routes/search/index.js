import { getAllProducts } from '$utils/shopify';

export async function get() {
  const res = await getAllProducts();

  if (res.status === 200) {
    const allProducts = res.body?.data.products;

    if (allProducts) {
      return {
        body: { allProducts }
      };
    }

    return {
      status: 404
    };
  }
}
