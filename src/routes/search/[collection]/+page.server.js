import { getAllCollections } from '$utils/shopify';
import { error } from '@sveltejs/kit';

export async function load() {
  const res = await getAllCollections();

  if (res.status === 200) {
    const collections = res.body?.data?.collections?.edges || [];
    if (collections) {
      return {
        body: { collections }
      };
    }

    throw error(404)
  } else {
    throw error(res.status)
  }
}
