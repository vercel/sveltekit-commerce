import { get, writable } from 'svelte/store';
import { shopifyFetch } from './utils/shopify.js';
import { loadCart } from '$utils/shopify';

export const cartQuantity = writable('');
export const cart = writable([]);
export const search = writable('');

let isClient = typeof window !== 'undefined';

const defaultCartId = isClient ? JSON.parse(localStorage.getItem('cartId')) : null;

export const cartId = writable(defaultCartId);

cartId.subscribe((value) => {
  if (isClient) {
    localStorage.setItem('cartId', JSON.stringify(value));
  }
});

export const getCartItems = async () => {
  try {
    const shopifyResponse = await loadCart(get(cartId));

    let sum = 0;
    shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
      sum += d.node.quantity;
    });
    cartQuantity.set(sum);
    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};
