import { api } from './_shopifyApi.js';

export const post = async () => {
  const response = await api({
    query: `
      mutation calculateCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    variables: {}
  });

  return response;
};
