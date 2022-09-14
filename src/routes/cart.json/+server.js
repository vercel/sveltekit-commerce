import { createCart, addToCart, updateCart } from '../../utils/shopify.js';
import { error } from '@sveltejs/kit';

export async function POST() {
  await createCart();

  return new Response({data: {}});
}

export async function PUT({ request }) {
  const body = await request.json();
  const response = await updateCart(body);

  if(response.status === 200) {
    return new Response({data: response.body.data});
  } else {
    throw error(response.status)
  }

}

export async function PATCH({ request }) {
  const body = await request.json();
  const response = await addToCart(body);
  if(response.status === 200) {
    return new Response({data: response.body.data});
  } else {
    throw error(response.status)
  }

}
