import { gql } from '@apollo/client';

export const GET_CUSTOMER_SESSION_QUERY = gql`
  query {
    customer {
      sessionToken
    }
  }
`;

export const ProductContentSlice = gql`
  fragment ProductContentSlice on Product {
    id
    databaseId
    name
    slug
    type
    image {
      id
      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
      altText
    }
    ... on SimpleProduct {
      price
      regularPrice
      soldIndividually
    }
    ... on VariableProduct {
      price
      regularPrice
      soldIndividually
    }
  }
`;

export const ProductVariationContentSlice = gql`
  fragment ProductVariationContentSlice on ProductVariation {
    id
    databaseId
    name
    slug
    attributes {
      nodes {
        id
        label
        value
        name
      }
    }
    image {
      id
      sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
      altText
    }
    price
    regularPrice
    salePrice
    discountAmount
    discountPercentage
    stockStatus
  }
`;

export const CartItemContent = gql`
  fragment CartItemContent on CartItem {
    key
    product {
      node {
        ...ProductContentSlice
      }
    }
    variation {
      node {
        ...ProductVariationContentSlice
      }
    }
    quantity
    total
    subtotal
    subtotalTax
    totalOnSaleDiscount
    extraData {
      key
      value
    }
  }
  ${ProductContentSlice}
  ${ProductVariationContentSlice}
`;

export const CartContent = gql`
  fragment CartContent on Cart {
    contents(first: 100) {
      itemCount
      nodes {
        ...CartItemContent
      }
    }
    appliedCoupons {
      code
      discountAmount
      discountTax
    }
    needsShippingAddress
    availableShippingMethods {
      rates {
        id
        instanceId
        methodId
        label
        cost
      }
    }
    chosenShippingMethods
    subtotal
    subtotalTax
    shippingTax
    shippingTotal
    total
    totalTax
    feeTax
    feeTotal
    discountTax
    discountTotal
    fees {
      id
      name
      total
    }
    appliedCoupons {
      description
      code
      description
      discountAmount
    }
  }
  ${CartItemContent}
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart(
    $productId: Int!
    $variationId: Int
    $quantity: Int
    $extraData: String
  ) {
    addToCart(
      input: {
        productId: $productId
        variationId: $variationId
        quantity: $quantity
        extraData: $extraData
      }
    ) {
      cart {
        ...CartContent
      }
      cartItem {
        ...CartItemContent
      }
    }
  }
  ${CartContent}
  ${CartItemContent}
`;

export const APPLY_COUPON_MUTATION = gql`
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      clientMutationId
      applied {
        description
        code
        discountAmount
      }
    }
  }
`;

export const UPDATE_SHIPPING_METHOD = gql`
  mutation UpdateShippingMethod($shippingMethods: [String]) {
    updateShippingMethod(input: { shippingMethods: $shippingMethods }) {
      clientMutationId
    }
  }
`;

export const REMOVE_COUPONS_MUTATION = gql`
  mutation RemoveCoupons($codes: [String]) {
    removeCoupons(input: { codes: $codes }) {
      clientMutationId
    }
  }
`;

export const REMOVE_ITEMS_FROM_CART_MUTATION = gql`
  mutation RemoveItemsFromCart($keys: [ID], $all: Boolean) {
    removeItemsFromCart(input: { keys: $keys, all: $all }) {
      cart {
        ...CartContent
      }
      cartItems {
        ...CartItemContent
      }
    }
  }
  ${CartContent}
  ${CartItemContent}
`;

export const GET_CART_QUERY = gql`
  query GetCart {
    cart {
      ...CartContent
    }
  }
  ${CartContent}
`;

export const UPDATE_CART_ITEMS_QUANTITIES_MUTATION = gql`
  mutation UpdateCartItemQuantities($items: [CartItemQuantityInput]) {
    updateItemQuantities(input: { items: $items }) {
      cart {
        ...CartContent
      }
      items {
        ...CartItemContent
      }
    }
  }
  ${CartContent}
  ${CartItemContent}
`;

export const EMPTY_CART_MUTATION = gql`
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        contents {
          nodes {
            key
          }
        }
      }
    }
  }
`;
