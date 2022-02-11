import { api } from '../_shopifyApi.js';

export const get = async ({request}) => {
  let body = await request.json();
  let variables = body.data;
  const response = await api({
    query: `
      mutation AddToCart($cartId: ID!, $variantId: ID!) {
          cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $variantId}]) {
          cart {
              lines(first: 100) {
              edges {
                  node {
                  id
                  quantity
                  merchandise {
                      ... on ProductVariant {
                      product {
                          title
                      }
                      }
                  }
                  }
              }
              }
          }
          }
      }
      `,
    variables: variables
  });

  return response;
};
