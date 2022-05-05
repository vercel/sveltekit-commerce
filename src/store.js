import { writable } from 'svelte/store';
import { api } from '$lib/utils/api.js';
import { getCart } from '$lib/utils/models.js';

export const cartQuantity = writable('');
export const cart = writable([]);

export const search = writable('');

export const getCartItems = async () => {
  let cartId = JSON.parse(localStorage.getItem('cartId'));

  try {
    const shopifyResponse = await api({
      query: getCart,
      variables: { cartId }
    });
    let sum = 0;
    shopifyResponse.body.data.cart.lines.edges.forEach((d) => {
      sum += d.node.quantity;
    });
    cartQuantity.set(sum);
    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};
