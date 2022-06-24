import { getAllCollections } from '$utils/shopify';

export async function get() {
  const res = await getAllCollections();

  if (res.status === 200) {
    const collections = res.body?.data?.collections?.edges;
    if (collections) {
      return {
        body: { collections }
      };
    }

    return {
      status: 404
    };
  }
}
