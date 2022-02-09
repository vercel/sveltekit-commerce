import { api } from "./_shopifyApi.js";

export const get = async ({ params }) => {
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
      return response
  };