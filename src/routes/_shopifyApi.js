const endpoint = import.meta.env.VITE_SHOPIFY_API_ENDPOINT;
const key = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;

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
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
};
