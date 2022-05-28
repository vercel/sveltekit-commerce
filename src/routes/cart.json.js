import { createCart, addToCart, updateCart } from '../utils/shopify.js';

export async function post() {
  await createCart();

  return {
    body: { data: {} }
  };
}

export async function put({ request }) {
  const body = await request.json();
  const response = await updateCart(body);

  return {
    body: { data: response.body.data }
  };
}

export async function patch({ request }) {
  const body = await request.json();
  const response = await addToCart(body);

  return {
    body: { data: response.body.data }
  };
}
