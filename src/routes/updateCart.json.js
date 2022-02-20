import { api } from './_shopifyApi.js';

export const post = async ({request}) => {
  let body = await request.json();
  let cartId = body.cartId;
  let variantId = body.variantId;
  let quantity = body.quantity;
  let lineId = body.lineId;
  console.log(body)
  const response = await api({
    query: `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: { 
        cartId: cartId, 
        lines: [
            {
              id: lineId,
              merchandiseId: variantId,
              quantity: quantity
            }
          ] 
      }
  });

  return response;
};