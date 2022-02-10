import { api } from '../_shopifyApi.js';

export const get = async ({ params }) => {
  const response = await api({
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
      handle: params.handle
    }
  });

  return response;
};
