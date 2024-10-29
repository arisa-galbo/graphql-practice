import { authenticate, unauthenticated } from "../../../shopify.server";

import { authenticate, unauthenticated } from "../../../shopify.server";

// Use private access token on requests that don't come from Shopify
const { storefront } = await unauthenticated.storefront(shop);

// ShopifyのstorefrontAPIを使って商品"The 3p Fulfilled Snowboard"をカートに追加する関数
async function addToCart(variantId, quantity) {
    const query = `
      mutation {
        cartCreate(input: {
          lines: [
            {
              quantity: 1,
              merchandiseId: "49337862848823"
            }
          ]
        }) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                    }
                  }
                  quantity
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
  
    const response = await fetch('https://your-store-name.myshopify.com/api/2023-10/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '7adaae2cec2eb33dc8ee9f73f3d2f6ea',
      },
      body: JSON.stringify({ query }),
    });
  
    const result = await response.json();
  
    if (result.errors) {
      console.error('Errors:', result.errors);
      return; // エラーがあった場合は何も返さず終了
    }
  
    if (result.data) {
      console.log('Cart:', result.data.cartCreate.cart);

      // 商品がカートに追加された後にリダイレクト
      window.location.href = "https://starting-to-build-app.myshopify.com/cart"; // カートページへのリダイレクト

      return result.data.cartCreate.cart;
    } else {
      console.error('Failed to add to cart');
    }
}
