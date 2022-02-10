import { api } from './_shopifyApi.js';

export const post = async ({ request }) => {
  let body = await request.json();
  let lineItems = body.data;
  const response = await api({
    query: `
          mutation calculateCart($lineItems: [CartLineInput!]) {
              cartCreate(input: { lines: $lineItems }) {
                  cart {
                      checkoutUrl
                  }
              }
          }
      `,
    variables: { lineItems }
  });

  return response;
};
