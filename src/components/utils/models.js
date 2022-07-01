const product = `
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
`;

const getAllProducts = `{
    products(sortKey: TITLE, first: 100) {
        edges{
          node {
              ${product}
          }
      }
    }
  }`;

const getProduct = ` 
query getProduct($handle: String!) {
  productByHandle(handle: $handle) {
    ${product}
  }
}
`;

const getCollections = `{
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
                            ${product}
                        }
                    }
                }
            }
        }
    }
}`;

const getCart = `
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
}`;

const updateCart = `
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    userErrors {
      field
      message
    }
  }
}
`;

const calculateCart = `
mutation calculateCart($lineItems: [CartLineInput!]) {
  cartCreate(input: { lines: $lineItems }) {
    cart {
      checkoutUrl
      id
    }
  }
}`;

const addItemToCart = `
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
}`;

export {
    getCollections,
    getProduct,
    getAllProducts,
    getCart,
    updateCart,
    calculateCart,
    addItemToCart
}