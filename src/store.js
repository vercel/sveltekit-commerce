import { writable } from 'svelte/store';
import { api } from './routes/_shopifyApi.js';

export const cartQuantity = writable('');
export const cart = writable([]);

export const search = writable('');

export const getCartItems = async () => {
  let cartId = JSON.parse(localStorage.getItem('cartId'));

  try {
    const shopifyResponse = await api({
      query: `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
              estimatedCost {
                  totalAmount {
                  amount
                  }
              }
              lines(first: 100) {
                  edges {
                  node {
                      id
                      quantity
                      estimatedCost {
                      subtotalAmount {
                          amount
                          currencyCode
                      }
                      totalAmount {
                          amount
                          currencyCode
                      }
                      }
                      merchandise {
                      ... on ProductVariant {
                          id
                          title
                          product {
                              images(first: 1) {
                                  edges {
                                    node {
                                      originalSrc
                                      altText
                                      width
                                      height
                                    }
                                  }
                                }
                              title
                          }
                      }
                      }
                  }
                  }
              }
            }
        }
      `,
      variables: { cartId },
    });
    let sum = 0;
    shopifyResponse.body.data.cart.lines.edges.forEach((d) => {
      sum += d.node.quantity
    });
    cartQuantity.set(sum);
    console.log(shopifyResponse)
    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};
