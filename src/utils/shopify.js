export async function shopifyFetch({ query, variables }) {
  const endpoint =
    import.meta.env.VITE_SHOPIFY_API_ENDPOINT ||
    'https://next-js-store.myshopify.com/api/2021-10/graphql.json';
  const key =
    import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN || 'ef7d41c7bf7e1c214074d0d3047bcd7b';

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
}

export async function getAllProducts() {
  return shopifyFetch({
    query: `{
      products(sortKey: TITLE, first: 100) {
          edges{
            node {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                    id
                    name
                    values
                }
                priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                variants(first: 250) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                            id
                            title
                            sku
                            availableForSale
                            requiresShipping
                            selectedOptions {
                                name
                                value
                            }
                            priceV2 {
                                amount
                                currencyCode
                            }
                            compareAtPriceV2 {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
                images(first: 20) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                        originalSrc
                        altText
                        width
                        height
                        }
                    }
                }
            }
        }
      }
    }`
  });
}

export async function getAllCollections() {
  return shopifyFetch({
    query: `{
        collections(first: 100) {
             edges {
                node {
                    handle
                    products(
                        first: 100,
                        sortKey: TITLE

                    ) {
                        edges{
                            node {
                                id
                                handle
                                availableForSale
                                title
                                description
                                descriptionHtml
                                options {
                                    id
                                    name
                                    values
                                }
                                priceRange {
                                    maxVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                variants(first: 250) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            id
                                            title
                                            sku
                                            availableForSale
                                            requiresShipping
                                            selectedOptions {
                                                name
                                                value
                                            }
                                            priceV2 {
                                                amount
                                                currencyCode
                                            }
                                            compareAtPriceV2 {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                                images(first: 20) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            originalSrc
                                            altText
                                            width
                                            height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`
  });
}

export async function loadCart(cartId) {
  return shopifyFetch({
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
    variables: { cartId }
  });
}

export async function getProduct(handle) {
  return shopifyFetch({
    query: ` 
        query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                id
                name
                values
                }
                priceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
                minVariantPrice {
                    amount
                    currencyCode
                }
                }
                variants(first: 250) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    id
                    title
                    sku
                    availableForSale
                    requiresShipping
                    selectedOptions {
                        name
                        value
                    }
                    priceV2 {
                        amount
                        currencyCode
                    }
                    compareAtPriceV2 {
                        amount
                        currencyCode
                    }
                    }
                }
                }
                images(first: 20) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    originalSrc
                    altText
                    width
                    height
                    }
                }
                }
            }
        }
    `,
    variables: {
      handle
    }
  });
}

export async function createCart() {
  return shopifyFetch({
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
}

export async function updateCart({ cartId, lineId, variantId, quantity }) {
  return shopifyFetch({
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
}

export async function addToCart({ cartId, variantId }) {
  return shopifyFetch({
    query: `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
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

    variables: {
      cartId: cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1
        }
      ]
    }
  });
}
