const endpoint = import.meta.env.VITE_SHOPIFY_API_ENDPOINT;
const key = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;

export const api = async ({ query, variables }) => {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': key
    },
    body: { query, variables } && JSON.stringify({ query, variables })
  });

  let body = await result.json();

  // handle GraphQL errors
  if (body.errors) {
    throw new Error(body.errors[0].message);
  }

  return {
    status: result.status,
    body
  };
};
