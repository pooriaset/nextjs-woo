import { gql } from '@apollo/client';
import { ProductVariationContentSlice } from './cart';

/**
 * Fetch Woocommerce products from GraphQL
 */
export const GET_VARIABLE_PRODUCTS_QUERY = gql`
  query GetAllProducts(
    $stockStatus: [StockStatusEnum]
    $orderBy: [ProductsOrderbyInput]
    $categoryIdIn: [Int]
    $q: String
    $first: Int
  ) {
    products(
      first: $first
      where: {
        stockStatus: $stockStatus
        orderby: $orderBy
        categoryIdIn: $categoryIdIn
        search: $q
      }
    ) {
      pageInfo {
        total
        hasNextPage
        hasPreviousPage
      }
      nodes {
        __typename
        ... on VariableProduct {
          databaseId
          name
          onSale
          type
          averageRating
          slug
          image {
            sourceUrl
          }
          price
          regularPrice
          salePrice
          stockStatus
          discountAmount
          discountPercentage
        }
      }
    }
  }
`;

/**
 * Fetch Woocommerce single product with variants
 */
export const GET_SINGLE_VARIABLE_PRODUCT_QUERY = gql`
  query GetSingleProduct($id: ID!) {
    product(id: $id, idType: DATABASE_ID) {
      description
      content
      commentCount
      image {
        id: databaseId
        sourceUrl
        altText
      }
      customAttributes {
        nodes {
          id
          label
          name
          optionNames
          variation
        }
      }
      productCategories(where: { order: ASC, orderby: TERM_ORDER }) {
        nodes {
          id: databaseId
          name
          slug
          menuOrder
          parentId
        }
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
        }
      }
      ... on VariableProduct {
        id: databaseId
        name
        title
        stockStatus
        slug
        averageRating
        price
        regularPrice
        salePrice
        discountPercentage
        discountAmount
        variations(where: { stockStatus: IN_STOCK }) {
          nodes {
            ...ProductVariationContentSlice
          }
        }
      }
    }
  }
  ${ProductVariationContentSlice}
`;
