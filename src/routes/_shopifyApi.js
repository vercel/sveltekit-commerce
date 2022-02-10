const endpoint = 'https://next-js-store.myshopify.com/api/2021-10/graphql.json';
const key = 'ef7d41c7bf7e1c214074d0d3047bcd7b';

export const api = async ({ query, variables }) => {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: { query, variables } && JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.log(error);
  }
};
